import csv
import importlib.util
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('merge_sessions', Path(__file__).with_name('merge-sessions.py'))
merge = importlib.util.module_from_spec(spec)
spec.loader.exec_module(merge)


class MergeTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.addCleanup(self.temp.cleanup)

    def source(self, name, pid='U01', notes='SYNTHETIC test only'):
        row = dict.fromkeys(merge.metrics.REQUIRED, '')
        row.update(Participant_ID=pid, Session_Date='2026-11-16', T1_Notes=notes)
        path = self.root / name
        with path.open('w', newline='') as stream:
            writer = csv.DictWriter(stream, fieldnames=list(row))
            writer.writeheader()
            writer.writerow(row)
        return path

    def test_merge_preserves_quotes_newlines_and_missing_values(self):
        a = self.source('a.csv', notes='SYNTHETIC "quoted",\nsecond line')
        b = self.source('b.csv', 'U02')
        out = self.root / 'combined.csv'
        self.assertEqual(merge.merge(out, [a, b]), 2)
        rows = merge.metrics.read_rows(out)
        self.assertEqual(rows[0]['T1_Notes'], 'SYNTHETIC "quoted",\nsecond line')
        self.assertIsNone(rows[0]['T1_Before_sec'])
        self.assertEqual(merge.metrics.analyze(rows)['completedSessions'], 0)

    def test_duplicate_participant_rejected_before_output(self):
        out = self.root / 'combined.csv'
        with self.assertRaisesRegex(ValueError, 'Duplicate participant'):
            merge.merge(out, [self.source('a.csv'), self.source('b.csv')])
        self.assertFalse(out.exists())

    def test_existing_output_not_overwritten(self):
        out = self.root / 'combined.csv'
        out.write_text('original evidence')
        with self.assertRaises(FileExistsError):
            merge.merge(out, [self.source('a.csv')])
        self.assertEqual(out.read_text(), 'original evidence')

    def test_blank_template_not_promoted_to_evidence(self):
        out = self.root / 'combined.csv'
        with self.assertRaisesRegex(ValueError, 'No recorded observations'):
            merge.merge(out, [Path(__file__).with_name('uat-scorecard-template.csv')])
        self.assertFalse(out.exists())
