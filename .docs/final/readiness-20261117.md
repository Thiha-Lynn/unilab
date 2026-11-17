# Final readiness — 17 November 2026, after evidence handoff

**Verdict: engineering checks pass; full study/release and presentation criteria do not all pass.** Branch `audit/final-readiness-20261116` (PR #24) consolidates main PR #25 and the new evidence. Deadline: all-branch repo inspection 18 Nov 08:00 Bangkok; presentation 09:25–09:40, SE Lab. Arrive by 09:10. [Classroom source](https://classroom.google.com/c/ODU1NTkyOTA0MjY1).

## Current checks

| Area | Result | Evidence |
|---|---|---|
| Coursework automated tests | 43 Node + 16 Python pass | [Node log](evidence/course-tests-20261117.txt); metrics CI |
| Coursework build | Pass, 92 files, 7.41 MB rounded core | [Build log](evidence/course-build-20261117.txt) |
| Product revision | Main unchanged at 45e9870; live manifest 9851fbb has same tree as reviewed Nov16 main | [Prior verification](../04-test/evidence/20261116-verification.json); live manifest rechecked Nov17 |
| Survey | 55 complete rating records; SUS 58.64, TAM 3.34/3.43/3.30, all below targets | [Survey scoring](survey-results.md) |
| Task sessions | 15 supplied, owner-confirmed; 53/60 unassisted = 88.33%, below 90% | [Reviewed records and provenance](task-session-review.md) |
| Before/after | Successful-only pair reductions calculated; original chronology and comparability need explanation | [Comparison](comparison-table.md) |
| Consent | Private filled records supplied, not independently witnessed/authenticated | [Evidence qualification](task-session-review.md) |
| Defect retests | Historical engineering fixes recorded; new reported usability concerns need reproduction and actual retests | [Defect log](../04-test/defect-log.csv) |
| Diagrams | Existing pack plus new source-based sequence and class-style record model | [Core diagrams](core-diagrams.md) |
| Personal statements | Zaw's authored statement present; four commit-linked summaries prepared; personal attestations pending | [Role folder](role-statements/) |
| Demo video | Supplied trim is only 1.066667 seconds, 320×240 | Inspected with ffprobe; not final demo |
| Slides | Six-slide PDF is September material with 25-test count, not current final evidence | Eight final slides created and visually checked; [previews](presentation/README.md) and [script](presentation-script.md) |
| AI impact | Verification activity documented; controlled baseline/product model accuracy remains missing | [AI logic](ai-logic.md) |

## Tonight's remaining human work

1. Explain original collection method/dates and survey-before-session/first-use contradictions using original notes. Do not alter dates to force agreement. Confirm that the four save reminders were assistance; the derived dataset conservatively counts them as such.
2. Reproduce navigation/export/mobile/performance concerns; record severity, actual fix and retest. Do not assert zero severe defects simply because the issue log has blank severity.
3. Finish/review four personal statements (~200 words each), linking actual work and AI disclosure. Each member speaks to actual contribution. Reflections ~300 words are due Nov22 23:59.
4. Update final slides using the comparison and survey tables; record a meaningful ≤3-minute product video and rehearse the actual live MUST demo on the presentation laptop. The short October trim does not satisfy this.
5. Supply measured AI/SDLC evaluation/baseline if available; otherwise disclose that part as incomplete, not an invented saving.
6. Reply to today's Classroom post with the second repo link: https://github.com/Thiha-Lynn/unilab-releases. No message was sent by the agent.

Physical handset/media profiling, full-tool processing/network coverage, dependency audit triage, legal rule mapping and gate receipt remain open. Limited source scans do not certify full-history secret absence or overall security.

## Ten-minute talk structure

Problem/discovery 1 min → live MUST highlights 3 min → survey results and limitations 2 min → task results with assistance correction 1 min → AI evidence/limits 1 min → roles and lessons 2 min. Keep n=55 questionnaire respondents and n=15 overlapping task participants separate. Do not claim 95% success, improved SUS, universal zero uploads or causal AI time savings.

Only the instructor awards course grades. Passing builds/CI and having 55 responses do not mean all project criteria passed.

## Repository completion pass

Added a [criterion-by-criterion grading map](grading-checklist.md), [ten-minute presentation manuscript](presentation-script.md), [demo/retest procedure](retest-and-demo.md), and four contribution summaries based on actual commit history. Added `scripts/verify-final-evidence.py` to CI: it recomputes both published datasets, checks 315 shared questionnaire values and resolves final Markdown links. This closes preparation and consistency gaps; it does not create new empirical results or individual attestations. Eight final slides have since been created and visually reviewed, with public previews committed. A meaningful video, real-device checks, new defect retests and personal reflections remain uncompleted.
