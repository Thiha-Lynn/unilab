# Comparison table — measured evidence and missing baselines

No numeric change is claimed where comparable before/after measurements are absent. Course baseline and separate production app are different builds. Survey outcomes are not task performance.

| Item | Before | After | Change | Measured with | Evidence |
|---|---|---|---|---|---|
| Coursework offline core | Historical 31 MB reported in September spec | 7.41 MB rounded, 92 files, 17 Nov coursework build | Smaller; historical and current build basis differ | Vite + manifest budget | [spec](../01-requirements/01-spec/20260826-01-unilab-core.md), [build log](evidence/course-build-20261117.txt) |
| T1 slides, actual participant time | Not supplied | Not supplied | Not established | Requires observed matching tasks | [study plan](../04-test/test-plan.md); [synthetic functional check only](../04-test/evidence/20261116-browser-workflows.json) |
| T2 assembly, actual participant time | Not supplied | Not supplied | Not established | Requires observed matching tasks | [alternative report](../../test/no-real-user-test.md) |
| T3 sign/protect, actual participant time | Not supplied | Not supplied | Not established | Requires observed matching tasks | [synthetic password checks only](../04-test/evidence/20261116-browser-workflows.json) |
| T4 extraction, actual participant time | Not supplied | Not supplied | Not established | Requires observed matching tasks | [alternative report](../../test/no-real-user-test.md) |
| SUS | No earlier comparable survey supplied | 58.64/100, n=55; target 75 | Target missed; no improvement claim | Reverse-scored individual SUS items | [ratings, script, results](survey-results.md) |
| TAM PU / PEOU / BI | No earlier comparable survey supplied | 3.34 / 3.43 / 3.30, n=55 each; target 4 | All below target | Complete per-person construct means | [survey results](survey-results.md) |
| AI-assisted SDLC | Matched manual baseline absent | 43 Node + 16 Python checks passed on consolidated branch | Verification output only; causal AI gain not established | Test logs; human-reviewed diffs | [AI disclosure](ai-logic.md), [verification](readiness-20261117.md) |

## Team-measured synthetic operations (not user before/after)

[Raw benchmark](evidence/benchmark-20261117.json) records a single Node run on this Mac: three blank-PDF assembly 24.0 ms, page-42 extraction 19.3 ms, redaction 508.7 ms, vault store+purge 9.81 ms. These timings include only the script's operation boundaries, not UI interaction or participant effort. Three blank PDFs are not the mixed-image T2 study fixture. Network traffic is not instrumented by this benchmark. Do not claim 100% upload elimination, universal zero payloads, human time savings or a successful baseline from it.
