# Alternative Testing & Evidence Report (No Completed Real-User UAT Yet)

**Project:** UniLab (Company 18 · Digital Imposters Pvt. Co., Ltd.)  
**Course:** 1305493 Software Engineering Case Studies · Semester 1/2569  
**Prepared by:** Zaw Win Htut (6631503101), QA / Test Lead  
**Last updated:** 17 November 2026

---

## 1. Why Formal Real-User UAT Sessions Are Not Recorded Yet

- **Discovery interviews (`S1`–`S15`) are complete, but post-build UAT is separate:** Fifteen MFU undergraduate discovery interviews were conducted between 22 August and 8 September 2026 (`.docs/01-requirements/02-interviews/results.md`), producing 12 validated pains (`P1`–`P12`). Those discovery interviews cannot be substituted for post-build usability testing.
- **Formal UAT execution status:** As recorded in `.docs/04-test/READINESS.md` and `.docs/05-log/20261116-log.md`, the team's formal 10–15 student UAT sessions (`U01`–`U15`) with timed baseline comparisons, SUS, and TAM questionnaires have not yet been collected and merged. Informal trials by friends/family were not logged under stopwatch protocol and are **not** fabricated into retrospective `U01`–`U15` numbers.
- **No invented numbers:** Per course policy, `.docs/04-test/uat-scorecard-template.csv` remains unpopulated (`0` completed sessions, `PENDING` in `calc-metrics.py`) rather than presenting synthetic or placeholder entries as real users.

---

## 2. What We Tested Instead (Executable & Verifiable Evidence)

### 2.1 Automated Unit & Integration Test Suite (`npm test`) — Team-Owned Code Tests
All 37 automated tests in `test/*.test.mjs` run on every push/PR via `.github/workflows/deploy.yml`:

| Test File | Tests | Requirements / Claims Verified | Source |
|---|---:|---|---|
| `test/vault-deletion.test.mjs` | 6 | **LR5 / F6 / NFR2:** `resolveObjectURL` proves bytes become unreachable after purge/countdown/tab-reset, not merely hidden by a flag | `src/vault.js` |
| `test/intake-screening.test.mjs` | 8 | **LR1 / PDPA §8:** Drag-and-drop & picker intake screening rejects unsupported MIME types and oversized files without retaining references | `src/intake.js` |
| `test/grapheme-counting.test.mjs` | 3 | **NFR7 / P12:** 23 adversarial Thai, Burmese & emoji fixtures pass with 0 miscounts via `Intl.Segmenter` | `src/tools/word-counter.js` |
| `test/redaction-output.test.mjs` | 1 | **LR6 / F7:** Renders redacted PDF and extracts text/pixels/metadata to confirm sensitive text is genuinely absent | `src/redaction.js` |
| `test/html-document.test.mjs` | 5 | **CR1:** Lecture HTML sanitization strips scripts, forms, and remote asset URLs while retaining slides/SVGs | `src/html-document.js` |
| `test/build-manifest.test.mjs` | 1 | **NFR3 / B9:** Enforces the 8,000,000-byte offline core precache ceiling and excludes the 23 MB ONNX runtime | `scripts/build-manifest.js` |
| `test/social-metadata.test.mjs` | 1 | Social OG/Twitter preview metadata and image dimensions match `index.html` | `index.html` |
| `test/privacy-network-isolation.test.mjs` | 4 | **B11 / NFR1 / LR1 / LR3 / LR4 / LR8:** Static scan of all 60+ files in `src/` confirms 0 upload sinks (`XHR`, `sendBeacon`, `WebSocket`, `FormData`, `POST fetch`); `log.js` stays silent in production; `privacy.js` matches live `vault.js` & `intake.js` constants; `ocr-pdf.js` ships 19 languages; `remove-background.js` gates model download behind dynamic `import()` | `src/log.js`, `src/privacy.js`, `src/tools/ocr-pdf.js`, `src/tools/remove-background.js` |
| `test/registry-and-ops.test.mjs` | 4 | **Core Workflow / T2 & T4:** All 59 registry tools map to existing modules; `ops.js` validates valid/invalid chains; `parsePageRanges()` & local `pdf-lib` merge/extract execute with `0` `fetch` calls | `src/registry.js`, `src/ops.js`, `src/pdf-utils.js` |
| `test/ui-and-converters.test.mjs` | 4 | **UI Helpers & Offline Tools:** `formatBytes`, `stem`, `fileListView` reorder/remove, `unit-converter` (including Thai `rai`), and `word-counter` DOM state | `src/ui.js`, `src/tools/unit-converter.js`, `src/tools/word-counter.js` |

### 2.2 UAT Calculator & Session Merger Tests (`python3 -m unittest`)
- **12/12 tests pass** in `.docs/04-test/test_metrics.py` (enforced on CI via `.github/workflows/uat-metrics.yml`), validating SUS scoring, TAM construct averaging, paired Before/After comparison exclusion for recalled/missing baselines, duplicate rejection, and zero-placeholder safeguards.
- Production Vite build (`npm run build`) verified **92 precached core files at 7.41 MB** (within the 8 MB offline budget).

### 2.3 Team-Measured Core Task Performance (Synthetic Fixtures)
Measured directly on the codebase (`node scripts/qa-benchmark.mjs` on Node v24.22.0, darwin/arm64, 17 Nov 2026) and in the companion product repo browser verification (`20261116-browser-workflows.json` on branch `audit/final-readiness-20261116`):

| Task / Check | Team-Measured Result (`TEAM-MEASURED`) | Network Upload | What It Proves & Limitation |
|---|---|---:|---|
| **T1 Slides cleanup + grayscale + <=5 MB** *(companion `unilab-releases` browser check)* | 6-page synthetic deck produced **671,783 bytes** (<= 5,000,000 limit); grayscale pixels & page-3 orientation verified (`4/4` browser check on Chrome 157) | 0 bytes | Proves functional execution on synthetic padded fixture; does **not** prove human discoverability or physical phone speed |
| **T2 Mixed 3-document PDF assembly** | Core `pdf-lib` ordered merge completed in **34.9 ms** (`607 B` synthetic output); `3/3` pages decoded in browser check | 0 bytes | Proves ordered local PDF assembly; does **not** measure student drag/reorder hesitation time |
| **T3 Sign + password protection** *(companion `unilab-releases` browser check)* | Drawn signature exported; missing/wrong passwords rejected; correct password (`UniLabSecure2026`) opens page | 0 bytes | Proves password protection works in Chromium; does **not** replace human usability testing |
| **T4 Single-page extract (Page 42 of 120)** | `265.8 ms` local execution (`25,586 B` -> `863 B`, exact page 42 verified) | 0 bytes | Proves fast single-page slicing without upload; excludes file-picker browsing time |
| **F7 / LR6 Permanent PDF redaction** | `116.3 ms`; extracted text and pixel check confirm removed ID string is absent | 0 bytes | Proves redaction removes underlying text rather than drawing an overlay |
| **F6 / LR5 Vault store + purge** | `0.89 ms`; object URL reachable before purge, `0` items and unreachable after | 0 bytes | Proves deterministic local cleanup |

### 2.4 Heuristic Review (Nielsen's Heuristics — Team Review)
- **Visibility of system status:** Progress bars (`ui.js` `progressBar()`), live file-fact summaries (`split-pdf.js`, `merge-pdf.js`), and explicit vault countdown (`vault.js`, 30 min / 10 min signing) keep state visible.
- **Error prevention & recovery:** `intake.js` rejects invalid formats/sizes on both file-picker and drag-drop paths with explicit filenames on-screen while `log.js` keeps filenames out of the production console.
- **Known heuristic/mobile gaps logged:** Real physical handset profiling (iOS Safari / Android Chrome memory limits on 60 s media jobs — B33, B34, B35) remains open in `.docs/04-test/defect-log.csv`.

### 2.5 Secondary Evidence (`SECONDARY`)
- **SECONDARY — Competitor free-tier & upload constraints:**
  - *Source:* [iLovePDF Pricing / Features](https://www.ilovepdf.com/pricing) and [iLovePDF Privacy Policy](https://www.ilovepdf.com/help/privacy) (referenced in UniLab's 22 Aug teardown and `.docs/01-requirements/01-spec/20260826-01-unilab-core.md` §1.3 H9 / §6).
  - *What it proves:* Server-hosted converters require uploading user documents to remote servers, retain files on server storage for a retention window, and gate batch/workflow features behind paid tiers or daily task limits.
  - *What it does NOT prove:* It does not establish UniLab's own SUS score, TAM acceptance scores, or real student task-completion times on campus Wi-Fi.
- **SECONDARY — Industry SUS Benchmark (68.0):**
  - *Source:* Brooke, J. (1996) / Sauro, J. (2011), *A Practical Guide to the System Usability Scale* ([MeasuringU](https://measuringu.com/sus/)), used as the reference threshold in `.docs/04-test/test-plan.md` §5.2 (`68.0` average; team exit target `>= 75.0`).
  - *What it proves:* Establishes the external interpretation scale once SUS responses are collected.
  - *What it does NOT prove:* UniLab's actual SUS score, which remains `PENDING` until real sessions run.

---

## 3. Ready-to-Run Plan for Real Users (`U01`–`U15`)

The complete field-testing kit is already prepared and verified in `.docs/04-test/`:
1. **Protocol & Instruments:** `.docs/04-test/test-plan.md` and `.docs/04-test/uat-protocol-and-questionnaire.md` (PDPA notice, 4 task cards, 10-item SUS, 11-item TAM `PU4/PEOU4/BI3`, 3 debrief questions).
2. **Execution Guide:** `.docs/04-test/RUN-STUDY.md` (15-student recruitment allocation: `U01`–`U03` Myo, `U04`–`U06` Swan, `U07`–`U09` Thiha, `U10`–`U12` Wanna, `U13`–`U15` Zaw).
3. **Offline/Private Capture & Automated Scoring:** `.docs/04-test/session-recorder.html` (on `audit/final-readiness-20261116`) + `.docs/04-test/uat-scorecard-template.csv` + `python3 .docs/04-test/calc-metrics.py` (tested by `test_metrics.py`).
4. **Exit Criteria:** `>= 10` distinct eligible MFU non-classmate participants, `>= 90%` unassisted task success, mean SUS `>= 75.0`, mean TAM `>= 4.0/5.0`, and `0` open Severity 3–4 defects.
