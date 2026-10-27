#!/usr/bin/env python3
"""UAT-2026-10-27: validate real observations and report denominators explicitly.
Usage: python3 calc-metrics.py PRIVATE.csv [--json report.json]
Reserved participant slots are not evidence. No third-party packages required.
"""
import argparse
import csv
import json
import math
from pathlib import Path
import re
import statistics

TASKS = ['Slides cleanup', 'Mixed-file assembly', 'Sign and protect', 'Page extraction']
SCALES = {'SUS': [f'SUS_Q{i}' for i in range(1, 11)],
          **{c: [f'TAM_{c}{i}' for i in range(1, n+1)] for c, n in [('PU', 4), ('PEOU', 4), ('BI', 3)]}}
META = ['Participant_ID', 'Cohort_Wave', 'Session_Date', 'Build_Revision', 'Consent', 'Distinct_Person_Verified', 'Eligible_Non_Classmate', 'Session_Complete']
TASK_FIELDS = [f'T{i}_{s}' for i in range(1, 5) for s in ['Baseline_Method', 'Before_sec', 'After_sec', 'Status', 'Output_Verified', 'Errors', 'Hesitations', 'Notes']]
REQUIRED = META + TASK_FIELDS + sum(SCALES.values(), [])

def number(value, name, *, likert=False, integer=False):
    if not value: return None
    try: n = float(value)
    except (ValueError, TypeError): raise ValueError(f'{name}: expected a number')
    if not math.isfinite(n) or n < 0: raise ValueError(f'{name}: expected a finite non-negative number')
    if likert and (not n.is_integer() or not 1 <= n <= 5): raise ValueError(f'{name}: use an integer from 1 to 5')
    if integer and not n.is_integer(): raise ValueError(f'{name}: use a whole number')
    if name.endswith('_sec') and n <= 0: raise ValueError(f'{name}: measured duration must be positive')
    return n

def compute_sus(values):
    if len(values) != 10 or any(v is None for v in values): return None
    for v in values: number(str(v), 'SUS', likert=True)
    return 2.5 * sum(v-1 if i % 2 == 0 else 5-v for i, v in enumerate(values))

def summary(values):
    return {'n': len(values), 'mean': statistics.mean(values) if values else None,
            'sd': statistics.stdev(values) if len(values) > 1 else None}

def read_rows(path):
    with open(path, newline='', encoding='utf-8-sig') as stream:
        reader = csv.DictReader(stream)
        if not reader.fieldnames or len(set(reader.fieldnames)) != len(reader.fieldnames): raise ValueError('Missing or duplicate CSV columns')
        missing = set(REQUIRED) - set(reader.fieldnames)
        if missing: raise ValueError('Missing columns: ' + ', '.join(sorted(missing)))
        rows = []; seen = set()
        for line, raw in enumerate(reader, 2):
            if None in raw or any(v is None for v in raw.values()): raise ValueError(f'Line {line}: wrong number of CSV cells')
            row = {k: v.strip() for k, v in raw.items()}
            if not any(row.values()): continue
            pid = row['Participant_ID']
            if not re.fullmatch(r'U\d{2,3}', pid): raise ValueError(f'Line {line}: invalid participant code')
            if pid in seen: raise ValueError(f'Duplicate participant: {pid}')
            seen.add(pid)
            if not any(v for k, v in row.items() if k not in ('Participant_ID', 'Cohort_Wave')): continue
            for key in ['Consent', 'Distinct_Person_Verified', 'Eligible_Non_Classmate', 'Session_Complete'] + [f'T{i}_Output_Verified' for i in range(1,5)]:
                if row[key] not in ('', 'Yes', 'No'): raise ValueError(f'{pid} {key}: use Yes/No or blank')
            for i in range(1,5):
                key = f'T{i}'
                status = row[key+'_Status']
                if status not in ('', 'Success', 'Assisted', 'Failed', 'Not attempted'): raise ValueError(f'{pid} {key}: invalid status')
                method = row[key+'_Baseline_Method']
                if method not in ('', 'observed', 'recalled'): raise ValueError(f'{pid} {key}: baseline method must be observed or recalled')
                for suffix in ['Before_sec', 'After_sec', 'Errors', 'Hesitations']:
                    row[key+'_'+suffix] = number(row[key+'_'+suffix], key+'_'+suffix, integer=suffix in ('Errors','Hesitations'))
                if row[key+'_Before_sec'] is not None and not method: raise ValueError(f'{pid} {key}: baseline method required')
                if status == 'Success' and (row[key+'_Output_Verified'] != 'Yes' or row[key+'_After_sec'] is None):
                    raise ValueError(f'{pid} {key}: Success requires measured time and verified saved output')
            for columns in SCALES.values():
                for key in columns: row[key] = number(row[key], key, likert=True)
            if row['Session_Complete'] == 'Yes':
                if not all(row[k] == 'Yes' for k in ['Consent','Distinct_Person_Verified','Eligible_Non_Classmate']): raise ValueError(f'{pid}: completed session requires consent and eligibility verification')
                if not row['Build_Revision'] or not row['Cohort_Wave']: raise ValueError(f'{pid}: build and wave required')
                from datetime import date
                try: date.fromisoformat(row['Session_Date'])
                except ValueError: raise ValueError(f'{pid}: valid session date required')
                for i in range(1,5):
                    if row[f'T{i}_Status'] not in ('Success','Assisted','Failed') or any(row[f'T{i}_{s}'] is None for s in ['After_sec','Errors','Hesitations']):
                        raise ValueError(f'{pid}: completed session needs four attempted/timed tasks and error/hesitation counts')
            rows.append(row)
        return rows

def analyze(rows):
    eligible = [r for r in rows if all(r[k] == 'Yes' for k in ['Consent','Distinct_Person_Verified','Eligible_Non_Classmate'])]
    completed = [r for r in eligible if r['Session_Complete'] == 'Yes']
    tasks = []
    for i, name in enumerate(TASKS, 1):
        attempted = [r for r in eligible if r[f'T{i}_Status'] in ('Success','Assisted','Failed')]
        success = sum(r[f'T{i}_Status'] == 'Success' for r in attempted)
        paired = [r for r in attempted if r[f'T{i}_Baseline_Method'] == 'observed' and r[f'T{i}_Before_sec'] is not None and r[f'T{i}_After_sec'] is not None and r[f'T{i}_Status'] == 'Success']
        before = summary([r[f'T{i}_Before_sec'] for r in paired]); after = summary([r[f'T{i}_After_sec'] for r in paired])
        tasks.append({'task': name, 'attempted': len(attempted), 'pending': len(eligible)-len(attempted), 'successful': success,
                      'successRate': 100*success/len(attempted) if attempted else None,
                      'pairedObservedBefore': before, 'pairedObservedAfter': after,
                      'timeReductionPercent': 100*(before['mean']-after['mean'])/before['mean'] if paired else None,
                      'errors': summary([r[f'T{i}_Errors'] for r in attempted if r[f'T{i}_Errors'] is not None]),
                      'hesitations': summary([r[f'T{i}_Hesitations'] for r in attempted if r[f'T{i}_Hesitations'] is not None])})
    scales = {}
    for scale, columns in SCALES.items():
        scores = []
        for row in completed:
            values = [row[c] for c in columns]
            if any(v is None for v in values): continue
            scores.append(compute_sus(values) if scale == 'SUS' else statistics.mean(values))
        scales[scale] = summary(scores)
    full_attempts = len(completed)*4
    rate = 100*sum(r[f'T{i}_Status'] == 'Success' for r in completed for i in range(1,5))/full_attempts if completed else None
    metrics_ready = len(completed) >= 10 and all(s['n'] == len(completed) for s in scales.values())
    passed = metrics_ready and rate >= 90 and scales['SUS']['mean'] >= 75 and all(scales[c]['mean'] >= 4 for c in ('PU','PEOU','BI'))
    return {'instrument': 'UAT-2026-10-27', 'recordedRows': len(rows), 'eligibleParticipants': len(eligible), 'completedSessions': len(completed),
            'excludedUnverifiedRows': len(rows)-len(eligible), 'tasks': tasks, 'scales': scales,
            'completedCohortTaskSuccessRate': rate, 'numericExitCriteria': 'PASS' if passed else ('NEEDS ATTENTION' if metrics_ready else 'PENDING'),
            'releaseDecision': 'Human review required: physical devices, consent/evidence and zero open severity 3–4 defects.',
            'definitions': ['Reserved rows are not people.', 'Timing pairs include successful tasks with observed baselines only; n is explicit.', 'SD is sample SD; absent for n < 2.', 'SUS 75 exit threshold; 80.8 stretch target.']}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('csv', nargs='?', default=str(Path(__file__).with_name('uat-scorecard-template.csv')))
    parser.add_argument('--json', type=Path)
    args = parser.parse_args()
    try:
        rows = read_rows(args.csv); report = analyze(rows)
        report['waves'] = {wave: analyze([r for r in rows if r['Cohort_Wave'] == wave]) for wave in sorted({r['Cohort_Wave'] for r in rows if r['Cohort_Wave']})}
    except (ValueError, OSError) as error: parser.exit(2, f'Invalid evidence: {error}\n')
    output = json.dumps(report, indent=2, allow_nan=False)
    if args.json: args.json.write_text(output+'\n')
    print(output)

if __name__ == '__main__': main()
