#!/usr/bin/env python3
"""Build a fresh portable study packet outside Git; never copy participant records.
Usage: python3 make-study-pack.py NEW_DIRECTORY PRODUCT/app/qa/fixtures/uat
"""
import argparse
import csv
from pathlib import Path
import shutil
import zipfile

SOURCE = Path(__file__).resolve().parent
FIXTURES = ['application-form.pdf', 'petition-form.pdf', 'data-structures-textbook.pdf',
            'ielts-cert.jpg', 'thai-id-card.png', 'sample-lecture-slides-15mb.pdf', 'README.txt']
MEMBERS = ['Myo', 'Swan', 'Thiha', 'Wanna', 'Zaw']

def build(destination, fixtures):
    destination, fixtures = Path(destination).resolve(), Path(fixtures).resolve()
    repo = SOURCE.parents[1]
    if destination == repo or repo in destination.parents:
        raise ValueError('Choose a private destination outside this Git repository')
    archive = destination.with_name(destination.name + '.zip')
    if destination.exists() or archive.exists():
        raise ValueError('Choose a new destination; existing packets are never overwritten')
    for name in FIXTURES:
        if not (fixtures / name).is_file():
            raise ValueError('Missing synthetic fixture: ' + name)
    destination.mkdir(parents=True)
    for name in ['start-session.html', 'practice-example.html', 'RUN-STUDY.md',
                 'uat-protocol-and-questionnaire.md', 'test-plan.md',
                 'calc-metrics.py', 'merge-sessions.py']:
        shutil.copyfile(SOURCE / name, destination / name)
    shutil.copyfile(SOURCE / 'defect-log-template.csv', destination / 'defect-log.csv')
    (destination / 'fixtures').mkdir()
    for name in FIXTURES:
        shutil.copyfile(fixtures / name, destination / 'fixtures' / name)
    (destination / 'private-records' / 'retests').mkdir(parents=True)
    (destination / '.gitignore').write_text('*\n', encoding='utf-8')
    (destination / 'START-HERE.txt').write_text(
        'Open start-session.html in your browser. Extract the whole ZIP first.\n'
        'This is a blank kit, not evidence. Reuse forms, never observations.\n'
        'Share only this ORIGINAL blank ZIP. Never re-zip a filled working folder.\n'
        'Keep completed records privately outside Git. No participant names, IDs, contacts or personal files.\n'
        'Each sessions/Uxx folder contains a local recorder, optional blank CSV and blank consent record.\n'
        'Export recorder results as session-Uxx.csv into that matching folder.\n'
        'Do not merge practice data, retests or the blank scorecard files into the main cohort.\n', encoding='utf-8')
    with (SOURCE / 'uat-scorecard-template.csv').open(newline='', encoding='utf-8') as f:
        headers = next(csv.reader(f))
    consent = '''PRIVATE CONSENT / ELIGIBILITY RECORD — BLANK UNTIL OBSERVED
Participant code: {pid}
Actual session date and local time/timezone:
Facilitator code / observer code:
Notice version read (include any reviewed translation/version):
Language used and questions answered:
Actual agreement method (for example, verbal after notice):
Voluntary agreement to coded observations (Yes / No; leave blank until answered):
Separate optional photos/audio/video permission and exact scope (Yes / No):
Eligible MFU undergraduate outside team/course 1305493 (verified, no identity copied):
Duplicate check / coordinator confirmation:
Applicable age/consent requirements checked; approved plan reference if needed:
Participant given their code, withdrawal explanation and recruiting member contact channel:
Prior UniLab experience / relevant non-identifying context:
Recorder export / permitted evidence reference:

No name, email, student ID, signature or personal document belongs here.
Read the full notice first. Declining means no session/data collection.
Raw records: restricted team storage until 18 December 2026, then deletion.
Public reporting: reviewed aggregates/redacted evidence only as explained to participant.
Use a dated addendum for corrections; preserve the original agreement record.
'''
    recorder = (SOURCE / 'session-recorder.html').read_text(encoding='utf-8')
    recorder = recorder.replace('href="RUN-STUDY.md"', 'href="../../start-session.html"')
    tracker = []
    for i in range(1, 16):
        pid = f'U{i:02d}'
        folder = destination / 'sessions' / pid
        folder.mkdir(parents=True)
        row = dict.fromkeys(headers, '')
        row['Participant_ID'] = pid
        with (folder / 'scorecard-blank.csv').open('w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=headers)
            writer.writeheader(); writer.writerow(row)
        (folder / 'consent-record.txt').write_text(consent.format(pid=pid), encoding='utf-8')
        (folder / 'recorder.html').write_text(recorder.replace('placeholder="U01" required', f'placeholder="U01" value="{pid}" required'), encoding='utf-8')
        tracker.append({'Reserved_Code': pid, 'Recruiter': MEMBERS[(i-1)//3]})
    with (destination / 'recruitment-tracker.csv').open('w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['Reserved_Code', 'Recruiter', 'Actual_Status',
             'Scheduled_Time', 'Duplicate_Checked', 'Session_File', 'Questionnaire_Complete', 'Nonidentifying_Notes'])
        writer.writeheader(); writer.writerows(tracker)
    with zipfile.ZipFile(archive, 'x', zipfile.ZIP_DEFLATED) as z:
        for path in sorted(destination.rglob('*')):
            z.write(path, Path(destination.name) / path.relative_to(destination))
    return archive

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('destination', type=Path)
    parser.add_argument('fixtures', type=Path)
    args = parser.parse_args()
    try:
        print(build(args.destination, args.fixtures))
    except (ValueError, OSError) as error:
        parser.exit(2, f'Packet creation failed: {error}\n')
