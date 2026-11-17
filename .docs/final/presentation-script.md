# Final presentation manuscript — 18 November 2026

This is the current slide content and rehearsal script, not a rendered slide deck or proof of rehearsal. Supersedes September content for the final talk. Use ten minutes maximum, followed by three minutes Q&A. Keep the live app and synthetic fixtures ready before the slot. Suggested speakers below follow repository evidence, not a claim of rehearsed delivery.

## 1 — Problem and users (0:00–1:00) · Myo

**On screen:** UniLab · select → transform on this device → download. MFU students face file size/type limits, scattered tools and uncertainty about sensitive-file custody.

**Say:** Our discovery record contains 15 interviews and 12 pains. The product focuses on common file preparation tasks. Free access alone was not our differentiator. We prioritized fewer steps and local file processing. Discovery interviews are separate from the final questionnaire. Show the charter/backlog link if asked.

Source: [interviews](../01-requirements/02-interviews/results.md), [spec](../01-requirements/01-spec/20260826-01-unilab-core.md).

## 2 — Working product (1:00–4:00) · Thiha

**On screen:** Live app, not screenshots. Use synthetic files from the study pack.

**Do:** T1 rotate page 3, grayscale and reduce the file to the specified cap; open the saved result and confirm readable output. T2 combine PDF/JPG/PNG and verify three pages in the requested order. T3 add an invented signature and protect the PDF; show wrong-password rejection and correct-password opening. T4 extract page 42 and open the single-page result. If any task fails, state it and show the exact failure; do not substitute the old recording as a claimed live pass.

**Say:** These are parameterizations of one workflow. Optional assets can download; that is distinct from sending a document. Signature appearance is not certified identity. A result remaining in the browser's memory is distinct from a copy the user intentionally downloads.

Source: [test plan](../04-test/test-plan.md), [demo checks](retest-and-demo.md).

## 3 — Task observations (4:00–5:30) · Swan

| Task | Before → after, seconds | Successful pairs | Reduction |
|---|---|---|---|
| Slides cleanup | 130.56 → 36.69 | 11 | 71.90% |
| Mixed-file assembly | 159.11 → 47.85 | 15 | 69.93% |
| Sign and protect | 188.94 → 59.95 | 14 | 68.27% |
| Page extraction | 86.55 → 21.06 | 13 | 75.67% |

**Say:** Fifteen owner-confirmed sessions supplied 60 task attempts. Fifty-three were unassisted successes, 88.33%, below our 90% target. Four save-button reminders were conservatively reclassified as assistance. These timing averages include successful unassisted pairs only. They exclude assisted attempts, so we do not claim every participant improved by these amounts. Collection chronology still needs reconciliation with original notes.

Source: [comparison](comparison-table.md), [session review](task-session-review.md).

## 4 — Questionnaire findings (5:30–6:30) · Swan

**On screen:** 55 complete responses; SUS **58.64/100** (target75); PU **3.34**, PEOU **3.43**, BI **3.30** (targets4/5).

**Say:** These results miss our acceptance thresholds. The 15 task participants are included in the 55 responses; we do not have 70 distinct participants. Questionnaire ratings do not prove successful task completion. Reported concerns include navigation, saving, mobile controls and processing feedback. We have recorded them as concerns requiring reproduction, not fabricated successful fixes.

Source: [survey analysis](survey-results.md), [coded ratings](evidence/survey-ratings-anonymized.csv).

## 5 — AI logic and evidence (6:30–7:45) · Wanna

**On screen:** Where: OCR and background removal; How: browser engines/models; Prove: code, disclosures and checks; Measure: measured verification outputs, model accuracy not established.

**Say:** OCR is a prediction that users must check. Nineteen language options do not mean equal accuracy. OCR remains parked as a validated course requirement. AI also supported development and evidence processing. We can demonstrate our rules, review changes and passing checks. We have no matched manual baseline and cannot claim AI saved a measured number of hours. My repository-evidenced contribution includes course-source citations; model ownership cannot be inferred from my assigned title.

Source: [AI logic](ai-logic.md), [course citations](../../citation.md).

## 6 — Engineering quality and next iteration (7:45–9:00) · Zaw

**On screen:** 43 Node +16 Python checks; production build passes. Study targets missed. Priorities: save discovery → navigation → mobile controls → feedback. Reproduce → fix → retest, preserving baseline.

**Say:** Automated checks cover specific behavior, not universal usability or every physical phone. Our new data consistency check recomputes summaries and detects conflicting ratings or broken portfolio links. Tests passing is not equivalent to a release acceptance decision. New usability concerns remain open until reproduced and retested.

Source: [test log](evidence/course-tests-20261117.txt), [defects](../04-test/defect-log.csv), [validator](../../scripts/verify-final-evidence.py).

## 7 — Roles and lessons (9:00–10:00) · all members, brief handoff

Each member names one actual linked contribution and how they checked it. Use [role statements](role-statements/); do not claim a teammate's implementation. Finish with the practical lesson: shipping a working transformation is not enough if students cannot find or save the output. Keep the repository index available for questions.

## Q&A preparation

- **Why low SUS with faster timings?** Different measures; successful-only task pairs and a broader questionnaire cannot establish universal satisfaction.
- **Did AI improve productivity?** We have verification outputs and disclosed assistance, not a causal time-saving experiment.
- **Do all users upload files?** The intended processing runs locally; survey answers are separately collected in Google Forms. Optional assets and hosting requests still use a network.
- **Did all criteria pass?** No. The evidence exposes below-target usability and outstanding validation; the lecturer decides marks.
- **Why timestamps differ?** Collection, test session and form import are separate events; original inconsistencies are preserved and unresolved rather than backdated.
