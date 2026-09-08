# Product backlog — UniLab

**Course:** 1305493 Software Engineering Case Studies · 1/2569
**Company:** DIGITAL IMPOSTERS PVT. CO., LTD. · **Product:** UniLab
**Last updated:** 8 Sep 2026 (evidence pass — 15 interviews captured; F8/F11 parked) · **Owner:** Thiha Lin, Tech Lead
**Spec:** [`.docs/01-requirements/01-spec/20260826-01-unilab-core.md`](01-spec/20260826-01-unilab-core.md)

---

## ⚠ Read first — the state of the traceability chain

The chain this backlog is graded on is **pain → requirement → backlog item**.

Until 8 Sep every row's `Traces to` ended at an **`H#` (hypothesis)** because **0 interviews had
been conducted**, and this header said so. **Fifteen interviews were captured on 8 Sep 2026**
through `/capture-requirement` ([`02-interviews/results.md`](02-interviews/results.md)), and the
backlog now holds three tables with one rule each:

| Table | Rule | Rows |
|---|---|---|
| **Backlog** (product) | every row cites a requirement id **and** the `P#` behind it | **27** — all traced |
| **Parked** | built, but the hypothesis behind it was raised by **0 of 15** — out of the product table, ids kept, code untouched | **2** — B8 (OCR), B20 (Workflows) |
| **Gate deliverables** (process) | exists because the course asks for it, cites the rubric | **6** — B13, B16, B17, B22, B23, B25 |

> **B16 is closed.** The two parked rows are not a gap in the evidence — they *are* the evidence:
> two shipped features that no interviewee asked for. Re-admitting or cutting them is a team
> decision recorded in the log (spec Q5, Q6), not an edit an agent makes.

---

## Gate blockers — must be closed before 8 Sep 2026, 23:59

| ID | Why it blocks the gate |
|---|---|
| ~~**B16**~~ | ~~Gate requires **≥5 real users interviewed**. Currently **0**.~~ — **closed 8 Sep 2026: 15 of 5** (target 15 met). 12 pains recorded; 6 hypotheses promoted; every requirement re-pointed. |
| **B17** | UniLab does not appear on the assigned topic list (19 Aug slide). If it was never approved as this team's own topic, everything else is moot. **Still open** — the request is written and needs sending. |
| ~~**B12**~~ | ~~`rule.md` binds the company to a server-upload, ad-funded architecture the product does not have~~ — **closed 6 Sep 2026**: rewritten against the Charter's product; class draft preserved at `04-legal/rule-as-submitted-20260819.md`. |
| ~~**B13**~~ | ~~Uncommitted work~~ — **closed 2 Sep 2026**: `CLAUDE.md`, `rule.md`, `.claude/`, `.docs/` and the modified source files are pushed. |

---

## Backlog

| ID | Item | Priority | Traces to | Status |
|---|---|---|---|---|
| **B1** | Select a file and transform it entirely on-device; no upload path exists anywhere in the codebase | Must | F1, LR1, P2 | ✅ Done — all 58 tools |
| **B2** | No account, sign-in, email, or task-per-day limit on any tool | Must | F2, LR2, P1 | ✅ Done — no auth code exists |
| **B3** | Compress image and PDF to a **user-named target size**, not a vague quality slider | Must | F3, P5 | ✅ Done — `compress-image.js`, `compress-pdf.js`. **P5 caveat (S2, S10, S15):** the student usually does *not* know the number; the target-size mode helps only once the cap is known |
| **B4** | HEIC → JPG conversion | Must | F4, P4 | ✅ Done — `heic-to-jpg.js`. S13 converted one file at a time because batch was paid — the batch mode is the answer |
| **B5** | Live preview of the result before the user commits (three-stage shell: uploader → work → downloader) | Must | F5, P7, P1, P5 | ✅ Done — `tool-shell.js`; reference impl `split-pdf.js`. **P7 is the largest pain in the sample (7 of 15)** and this row is its answer. S10 asks for a *quality* look, not only a size estimate — verify every compress tool shows one |
| **B6** | Results held in memory only, with a visible countdown, a "delete now" button, and purge on tab close | Must | F6, LR5, P2 | ✅ Done — `vault.js`, 30 min TTL, `pagehide` purge |
| **B7** | Redact and blur so removed content is genuinely absent from the output file, not overlaid | Must | F7, LR6, P2 | ⚠️ Built (`redact-pdf.js`, `blur-face.js`) — **unverified**, see B15. No participant asked for redaction; the row is carried by LR6 |
| **B9** | Cut the offline precache from **31 MB to ≤ 8 MB** by fetching the 23 MB ONNX runtime on demand instead of precaching it | Must | NFR3, D1, P3 | 🔴 To do — **blocked on Q1** |
| **B10** | Fix the OCR tool description: `registry.js` said "English and Thai", `README.md` said "Thai + Burmese", the code ships all three. Make all three agree | Should | F14, D2, P7 | ✅ Done — 8 Sep 2026. The 7 Sep attempt propagated the error rather than fixing it: it set every description to *Thai, English and Burmese* because **the spec itself misdescribed the code**. `LANGS` holds **19 languages**. `registry.js` and `README.md` now say 19, matching the code |
| **B11** | Write the test that proves NFR1: run all 58 tools against sample files, assert **0 bytes of file content** in any request body | Must | NFR1, LR1, D5, P2 | 🔴 To do — **the product's central claim has never been tested** |
| **B12** | Rewrite `rule.md` as *"architecture as compliance — the requirements this design removes"*; keep LR1–LR7, record the dissolved duties and why (§4.1) rather than deleting them | Must | LR4, D3, P2 | ✅ Done — 6 Sep 2026. W2 shape kept (3 laws, direct commands); "duties this architecture removes" table added; class draft archived |
| **B14** | Verify Remove Background discloses its model download before it starts, as OCR already does | Must | F12, LR3, NFR5, P2 | ✅ Done — 7 Sep 2026. `remove-background.js` `modelGate()` downloads nothing on open and gates the model behind a button naming the size; NFR5 is now 2 of 2 tools disclosing |
| **B15** | QA test for B7: extract text from a redacted PDF and assert the redacted string is absent | Must | LR6, F7, P2 | 🔴 To do |
| **B18** | Video and audio tools in the same place as document tools (18 shipped) | Should | F9, P6 | ✅ Done. S2 and S10 did video with OBS/HandBrake/CapCut, S9 did audio with an online converter that capped at 50 MB — none of them in a document tool |
| **B19** | Merge PDFs with per-file page ranges, a visible page order checked before committing, and an optional contents page | Should | F10, P8 | ✅ Done — `merge-pdf.js`. **Re-pointed 8 Sep** from H8 to P8 (S8, S14: wrong order, noticed after submitting). Verify the order preview is visible before the run — that is the pain |
| **B21** | Installable PWA that works with no connection | Could | F13, P3 | ⚠️ Built — **unusable until B9** |
| **B24** | Draw the **desktop** two-pane work stage in the prototype — only the 480 px phone layout existed | Must | F5, D6, P7 | ✅ Done — 7 Sep 2026. **S2-D** in `prototype/index.html`: preview left, 320 px option pane right, one primary action still pinned to the foot. No new component and no colour outside the token block; verified in-browser at 1200 px and at the 960 px collapse |
| **B26** | Test that proves LR5: store results, purge, then resolve the object URL to show the bytes are unreachable — not merely unlisted | Must | LR5, NFR2, P2 | ✅ Done — `test/vault-deletion.test.mjs`, 6 tests |
| **B27** | Enforce type and size limits on **every** intake path; `accept` filters only the OS picker, so a dragged file bypassed it entirely | Must | LR1, `rule.md` PDPA 8, P2 | ✅ Done — `src/intake.js` + `test/intake-screening.test.mjs`, 8 tests |
| **B28** | Guarantee EXIF/GPS removal on the one image path that could pass the original file through unchanged | Must | LR6, `rule.md` PDPA 7, P2 | ✅ Done — `compress-image.js` states `preserveExif:false` and re-encodes if the library returns the input |
| **B29** | State the retention window as a number beside the control, before the file is committed — not only as a countdown met afterwards | Must | LR5, `rule.md` PDPA 11, P2 | ✅ Done — `tool-shell.js` uploader |
| **B30** | Keep filenames out of the production console; error messages name the file on screen, and those strings were reaching `console.error` | Must | LR8, `rule.md` PDPA 6, P2 | ✅ Done — `src/log.js`; absence verified in the built bundle |
| **B31** | Ship the privacy page required by `rule.md` PDPA 25: what is processed, where, what is held and for how long, what is fetched and why, how to erase | Must | LR4, `rule.md` PDPA 25, P2 | ✅ Done — `src/privacy.js` at `#/privacy`; retention and size read from code so the page cannot drift from the enforcement. S4's "I don't know how the converter website keeps it" is the question this page answers |
| **B32** | Fixture test for NFR7: ≥20 Thai / Burmese / emoji strings where a code-point count differs, asserting 0 miscounts | Must | NFR7, P12 | ✅ Done — `test/grapheme-counting.test.mjs`, 23 fixtures. Writing it corrected the NFR: UAX #29 gives a *spacing* vowel its own cluster, so a cluster is **not** a reader's syllable. S3's cover lost Thai glyphs in a tool's export — ours must not |
| **B33** | Measure NFR6 rather than infer it: Performance-panel long-task count over a 60 s job, and progress timestamps from a hidden tab | Must | NFR6, P6 | 🔴 To do — the yielding is implemented and code-reviewed, but the 50 ms / 1-per-second thresholds have not been profiled. S10's 400 MB export on a phone is the case to profile |
| **B34** | Agree the NFR4 reference device and measure first-paint against it — NFR4 is the one NFR with no agreed measurement basis at all | Should | NFR4, Q3, P10 | 🔴 To do — **blocked on Q3.** Until a device is named in the repo, "interactive < 2 s" is untestable and cannot be claimed at the gate. *The interviews weigh toward a phone: 12 of 15 started on one* |
| **B35** | Every tool completes on a phone — pick, transform, download — with no step that needs a desktop; verified tool by tool on a real handset, not only at a viewport width | Must | F15, P10, P9 | ⚠️ Built — the responsive pass (`:has()` wide layout, pinned mobile CTA, 16 px inputs, touch-visible card actions) shipped before the interviews. **Unverified per tool.** *Added 8 Sep 2026 from the interviews:* 5 of 15 never touched a laptop, 7 more started on the phone and lost time or quality on the hop (S1, S6, S9, S11, S14) |

---

## Parked — built, but no pain behind them yet

Two rows whose requirement traced to a hypothesis that **0 of 15 participants raised** (spec §1.3).
Parked for the gate on 8 Sep 2026: out of the product table so that table keeps its rule — every
row cites a pain — while nothing is deleted, renumbered or hidden. The code ships unchanged;
nothing here is claimed in the pitch. Re-admission or cut is spec **Q5** / **Q6**, decided in W6.

| ID | Item | Was | Traced to | Comes back when | Status |
|---|---|---|---|---|---|
| **B8** | OCR a scan into a searchable PDF | Must | F8 (parked) · H6 — **0 of 15** | Two participants describe searching or retyping a scan unprompted. The H6 branch is asked directly in the next five interviews | ✅ Built — `ocr-pdf.js`, `LANGS` = **19 languages**, up to 3 per run. **Parked** |
| **B20** | Save a multi-step chore as a named workflow and batch files through it | Should | F11 (parked) · H8 — **0 of 15, contradicted by S8** ("only around deadlines") | Two participants describe a chore they repeat, or ask to chain steps | ✅ Built — `ops.js` (13 ops) + `workflows.js`. **Parked.** `ops.js` stays in use underneath Merge and the batch modes (B19) |

---

## Gate deliverables — process rows, not product requirements

These rows exist because the **course** asks for them, not because a requirement in the spec
does. They are kept out of the product backlog so that table holds one invariant cleanly:
*every product row traces to a requirement id and a pain*. `/audit-backlog` check 2 reads only the
product table; these rows cite the course rubric or a spec defect instead, which is their real
source.

| ID | Item | Priority | Traces to | Status |
|---|---|---|---|---|
| **B13** | Commit and push `CLAUDE.md`, `rule.md`, `.claude/`, `.docs/` and the untracked/modified source files | Must | D4 — *work that exists on one laptop does not count at the gate* | ✅ Done — 2 Sep 2026 |
| **B16** | Interview **≥5 real users** (target ≥15), recording role / pain / quote only per LR7; convert each `H#` to a `P#` and re-point every requirement | Must | Rubric — *≥ 5 real users interviewed* · spec §6 · LR7 | ✅ **Done — 8 Sep 2026. 15 of 5.** 22 Aug – 8 Sep, five interviewers × three participants, 15 programmes, EN/TH/MY, 10 by chat · 2 in person · 3 by call. 12 pains (`P1`–`P12`), 6 hypotheses promoted, 2 unsupported (H6, H8 → F8, F11 parked), 1 confirmed (H9). Every citation re-pointed; `/audit-backlog` re-run clean. Evidence: [`02-interviews/results.md`](02-interviews/results.md) |
| **B17** | Confirm with Dr. Prasara that UniLab is an approved case-study topic (not on the 19 Aug assigned list) | Must | Rubric — *topic* · spec Q4 | 🔴 **Open.** Request drafted at `05-approvals/topic-approval-request.md` with the guardrail-by-guardrail case and a fallback plan — **not sent**; Product Owner to send |
| **B22** | Design deliverables for the gate: feature list, user journey, design system, prototype, and all 4 diagrams under `.docs/02-design/` | Must | Rubric — *4 diagrams + design* | ✅ Done — W4, 2 Sep; diagrams rebuilt 7–8 Sep. All four rendered to image and inspected, not just parsed: D2 re-authored as UML SVG (stick figures, generalization), D4's invalid 1-in/1-out diamond removed, D1's LMS arrow re-attributed to the actor, D3 recomposed as three layer bands. `diagram-checker` C1–C7 + new C1b clean |
| **B23** | Updated proposal: problem statement + target users | Must | Rubric — *User Discovery & Problem Fit* | ✅ Done — 7 Sep 2026, **evidence section updated 8 Sep**. [`proposal.md`](proposal.md): problem statement (P-a to P-d, with participants), the three target users with sample counts, the five guardrails, and §5 stating the 15-interview position |
| **B25** | Re-run `/audit-backlog` and `diagram-checker` immediately before the gate submission and paste both reports into `.docs/05-log/` | Must | Rubric — *evidence of process* | ✅ Done — 8 Sep 2026, gate day, **re-run after the evidence pass** (B16 moved, F8/F11 parked). Both reports in [`.docs/05-log/20260908-log.md`](../05-log/20260908-log.md); the 7 Sep passes are in `20260907-log.md` |

---

## Summary

| | Count |
|---|---|
| **Product rows** | **27** — every one cites a requirement id and a `P#` |
| ✅ Done | 19 |
| ⚠️ Built but unverified | 3 (B7, B21, B35) |
| 🔴 To do | 5 (B9, B11, B15, B33, B34) |
| **Parked** | 2 (B8, B20) — built, 0 of 15 asked; spec Q5 / Q6 |
| **Gate-process rows** | 6 — 5 done, **1 open (B17)** |
| **Design pack (W4)** | **complete** — 5 deliverables, 4 diagrams, all rendered and inspected |
| **Evidence (W5)** | **15 interviews · 12 pains** — B16 closed 8 Sep |
| **Gate blockers open** | **1** (B17) — B16 closed by the 8 Sep evidence pass, B13 by the W4 push, B12 by the 6 Sep `rule.md` rewrite |

*(The 8 Sep evidence pass closed B16, re-pointed every product row from `H#` to `P#`, gave the
NFR- and LR-only rows the pain behind them, parked B8 and B20, moved the three process rows B13 /
B16 / B17 beside B22 / B23 / B25, and added B35.)*

**The evidence has caught up with the product — and found it ahead in two places.** Eighteen
Must-level rows ship, the design pack is complete, and 15 conversations now sit under every row
in the product table. The two rows that could not be traced, OCR (B8) and Workflows (B20), are
the features the team most enjoyed building and the ones no student asked for; they are parked
in the open, with spec Q5 and Q6 putting that decision in front of the team rather than under it.
The one remaining gate blocker, B17, is a message that needs sending.

---

## Audit

Run `/audit-backlog` before any commit touching `.docs/` and before the gate submission. As of
8 Sep 2026 it reports **four of four checks clean** over the product table, and lists the two
parked rows by name rather than counting them as failures — that is not a false positive, it is
Q5/Q6.
