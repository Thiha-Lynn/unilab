# Project proposal — UniLab

**Company 18 · DIGITAL IMPOSTERS PVT. CO., LTD.**
1305493 Software Engineering Case Studies · 1/2569 · Dr. Prasara Jakkaew
**Submitted for:** W5 User Validation Gate, 8 Sep 2026 · **Owner:** Myo Zin Thant, Product Owner
**Assembled:** 7 Sep 2026 (B23) · **Evidence section updated:** 8 Sep 2026, after the 15-interview capture. Source documents: the W1 Company Charter, spec §1, and [`02-interviews/results.md`](02-interviews/results.md).

> **Read §5 first if you are grading the evidence.** It states what 15 conversations confirmed,
> what they contradicted, and the two shipped features they did not support.

---

## 1. The product in one sentence

UniLab lets a student finish an everyday file job — compress, convert, scan, trim — **entirely
inside their own browser**, so the file never leaves the device and no deletion promise has to
be trusted.

**The one core workflow:** *select a file → transform it on this device → download the result.*
The 58 shipped tools are 58 **settings** of that one workflow, not 58 workflows. This phrasing
is deliberate: described as 58 workflows, the scope reads as sprawl and fails guardrail 2.

---

## 2. Problem statement

Students handle files under deadline pressure, usually on a phone, late at night. Fifteen
interviews between 22 Aug and 8 Sep 2026 (spec §1.2, `P1`–`P12`) put numbers and quotes under
what was, until then, three hypotheses. Four problems stack.

**P-a · The free tier runs out exactly when the deadline arrives** *(spec P1 — S1, S3, S9, S13).*
The free web tools students reach for ration what they can do — a watermark found only after six
pages were scanned, ads, a daily quota a group-mate had already used, a batch conversion behind
a paywall. The limit is never felt on a quiet afternoon. It is felt at 11 pm with three files
still to fix.

**P-b · Routine tasks require handing over identity documents** *(spec P2 — S4, S7, S12, S14).*
A scholarship, visa, internship or clinical form means scanning a transcript, an ID card, a
medical certificate, a signed consent sheet. Converting one on a free site means uploading an
identity document to a service the student does not know — S4 cannot now remember which converter
their passport went through. Those services promise deletion, but the student cannot verify it:
*"I asked them to delete the files afterward, but realistically I can't verify whether every
temporary copy was removed"* (S12).

**P-c · No single place covers the job, so one submission is a chain of apps** *(spec P6 — S1,
S3, S13, S14; video S2, S10; audio S9).* A competitor teardown on 22 Aug 2026 found iLovePDF at
31 document/image tools and iLoveIMG at 13, with **zero video and zero audio tools between
them**. The interviews showed the consequence: three to five apps per submission, a device hop
in 8 of 15, and a wish stated in the student's own words — *"one place"* (S13), *"unless it
removes some of these extra steps"* (S1).

**P-d · The limit is discovered only after the work is done** *(spec P7 — 7 of 15, the largest
pain in the sample, and one no hypothesis predicted).* "Upload failed" with no reason. "File type
not supported" with no fix. A watermark on export, a rotation noticed only from the lecturer's
reply, a size cap learned by failing. This is the pain the product's live estimate-before-the-run
(F5) exists for, and it now carries the most direct evidence of any requirement.

### The finding that shapes the proposal

**"Free for students" is not a differentiator — confirmed.** iLovePDF already gives students a
free year of Premium, so price could never be the reason to switch; **nobody in 15 named "free"
as a reason to adopt anything.** Two said their current free tool is enough (S1, S15); two would
pay if the tool were cheap, ad-free and easy (S3, S8). What students named instead, unprompted:
**fewer steps in one place** (S1, S13), **no ads** (S3), and **local processing for identifiable
documents** (S4, S14). The pitch is therefore *one place, fewer steps* for every student, and
**custody** — the one claim a competitor with a server cannot copy — for the identity-document
moment. Carried as H9 in the spec; it survived, and Q2 is answered by evidence rather than
preference.

---

## 3. Target users

| # | User | Who they are | Why they are the target | In the sample |
|---|---|---|---|---|
| **U1** | Undergraduate at MFU | Coursework in Thai and English; a substantial cohort also works in Burmese. Submits through an LMS with size caps. Phone is the primary camera and often the primary computer. | The product exists for them; every member of the team is one. | 15 of 15 — 15 programmes, EN 9 / TH 4 / MY 2; **5 phone-only, 7 more started on the phone** |
| **U2** | Student handling identity documents | The same person as U1 at a different moment — scanning a transcript, ID card, medical certificate or signed consent sheet for a scholarship, visa, internship or clinical form. | Custody stops being an abstraction here. This user drives the whole architecture. | 4 of 15 — S4, S7, S12, S14 |
| **U3** | Group-work coordinator | The one in a team who merges everyone's sections into one report the night before it is due. | Multi-file, multi-step, under time pressure. | 3 of 15 — S3, S8, S14; two merged in the wrong order and found out after submitting (P8) |

**Not our user this phase:** staff, faculty, and anyone needing server-grade conversion
(PDF → Word). Recorded as an explicit **Won't** in spec §5 so nobody assumes it is coming. Two
real pains from the sample sit on that side of the line and are recorded there rather than
hidden: office-export fidelity (P12) and LMS submission uncertainty (P11).

---

## 4. How UniLab stands against the five course guardrails

| # | Guardrail | Position |
|---|---|---|
| 1 | **Real users ≥ 15** (≈3 per member; no classmates, no AI personas) | **15 conducted, 22 Aug – 8 Sep 2026** — three per member, 15 distinct programmes, no classmates on this course, LR7 kept throughout (role, pain, quote only). See §5. |
| 2 | **Buildable in 1 month — exactly 1 core workflow** | One workflow (§1). All 58 tools are settings of it. |
| 3 | **A measurable metric** | **Files leaving the device per task: before = every file to a third-party server, after = 0.** Secondary: time-to-finished-file (the sample's median task took 35 minutes, range 10 min – 2 h), and submission rejections caused by format or size (9 of 15 had one). |
| 4 | **PDPA-safe** | Compliance is *architectural*. No upload path exists, so no personal data is collected. `rule.md` derives **LR1–LR8** from PDPA, CCA §26 and ETA §9/26/28. |
| 5 | **Not already sold or shipped by the team — must be new work** | Built by this team, this semester, for this course. Not sold, no revenue, no ads, MIT-licensed. It is deployed publicly because the W4 prototype had to be real enough to interview against — **not because it pre-existed the course.** |

---

## 5. Evidence status — the honest position

The gate grades one chain: **pain → requirement → backlog item**, where the pain came from a
real user.

> **Interviews conducted: 15. Validated pains (`P#`): 12. Gate minimum: 5 — met. Target: 15 — met.**

Nothing in this proposal invents a user. The spec was drafted on 26 Aug with drivers `H1…H9` —
**hypotheses**, each carrying the real artefact it came from — and said openly that 0 interviews
existed. The 15 conversations were then run under one rule: a hypothesis becomes a pain only when
**two different participants describe it unprompted**. The result:

| | |
|---|---|
| **Promoted to a pain** | 6 — H1, H2, H3, H4, H5, H7 → `P1`–`P6` |
| **Predicted by no hypothesis** | 6 — `P7`–`P12`, including the largest pain in the sample (P7, 7 of 15) and the one new requirement, **F15: every tool completes on a phone** |
| **Unsupported — 0 of 15 raised it** | 2 — **H6** (Thai/Burmese OCR) and **H8** (the weekly chore; also contradicted by S8: "only around deadlines"). **F8 and F11 parked** on them for the gate |
| **Confirmed as a finding** | 1 — H9, "free" is not why anyone switches |
| **Contradicted in part** | H5 — the size cap is real, but 3 of 4 did *not* know the number until the upload failed |

**Two shipped features — OCR (F8) and Workflows (F11) — traced to hypotheses no participant
raised.** For this submission they are **parked** (spec §2.1): out of the requirement table,
ids retained, code untouched, backlog rows in a parked table of their own — so every requirement
that *is* in the spec traces to a stated pain, by subtraction rather than re-justification.
Whether they come back or are cut is spec **Q5** and **Q6**, three options each, the team's
decision in W6, on the record. The
instrument is complete and every citation in the spec, backlog and traceability map was
re-pointed through `/capture-requirement`; `/audit-backlog` runs clean on the result
([`../05-log/20260908-log.md`](../05-log/20260908-log.md), Addendum 3).

One measurement is still open: the competitor's upload-and-download round trip on campus Wi-Fi
(P3's number — `02-interviews/h3-measurement.md`). Three participants described the upload as
the wait; nobody has timed it yet.

A second blocker remains: **B17**, whether UniLab is an approved case-study topic, since it does
not appear on the five topics listed in the 19 Aug slide. The request is drafted at
`05-approvals/topic-approval-request.md`, with a fallback plan if the answer is "take one of the
five".

---

## 6. Where the rest of the submission is

| Gate asks for | Document |
|---|---|
| Proposal | this file |
| Backlog | [`backlog.md`](backlog.md) — 27 product rows, every one traced to a pain · 2 parked · 6 gate-process rows |
| Requirement spec | [`01-spec/20260826-01-unilab-core.md`](01-spec/20260826-01-unilab-core.md) — P1–P12 · F1–F15 (F8, F11 parked) · NFR1–7 · LR1–8, every one traced to a pain |
| Interview evidence | [`02-interviews/results.md`](02-interviews/results.md) — 15 participants, S1–S15, role / pain / quote |
| Design + 4 diagrams | [`../02-design/`](../02-design/) — feature list · journey · design system · prototype · D1–D4 |
| Compliance | [`../../rule.md`](../../rule.md) · class draft preserved in [`04-legal/`](04-legal/) |
| The chain, on one screen | [`TRACEABILITY.md`](TRACEABILITY.md) |
| Audit trail | [`../05-log/`](../05-log/) — including the 7 Sep pre-gate audit and the 8 Sep evidence pass |

---

*1305493 Software Engineering Case Studies · 1/2569 · DIGITAL IMPOSTERS PVT. CO., LTD.*
