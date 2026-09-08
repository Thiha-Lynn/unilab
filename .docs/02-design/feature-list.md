# Feature list — UniLab (DISCOVER design)

**Course:** 1305493 · W4 · 2 Sep 2026 · **Owner:** Thiha Lin, Tech Lead
**Spec:** [`01-requirements/01-spec/20260826-01-unilab-core.md`](../01-requirements/01-spec/20260826-01-unilab-core.md)
**Backlog:** [`01-requirements/backlog.md`](../01-requirements/backlog.md)

Every feature below is the backlog boiled down to *what the product can do*. Each traces to a
user story in the spec. Nothing appears here that is not in the backlog.

| Feature | Traces to | Backlog |
|---|---|---|
| ⭐ **Transform a file on this device** — select → transform → download, with a live preview before committing, no upload path anywhere, no account or task-per-day cap, and every step completing on a phone | **F1, F2, F3, F4, F5, F15** | B1, B2, B3, B4, B5, B35 |
| **Result custody** — finished files held in memory only, on a visible countdown, with "delete now" and an automatic purge when the tab closes | F6, LR5 | B6 |
| **Document toolkit** — PDF and image work, including true redaction *(OCR ships but is parked as a requirement — F8, spec §2.1)* | F7 | B7 |
| **Media toolkit** — video and audio jobs in the same place as document jobs | F9 | B18 |
| **Merge and batch** — assemble several PDFs in an order checked before the run, with page ranges and a contents page; batch modes on the compress and convert tools *(the saved-Workflows layer is parked — F11, spec §2.1)* | F10 | B19 |
| **Network honesty** — any tool that must fetch from the network says what it will download, and how big, before it starts | F12, F14, LR3 | B10, B14 |
| **Offline install** — installable PWA that keeps working with no connection | F13 | B21 (blocked on B9) |

---

## ⭐ Why "Transform a file on this device" is the core feature

It is the one month-2 BUILD must ship end to end, and it is the feature that kills the top
pain — **P2, custody**: a student scanning a transcript, ID card, medical certificate or signed
sheet has no way to verify a third party's deletion promise (S4, S7, S12, S14 — S12: "I can't
verify whether every temporary copy was removed"). Transform-on-device removes the need for the
promise. It also answers **P7**, the largest pain in the sample (7 of 15): a limit discovered only
after the work — the live preview is the step that makes the limit visible *before* it.

It is also the feature the other six depend on:

- **Result custody** only exists because a result was produced locally.
- **Document toolkit** and **Media toolkit** are the *same* workflow with different parameters.
- **Merge and batch** chains it; **Network honesty** guards its one exception; **Offline install**
  is it, without a connection.

> **The rubric point that has to survive review:** 58 tools are **58 settings of one workflow**,
> not 58 workflows. Split PDF and Remove Noise differ in what they compute, not in what the user
> does — pick a file, set options, get a file. Described as 58 workflows, the scope reads as
> sprawl and fails the rubric.

## What was cut from this list, and why

| Cut | Why |
|---|---|
| The 58 tools listed individually | They are parameterisations of the core feature, not features. Listing them would inflate the design and contradict the one-workflow framing. |
| PDF → Word conversion | Won't (W1). Genuinely needs a server; would destroy LR1, which is the product. |
| Accounts, cloud sync, cross-device history | Won't (W2). Contradicts LR2. |
| Advertising / analytics | Won't (W3). Would re-impose the whole consent regime §4.1 dissolves. |

## Honest status

The core feature and six of the seven **ship today**. The one open row is `Offline install`
(blocked on the 31 MB precache, B9/Q1). `Network honesty` closed on 7 Sep — **B14 done**, NFR5
at 2 of 2 tools disclosing.

**The evidence caught up on 8 Sep 2026** — 15 interviews, and every row above traces to a `P#`
a real participant stated. Two things that ship are deliberately *not* rows: **OCR (F8)** and
**saved Workflows (F11)** traced to hypotheses that 0 of 15 participants raised, so they are parked
(spec §2.1) and re-admitting or cutting them is Q5 / Q6. `Media toolkit` gained direct evidence
(S2 and S10 did video, S9 audio, none in a document tool), and the core feature gained **F15** —
5 of 15 never touched a laptop.
