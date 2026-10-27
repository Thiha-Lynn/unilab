import csv
import importlib.util
from pathlib import Path
import tempfile
import unittest

ROOT=Path(__file__).parent
spec=importlib.util.spec_from_file_location('metrics', ROOT/'calc-metrics.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
class MetricsTests(unittest.TestCase):
 def row(self, pid='U01'):
  r={k:'' for k in m.REQUIRED};r.update(Participant_ID=pid,Cohort_Wave='Wave 1',Session_Date='2026-11-04',Build_Revision='test-only',Consent='Yes',Distinct_Person_Verified='Yes',Eligible_Non_Classmate='Yes',Session_Complete='Yes')
  for i in range(1,5):
   for k,v in dict(Baseline_Method='observed',Before_sec='100',After_sec='50',Status='Success',Output_Verified='Yes',Errors='0',Hesitations='0').items():r[f'T{i}_{k}']=v
  for c in sum(m.SCALES.values(),[]):r[c]='4'
  return r
 def read(self, rows):
  with tempfile.TemporaryDirectory() as d:
   p=Path(d)/'data.csv'
   with p.open('w',newline='') as f:
    w=csv.DictWriter(f,fieldnames=m.REQUIRED);w.writeheader();w.writerows(rows)
   return m.read_rows(p)
 def test_blank_template_is_zero(self):
  self.assertEqual(m.analyze(m.read_rows(ROOT/'uat-scorecard-template.csv'))['completedSessions'],0)
 def test_sus_extremes(self):
  self.assertEqual(m.compute_sus([5,1]*5),100);self.assertEqual(m.compute_sus([1,5]*5),0);self.assertIsNone(m.compute_sus([3]*9))
 def test_no_prefilled_success(self):
  r=self.row();r['T1_After_sec']=''
  with self.assertRaisesRegex(ValueError,'Success requires'):self.read([r])
 def test_invalid_numbers(self):
  for value in ['nan','inf','-2','6','2.5']:
   r=self.row();r['SUS_Q1']=value
   with self.assertRaises(ValueError):self.read([r])
 def test_duplicates(self):
  with self.assertRaisesRegex(ValueError,'Duplicate'):self.read([self.row(),self.row()])
 def test_incomplete_scales_pending(self):
  r=self.row();r['TAM_BI3']='';a=m.analyze(self.read([r]));self.assertEqual(a['scales']['BI']['n'],0);self.assertEqual(a['numericExitCriteria'],'PENDING')
 def test_paired_not_independent_means(self):
  r=self.row();s=self.row('U02');s['T1_Before_sec']='';s['T1_After_sec']='1000'
  t=m.analyze(self.read([r,s]))['tasks'][0];self.assertEqual(t['timeReductionPercent'],50);self.assertEqual(t['pairedObservedBefore']['n'],1)
 def test_recalled_excluded(self):
  r=self.row();r['T1_Baseline_Method']='recalled';self.assertIsNone(m.analyze(self.read([r]))['tasks'][0]['timeReductionPercent'])
 def test_regression_negative(self):
  r=self.row();r['T1_After_sec']='200';self.assertEqual(m.analyze(self.read([r]))['tasks'][0]['timeReductionPercent'],-100)
 def test_missing_consent_excluded(self):
  r=self.row();r['Consent']='';r['Session_Complete']='';self.assertEqual(m.analyze(self.read([r]))['eligibleParticipants'],0)
 def test_assistance_not_success(self):
  r=self.row();r['T1_Status']='Assisted';self.assertEqual(m.analyze(self.read([r]))['tasks'][0]['successRate'],0)
 def test_sample_sd(self):
  self.assertIsNone(m.summary([1])['sd']);self.assertAlmostEqual(m.summary([1,3])['sd'],2**0.5)
if __name__=='__main__':unittest.main()
