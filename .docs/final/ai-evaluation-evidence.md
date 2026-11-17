# AI Evaluation Evidence — Documented Limits

## What We CAN Prove (with evidence)

### 1. Regression Proof (Engineering Correction)
- **Before:** Baseline build `45e98702` — ZIP export completes silently with no user feedback
- **After:** PR #9 `fix/final-download-feedback` — persistent save guidance, retry on rejected exports, duplicate-click protection
- **Evidence:** New regression test fails on baseline, passes after correction; 42/42 product tests pass
- **Source:** [PR #9 download-feedback QA doc](https://github.com/Thiha-Lynn/unilab-releases/blob/fix/final-download-feedback/docs/qa/download-feedback-2026-11-17.md)

### 2. Test Coverage Growth (Measured)
| Checkpoint | Node Tests | Python Tests | Total |
|-----------|-----------|--------------|-------|
| W5 Gate (8 Sep) | 17 | 0 | 17 |
| Main branch | 25 | 0 | 25 |
| Final (17 Nov) | 43 | 16 | 59 |

- Growth: +26 Node tests (+153%), +16 Python tests
- All passing in CI: `.github/workflows/uat-metrics.yml`

### 3. Defect Discovery & Resolution (AI-Assisted Audit)
- Pre-audit: D1–D7 defects existed (OCR mismatch, nonexistent server in rule.md, invalid merge diamonds)
- Post-audit: 0 diagram ID mismatches across D1–D4; 3/4 backlog audit checks passing
- ISS-001 through ISS-005: all severity 3 issues fixed and retested

### 4. CLAUDE.md Guardrails (Verifiable)
- No fabricated requirements or interviews (LR7)
- No student PII in AI tools
- Every AI change must pass npm test + npm run build before merge
- Automated quality gates enforce this in CI

## What We CANNOT Prove (honestly documented)

### 1. Model Accuracy Benchmarks
- OCR (Tesseract.js) character error rates on handwritten Thai/Burmese scans: **NOT benchmarked** on a labeled student dataset
- Background removal (ONNX isnet_quint8) segmentation accuracy: **NOT measured** against ground truth
- These would require a labeled evaluation dataset we do not have

### 2. Causal AI Productivity Measurement
- We cannot isolate how many hours AI saved vs manual coding
- Commit timestamps do not reliably measure developer time
- Test-count growth shows quality improvement but does NOT prove AI caused it
- We did not run a controlled experiment (AI vs no-AI)

### 3. AI-Generated Code Proportion
- No line-by-line attribution of AI-generated vs human-written code
- CLAUDE.md establishes review rules but does not measure the ratio

## Presentation Wording (Recommended)

> "AI coding assistants helped us write and audit code faster, but we cannot measure the exact time savings. Our evidence is structural: test coverage grew from 17 to 59 checks, six defects were caught by automated audit, and a new export fix was implemented and regression-tested with AI assistance. We have NOT benchmarked OCR or background-removal model accuracy on student documents."
