# UniLab — Case Study

**Live Product:** [https://unilab.ztvmm.live/](https://unilab.ztvmm.live/)  
**Coursework Preview:** [https://thiha-lynn.github.io/unilab/](https://thiha-lynn.github.io/unilab/)  
**Coursework Repo:** [https://github.com/Thiha-Lynn/unilab](https://github.com/Thiha-Lynn/unilab)  
**Product Repo (v0.3.0+):** [https://github.com/Thiha-Lynn/unilab-releases](https://github.com/Thiha-Lynn/unilab-releases)

---

## 1. Problem

Mae Fah Luang University (MFU) undergraduates routinely submit academic PDFs, scans, images, and recordings under strict LMS size caps, file-format rules (e.g., HEIC rejected by forms), and urgent deadlines. Between **22 August and 8 September 2026**, the team interviewed **15 MFU undergraduates across 15 programmes** ([`.docs/01-requirements/02-interviews/results.md`](../01-requirements/02-interviews/results.md)) and identified **12 distinct pains (`P1`–`P12`)**:
- **Quota & paywall friction (`P1`):** Free online converters ration batch exports, add watermarks, or fail near deadlines (`S1`, `S3`, `S9`, `S13`).
- **Document custody risk (`P2`):** Students upload sensitive ID cards, medical certificates, transcripts, and signed forms to third-party servers without verifiable deletion (`S4`, `S7`, `S12`, `S14`).
- **Upload wait & failure (`P3`):** Large uploads stall or restart from zero on dorm/campus Wi-Fi (`S2`, `S9`, `S10`).
- **Late error discovery (`P7`, 7 of 15 — largest pain):** Students discover caps, wrong merge order (`P8`), or wrong formats only after exporting or submitting.
- **Mobile-first constraint (`P10`, 6 of 15; 5 phone-only):** Switching between phones, chat apps (`P9`), and laptops causes quality loss and lost files.

## 2. Process

1. **Discover & Compliance First:** Defined a single core workflow (**Select a file → Transform on this device → Download the result**), rewrote `rule.md` around **architectural compliance** (dissolving server-upload duties under PDPA & CCA §26 because no file is ever transmitted), and traced every requirement `Pain → Requirement → Backlog` in [`TRACEABILITY.md`](../01-requirements/TRACEABILITY.md).
2. **Design & Scope Discipline:** Created D1–D4 diagrams ([`diagrams.md`](../02-design/diagrams.md)), design tokens ([`design-system.md`](../02-design/design-system.md)), mobile/desktop prototypes, and **parked** two unvalidated features (`F8` OCR and `F11` saved Workflows) when 0 of 15 discovery participants requested them.
3. **Build & Optimize:** Shipped 59 browser-local tools (`pdf-lib`, `pdf.js`, `mediabunny` WebCodecs, `browser-image-compression`, `heic2any`, `dompurify`) with an in-memory vault (`src/vault.js`, automatic countdown + "Clear files from memory" + `pagehide` purge), drag-and-drop file screening (`src/intake.js`), and reduced the offline precache from **31 MB** to **7.41 MB** (<= 8 MB target, `B9`) by lazy-loading the 23 MB ONNX runtime on demand.
4. **Verify & Test:** Built automated unit/integration tests (`npm test`: **37/37 passing**) proving vault URL revocation, intake screening, permanent PDF redaction, Thai/Burmese grapheme counting, zero-upload static/runtime isolation, and 59-tool registry integrity, alongside Python UAT scoring checks (`12/12` passing) and 4/4 synthetic browser workflow checks on `unilab-releases`.

## 3. Outcome & Honest Status

- **Working, deployed product:** Live at [https://unilab.ztvmm.live/](https://unilab.ztvmm.live/) with all four focus UAT workflows operational (slide cleanup/compression, mixed PDF/JPG/PNG assembly, signing with QPDF password protection, single-page textbook extraction) and verified on synthetic fixtures.
- **Measured engineering outcomes:** `0 bytes` of user file payload uploaded (`test/privacy-network-isolation.test.mjs`, `test/registry-and-ops.test.mjs`); offline core reduced from `31 MB` to `7.41 MB` (`npm run build`); `37/37` JS tests and `12/12` Python UAT metric tests passing.
- **Remaining validation gap (explicitly disclosed):** Formal post-build real-user UAT (`U01`–`U15` SUS/TAM and real student timing comparisons) has not yet been collected as of 17 November 2026 (`test/no-real-user-test.md`). Physical handset 60-second media profiling (`ISS-007`) and full 59-tool live browser sweeps (`ISS-006`) remain open in [`.docs/04-test/defect-log.csv`](../04-test/defect-log.csv).
