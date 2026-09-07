# Project proposal — UniLab

**Company 18 · DIGITAL IMPOSTERS PVT. CO., LTD.**
1305493 Software Engineering Case Studies · 1/2569 · Dr. Prasara Jakkaew
**Submitted for:** W5 User Validation Gate, 8 Sep 2026 · **Owner:** Myo Zin Thant, Product Owner
**Assembled:** 7 Sep 2026 (B23). Source documents: the W1 Company Charter and spec §1.

> **Read §5 first if you are grading the evidence.** This proposal states an evidence position
> that is incomplete on purpose rather than overstated.

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

Students handle files under deadline pressure, usually on a phone, late at night. Three problems
stack.

**P-a · The free tier runs out exactly when the deadline arrives.** The free web tools students
reach for ration what they can do — roughly two tasks a day, then a sign-up or payment prompt,
plus size caps and watermarks. The limit is never felt on a quiet afternoon. It is felt at 11 pm
with three files still to fix.

**P-b · Routine tasks require handing over identity documents.** A scholarship, visa or
internship application means scanning a transcript, an ID card or a medical certificate.
Converting one on a free site means uploading an identity document to a service the student does
not know. Those services promise deletion after a fixed window — typically two hours — but the
student cannot verify the promise was kept and cannot withdraw the file once sent.

**P-c · No single free site covers everything, so students maintain a list.** A competitor
teardown on 22 Aug 2026 found iLovePDF at 31 document/image tools and iLoveIMG at 13, with
**zero video and zero audio tools between them**. Students keep three or four sites bookmarked
and relearn each one's limits.

### The finding that shapes the proposal

**"Free for students" is not a differentiator.** iLovePDF already gives students a free year of
Premium, so price cannot be the reason to switch. **Custody is the only claim a competitor with
a server cannot copy**, and every decision in this proposal is measured against it. This is
carried as hypothesis **H9** in the spec and is the first thing the interviews must test — if it
survives, every requirement justified by "it's free" is worthless.

---

## 3. Target users

| # | User | Who they are | Why they are the target |
|---|---|---|---|
| **U1** | Undergraduate at MFU | Coursework in Thai and English; a substantial cohort also works in Burmese. Submits through an LMS with size caps. Phone is the primary camera and often the primary computer. | The product exists for them; every member of the team is one. |
| **U2** | Student handling identity documents | The same person as U1 at a different moment — scanning a transcript, ID card or medical certificate for a scholarship, visa or internship form. | Custody stops being an abstraction here. This user drives the whole architecture. |
| **U3** | Group-work coordinator | The one in a team who merges everyone's sections into one report the night before it is due. | Multi-file, multi-step, under time pressure — the case for saved Workflows. |

**Not our user this phase:** staff, faculty, and anyone needing server-grade conversion
(PDF → Word). Recorded as an explicit **Won't** in spec §5 so nobody assumes it is coming.

---

## 4. How UniLab stands against the five course guardrails

| # | Guardrail | Position |
|---|---|---|
| 1 | **Real users ≥ 15** (≈3 per member; no classmates, no AI personas) | Plan assigns 3 per member. **0 conducted.** See §5 — stated, not claimed. |
| 2 | **Buildable in 1 month — exactly 1 core workflow** | One workflow (§1). All 58 tools are settings of it. |
| 3 | **A measurable metric** | **Files leaving the device per task: before = every file to a third-party server, after = 0.** Secondary: time-to-finished-file, and submission rejections caused by format or size. |
| 4 | **PDPA-safe** | Compliance is *architectural*. No upload path exists, so no personal data is collected. `rule.md` derives **LR1–LR8** from PDPA, CCA §26 and ETA §9/26/28. |
| 5 | **Not already sold or shipped by the team — must be new work** | Built by this team, this semester, for this course. Not sold, no revenue, no ads, MIT-licensed. It is deployed publicly because the W4 prototype had to be real enough to interview against — **not because it pre-existed the course.** |

---

## 5. Evidence status — the honest position

The gate grades one chain: **pain → requirement → backlog item**, where the pain came from a
real user.

> **Interviews conducted: 0. Validated pains (`P#`): 0. Gate minimum: 5 by 8 Sep 2026.**

Nothing in this proposal invents a user. The drivers behind every requirement are numbered
`H1…H9` — **hypotheses** — and each one carries the real artefact it came from: the 22 Aug
competitor teardown, a platform constraint, or a measurement of our own build. **A hypothesis is
a reason to ask a question, not a finding.** An artefact is not a user.

This is the project's largest open risk and it is tracked as **B16**. The instruments are
complete — `02-interviews/field-kit.md`, `interview-guide.md`, an empty `results.md` bound by
LR7, and the `/capture-requirement` skill that converts a hypothesis and re-points every
citation. Only the conversations are missing, and course policy is explicit that fabricating
them is not allowed. **This row closes with five real conversations and with nothing else.**

A second blocker is open: **B17**, whether UniLab is an approved case-study topic, since it does
not appear on the five topics listed in the 19 Aug slide. The request is drafted at
`05-approvals/topic-approval-request.md`, with a fallback plan if the answer is "take one of the
five".

---

## 6. Where the rest of the submission is

| Gate asks for | Document |
|---|---|
| Proposal | this file |
| Backlog | [`backlog.md`](backlog.md) — 31 product rows + 3 gate rows, MoSCoW, every row traced |
| Requirement spec | [`01-spec/20260826-01-unilab-core.md`](01-spec/20260826-01-unilab-core.md) — F1–F14 · NFR1–7 · LR1–8 |
| Design + 4 diagrams | [`../02-design/`](../02-design/) — feature list · journey · design system · prototype · D1–D4 |
| Compliance | [`../../rule.md`](../../rule.md) · class draft preserved in [`04-legal/`](04-legal/) |
| The chain, on one screen | [`TRACEABILITY.md`](TRACEABILITY.md) |
| Audit trail | [`../05-log/`](../05-log/) — including the 7 Sep pre-gate audit |

---

*1305493 Software Engineering Case Studies · 1/2569 · DIGITAL IMPOSTERS PVT. CO., LTD.*
