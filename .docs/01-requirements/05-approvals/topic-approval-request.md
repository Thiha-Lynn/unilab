# B17 — topic approval request (DRAFT, not sent)

**Status:** 🔴 **Not sent.** Someone on the team must send this. It is written to be pasted into
Google Classroom or email with the name changed.
**Blocks:** the W5 User Validation Gate (submit 8 Sep 2026)
**Traces to:** spec §7 **Q4** · backlog **B17**
**Owner:** Myo Zin Thant (Product Owner)

---

## The situation, factually

Two course instructions point in different directions, and we cannot tell which governs us:

- The **course overview** says: *"Pick **your own product/topic**; you build it with a
  standards-based process for real users."*
- The **19 Aug topic-selection slide** lists five assigned topics — Recovery Score, MALA Risk
  Screening, AI Perfumery Engine, Internship Management System, Curriculum Revision Tool — and
  says each team picks one. **UniLab is not among them.**

We have built four weeks of work on UniLab. If the 19 Aug list is binding, that work is against
the wrong topic, and every hour spent between now and the gate makes it more expensive to
change. **This is the one question that should be answered before any further spec work**, which
is why it is a gate blocker rather than a footnote.

## How UniLab stands against the five guardrails

| # | Guardrail | UniLab |
|---|---|---|
| 1 | **Real users ≥ 15** (≈3 per member, no classmates, no AI personas) | Interview plan assigns 3 per member; **0 conducted so far** (B16) — stated honestly, not claimed |
| 2 | **Buildable in 1 month — exactly 1 core workflow** | One workflow: *select a file → transform it on this device → download*. All 58 tools are settings of that one workflow, not 58 workflows |
| 3 | **A measurable metric** | Files leaving the device per task (before: every file to a third-party server → after: zero), plus time-to-finished-file and submission rejections |
| 4 | **PDPA-safe** | Compliance is architectural: no upload path exists, so no personal data is collected. `rule.md` derives LR1–LR7 from PDPA, CCA §26 and ETA §9/26/28 |
| 5 | **Not sold / shipped by anyone in the team already — must be new work** | Built by this team, this semester, for this course. Not sold, no revenue, no ads, MIT-licensed. It is deployed publicly because the W4 prototype had to be real enough to interview against — **not because it pre-existed the course** |

Guardrail 5 is the one worth stating plainly rather than hoping it passes unnoticed: UniLab is
live on the internet today. It is coursework that was deployed, not a product that predates the
course.

---

## Message to send

> **Subject:** Company 18 (DIGITAL IMPOSTERS) — confirming our case-study topic
>
> Dear Dr. Prasara,
>
> I am writing on behalf of Company 18, DIGITAL IMPOSTERS PVT. CO., LTD., to confirm our topic
> before the User Validation Gate.
>
> Our project is **UniLab** — a free, fully client-side toolbox for the everyday file jobs a
> student has: compressing a report under a submission size cap, converting an iPhone HEIC
> photo, scanning a transcript, trimming a lecture recording. Every tool runs in the student's
> own browser; no file is ever uploaded, and there is no upload endpoint anywhere in the
> codebase. The one core workflow is *select a file → transform it on this device → download the
> result*.
>
> The course overview says each company picks its own product or topic, and we did. However,
> UniLab does not appear on the five assigned topics listed in the 19 August slide, so I want to
> be certain rather than assume. **Could you confirm whether UniLab is accepted as our own
> topic, or whether we are expected to take one of the five listed?**
>
> If it would help, our charter, requirement spec, backlog and legal specification are all in
> the repository and I can share the link or bring printed copies to class.
>
> We would rather correct course now than at the gate, so any answer — including "switch" — is
> useful to us today.
>
> Thank you,
> [name], Product Owner, Company 18

---

## If the answer is "take one of the five"

Do not discard the work; **re-point it.** Decide in this order:

1. **Which listed topic is nearest?** *Internship Management System* and *Curriculum Revision
   Tool* both involve document handling, so parts of the spec, the design system, the tool shell
   and the whole compliance argument transfer.
2. **What survives untouched?** `rule.md`, the LR chain, the traceability discipline, the agents
   and skills, and the test approach are product-independent. That is roughly half the gate
   evidence.
3. **What must be rewritten?** The Charter's problem statement, the hypotheses H1–H9, and every
   `F#`. Budget a full day.

## If the answer is "yes, UniLab is fine"

Close B17, record the confirmation date and wording in `.docs/05-log/`, and note it in spec §7
Q4 so nobody re-opens the question in W6.

---

## Log

| Date | Action | By | Outcome |
|---|---|---|---|
| 7 Sep 2026 | Draft written | — | **Not sent** |
| | *Sent* | | |
| | *Reply received* | | |
