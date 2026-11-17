"""Recompute published results and check final-portfolio local links; not a grade gate."""
import csv
import importlib.util
import json
from pathlib import Path
import re
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
FINAL = ROOT / '.docs/final'

def check():
    spec = importlib.util.spec_from_file_location('survey', ROOT / 'scripts/survey-summary.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    actual = module.analyze(FINAL / 'evidence/survey-ratings-anonymized.csv')
    assert actual == json.loads((FINAL / 'evidence/survey-summary.json').read_text()), 'Survey summary differs from ratings'
    with tempfile.TemporaryDirectory() as folder:
        output = Path(folder) / 'tasks.json'
        subprocess.run([sys.executable, str(ROOT / '.docs/04-test/calc-metrics.py'), str(FINAL / 'evidence/task-scorecards-reviewed.csv'), '--json', str(output)], check=True, stdout=subprocess.DEVNULL)
        tasks = json.loads(output.read_text())
    assert tasks == json.loads((FINAL / 'evidence/task-summary-reviewed.json').read_text()), 'Task summary differs from scorecards'
    survey = {r['Participant_Code']: r for r in csv.DictReader((FINAL / 'evidence/survey-ratings-anonymized.csv').open())}
    records = list(csv.DictReader((FINAL / 'evidence/task-scorecards-reviewed.csv').open()))
    # All shared questionnaire fields must agree; the cohorts overlap.
    rating_keys = ['Q'+str(i) for i in range(1,11)] + [c+str(i) for c,n in [('PU',4),('PEOU',4),('BI',3)] for i in range(1,n+1)]
    compared = 0
    for row in records:
        code = row.get('Participant_ID')
        assert code in survey, f'Participant missing from survey: {code}'
        for key in rating_keys:
            assert row[('SUS_' if key.startswith('Q') else 'TAM_') + key] == survey[code][key], f'Rating differs: {code}/{key}'
            compared += 1
    broken = []
    for path in FINAL.rglob('*.md'):
        for link in re.findall(r'\]\(([^)]+)\)', path.read_text()):
            if re.match(r'^[a-z]+:', link) or link.startswith('#'): continue
            target = link.split('#')[0]
            if target and not (path.parent / target).exists(): broken.append(f'{path.relative_to(ROOT)}: {link}')
    assert not broken, '\n'.join(broken)
    print(f'PASS: recomputed {actual["responses"]} surveys, {tasks["completedSessions"]} sessions, {compared} overlapping ratings; final Markdown links resolve.')
    print(f'Study result: {tasks["numericExitCriteria"]}; evidence consistency is not release acceptance or a course grade.')

if __name__ == '__main__': check()
