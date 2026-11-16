# UniLab final portfolio and completion checklist

Reviewed 16 November 2026 against Classroom's 3 November final instructions, the post-midterm handout and both GitHub repositories. **The product demo works; formal user evidence and the final portfolio are still incomplete.** The owner confirmed that formal UAT results have not yet been recorded.

**Presentation:** Wednesday 18 November, 09:25–09:40 Bangkok, SE Lab, presentation **Team 2**. Arrive by 09:10 with the demo running; 09:00 setup is preferable. Ten minutes presentation, three minutes Q&A, two minutes changeover. Every member must explain their actual work. Company 18 is the historical company number, not the final presentation slot. The current rubric is **Test 10 + Portfolio 10**, not a 100-point final talk.

## P1–P5 evidence map

| Deliverable | Existing material | What still makes it complete |
|---|---|---|
| P1 Case study: Problem → Process → Outcome | [Project report](../PROJECT_REPORT.md), [proposal](../01-requirements/proposal.md), [design](../02-design/diagrams.md) | Add actual observed outcomes, top defects, fixes and retest sources; distinguish goals from results |
| P2 Working product + <=3-minute video | [Live product](https://unilab.ztvmm.live/), [product repository](https://github.com/Thiha-Lynn/unilab-releases), [fresh four-workflow checks](../04-test/evidence/20261116-browser-workflows.json) | Record and link the short demo video; rehearse a live hands-off demo on the presentation laptop; record frozen revision and fallback |
| P3 User evidence log | 15 historical discovery interviews and a prepared [UAT kit](../04-test/uat-protocol-and-questionnaire.md) | Conduct and record formal sessions. Earlier interviews are not post-build UAT. User now proposes 15 distinct university participants, three recruited by each member |
| P4 Impact metrics | [Validated calculator](../04-test/calc-metrics.py), blank scorecard | Actual before/after task table with denominators and sources; SUS/TAM as selected in the plan; one measured AI/SDLC impact metric with its source |
| P5 Personal roles | Charter roles and GitHub history | Each of five people writes/reviews approximately 200 words covering actual contribution, evidence link, challenge/learning and AI-use disclosure. Role labels and commit counts alone do not prove work |

## Fifteen-person recruitment and proof

Proposed code allocation, not a claim that anyone has already participated:

| Recruiter | Reserved codes | Target |
|---|---|---:|
| Myo Zin Thant | U01–U03 | 3 distinct eligible MFU students |
| Swan Htut Oakkar Aung | U04–U06 | 3 |
| Thiha Lin | U07–U09 | 3 |
| Wanna San | U10–U12 | 3 |
| Zaw Win Htut | U13–U15 | 3 |

Assign one coordinator to reconcile codes before testing. Ask each recruit whether another member has already enrolled/tested them; reuse the original code for retests and exclude repeats from the new-person count. Confirm the target group without recording student names, IDs, emails or credential screenshots. A code by itself does not prove a person: observer verification, actual dated observations and permissioned supporting evidence do. If independent verification cannot be obtained, describe the verification limit honestly. Do not promise a fraud-proof census.

Use the [study procedure](../04-test/RUN-STUDY.md), [local session recorder](../04-test/session-recorder.html), and [CSV merger](../04-test/merge-sessions.py). Each row needs consent, distinct-person verification, non-classmate eligibility, date, build, device/browser, four attempted/timed task outcomes, output checks, errors and hesitations. Collect SUS/TAM responses directly from each participant. The kit has 30 reserved rows for expansion, but empty codes do not count.

Report the funnel, not just a headline: recruited → consented → eligible distinct people → completed sessions → task attempts → unassisted verified successes → complete questionnaires. Fifteen completed people attempting four tasks means **60 task attempts**, not 60 users. If two people never finish, report 15 recruited and 13 completed, not 15 completed. Keep failed and assisted tasks in the denominator. The merger rejects duplicate participant codes; people accidentally assigned different codes still require human reconciliation.

## Why this does not require uploading files

| Information | Where it belongs | What may be claimed |
|---|---|---|
| Input PDFs/photos, generated PDFs, signature/password | On the participant's device; generated results follow the disclosed in-memory retention and explicit local download | Document processing happens on-device; the study never needs copies of real personal documents |
| Coded research observations, consent confirmation, SUS/TAM answers | Separate private team research storage under the study notice; export explicitly from the local recorder | Consented research data exists. This is not a claim that the entire project collects no data |
| Optional product usage events | Existing first-party collector, separately described by the privacy page | Counts are incomplete browser/app activity, not proof of distinct humans or successful study tasks |
| Public final portfolio | Aggregate tables and redacted evidence links approved for sharing | Show sample sizes, sources and limits; exclude raw research records and identities |

The correct product statement is **"UniLab processes your documents on your device; document contents are not uploaded for processing."** The live ecosystem already has optional usage counters. Do not say "zero telemetry", "no server whatsoever", or use 33 analytics sessions as 33 people. The four-workflow browser check is engineering evidence; it is not exhaustive network certification or a human study.

## Two-day execution order

1. **16 Nov:** coordinate 15 distinct recruits, run a brief instrument/fixture pilot separately, freeze the build, start formal observations with two facilitator/observer pairs. Use actual dates. Preserve all results privately.
2. **17 Nov:** finish observations, calculate metrics, triage and retest severe defects, fill P1/P3/P4, record the short video and finish five personal statements. Do not deploy unrelated features during measurement. If a fix changes the build, record wave/revision and report cohorts separately.
3. **17 Nov evening:** rehearse to ten minutes, confirm every source link opens for the intended reviewer, prepare local demo assets and video fallback, confirm actual group gate/approval evidence with the team. Individual attendance is a separate Classroom matter.
4. **18 Nov:** show the actual app, real results and limitations. The timetable may be adjusted by the lecturer on the day.

## Ten-minute talk draft

| Time | Topic | Suggested speaker, subject to actual contribution |
|---|---|---|
| 0:00–1:10 | User problem, discovery evidence, committed scope | Myo |
| 1:10–4:00 | Live four-task workflow highlights and privacy boundary | Thiha |
| 4:00–5:30 | Research procedure, participants, main usability finding | Swan |
| 5:30–7:10 | Before/after results, failures, defects and retests | Zaw |
| 7:10–8:40 | AI logic or AI-assisted SDLC: Where, How, Prove, Measure | Wanna |
| 8:40–10:00 | Outcomes, limitations, roles and lessons | Shared closing |

This is a proposed allocation, not an authorship claim. Each member should show only work they can explain and substantiate.

For AI/SDLC impact, link a real task, AI interaction/diff, human review and independent verification. Measure a comparable manual vs AI-assisted task now if no historical timing exists, including review/fix time; disclose task differences and n. Never invent hours saved from commit timestamps or call the added regression-test count a causal productivity improvement. Runtime OCR/background removal remain outside the four-task UAT scope; do not add a new AI feature just to fill this slide.

## Optional MFU accounts: future proposal, not current requirement

The owner suggested optional MFU Google login, leaving public processing free and adding personal conveniences. This is not required by the current test plan and has no validated pain/backlog entry yet. It also introduces identity/session data and changes the charter's account boundary. It cannot retrospectively prove that a user completed a task.

If the team later accepts it, first define exactly what "recent" means. A list of tool names/settings is different from persisted filenames, source documents or result downloads. Prefer opt-in recent tools/favourites with a clear delete control; retaining files or result URLs would change the existing temporary-custody promise and needs explicit requirements and retention decisions. Keep the four essential document tools available without login.

Before implementation: document the user pain and change request; agree benefit and identity-data retention/deletion; design university-domain verification and session security; revise privacy/architecture/traceability; test both anonymous and signed-in flows. Do not replace student task observations with a login count. Defer this change until after the current study and presentation unless the team deliberately replans and obtains the required course scope decision.

## Open engineering and governance evidence

- [B11 / issue 2](https://github.com/Thiha-Lynn/unilab/issues/2): complete processing/network coverage; the four UAT paths do not certify every tool or network channel.
- [B33 / issue 3](https://github.com/Thiha-Lynn/unilab/issues/3): 60-second media/hidden-tab performance thresholds still need measurement.
- [B34/B35 / issue 4](https://github.com/Thiha-Lynn/unilab/issues/4): actual phone/browser choice and device evidence, beyond viewport emulation.
- [B17 / issue 5](https://github.com/Thiha-Lynn/unilab/issues/5): actual topic/gate decision. The final timetable lists UniLab, but this is not a historical gate score or approval receipt.
- Dependency audit on product main reports five high-severity affected package entries. Triage production vs development reachability and test controlled updates separately; no blind forced downgrade/update during the study.
- Existing rule-to-LR mapping gaps and older no-analytics wording remain recorded in the [audit](../05-log/20261116-log.md). Neither a passing build nor this checklist is a compliance certification.
