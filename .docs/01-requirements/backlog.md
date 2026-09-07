# Product backlog — UniLab

**Course:** 1305493 Software Engineering Case Studies · 1/2569
**Company:** DIGITAL IMPOSTERS PVT. CO., LTD. · **Product:** UniLab
**Last updated:** 2 Sep 2026 (W4) · **Owner:** Thiha Lin, Tech Lead
**Spec:** [`.docs/01-requirements/01-spec/20260826-01-unilab-core.md`](01-spec/20260826-01-unilab-core.md)

---

## ⚠ Read first — the state of the traceability chain

The chain this backlog is graded on is **pain → requirement → backlog item**.

Today every row's `Traces to` ends at an **`H#` (hypothesis)**, not a **`P#` (a pain a real user
described)**, because **0 interviews have been conducted**. Each `H#` cites a real artefact — a
competitor teardown, a platform constraint, a measurement of this build — but an artefact is not
a user.

> **No row in this backlog is fully traced until §6 of the spec is executed.**
> **B16 is therefore the row that unblocks every other row's provenance.**

---

## Gate blockers — must be closed before 8 Sep 2026, 23:59

| ID | Why it blocks the gate |
|---|---|
| **B16** | Gate requires **≥5 real users interviewed**. Currently **0**. Without it, no requirement traces to a pain and the chain fails on its own terms. |
| **B17** | UniLab does not appear on the assigned topic list (19 Aug slide). If it was never approved as this team's own topic, everything else is moot. |
| ~~**B12**~~ | ~~`rule.md` binds the company to a server-upload, ad-funded architecture the product does not have~~ — **closed 6 Sep 2026**: rewritten against the Charter's product; class draft preserved at `04-legal/rule-as-submitted-20260819.md`. |
| ~~**B13**~~ | ~~Uncommitted work~~ — **closed 2 Sep 2026**: `CLAUDE.md`, `rule.md`, `.claude/`, `.docs/` and the modified source files are pushed. |

---

## Backlog

| ID | Item | Priority | Traces to | Status |
|---|---|---|---|---|
| **B1** | Select a file and transform it entirely on-device; no upload path exists anywhere in the codebase | Must | F1, LR1, H2 | ✅ Done — all 58 tools |
| **B2** | No account, sign-in, email, or task-per-day limit on any tool | Must | F2, LR2, H1 | ✅ Done — no auth code exists |
| **B3** | Compress image and PDF to a **user-named target size**, not a vague quality slider | Must | F3, H5 | ✅ Done — `compress-image.js`, `compress-pdf.js` |
| **B4** | HEIC → JPG conversion | Must | F4, H4 | ✅ Done — `heic-to-jpg.js` |
| **B5** | Live preview of the result before the user commits (three-stage shell: uploader → work → downloader) | Must | F5, H1, H5 | ✅ Done — `tool-shell.js`; reference impl `split-pdf.js` |
| **B6** | Results held in memory only, with a visible countdown, a "delete now" button, and purge on tab close | Must | F6, LR5, H2 | ✅ Done — `vault.js`, 30 min TTL, `pagehide` purge |
| **B7** | Redact and blur so removed content is genuinely absent from the output file, not overlaid | Must | F7, LR6, H2 | ⚠️ Built (`redact-pdf.js`, `blur-face.js`) — **unverified**, see B15 |
| **B8** | OCR a scan into a searchable PDF in Thai, English and Burmese | Must | F8, H6 | ✅ Done — `ocr-pdf.js`, `LANGS = tha/eng/mya` |
| **B9** | Cut the offline precache from **31 MB to ≤ 8 MB** by fetching the 23 MB ONNX runtime on demand instead of precaching it | Must | NFR3, D1, H3 | 🔴 To do — **blocked on Q1** |
| **B10** | Fix the OCR tool description: `registry.js` says "English and Thai", `README.md` says "Thai + Burmese", the code ships all three. Make all three agree | Should | F14, D2, H6 | 🔴 To do — one-line fix, hides Burmese support from the users who need it |
| **B11** | Write the test that proves NFR1: run all 58 tools against sample files, assert **0 bytes of file content** in any request body | Must | NFR1, LR1, D5 | 🔴 To do — **the product's central claim has never been tested** |
| **B12** | Rewrite `rule.md` as *"architecture as compliance — the requirements this design removes"*; keep LR1–LR7, record the dissolved duties and why (§4.1) rather than deleting them | Must | LR4, D3 | ✅ Done — 6 Sep 2026. W2 shape kept (3 laws, direct commands); "duties this architecture removes" table added; class draft archived |
| **B13** | Commit and push `CLAUDE.md`, `rule.md`, `.claude/`, `.docs/` and the untracked/modified source files | Must | D4 | ✅ Done — 2 Sep 2026 |
| **B14** | Verify Remove Background discloses its model download before it starts, as OCR already does | Must | F12, LR3 | ⚠️ Unverified |
| **B15** | QA test for B7: extract text from a redacted PDF and assert the redacted string is absent | Must | LR6, F7 | 🔴 To do |
| **B16** | Interview **≥5 real students** (target ≥15), recording role / pain / quote only per LR7; convert each `H#` to a `P#` and re-point every requirement | Must | §6, LR7 | 🔴 **0 of 5. Gate blocker.** Instruments ready — `02-interviews/field-kit.md` (where to go, what to say, the 6 questions), `results.md` (empty log), `/capture-requirement`. Only the conversations are missing |
| **B17** | Confirm with Dr. Prasara that UniLab is an approved case-study topic (not on the 19 Aug assigned list) | Must | Q4 | 🔴 **Gate blocker.** Request drafted at `05-approvals/topic-approval-request.md` with the guardrail-by-guardrail case and a fallback plan — **not sent**; Product Owner to send |
| **B18** | Video and audio tools in the same place as document tools (18 shipped) | Should | F9, H7 | ✅ Done |
| **B19** | Merge PDFs with per-file page ranges and an optional contents page | Should | F10, H8 | ✅ Done — `merge-pdf.js` |
| **B20** | Save a multi-step chore as a named workflow and batch files through it | Should | F11, H8 | ✅ Done — `ops.js` (13 ops) + `workflows.js` |
| **B21** | Installable PWA that works with no connection | Could | F13, H3 | ⚠️ Built — **unusable until B9** |
| **B22** | Design deliverables for the gate: feature list, user journey, design system, prototype, and all 4 diagrams under `.docs/02-design/` | Must | Gate criterion 3 | ✅ Done — W4, 2 Sep. All 4 diagrams render; `diagram-checker` C1–C7 clean |
| **B23** | Updated proposal: problem statement + target users | Must | Gate criterion 1 | 🔴 To do |
| **B24** | Draw the **desktop** two-pane work stage in the prototype — only the 480 px phone layout exists | Should | F5, D3 | 🔴 To do — W5 addition |
| **B25** | Re-run `/audit-backlog` and `diagram-checker` immediately before the gate submission and paste both reports into `.docs/05-log/` | Must | Gate criterion 3 | 🔴 To do |
| **B26** | Test that proves LR5: store results, purge, then resolve the object URL to show the bytes are unreachable — not merely unlisted | Must | LR5, NFR2 | ✅ Done — `test/vault-deletion.test.mjs`, 6 tests |
| **B27** | Enforce type and size limits on **every** intake path; `accept` filters only the OS picker, so a dragged file bypassed it entirely | Must | LR1, `rule.md` PDPA 8 | ✅ Done — `src/intake.js` + `test/intake-screening.test.mjs`, 8 tests |
| **B28** | Guarantee EXIF/GPS removal on the one image path that could pass the original file through unchanged | Must | LR6, `rule.md` PDPA 7 | ✅ Done — `compress-image.js` states `preserveExif:false` and re-encodes if the library returns the input |
| **B29** | State the retention window as a number beside the control, before the file is committed — not only as a countdown met afterwards | Must | LR5, `rule.md` PDPA 11 | ✅ Done — `tool-shell.js` uploader |
| **B30** | Keep filenames out of the production console; error messages name the file on screen, and those strings were reaching `console.error` | Must | `rule.md` PDPA 6 | ✅ Done — `src/log.js`; absence verified in the built bundle |
| **B31** | Ship the privacy page required by `rule.md` PDPA 25: what is processed, where, what is held and for how long, what is fetched and why, how to erase | Must | LR4, `rule.md` PDPA 25 | ✅ Done — `src/privacy.js` at `#/privacy`; retention and size read from code so the page cannot drift from the enforcement |
| **B32** | Fixture test for NFR7: ≥20 Thai / Burmese / emoji strings where a code-point count differs, asserting 0 miscounts | Must | NFR7 | ✅ Done — `test/grapheme-counting.test.mjs`, 23 fixtures. Writing it corrected the NFR: UAX #29 gives a *spacing* vowel its own cluster, so a cluster is **not** a reader's syllable |
| **B33** | Measure NFR6 rather than infer it: Performance-panel long-task count over a 60 s job, and progress timestamps from a hidden tab | Must | NFR6 | 🔴 To do — the yielding is implemented and code-reviewed, but the 50 ms / 1-per-second thresholds have not been profiled |

---

## Summary

| | Count |
|---|---|
| ✅ Done | 18 |
| ⚠️ Built but unverified | 3 |
| 🔴 To do | 13 |
| **Gate blockers open** | **2** (B16, B17) — B13 closed by the W4 push, B12 by the 6 Sep `rule.md` rewrite |

**The product is far ahead of its evidence.** Sixteen Must-level rows now ship, and the design
pack is complete. The compliance rewrite (B12) is done, and with it the five conformance gaps it
exposed (B26–B30). The two remaining gate blockers are both about *proving* the work rather than
doing it — the interviews and the topic approval. **Neither of them is code**, and no amount of
building will close them.

---

## Audit

Run `/audit-backlog` before any commit touching `.docs/` and before the gate submission. It will
correctly report that **every row's provenance ends at an `H#`, not a `P#`** — that is not a
false positive, it is B16.
