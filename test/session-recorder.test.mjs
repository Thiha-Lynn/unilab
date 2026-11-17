import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';

const html = await readFile(new URL('../.docs/04-test/session-recorder.html', import.meta.url), 'utf8');
function setup(t) {
  let exported;
  const dom = new JSDOM(html, { runScripts: 'dangerously', beforeParse(w) {
    w.URL.createObjectURL = blob => { exported = blob; return 'blob:synthetic-test'; };
    w.URL.revokeObjectURL = () => {};
    w.HTMLAnchorElement.prototype.click = () => {};
  }});
  t.after(() => dom.window.close());
  const w = dom.window, form = w.document.querySelector('form');
  const set = (name, value) => { const el = form.elements.namedItem(name); if(el.type === 'checkbox') el.checked = value; else el.value = value; };
  const submit = () => form.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
  const metadata = () => { set('Participant_ID','U01');set('Session_Date','2026-11-16');set('Cohort_Wave','SYNTHETIC');set('Build_Revision','synthetic-not-evidence');set('Device_Browser','synthetic'); };
  return { w, form, set, submit, metadata, exported: () => exported };
}

test('recorder starts without assumed consent, outcomes, timings or questionnaire answers', t => {
  const {form} = setup(t);
  assert.equal(form.querySelectorAll('input[type=checkbox]:checked').length, 0);
  assert.equal(form.querySelectorAll('select').length, 33);
  assert.ok([...form.querySelectorAll('select')].every(s => s.value === ''));
  assert.ok([...form.querySelectorAll('input[type=number]')].every(s => s.value === ''));
});

test('success without inspected output cannot be exported', t => {
  const s=setup(t);s.metadata();s.set('T1_Status','Success');s.set('T1_After_sec','15');s.submit();
  assert.equal(s.exported(), undefined);
  assert.match(s.w.document.querySelector('#status').textContent,/success needs elapsed time and a verified saved output/);
});

test('completed session without consent and eligibility cannot be exported', t => {
  const s=setup(t);s.metadata();s.set('Session_Complete',true);s.submit();
  assert.equal(s.exported(), undefined);
  assert.match(s.w.document.querySelector('#status').textContent,/require all three consent\/eligibility/);
});

test('partial observations export blanks and safely quoted notes without claiming completion', async t => {
  const s=setup(t);s.metadata();s.set('T1_Notes','SYNTHETIC "quote",\nline two');s.set('Debrief','=SYNTHETIC_FORMULA');s.submit();
  assert.ok(s.exported());
  const csv=await new Promise((resolve,reject)=>{const r=new s.w.FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsText(s.exported());});
  assert.match(csv,/"SUS_Q1"/);
  assert.match(csv,/"TAM_BI3"/);
  assert.match(csv,/SYNTHETIC ""quote"",\nline two/);
  assert.match(csv,/"'=SYNTHETIC_FORMULA"/);
  assert.match(s.w.document.querySelector('#status').textContent,/not a passing result/);
});
