# Session Date Reconciliation — 17 November 2026

## Purpose

This document reconciles the 15 observed UAT session dates with survey submission timestamps. Discrepancies are documented as limitations, not corrected retroactively.

## Timeline of Events

| Date | Activity | Source |
|------|----------|--------|
| Nov 9 | Study pack created, consent templates prepared | make-study-pack.py timestamp |
| Nov 10–11 | Wave 1 sessions: U01–U05 | Facilitator notes, session recorder exports |
| Nov 12–13 | Wave 2 sessions: U06–U10 | Facilitator notes, session recorder exports |
| Nov 14–16 | Wave 3 sessions: U11–U15 | Facilitator notes, session recorder exports |
| Nov 6–17 | Survey form responses collected (55 total) | Google Forms timestamps |

## Known Discrepancies

1. **Survey timestamps vs session dates:** Some of the 55 survey responses have timestamps earlier than the corresponding task observation sessions. This is because the survey form was opened on Nov 6 and some participants filled the questionnaire before or independently of the formal task session.

2. **"First time using UniLab" notation:** All 15 consent records state "First time using UniLab." For participants who may have informally browsed the app before Nov 10, this describes their first formal observed session, not necessarily their first ever visit to the site. The owner confirmed informal friends/family testing occurred prior.

3. **U01–U15 mapping:** The 15 task-session participants are drawn from the same pool as the 55 survey respondents. Their SUS/TAM ratings in the scorecards match the overlapping survey rows. The session recruiter assignments (Myo U01-U03, Swan U04-U06, Thiha U07-U09, Wanna U10-U12, Zaw U13-U15) followed the study plan.

## Unresolved Limitations (preserved honestly)

- The exact moment each participant first opened unilab.ztvmm.live before the formal session cannot be established from server logs (no server-side analytics beyond optional aggregate counters).
- Informal pre-study exposure is a confound for "learnability" SUS items (Q7, Q10). Disclose this in the presentation.
- Two survey timestamps (Nov 6, Nov 7) precede Wave 1 by several days. These respondents may have completed the questionnaire based on independent exploration rather than the formal four-task protocol. Their ratings are included in the 55-response dataset with this caveat.

## Recommendation

Present the data as-is with these documented limitations. Do not alter dates to create a cleaner narrative. The below-target SUS/TAM scores are still valid evidence of user perception.
