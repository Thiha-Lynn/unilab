# Comparison table — measured evidence and missing baselines

No numeric change is claimed where comparable before/after measurements are absent. Course baseline and separate production app are different builds. Survey outcomes are not task performance.

| Item | Before | After | Change | Measured with | Evidence |
|---|---|---|---|---|---|
| Coursework offline core | Historical 31 MB reported in September spec | 7.41 MB rounded, 92 files, 17 Nov coursework build | Smaller; historical and current build basis differ | Vite + manifest budget | [spec](../01-requirements/01-spec/20260826-01-unilab-core.md), [build log](evidence/course-build-20261117.txt) |
| Slides cleanup (owner-confirmed observed records) | 130.56 s | 36.69 s | 71.90% reduction; successful pairs n=11 | Successful unassisted matched rows only; source chronology unresolved | [review and raw derived evidence](task-session-review.md) |
| Mixed-file assembly (owner-confirmed observed records) | 159.11 s | 47.85 s | 69.93% reduction; successful pairs n=15 | Successful unassisted matched rows only; source chronology unresolved | [review and raw derived evidence](task-session-review.md) |
| Sign and protect (owner-confirmed observed records) | 188.94 s | 59.95 s | 68.27% reduction; successful pairs n=14 | Successful unassisted matched rows only; source chronology unresolved | [review and raw derived evidence](task-session-review.md) |
| Page extraction (owner-confirmed observed records) | 86.55 s | 21.06 s | 75.67% reduction; successful pairs n=13 | Successful unassisted matched rows only; source chronology unresolved | [review and raw derived evidence](task-session-review.md) |
| SUS | No earlier comparable survey supplied | 58.64/100, n=55; target 75 | Target missed; no improvement claim | Reverse-scored individual SUS items | [ratings, script, results](survey-results.md) |
| TAM PU / PEOU / BI | No earlier comparable survey supplied | 3.34 / 3.43 / 3.30, n=55 each; target 4 | All below target | Complete per-person construct means | [survey results](survey-results.md) |
| AI-assisted SDLC | Matched manual baseline absent | 43 Node + 16 Python checks passed on consolidated branch | Verification output only; causal AI gain not established | Test logs; human-reviewed diffs | [AI disclosure](ai-logic.md), [verification](readiness-20261117.md) |

## Team-measured synthetic operations (not user before/after)

[Raw benchmark](evidence/benchmark-20261117.json) records a single Node run on this Mac: three blank-PDF assembly 24.0 ms, page-42 extraction 19.3 ms, redaction 508.7 ms, vault store+purge 9.81 ms. These timings include only the script's operation boundaries, not UI interaction or participant effort. Three blank PDFs are not the mixed-image T2 study fixture. Network traffic is not instrumented by this benchmark. Do not claim 100% upload elimination, universal zero payloads, human time savings or a successful baseline from it.
