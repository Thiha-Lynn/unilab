> **17 November update:** 55 survey responses are now available; see [survey results](final/survey-results.md). Mean SUS 58.64 and TAM constructs below 4. Observed task timings/completion and original collection/consent records remain unverified. Earlier statements about no survey data are historical.

# UniLab project report — verified status, 16 November 2026

UniLab provides student document tools through one workflow: **select a file → transform it on this device → download the result**. The four current study tasks are slide cleanup/compression, mixed-file assembly, signing with password protection, and single-page extraction. The working product is demonstrated; formal user outcomes are not yet established.

**Course:** 1305493 Software Engineering Case Studies, 1/2569 · Dr. Prasara Jakkaew. **Company:** Digital Imposters, Company 18. **Final presentation:** Team 2 in the updated timetable, 18 November 2026, 09:25–09:40 Bangkok, SE Lab. The current final rubric is Test 10 + Portfolio 10. See the [P1–P5 completion checklist](06-deliver/README.md).

## Sources and repository boundaries

- [Coursework repository](https://github.com/Thiha-Lynn/unilab): requirements, design, historical baseline, study plan and portfolio evidence. Audited main revision: `1194049dce475191a54ecfea628a4b4f6db819d2`.
- [Product repository](https://github.com/Thiha-Lynn/unilab-releases): production application in `app/`, native packages and first-party usage collector. Reviewed main revision: `45e98702201d`; the full hash is in the verification record.
- [Live product](https://unilab.ztvmm.live/), [release manifest](https://unilab.ztvmm.live/release.json), [aggregate usage dashboard](https://unilab.ztvmm.live/usage/).
- [Classroom](https://classroom.google.com/c/ODU1NTkyOTA0MjY1): 3 November final instructions supersede the older split 11/18 November schedule. The registered repository sheet points to coursework `unilab/tree/main`; bring the separate product link as instructed for code in another repository.

The live manifest reports revision `9851fbb3a6d5e66b1287b3a065d01602d06dca1d`, built 28 October. Git comparison found its tree identical to reviewed product main. Browser checks below used a clean local build of main, not a newly deployed release.

## Team roles

Roles and IDs follow the charter source and submitted test plan. They describe responsibilities, not proof of who performed every implementation task; use reviewed PRs and personal statements for actual contribution.

| Member | Student ID | Charter role |
|---|---|---|
| Myo Zin Thant | 6631503076 | Product Owner |
| Swan Htut Oakkar Aung | 6631503088 | Designer |
| Thiha Lin | 6631503092 | Tech Lead |
| Wanna San | 6631503097 | AI Lead |
| Zaw Win Htut | 6631503101 | QA / Test |

The previous report had conflicting IDs for Myo and Zaw and an unnamed fifth member. These entries now agree with [the charter](01-requirements/03-charter/charter.html). Each member must still verify and author their personal role statement.

## Problem, scope and research evidence

The repository records 15 discovery interviews dated 22 August–8 September and 12 pains. This audit checks the recorded traceability; it does not independently authenticate those historical conversations. Discovery interviews are separate from the post-build UAT study.

The [canonical specification](01-requirements/01-spec/20260826-01-unilab-core.md) and [traceability map](01-requirements/TRACEABILITY.md) preserve the detailed pain citations. In particular, P9 concerns degradation/expiry during file transfer and P10 concerns completing work on the device available; neither should be rewritten as an unsupported performance/crash finding. F7 covers permanent redaction/blur, not signing. F8 OCR and F11 saved workflows remain parked for course commitment pending team decisions.

The [four-task plan](04-test/test-plan.md) is the current evaluation scope. It does not require adding authentication or retaining document history. Scope includes local processing, meaningful output verification, size screening and temporary result custody. It excludes LMS-side submission guarantees and broad native-package certification. More shipped tools do not themselves earn evidence of these outcomes.

## Implementation and measured engineering checks

Product main has the four task capabilities: decimal size targeting, grayscale and page-specific orientation correction; PDF/JPG/PNG assembly; drawing a signature with optional QPDF-based password protection; and extraction of page 42 from a 120-page PDF. `pdf-lib` handles PDF assembly/manipulation; QPDF supplies password protection. Do not attribute encryption to `pdf-lib` alone.

Fresh checks on 16 November 2026:

| Check | Result | Scope |
|---|---|---|
| Product app `npm test` | 41 passed, 0 failed | Automated tests on reviewed product main |
| Analytics Python suite | 10 passed | Collector/dashboard rules, not verified users |
| Desktop policy suite | 2 passed | Policy tests, not physical-device certification |
| Coursework Python metrics/merger suite | 16 passed | Missing data, scoring, duplicates, denominators and safe merging |
| Coursework Node suite with recorder | 31 passed | Existing checks plus recorder evidence safeguards |
| Production build | Passed; core below 8,000,000 bytes | Optional engines remain outside the small core budget |
| Four browser workflows | 4/4 passed in Chrome 157 on this Mac | Synthetic fixture checks; see [raw evidence](04-test/evidence/20261116-browser-workflows.json) |

T1 produced a six-page 671,783-byte PDF with grayscale/orientation checks. T2 decoded three pages in the expected order. T3 rejected absent/wrong passwords and opened with the correct test password. T4 retained exactly page 42. The harness is a limited synthetic check; the displayed signature and real-device readability still need human inspection. Its fetch-body check is not an exhaustive browser-network audit. Synthetic padded slide compression is not a real-world speed/ratio claim.

The public live manifest reports a 7,943,852-byte offline core. Record the manifest and test build when citing a size, rather than mixing historical 7.31/7.41 MB values. See [the verification record](04-test/evidence/20261116-verification.json) for exact revisions. Offline first use of optional engines/models and physical mobile performance remain separate qualifications.

An npm audit of product main reports five high-severity affected package entries (markdown-it, Vite, undici, zod and the affected background-removal dependency chain). These are dependency findings, not five demonstrated application exploits. Triage runtime reachability and patch in a tested product branch; do not infer a clean security audit from functional tests.

## Privacy boundary

Document transformations run on-device. Generated results use in-memory custody with explicit local download, expiry and clear controls. The signing workflow uses a 10-minute result window; other field tools use 30 minutes. A downloaded file remains under the user's control after the app releases its in-memory copy. Clearing object URLs is not a guarantee about browser internals or instantaneous operating-system memory erasure.

The whole ecosystem is **not zero-telemetry or serverless**: the product includes optional first-party activity counts and a separately consented pilot. The public dashboard reports aggregates; its sessions/visitor instances are not distinct people or completed UAT sessions. Source documents, filenames and passwords are excluded from its documented event payloads. Read the current [product privacy page](https://unilab.ztvmm.live/#/privacy) and [collector documentation](https://github.com/Thiha-Lynn/unilab-releases/blob/main/analytics/README.md).

Research observations are a separate, consented dataset. Keep coded rows, raw questionnaire responses and permissioned evidence privately, with the study retention/withdrawal process. Publish only reviewed aggregates and appropriately redacted supporting evidence. This does not require uploading participants' documents to UniLab or adding MFU accounts.

Historical legal coursework is preserved as coursework. This report does not certify statutory exemptions or legal enforceability of a drawn signature. The rule-to-LR audit has unresolved mappings and older architecture wording; see [the audit](05-log/20261116-log.md).

## User evidence and remaining completion work

On 16 November the owner confirmed formal results have not yet been collected, although family and student friends have tried the product. The blank repository CSV calculates zero recorded sessions and PENDING; it must never be presented as 30 observations. The current proposal is five members recruiting three distinct eligible MFU students each, for **15 planned participants**. This exceeds the plan's minimum ten, once real completed observations exist.

Use [Run the study](04-test/RUN-STUDY.md) and [the recorder](04-test/session-recorder.html). A repeat participant, invitation, login, download click or automated test is not another completed participant. Retain failed/assisted tasks, missing responses and negative changes. Report sample sizes and the source of every before/after number.

The submitted team's thresholds are >=90% overall unassisted task success, mean SUS >=75 (80.8 stretch), mean TAM PU/PEOU/BI >=4, and no open severity 3–4 defects. These are targets, not observed scores or a lecturer-awarded grade. The handout's general optional-questionnaire language does not automatically remove the team's selected SUS/TAM protocol.

Remaining: actual sessions/consent, observed comparable baselines, physical device records, results and defect retests; P1 case-study outcomes; P2 <=3-minute video plus live demo; P3 evidence log; P4 before/after and measured AI/SDLC impact; five P5 statements. Topic/gate decision and the original scope exceptions remain unconfirmed in the repository. An appearance on the final timetable does not supply that historical receipt.

## History without implied completion

| Period | Recorded work | Evidence limit |
|---|---|---|
| Aug–Sep | Charter, original W2 submission, requirements, backlog and design pack | Current summaries must not rewrite the archived W2 attachment |
| 8 Sep | Repository records 15 discovery interviews and 12 pains | Distinct from UAT and not independently authenticated by this audit |
| 16 Sep onward | Release hardening and separate product repository | Shipped code does not imply course approval |
| 7 Oct | Lecturer's Alpha Demo date | Historical group outcome not verified here; generic refresh/persistence check conflicts with intentional transient file custody and needs an agreed interpretation |
| 27–28 Oct | Test plan/kit and four-task product release | Preparation and synthetic checks, not completed participant sessions |
| 16 Nov | Current audit and fresh 4/4 browser check | Formal study still to be recorded |
| 18 Nov | Scheduled final presentation | Future event; outcome unknown |

Proceed with the [portfolio checklist](06-deliver/README.md). Optional MFU login/recent-tool features are recorded there as a future proposal, not an accepted change to this evaluation scope.
