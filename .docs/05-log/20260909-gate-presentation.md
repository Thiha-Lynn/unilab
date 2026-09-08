# Gate presentation — 9 Sep 2026 · running order, lines, and the questions

**Course:** 1305493 · W5 User Validation Gate review · **Company 18 · DIGITAL IMPOSTERS PVT. CO., LTD.**
**Deck:** [`20260909-gate-deck.html`](20260909-gate-deck.html) — open in any browser, arrow keys to
move, **N** for speaker notes, **P** for the scroll/print view (also what a phone shows).
**Time:** 5 minutes on the clock, then questions. **Hard cuts** are marked so 5:00 is a promise.

---

## 0. Before the room — 15 minutes, in this order

| Who | Do | Why |
|---|---|---|
| Thiha Lin | Laptop on the projector. Open <https://thiha-lynn.github.io/unilab/>, open **Compress PDF**, drop a real PDF on it *while still online*. **Then** switch to airplane mode | The tool module is lazy-loaded. Loaded online once, it runs offline. Going offline first shows a spinner, not a demo |
| Thiha Lin | Second tab: the deck. Third tab: `results.md` on GitHub, in a **logged-out** window | "Tell me about one of them" is answered from the log, not from memory. Logged-out proves the repo is public |
| Myo Zin Thant | Confirm the Classroom submission shows the link `https://github.com/Thiha-Lynn/unilab`, submitted last night | The grader opens the link, not the laptop |
| Zaw Win Htut | Phone with `results.md` open at your three (S1, S6, S11) | Backup if the laptop tab dies |
| Everyone | Re-read your **own three** blocks in `results.md`. Not all fifteen — yours | The follow-up question goes to the interviewer, not the presenter |
| Wanna San | Have the 12-pain bar chart in your head: **P7 seven, P6 seven, P10 six** | Slide 3 is numbers; say them, don't read them |

**Who says what, and for how long** — total 5:00 with the hard cuts, 5:40 without.

| # | Slide | Speaker | Seconds | Hard cut |
|---|---|---|---|---|
| 0 | UniLab · one line | Myo Zin Thant (PO) | 15 | — |
| 1 | One workflow, fifty-eight settings | Myo Zin Thant | 30 | 20 — skip the category strip |
| 2 | Fifteen people, fifteen programmes | Swan Htut Oakkar Aung (Designer) | 40 | 30 |
| 3 | What they said — twelve pains | Wanna San (AI Lead) | 60 | 50 |
| 4 | The chain, one thread | Thiha Lin (Tech Lead) | 50 | 40 |
| 5 | What we got wrong | Zaw Win Htut (QA) | 50 | 40 |
| 6 | It runs with the Wi-Fi off | Thiha Lin | 45 | 45 — never cut the demo |
| 7 | Compliance is architecture | Zaw Win Htut | 25 | 10 — one sentence |
| 8 | What is open | Myo Zin Thant | 25 | 20 |
| 9 | Questions | all | — | — |

---

## 1. The lines

Say these, don't read them. The bold phrase on each slide is the one sentence to land.

### Slide 0 — Myo Zin Thant · 15 s
> Good morning. Company 18, DIGITAL IMPOSTERS. Our product is **UniLab**: a student's file
> jobs — compress, convert, scan, trim — done entirely inside the browser, so **the file never
> leaves the device.** Five of us, five minutes, and the first thing we'll tell you is how many
> people we talked to.

### Slide 1 — Myo Zin Thant · 30 s
> One core workflow: **select a file, transform it on this device, download the result.** We ship
> fifty-eight tools, and every one of them is a *setting* of that workflow — not fifty-eight
> workflows. Split PDF and Remove Noise differ in what they compute, not in what the student does.
> That sentence is our answer to the one-month, one-workflow guardrail.
>
> *(hard cut: stop here)* Twenty of those settings are PDF, thirteen image, eighteen video and
> audio — the part no free PDF site has at all.

**Hand-off:** "Swan will tell you who we talked to."

### Slide 2 — Swan Htut Oakkar Aung · 40 s
> **Fifteen people, fifteen programmes,** between the twenty-second of August and last night.
> Three each — this grid is the assignment: each row is one of us. Nursing, Law, Public Health,
> Accounting, Chemistry — nobody from this course. Ten by chat, two in person, three by call.
> Nine in English, four in Thai, two in Burmese.
>
> Two numbers that shaped everything: **five never touched a laptop**, seven more started on the
> phone. And four of the fifteen were handling an identity document — a passport, a medical
> certificate, a Thai ID, a signed permission sheet.
>
> We recorded role, pain and quote. No names, no student IDs, anywhere.

**Hand-off:** "Wanna has what they said."

### Slide 3 — Wanna San · 60 s
> Twelve pains. Six we had predicted. **Six we hadn't** — and the biggest one is in that second
> group.
>
> **P7. Seven of fifteen found out about the limit only after the work was done.** "Upload
> failed" — no reason. "File type not supported" — no fix. A watermark after six pages were
> scanned. A rotation the lecturer noticed. Nobody was stopped by a PDF; they were stopped by
> finding out too late.
>
> P6, also seven: one submission is a chain of three to five apps, and — their words — they want
> *one place*. P10, six: it starts on a phone and every hop to a laptop is where the time goes.
> Then the ones we predicted: the free tool running out at the deadline, four. Custody of an ID
> document, four. A size cap you discover by failing, four.
>
> *(hard cut: skip the next sentence)* Two more we recorded and don't own — the LMS itself, and
> Word's export — so the boundary is written down, not hidden.
>
> **The pain is rarely "I can't make a PDF." It's the workflow around it, and the limit you meet
> afterwards.**

**Hand-off:** "Thiha will take one of those all the way to the screen."

### Slide 4 — Thiha Lin · 50 s
> One thread, six documents. S12, fourth-year, scholarship application, second of September. Went
> to a copy shop to scan a transcript and a Thai ID. Their words: **"I asked them to delete the
> files afterward, but realistically I can't verify whether every temporary copy was removed."**
>
> That's pain P2 — four of fifteen said it. So requirement F1: transform with no upload. F6: the
> result lives in memory, on a countdown, with a delete-now button — so custody is something she
> can *watch*, not a promise she has to trust. Backlog B1 and B6, both done, `vault.js`, and a
> test that resolves the object URL after the purge to prove the bytes are gone — not just
> unlisted. And that's screen three: **29:47 until this is gone.**
>
> Pain, requirement, backlog, screen. Same thread, every document.

**Hand-off:** "Zaw has the part we got wrong."

### Slide 5 — Zaw Win Htut · 50 s
> We went in with nine hypotheses. **Six became pains. Two got zero.**
>
> H6: Thai and Burmese OCR. We built it — nineteen languages. Not one of fifteen mentioned
> searching a scan or retyping a quote. H8: the same chore every week. Zero — and one person
> contradicted it: *"something I only use around deadlines."*
>
> So two features we had already shipped had nobody behind them. We didn't re-justify them. We
> **parked** them: out of the requirement table, code untouched, decision written down for next
> month. Every requirement still in the spec traces to a stated pain — because we took two out.
>
> And H9 survived: **nobody in fifteen named "free" as a reason to switch.** What they named was
> fewer steps, no ads, and — for identity documents — local processing.

**Hand-off:** "Thiha — Wi-Fi off."

### Slide 6 — Thiha Lin · 45 s — the demo
> This laptop is in airplane mode. *(show the icon)* This is a scanned PDF, nine megabytes — the
> same size S15 got refused with last week. I type the cap, **five**. The estimate says four point
> six *before* I run anything — that's F5, and that's P7 answered. Run. Download. And **Delete
> now** — same purge the countdown does.
>
> Nothing left this machine, because nothing could. There is no upload endpoint in the codebase.

**If the demo fails:** switch to the deck's slide 6 mock-ups and say: "The live product is at
thiha-lynn dot github dot io slash unilab — the screens are the same." Do not debug on stage.

**Hand-off:** "Zaw — the law, in one line."

### Slide 7 — Zaw Win Htut · 25 s
> Our W2 `rule.md` was rewritten against this product. Eight legal requirements, PDPA, Computer
> Crime Act, ETA. **A duty you have discharged can fail. A duty you never incurred cannot.** No
> upload, so no data controller from first byte; no server, so no section-26 log — and if a server
> is ever added, the rule says those duties come back in full.
>
> *(hard cut: only the bold sentence)*

### Slide 8 — Myo Zin Thant · 25 s
> Open, honestly: our topic isn't on the nineteenth-of-August list — the confirmation request is
> written and going to you today. The competitor's upload time on campus Wi-Fi is still a
> perception, not a number. The zero-upload claim is tested on one tool chain, not yet all
> fifty-eight. And the two parked features are a decision we owe ourselves in week six.
>
> **Fifteen interviewed. Twelve pains. Every requirement traced. Two parked, in the open.**
> Questions.

---

## 2. The questions, and who answers

| They ask | Who | Say |
|---|---|---|
| **"Tell me about one of them."** | the interviewer of the one you pick — *pick your own* | Role, date, task, the pain in their words, the quote. e.g. Myo on S7: first-year TCM, medical certificate over LINE, "I mostly think about getting it accepted," sent name and hospital number before thinking |
| "How did you find them? Are they classmates?" | Swan | Own LINE groups and programme contacts, none from this course. Chat counts — the instructor's M1 guide says a real user is anyone who has the problem and can be reached |
| "Where are the names?" | Zaw | Nowhere, by rule LR7 — public repo. Role, pain, quote only; the code-to-person map was never written down |
| "Fifty-eight tools in one month?" | Myo | Fifty-eight *settings* of one workflow. The core feature is the one thing month two must ship end to end; the rest are parameters of it |
| **"Why is UniLab not on the topic list?"** | Myo | The overview says pick your own; the 19 Aug slide lists five. We built on the first, we're confirming with you today, and the fallback is mapped: Internship Management System is nearest, and `rule.md`, the LR chain, the agents and the tests transfer |
| "Where is the OCR? You said nineteen languages." | Zaw | Shipped, parked. Zero of fifteen asked; spec §2.1, question Q5. We'll ask that branch directly in the next five interviews |
| "Every requirement traces to a pain?" | Thiha | Every F, NFR and LR — the spec has the column. Two didn't, so they're out of the table, not re-justified |
| "What was the biggest surprise?" | Wanna | P7 — nobody was stopped by a PDF; seven of fifteen were stopped by finding out too late. It's the pain our estimate-before-the-run already answered, so F5 has the strongest evidence of anything we built |
| "H3 — did you measure the Wi-Fi?" | Zaw | The UniLab half: zero network attempts across five exit APIs, measured. The competitor half needs campus Wi-Fi and hasn't been timed. Three participants described it; that's perception, and we say so |
| "Is 'free' your pitch?" | Myo | No. Nobody in fifteen would switch for free — two already have free tools they like. Fewer steps in one place, and custody for identity documents |
| "Why not ffmpeg for video?" | Thiha | Thirty-one megabytes and CPU decode. We use WebCodecs through mediabunny; the video and audio tools are the part no free PDF site has |
| "What's your metric?" | Myo | Files leaving the device per task: every one before, zero after. Secondary: time to finished file — the sample's median was thirty-five minutes — and format or size rejections, nine of fifteen had one |

**If you don't know:** say "that's in the log; I'll find it," and open `.docs/05-log/20260908-log.md`,
Addendum 3. It is all there.

---

## 3. What is on the slides — so you can rehearse without the file

0. Title · the one line · five names and roles
1. Select → Transform on this device → Download · "58 settings, not 58 workflows" · category strip
2. The 5 × 3 participant grid, one row per interviewer · channel, language, device, ID-document counts
3. Bar chart, twelve pains by participants, P7 and P6 at seven · the six unpredicted marked · the two out of scope marked
4. S12 quote → P2 → F1 / F6 → B1 / B6 (tested) → the S3 custody card, 29:47, Delete now
5. The nine-hypothesis scoreboard: six promoted, two zero (parked), one confirmed · the H9 line
6. Demo checklist · the S2 work-stage mock with the estimate ≈ 4.6 MB · the airplane-mode caution
7. LR1–LR8 in one column · "a duty you never incurred cannot fail" · the conditional §26 line
8. Four open items · the closing line
9. Questions · the grader's likely questions, small, as a prompt

---

*1305493 Software Engineering Case Studies · 1/2569 · DIGITAL IMPOSTERS PVT. CO., LTD.*
