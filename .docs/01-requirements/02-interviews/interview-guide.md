# Interview guide — converting H1…H9 into P1…P9

**Course:** 1305493 Software Engineering Case Studies · 1/2569 · Dr. Prasara Jakkaew
**Company:** DIGITAL IMPOSTERS PVT. CO., LTD. · **Product:** UniLab
**Written:** 6 Sep 2026 (W5) · **Closes:** B16 · **Target:** ≥5 by 8 Sep, ≥15 by month end

---

## 0. Why this document exists

`.docs/01-requirements/01-spec/20260826-01-unilab-core.md` §0 said it plainly when this guide
was written:

> Interviews conducted to date: 0. Validated pains (`P#`) recorded: 0.

> **Closed 8 Sep 2026 — 15 conducted, 12 pains recorded.** This guide is kept as the instrument
> the 15 were run with; the outcome is in [`results.md`](results.md). It stays the instrument for
> the next round (Q5 asks for the H6 branch to be put directly).

Every requirement in this project currently traces to an **`H#` — a hypothesis** backed by a real
artefact (a competitor teardown, a platform constraint, a measurement of our own build). An
artefact is not a user. This guide is the instrument that turns each `H#` into a `P#`: a pain a
named, real student actually described, in their own words.

**The single rule:** we are here to find out whether the pain is real, *not* to show anyone
UniLab. The product is not mentioned until Part D, after every question that matters is answered.
A student who has just been shown a tool will agree that the tool is useful. That answer is worth
nothing and will not survive the gate.

---

## 1. What we may write down — LR7 compliance

`rule.md` LR7 binds us: **role, pain and quote only.** Concretely —

| Record | Do NOT record |
|---|---|
| Year + programme ("3rd-year SE") | Name, student ID, email, LINE ID |
| The pain, in their words | Anything identifying the person |
| A short verbatim quote | Photos, screen recordings, audio |
| Date of the interview | The actual files they showed us |

If someone shows you a real transcript or ID scan to illustrate a point, **look, do not
photograph.** Write one line about what happened. Participants are `S1`, `S2`, `S3`… in the
record; the mapping from code to person is never written down anywhere.

---

## 2. Consent script — read this out, do not paraphrase

> "I'm a Software Engineering student at MFU. We're researching how students handle files for
> coursework — nothing is being sold and there's no product to try. It takes about 10 minutes.
>
> I'll write down your year and programme, the problem you describe, and maybe one sentence you
> say — no name, no student ID, no email. You can stop at any point, skip any question, or ask me
> to delete a note. Is that OK?"

Wait for an actual "yes". If the participant is more comfortable in Thai or Burmese, run the
interview in that language and translate the quote afterwards, marking it `[translated]`.

---

## 3. Screener — ask before starting

1. Are you currently studying at MFU?
2. In the **last month**, have you submitted a file for a class — a PDF, a photo, a video, a recording?

Two yeses → proceed. If the answer to (2) is no, thank them and stop; they cannot report on a
recent, real event, and everything below depends on that.

---

## 4. Part A — the last real thing that happened

Anchor the whole interview to one specific event. If they generalise ("usually I…"), pull them
back: *"Let's stay with the most recent one — what happened that time?"*

1. Think of the **last file you had to hand in**. What was it, and for which class?
2. Walk me through what you actually did, from the file existing to it being submitted.
3. What device did you start on? What device did you finish on?
4. How long did that take, start to finish?
5. What was the most annoying part of it?
6. Did anything go wrong that time? What did you do about it?

> **Interviewer note:** questions 2 and 6 produce most of the usable pains. Do not rush them.
> Silence is fine — let them reconstruct the sequence.

---

## 5. Part B — the question bank, mapped to hypotheses

Ask only the branches Part A actually opened. A forced question produces a polite answer, not a
pain. Aim for 6–8 of these per interview, not all of them.

### H1 — free tools ration what a student can do
- Which website or app did you use for that? How did you pick it?
- Has a free tool ever stopped you partway — asked you to wait, to pay, to sign up? Tell me about that time.
- What did you do when it stopped you? *(the workaround is the pain)*
- When it happened, how close was the deadline?

### H2 — custody of identity documents *(our strongest hypothesis — always ask)*
- Have you ever had to scan or convert something personal — a transcript, ID card, medical certificate, visa or scholarship document?
- Which tool did you use for that one?
- Where do you think that file went after you uploaded it?
- Did you do anything differently because of what was in it? *(waited for home wifi, used a different site, asked a friend, gave up)*
- Has that ever made you uncomfortable enough to stop and do it another way?

### H3 — upload round trip on campus wifi *(also unmeasured — see §8)*
- Where were you when you did it — campus, dorm, home?
- Did you notice the upload or download taking a long time?
- Have you ever avoided a tool because of how slow it was on campus wifi?

### H4 — HEIC rejected by upload forms
- Do you take photos of notes or handouts with your phone? iPhone or Android?
- Has a submission form ever refused your photo? What did it say?
- How did you get around it?

### H5 — LMS size caps force a specific number
- Has a file ever been too big to submit? What was the limit?
- How did you make it smaller? How did you know when it was small enough?
- How many tries did that take?

### H6 — Thai/Burmese OCR
- Do you ever get scanned handouts or slides where you can't select or search the text?
- What do you do when you need a quote out of one? *(retyping by hand is the pain)*
- What language was the document in?

### H7 — no single site covers documents + video + audio
- Besides documents, have you had to hand in a video or a voice recording?
- What did you use for that? Was it the same site you used for PDFs?
- How many different file tools do you have bookmarked or installed right now?

### H8 — the same multi-step chore, every week
- Is there a file chore you do **repeatedly** — same steps, different files, most weeks?
- Walk me through those steps.
- Have you ever wished you could just… not do those steps again?

### H9 — "free for students" is not a differentiator
- Do you pay for any file tool now? Has anyone offered you a free student plan?
- If a paid tool were free for you tomorrow, would you use it for the personal documents from H2?

> **H9 is the one that can falsify our value proposition.** If students say price *is* the reason
> they'd switch, custody is not our differentiator and §1 of the spec needs rewriting. Record that
> answer honestly even when it hurts.

---

## 6. Part D — close (only now may UniLab be mentioned)

7. If you could change one thing about handing in files at MFU, what would it be?
8. Is there anything I should have asked you and didn't?
9. *(Optional, last)* We're building a free tool for this. Can I send you a link and ask what you think next week? — **Do not demo it now.** A demo contaminates every answer above.

---

## 7. Never ask these

| Don't ask | Why it fails | Ask instead |
|---|---|---|
| "Would you use a tool that keeps files on your device?" | Hypothetical. Everyone says yes. | "Where do you think that file went after you uploaded it?" |
| "Isn't it annoying when there's a size limit?" | Leading — supplies the answer. | "Has a file ever been too big to submit?" |
| "Do you care about privacy?" | Everyone claims yes; behaviour differs. | "Did you do anything differently because of what was in it?" |
| "How much would you pay?" | People cannot price hypotheticals. | "Do you pay for any file tool now?" |
| "Do you like our idea?" | Politeness, not evidence. | Don't mention the idea until Part D. |

---

## 8. One measurement that is not an interview

**H3 is a claim about the network, not about people**, and no number of interviews settles it.
It now has its own procedure: **[`h3-measurement.md`](h3-measurement.md)**.

The UniLab half is **done** — measured 8 Sep 2026, 0 network attempts during a real transform.
What remains is the competitor round trip **on MFU campus Wi-Fi**, three runs, against the
deterministic 10 MB fixture (`node test/fixtures/make-h3-fixture.mjs`, `sha256 a2bd25a4…2ec2c9`)
so both sides move identical bytes. Owner: **Zaw Win Htut (QA / Test)** — a test, not an interview.

---

## 9. Recording sheet — one block per participant

Copy this into `.docs/01-requirements/02-interviews/results.md`. Do not create a spreadsheet with
names in it.

```
### S<n>
- Date:
- Role: (year + programme only)
- Language: EN / TH / MY
- Last file task described:
- Pains stated (their words, not ours):
  -
- Verbatim quote:
- Hypotheses touched: H_
- CONTRADICTED any hypothesis?  (write it down — this is the valuable part)
- Interviewer:
```

---

## 10. Assignment — 5 members × 3 students = 15

| Member | Role | Interviews | Suggested source |
|---|---|---|---|
| Myo Zin Thant | Product Owner | 3 | SE cohort classmates |
| Thiha Lin | Tech Lead | 3 | Library / C5 lab |
| Swan Htut Oakkar Aung | Designer | 3 | Harbor Student Center |
| Wanna San | AI Lead | 3 | Students who hand in video or audio |
| Zaw Win Htut | QA / Test | 3 + the H3 measurement | Burmese-speaking cohort (covers H6) |

Minimum for the gate is 5 — **that is the floor, not the goal.** Five interviews close B16 on a
technicality; fifteen make the pains defensible in the W5 review.

---

## 11. Turning an `H#` into a `P#`

An `H#` may only be rewritten as a `P#` when **two different participants**, unprompted, describe
the same pain from their own experience. Then:

1. Write the pain in `results.md` as `P<n>`, with who (role only), when, and the quote.
2. In the spec §1.2, move that row from the hypothesis table to a new pains table.
3. In `backlog.md`, re-point every row whose `Traces to` cites that `H#` at the new `P#`.
4. Re-run `/audit-backlog` — it should stop reporting that row.

**A hypothesis that no participant raises is not a pain.** Delete it, and delete the backlog rows
that existed only to serve it. That deletion is a finding, and it is worth more marks than a
feature nobody asked for.
