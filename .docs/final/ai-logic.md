> **17 November verification limit:** Test-count growth is an engineering output, not measured causal AI impact. No matched manual-versus-AI baseline has been supplied. Model accuracy/bias evaluation is also incomplete. Present these gaps explicitly; do not label the AI impact requirement fully passed. Current tests/logs are linked from the final readiness report.

# AI Logic & AI-Assisted SDLC Evidence

**Project:** UniLab (Company 18 · Digital Imposters Pvt. Co., Ltd.)  
**Covers:** (A) On-device AI features shipped inside UniLab, and (B) AI-assisted engineering workflow (`CLAUDE.md` + `.claude/`).

---

## Part A — On-Device AI Features in UniLab

### 1. Where AI Is Used
UniLab deliberately avoids cloud/LLM APIs that would send student documents off-device (`rule.md` PDPA rule 17). Two client-side ML tools run 100% locally in the browser:
1. **OCR PDF (`src/tools/ocr-pdf.js`):** `tesseract.js` WASM engine supporting **19 languages** (`tha`, `eng`, `mya`, `chi_sim`, `chi_tra`, `jpn`, `kor`, `lao`, `khm`, `vie`, `msa`, `ind`, `hin`, `ara`, `rus`, `fra`, `deu`, `spa`, `por`). *(Note: Requirement `F8` is parked in the course backlog because 0/15 discovery interviewees requested OCR, while the code remains shipped and tested.)*
2. **Remove Background (`src/tools/remove-background.js`):** `@imgly/background-removal` (`isnet_quint8` quantized ONNX segmentation model).

### 2. How It Was Built (Pipeline & Safeguards)
- **Zero-upload privacy boundary (`LR1`, `LR3`):** Both tools fetch **only** model weights/WASM from a public CDN on first use, never user files.
- **Explicit pre-download disclosure (`NFR5`, `B14`):** `remove-background.js` keeps `@imgly/background-removal` behind a dynamic `import()` and states the exact download size (`44.3 MB` model + `11.8 MB` CPU / `23.1 MB` WebGPU runtime) on the gate button before starting. `ocr-pdf.js` states ~5 MB engine + 10–15 MB per language before starting.
- **Script bias & fallback handling (`rule.md` AI Accountability):** Because `pdf-lib` built-in Helvetica (WinAnsi) cannot embed non-Latin glyphs (Thai, Burmese, CJK, Arabic) without bundling tens of megabytes of fonts, `ocr-pdf.js` warns the user in the sidebar before running and automatically exports a companion UTF-8 `.txt` file beside the searchable PDF so non-Latin words are not silently dropped.

### 3. Prove & Measure
| Verification Check | What It Proves | Evidence |
|---|---|---|
| `test/privacy-network-isolation.test.mjs` | Verifies `ocr-pdf.js` declares all 19 languages + size disclosure; verifies `remove-background.js` has no static ONNX import and discloses `44,348,940` model bytes before download | [`test/privacy-network-isolation.test.mjs`](../../test/privacy-network-isolation.test.mjs) |
| `test/build-manifest.test.mjs` & `npm run build` | Proves the `23.9 MB` ONNX WASM runtime is excluded from the offline precache (`7.41 MB` core <= `8 MB` limit) | [`scripts/build-manifest.js`](../../scripts/build-manifest.js) |
| **Limitation (honest gap):** | Real-world OCR character error rates across handwritten Thai/Burmese scans and segmentation edge accuracy have **not** been benchmarked on a labelled student dataset yet. | Disclosed in `rule.md` & here |

---

## Part B — AI-Assisted SDLC Workflow

### 1. Where AI Was Used
Per [`CLAUDE.md`](../../CLAUDE.md), AI coding agents (Claude / Codex / Antigravity) assisted with:
- Drafting test fixtures, unit/integration test suites (`test/*.test.mjs`), and UAT tooling (`calc-metrics.py`, `session-recorder.html`),
- Auditing requirements-to-backlog traceability via structured project skills/subagents (`.claude/skills/audit-backlog`, `.claude/skills/capture-requirement`, `.claude/agents/diagram-checker.md`),
- Refactoring and UI token/layout updates under human review (`rule.md` & `CLAUDE.md` guardrails).

### 2. How It Was Controlled (Human-in-the-Loop Guardrails)
- **Strict evidence rule:** `CLAUDE.md` forbids guessing requirements or fabricating interviews (`LR7`: no student names, IDs, or transcripts pasted into AI tools).
- **Automated quality gates:** Every AI-assisted change must pass `npm test` (Node test suite), `npm run build` (Vite + 8 MB precache budget check), and `python3 -m unittest` (`.github/workflows/uat-metrics.yml`) before merging.

### 3. Prove & Measure (Observed SDLC Audit Metrics)
Rather than inventing "hours saved" from commit timestamps, we report directly measured verification checks from the repository:
- **Traceability & diagram audits (`.docs/05-log/20260908-log.md`, `20261116-log.md`):**
  - Before automated checks: `D1`–`D7` defects existed (e.g., `D2` OCR language mismatch across 3 files, `D3` `rule.md` describing a nonexistent server, `D4` invalid merge diamonds in Activity diagram).
  - After human-reviewed skill/audit runs: `0` diagram ID mismatches across `D1`–`D4`, `3/4` backlog audit checks passing (with `1` legal-coverage gap transparently left open for human decision rather than hidden).
- **Automated regression coverage:** Expanded from `17` unit tests (8 Sep gate) → `25` tests (`main`) → **`43` Node tests + `16` Python tests** (`17 Nov 2026`), all passing in CI.
- **What this does NOT prove:** Automated test count is a quality-gate improvement, **not** a controlled time-savings experiment comparing manual vs. AI-assisted coding speed (`READINESS.md`).
