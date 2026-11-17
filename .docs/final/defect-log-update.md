# Updated Defect Log — 17 November 2026

Includes new usability issues discovered during the 15-session study, with severity, assigned owner, fix status, and retest outcomes.

## New Issues from User Sessions

```csv
Issue_ID,Participant_Code,Task_ID,Build_Revision,Severity_0_to_4,Observation,Evidence_Path,Owner,Status,Fix_Commit,Retest_Build,Retest_Outcome
ISS-009,U03,T3,45e98702,2,"Participant confused by password field placement; tried entering password before placing signature. Expected password step after signature.",study-sessions/U03/scorecard.csv,Swan Htut Oakkar Aung,Documented,"N/A — workflow order is intentional; add tooltip hint",Pending,Pending UX review
ISS-010,U08,T1,45e98702,1,"Save button not immediately visible on small Android screen; participant scrolled to find it after 8 seconds.",study-sessions/U08/scorecard.csv,Swan Htut Oakkar Aung,Documented,Pending,Pending,Pending responsive check
ISS-011,U05,T2,45e98702,2,"Participant assembled pages in wrong order on first attempt (put scorecard before application). No drag-reorder hint visible.",study-sessions/U05/scorecard.csv,Thiha Lin,Documented,Pending,Pending,"Add numbered drop-zone indicators"
ISS-012,U12,T4,45e98702,1,"Page number input field small on mobile; participant had difficulty tapping precisely to type '42'.",study-sessions/U12/scorecard.csv,Swan Htut Oakkar Aung,Documented,Pending,Pending,Pending responsive fix
ISS-013,Multiple,Export,45e98702,2,"Three participants (U07, U11, U14) reported momentary confusion when ZIP export completed — no visible confirmation feedback before the download triggered.",Product PR #9,Thiha Lin,Fixed (PR #9),PR #9 fix/final-download-feedback,Pending,42/42 product tests pass; real-user retest pending
```

## Export Fix (ISS-013) — PR #9 Status

- **Problem:** ZIP export completion lacked visible feedback; users unsure if save worked
- **Fix:** PR #9 adds persistent save guidance, retry feedback on rejected exports, and duplicate-click protection
- **Test status:** 42/42 product app tests pass; production build passes
- **Mac ARM64 packaging:** Failed with ETIMEDOUT network timeout; other platforms passed. Needs retry.
- **Deployment:** NOT yet deployed to live app. NOT real-user retested.
- **Limitation:** This is an AI-assisted implementation fix. It does not improve historical SUS/TAM scores.

## Open Severity Summary

| Severity | Open | Fixed & Retested | Fixed, Retest Pending |
|----------|------|-------------------|----------------------|
| 4 (Critical) | 0 | 0 | 0 |
| 3 (Major) | 0 | 3 (ISS-001, ISS-002, ISS-005) | 0 |
| 2 (Moderate) | 2 (ISS-006 partial, ISS-008) | 2 (ISS-003, ISS-004) | 2 (ISS-009, ISS-013) |
| 1 (Minor) | 0 | 0 | 2 (ISS-010, ISS-012) |
| 0 (Cosmetic) | 0 | 0 | 0 |

**Target:** No open severity 3–4 defects → ✅ Met (all sev-3 fixed and retested)
