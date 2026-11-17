# SHOW THIS TOMORROW — the five lecturer requirements

**This is the presentation launch page.** Current final evidence is on branch `audit/final-readiness-20261116` in [coursework PR24](https://github.com/Thiha-Lynn/unilab/pull/24). The lecturer checks all branches. Do not use the September PDF. Eight current slides are below; the editable deck is in the Codex chat/Spaces page `page_4f244510b2f88191886980d2b3fbf656`.

| Lecturer asks for | Open this | Show / say | Speaker |
|---|---|---|---|
|1. Problem and users|[Slide2](presentation/slide-2.png), [15 interviews](../01-requirements/02-interviews/results.md), [spec/pains](../01-requirements/01-spec/20260826-01-unilab-core.md)|Student file constraints, custody and scattered tools;15interviews,12pains|Myo|
|2. Live MUST demo|[LIVE APP](https://unilab.ztvmm.live/), [task acceptance checks](retest-and-demo.md)|Actually perform T1rotate/grayscale/cap, T2PDF+JPG+PNG, T3invented signature/password, T4page42. Open saved outputs. Slide3 is only the task list, not the demo.|Thiha|
|3. Test results and sources|[Slide4](presentation/slide-4.png), [slide5](presentation/slide-5.png), [comparison table](comparison-table.md), [task CSV](evidence/task-scorecards-reviewed.csv), [survey CSV](evidence/survey-ratings-anonymized.csv)|53/60=88.33%; SUS58.64; TAM3.34/3.43/3.30; report targets missed. Timing denominators11/15/14/13.15taskparticipants overlap55surveyrespondents.|Swan + Zaw|
|4. AI Where / How / Prove / Measure|[Slide6](presentation/slide-6.png), [AI logic](ai-logic.md), [new before/after engineering proof](https://github.com/Thiha-Lynn/unilab-releases/blob/fix/final-download-feedback/docs/qa/download-feedback-2026-11-17.md)|OCR/background model pipeline; AI-assisted code review; show new export regression failing on baseline then passing after correction. This is engineering proof, not measured AI time savings or model accuracy.|Wanna + Thiha|
|5. Roles, lessons and disclosure|[Slide8](presentation/slide-8.png), [role statements](role-statements/), [member questions](member-qa-rehearsal.md)|Each member names an actual linked change, how they checked it and their own AI use. Personal declarations cannot be replaced by AI summaries.|All5members|

[All eight slides](presentation/README.md) · [10-minute speaking script](presentation-script.md) · [morning checklist](morning-handoff.md) · [full criterion map](grading-checklist.md)

## Exact remaining actions for friends

- **Myo:** replace your role summary with your own ~200words and AI disclosure; rehearse slide2 and open one design-token/entry-page PR. Coordinate the second-repo reply to the lecturer.
- **Swan:** complete your personal statement; explain SUS scoring and assistance corrections; bring the original notes for sessions you actually observed. Recheck any chronology you can verify.
- **Wanna:** complete your personal statement with actual work; rehearse Where/How/Prove/Measure and model limitations. Do not claim model training or benchmark results that do not exist.
- **Zaw:** run the actual demo acceptance checks and document failures; review product PR9 and retest saving on actual devices. Record severity, fix build and retest outcome only after executing them. Check your statement against current evidence.
- **Thiha:** rehearse all four live tasks on the presentation laptop; identify the exact build; review product PR9 before any release. Keep coursework and product test counts separate. Complete your personal AI disclosure.
- **Original observers together:** reconcile timestamps from original notes; retain unresolved limits when no source exists. A new usability retest is a separate wave, not a rewrite of prior outcomes.

## Ready for grading does not mean complete or full marks

The repo contains reviewable Discover→Deliver evidence and the five presentation sections. It still lacks full Must-level before/after coverage, complete new usability-defect retests, resolved chronology, individual attestations and model-quality evaluation. User-study targets were missed. Physical-device and full-tool checks remain bounded. These are substantive limits, not missing wording that can be filled automatically.

Product PR9 contains an implemented export-feedback fix with42passing app tests and a passing build. It is a review branch, **not yet the live app**, and has not been retested by real users. Coursework remains43Node+16Python checks. No old scores are replaced by these engineering results.

Tomorrow18November: repository check08:00Bangkok; previously verified slot09:25–09:40, arrive09:10. Individual reflections are due22November23:59 after presenting. A separate backup video is optional under the supplied announcements; live demo is mandatory.
