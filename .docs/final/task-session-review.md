# Reviewed task sessions — 17 November 2026

The owner confirmed that the supplied records describe actual work conducted with friends during November 6–16. This is owner-confirmed evidence, not independent authentication. Original files and consent records remain private and unchanged. The supplied session log specifically dates these 15 sessions November 10–16.

## Transformation and review

- All 315 SUS/TAM item answers in U01–U15 match the corresponding survey records. Do not add 15 to 55: these codes overlap.
- The original CSV failed validation because Baseline_Method contained tool names and Session_Date contained date/time. The derived CSV preserves the full reported timestamp, moves baseline tool text into notes and uses observed based on the owner confirmation.
- U02, U03, U10 and U11 T1 notes say a reminder about saving was needed. Derived statuses are conservatively Assisted, not Success. Source rows are unchanged.
- Original summary claims T3/T4 15/15 success, but original row statuses show 14 and 13. Do not reuse that summary table.
- “First time” consent text and survey dates preceding listed session dates (for example U01 survey Nov6 vs session Nov10) remain unresolved. Owner says work occurred Nov6–16; no dates were changed to force agreement. Preserve original notices/notes and explain whether these were later/repeat tasks.

## Results from derived records

| Task | Unassisted successes / attempts | Successful timing pairs n | Before mean s | After mean s | Reduction |
|---|---:|---:|---:|---:|---:|
| Slides cleanup | 11/15 | 11 | 130.56 | 36.69 | 71.90% |
| Mixed-file assembly | 15/15 | 15 | 159.11 | 47.85 | 69.93% |
| Sign and protect | 14/15 | 14 | 188.94 | 59.95 | 68.27% |
| Page extraction | 13/15 | 13 | 86.55 | 21.06 | 75.67% |

**Overall unassisted success: 53/60 = 88.33%, below the 90% target.** All 15 rows report four attempted tasks; completion does not mean four successes. Seven assisted attempts remain in the denominator. Successful-only timing comparisons exclude assisted tasks and must not be described as overall causal improvement. Baseline tool/device comparability and timing procedure require original notes.

| Scale (15-session subset) | Mean | Target |
|---|---:|---:|
| SUS | 57.83 | 75 |
| PU | 3.47 | 4 |
| PEOU | 3.42 | 4 |
| BI | 3.18 | 4 |

Numeric result: **NEEDS ATTENTION**. The 55-person survey remains the broader questionnaire sample; this overlapping subset is not an independent second survey.

Sources: [reviewed coded CSV](evidence/task-scorecards-reviewed.csv), [full results including waves](evidence/task-summary-reviewed.json), [calculator](../04-test/calc-metrics.py). Reproduce with `python3 .docs/04-test/calc-metrics.py .docs/final/evidence/task-scorecards-reviewed.csv`.

Consent records supplied by owner state verbal agreement and age/eligibility checks. The agent did not witness consent or verify the original notice/version. Public publication of names, IDs or private consent files is not needed.

## Media verification

The supplied `live-trim-video.mp4` is 1.066667 seconds, 320×240, with video/audio streams. It is not a final demonstration of the four tasks. The six-slide PDF describes September 2026 and 25/25 tests; it needs updating for the final. The gate PDF is image-based, so text extraction alone cannot establish its contents. Final live rehearsal and video remain outstanding.
