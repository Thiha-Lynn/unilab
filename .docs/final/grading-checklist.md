# Lecturer criteria and evidence map — 17 November 2026

Source: [Classroom announcements](https://classroom.google.com/c/ODU1NTkyOTA0MjY1), 3 and 17 November, inspected earlier on 17 November. This is a submission audit, not a prediction of marks. Rubric: Test 10 + Portfolio 10. Repository inspection: 18 November 08:00 Bangkok; Team 2 presentation 09:25–09:40 in SE Lab; arrive by 09:10. All branches are inspected; this consolidated evidence is in PR #24.

| Criterion | Reviewable evidence | Remaining limitation |
|---|---|---|
| Problem and users / charter | [Charter](../01-requirements/03-charter/charter.html), [15 discovery interviews](../01-requirements/02-interviews/results.md) | Discovery is distinct from the later survey and usability sessions |
| MoSCoW and traceability | [Backlog](../01-requirements/backlog.md), [spec](../01-requirements/01-spec/20260826-01-unilab-core.md) | F8/F11 remain parked; do not sell them as validated Must requirements |
| Rules and AI working instructions | [rule.md](../../rule.md), [CLAUDE.md](../../CLAUDE.md) | Rule-level legal mapping remains incomplete; no legal certification |
| Use case, activity, architecture, sequence, class/data model | [D1–D4](../02-design/diagrams.md), [sequence and records](core-diagrams.md) | Source-based diagrams; not evidence of production runtime coverage |
| Code, setup, tests | [Root README](../../README.md), [verification log](evidence/course-tests-20261117.txt), [build](evidence/course-build-20261117.txt) | Coursework and production builds differ; no credentials required for baseline; no .env required for local baseline |
| No secrets | [Git-history scan](evidence/secret-history-scan-20261117.json) | No matches in available local history; default detector rules are not exhaustive |
| Real test plan and observed sessions | [Plan](../04-test/test-plan.md), [15-session review](task-session-review.md) | Owner-confirmed; dates and first-use statements still conflict; private consent is not public |
| Before/after for Must tasks | [Comparison](comparison-table.md) | Four study scenarios have successful-only pairs; not coverage of every Must requirement |
| Questionnaire and results | [55-response analysis](survey-results.md) | SUS 58.64 <75; TAM 3.34/3.43/3.30 <4; no prior comparable survey |
| Success criterion | [Task summary](evidence/task-summary-reviewed.json) | 53/60 unassisted =88.33% <90%; 15 task participants overlap survey respondents |
| Defect severity, fix, retest | [Defect log](../04-test/defect-log.csv), [retest procedure](retest-and-demo.md) | New survey concerns are not yet reproduced or retested; blank severity does not mean zero severe issues |
| Case study | [Case study](case-study.md) | Includes unsuccessful outcomes and limits |
| AI Where / How / Prove / Measure | [AI logic](ai-logic.md) | Static checks and test counts exist; no causal manual-versus-AI baseline or labelled model-accuracy benchmark |
| Roles, individual evidence and disclosure | [Role statements](role-statements/) | Four repository-based drafts supplied; personal AI use and ownership still require each author’s attestation |
| Live demonstration, all members speak | [Final slide previews](presentation/README.md), [timed script](presentation-script.md), [acceptance checks](retest-and-demo.md) | A script does not prove rehearsal; old 1.07-second recording is unsuitable; live demo is mandatory |
| Second repository disclosure | [Product repository](https://github.com/Thiha-Lynn/unilab-releases) | Team must reply with this link to today's Classroom post; no reply sent by this agent |
| Post-presentation reflections | Each role file has `## Reflection` | Individual ~300-word reflection due 22 November 23:59, after the presentation |

## Every Must is not the same as four study scenarios

The task plan groups common student work into T1–T4. The broader specification also commits to HEIC conversion, redaction, intake, result expiry, download disclosure and phone completion. Automated tests and the four task observations cover different parts of that commitment. Do not call T1–T4 a complete all-tool/device acceptance test. [Retest procedure](retest-and-demo.md) separates these checks.

## Submission integrity

Public evidence uses participant codes. Keep consent/identity mappings and original notes private. Preserve original observation timestamps separately from form-entry/import timestamps. Preserve pre-fix results when adding a new retest wave. Publish failed targets alongside improvements rather than removing unsuccessful attempts.

Run `python3 scripts/verify-final-evidence.py` from the repository root to recompute the published summaries and compare all 315 overlapping ratings. This check deliberately succeeds when the data is consistent but the study reports NEEDS ATTENTION.
