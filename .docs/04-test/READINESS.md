# Field-test readiness — 27 October 2026

The owner selected Swan Htut's newer four-task field kit on 27 October. This is preparation evidence, not completed UAT. No sample score or placeholder participant is a real observation.

## Completed preparation

- Pulled Swan's PRs #20 and #21 (main 7436740).
- Reconciled task IDs across the plan, facilitator kit, CSV and calculator: slides cleanup; PDF/JPG/PNG assembly; signing with password protection; page 42 extraction.
- Replaced example demographics, baseline times and prefilled Success statuses with 30 blank coded slots.
- Added consent, distinct-person eligibility, date, wave, build, observed/recalled baseline, output verification, error and hesitation fields.
- Standardized TAM to PU4/PEOU4/BI3 (3–4 items per construct, as the course handout requests). SUS release threshold is 75; 80.8 is a stretch target.
- Calculator validates columns, duplicates, finite positive durations, 1–5 integer responses and success evidence. Missing data stays pending. Before/after comparisons use matching observed pairs. Reports include sample SD, sample sizes, task denominators and wave summaries.
- Added 12 passing calculator tests and a dedicated CI workflow.
- Added an empty defect log with severity, owner, fix and retest evidence fields.

## Product implementation and verification

Product changes are in the companion `Thiha-Lynn/unilab-releases` pull request, not this older coursework app. Freeze its verified commit before field testing. Use its `app/qa/make-uat-fixtures.mjs` to generate synthetic files and `app/qa/uat.html` for the four workflow checks. Do not interpret a generated fixture, browser session or CI pass as a student session.

## Remaining work and owners

| When | Owner | Work and evidence |
|---|---|---|
| Before 28 October | All five members | Review the revised plan and submit through the agreed course channel. AI assistance does not imply team approval. |
| 29–31 October | Swan / Myo | Recruit at least 10 eligible non-classmates, aiming for 30 distinct people. Do not count invitations as users. |
| 2–3 November | QA / Tech Lead | Run a workflow pilot; pilot/translate/back-translate questionnaire wording with 2–3 people where needed. Test real iOS Safari, Android Chrome and laptops. |
| 4 November | Moderator + observer | Observe 5 + 5 initial sessions on recorded builds, then extend recruitment. Keep consent, permissioned evidence and coded observations privately. |
| 5–8 November | QA / AI Lead | Run calculator on private real data; review missing observations and sample sizes; report failures and slower times honestly. |
| 9–12 November | Tech Lead / Designer | Fix observed severity 3–4 issues and record before/after screenshots plus retests. |
| 18 November | All members | Present P1–P5, a demo <=3 minutes, actual user outcomes and an observed AI/SDLC impact metric. Each person reviews their own 200-word role statement. |

## Commands

```sh
python3 -m unittest discover -s .docs/04-test -p 'test_*.py' -v
python3 .docs/04-test/calc-metrics.py /private/path/real-results.csv --json /private/path/summary.json
```

Copy the CSV outside the repository before entering data. The calculator's numerical PASS is not release approval: the team must also inspect evidence, test target devices and resolve severity 3–4 defects. Public usage sessions are separate from distinct verified people. Do not pool the old GitHub Pages build and canonical product outcomes.
