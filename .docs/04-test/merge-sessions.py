#!/usr/bin/env python3
"""Merge private UAT CSVs, validating every observation and rejecting duplicate codes.
Usage: python3 merge-sessions.py NEW_OUTPUT.csv SESSION.csv [SESSION.csv ...]
No data is uploaded. Output must not already exist.
"""
import argparse
import csv
import importlib.util
from pathlib import Path

spec = importlib.util.spec_from_file_location('uat_metrics', Path(__file__).with_name('calc-metrics.py'))
metrics = importlib.util.module_from_spec(spec)
spec.loader.exec_module(metrics)


def merge(output, inputs):
    rows, seen, headers = [], set(), list(metrics.REQUIRED)
    for source in inputs:
        validated = metrics.read_rows(source)
        active = {r['Participant_ID'] for r in validated}
        with open(source, newline='', encoding='utf-8-sig') as stream:
            reader = csv.DictReader(stream)
            for column in reader.fieldnames:
                if column not in headers:
                    headers.append(column)
            for row in reader:
                pid = row['Participant_ID'].strip()
                if pid not in active:
                    continue
                if pid in seen:
                    raise ValueError(f'Duplicate participant: {pid}; keep retests separately')
                seen.add(pid)
                rows.append(row)
    if not rows:
        raise ValueError('No recorded observations; reserved slots are not evidence')
    # Exclusive create prevents accidental overwrite of private observations.
    with open(output, 'x', newline='', encoding='utf-8') as stream:
        writer = csv.DictWriter(stream, fieldnames=headers)
        writer.writeheader()
        writer.writerows(rows)
    return len(rows)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('output', type=Path)
    parser.add_argument('inputs', nargs='+', type=Path)
    args = parser.parse_args()
    try:
        count = merge(args.output, args.inputs)
    except (ValueError, OSError) as error:
        parser.exit(2, f'Merge failed: {error}\n')
    print(f'Merged {count} recorded rows into {args.output}; run calc-metrics.py next.')
