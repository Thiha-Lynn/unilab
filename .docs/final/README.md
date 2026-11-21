# UniLab Final Portfolio Index (`.docs/final/`)

**Course:** 1305493 Software Engineering Case Studies · Semester 1/2569 · Dr. Prasara Jakkaew  
**Team:** Company 18 · DIGITAL IMPOSTERS PVT. CO., LTD. (Presentation Slot: **Team 2**, Wed 18 Nov 2026)  
**Product:** **UniLab** — 100% Client-Side Student Document & Media Toolbox  
**Live Product:** [https://unilab.ztvmm.live/](https://unilab.ztvmm.live/) · **Coursework Preview:** [https://thiha-lynn.github.io/unilab/](https://thiha-lynn.github.io/unilab/) · **Product Releases Repo:** [https://github.com/Thiha-Lynn/unilab-releases](https://github.com/Thiha-Lynn/unilab-releases)

> **Evidence & Honesty Policy:** Formal UAT sessions (`U01`–`U15`) have not been collected yet as of 17 Nov 2026. No participant numbers are invented anywhere in this repository. All pre-UAT tests, team-measured synthetic benchmarks (`TEAM-MEASURED`), and external references (`SECONDARY`) are labelled explicitly with their sources and limits.

---

## 1) DISCOVER

| Item | Link | Branch / Location | Status |
|---|---|---|---|
| **Company Charter** | [`.docs/01-requirements/03-charter/charter.html`](../01-requirements/03-charter/charter.html) · [README](../01-requirements/03-charter/README.md) | `main` | Complete |
| **Real-User Discovery Interviews (15 students, `S1`–`S15`)** | [`.docs/01-requirements/02-interviews/results.md`](../01-requirements/02-interviews/results.md) | `main` | 15 of ≥5 completed (22 Aug–8 Sep) |
| **Interview Guide & Instrument (EN/TH/MY)** | [`.docs/01-requirements/02-interviews/interview-guide.md`](../01-requirements/02-interviews/interview-guide.md) · [`ALL-QUESTIONS.md`](../01-requirements/02-interviews/ALL-QUESTIONS.md) | `main` | Complete |
| **Requirements Specification & Traceability** | [`.docs/01-requirements/01-spec/20260826-01-unilab-core.md`](../01-requirements/01-spec/20260826-01-unilab-core.md) · [`TRACEABILITY.md`](../01-requirements/TRACEABILITY.md) | `main` | 12 pains, F1–F15 (F8/F11 parked), NFR1–7, LR1–8 |
| **Product Backlog (MoSCoW, MUST marked)** | [`.docs/01-requirements/backlog.md`](../01-requirements/backlog.md) | `main` | 27 product + 2 parked + 6 process rows |
| **Proposal & Problem Fit** | [`.docs/01-requirements/proposal.md`](../01-requirements/proposal.md) | `main` | Complete |
| **PDPA & Legal Rules (`rule.md`)** | [`rule.md`](../../rule.md) · [W2 original archive](../01-requirements/04-legal/rule-as-submitted-20260819.md) | `main` | Rewritten from Charter; original preserved |
| **AI Team Rules (`CLAUDE.md`)** | [`CLAUDE.md`](../../CLAUDE.md) | `main` | Complete |

## 2) BUILD

| Item | Link | Branch / Location | Status |
|---|---|---|---|
| **Diagrams (D1 Context, D2 Use Case, D3 Architecture, D4 Activity)** | [`.docs/02-design/diagrams.md`](../02-design/diagrams.md) · [`d2-use-case.svg`](../02-design/d2-use-case.svg) | `main` | Complete (rendered & audited) |
| **Feature List, User Journey & Design System** | [`.docs/02-design/feature-list.md`](../02-design/feature-list.md) · [`user-journey.md`](../02-design/user-journey.md) · [`design-system.md`](../02-design/design-system.md) | `main` | Complete |
| **Prototype & Responsive Audit** | [`.docs/02-design/prototype/index.html`](../02-design/prototype/index.html) · [`responsive-audit.md`](../02-design/responsive-audit.md) | `main` | Complete |
| **Source Code (59 client-side tools, v0.2.0 baseline)** | [`src/`](../../src/) · [Companion product repo `unilab-releases`](https://github.com/Thiha-Lynn/unilab-releases) | `main` / `unilab-releases` | Builds clean (`7.41 MB` offline core) |
| **Automated Test Suite (`npm test` — 37 passing tests)** | [`test/`](../../test/) | `main` | 37/37 passing |
| **How to Run & Environment (`README.md`)** | [`README.md`](../../README.md) · [`ops/README.md`](../../ops/README.md) | `main` | No `.env`, no API keys, no login required |
| **No Secrets Verification** | [`test/privacy-network-isolation.test.mjs`](../../test/privacy-network-isolation.test.mjs) | `main` | No `.env` or secret keys committed |

## 3) TEST

| Item | Link | Branch / Location | Status |
|---|---|---|---|
| **Test Plan** | [`.docs/04-test/test-plan.md`](../04-test/test-plan.md) | `main` | Submitted (pinned `1194049`) |
| **UAT Protocol, Questionnaires (SUS + TAM) & Study Guide** | [`.docs/04-test/uat-protocol-and-questionnaire.md`](../04-test/uat-protocol-and-questionnaire.md) · [`READINESS.md`](../04-test/READINESS.md) | `main` | Ready to execute |
| **Automated Metrics Calculator & Python Tests** | [`.docs/04-test/calc-metrics.py`](../04-test/calc-metrics.py) · [`test_metrics.py`](../04-test/test_metrics.py) | `main` | 12/12 Python tests passing |
| **No-Real-User Test Report & Alternative Evidence** | [`test/no-real-user-test.md`](../../test/no-real-user-test.md) | `main` | Complete (team-measured + `SECONDARY` + ready-to-run plan) |
| **Before / After Benchmark Script** | [`scripts/qa-benchmark.mjs`](../../scripts/qa-benchmark.mjs) | `main` | Reproducible synthetic local benchmark |
| **Issue / Defect Log (Severity, Fix Commit, Retest)** | [`.docs/04-test/defect-log.csv`](../04-test/defect-log.csv) | `main` | 8 tracked issues (`ISS-001`–`ISS-008`) |
| **Session Recorder, Study Pack & 4-Workflow Browser Check** | [PR #24 (`audit/final-readiness-20261116`)](https://github.com/Thiha-Lynn/unilab/pull/24) · [`20261116-browser-workflows.json`](https://github.com/Thiha-Lynn/unilab/blob/audit/final-readiness-20261116/.docs/04-test/evidence/20261116-browser-workflows.json) | Branch `audit/final-readiness-20261116` (PR #24) | 4/4 synthetic browser workflows pass |

## 4) DELIVER (`.docs/final/`)

| Item | Link | Branch / Location | Status |
|---|---|---|---|
| **Case Study (Problem, Process, Outcome + Live URL)** | [`.docs/final/case-study.md`](case-study.md) | `main` | Complete |
| **AI Logic (Where, How, Prove, Measure)** | [`.docs/final/ai-logic.md`](ai-logic.md) | `main` | Complete |
| **Before / After Comparison Table** | [`.docs/final/comparison-table.md`](comparison-table.md) | `main` | Complete (every number sourced) |
| **Role Statement — Zaw Win Htut (`6631503101`)** | [`.docs/final/role-statements/6631503101-zaw-win-htut.md`](role-statements/6631503101-zaw-win-htut.md) | `main` | Complete (~200 words + AI disclosure; `## Reflection` due Sun 22 Nov) |
| **Role Statement — Myo Zin Thant (`6631503076`)** | [`.docs/final/role-statements/6631503076-myo-zin-thant.md`](role-statements/6631503076-myo-zin-thant.md) | `main` | Complete (Statement + Reflection complete) |
| **Role Statement — Swan Htut Oakkar Aung (`6631503088`)** | [`.docs/final/role-statements/6631503088-swan-htut-oakkar-aung.md`](role-statements/6631503088-swan-htut-oakkar-aung.md) | `main` | Complete (Statement + Reflection complete) |
| **Role Statements — Other Members** | `.docs/final/role-statements/` | `main` | Pending individual member submissions (`6631503092`, `6631503097`) |

## 5) SUPPORTING PROJECT DOCUMENTS

| Item | Link | Branch / Location | Status |
|---|---|---|---|
| **Comprehensive Project Report** | [`.docs/PROJECT_REPORT.md`](../PROJECT_REPORT.md) | `main` | Up-to-date audit also on `audit/final-readiness-20261116` |
| **H3 Campus Network vs Local Measurement Plan** | [`.docs/01-requirements/02-interviews/h3-measurement.md`](../01-requirements/02-interviews/h3-measurement.md) | `main` | UniLab side measured (0 network exit); competitor Wi-Fi timing open |
| **Session & Gate Audit Logs** | [`.docs/05-log/`](../05-log/) · [6-Slide Deck PDF](../05-log/UniLab-six-slide-presentation.pdf) | `main` | Chronological audit trail |
| **Deployment & Nginx Security Headers** | [`ops/README.md`](../../ops/README.md) · [`deploy.sh`](../../deploy.sh) | `main` | Documented |
