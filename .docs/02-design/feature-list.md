# Feature list — UniLab (DISCOVER design)

**Course:** 1305493 · W4 · 2 Sep 2026 · **Owner:** Thiha Lin, Tech Lead
**Spec:** [`01-requirements/01-spec/20260826-01-unilab-core.md`](../01-requirements/01-spec/20260826-01-unilab-core.md)
**Backlog:** [`01-requirements/backlog.md`](../01-requirements/backlog.md)

Every feature below is the backlog boiled down to *what the product can do*. Each traces to a
user story in the spec. Nothing appears here that is not in the backlog.

| Feature | Traces to | Backlog |
|---|---|---|
| ⭐ **Transform a file on this device** — select → transform → download, with a live preview before committing, no upload path anywhere, and no account or task-per-day cap | **F1, F2, F3, F4, F5** | B1, B2, B3, B4, B5 |
| **Result custody** — finished files held in memory only, on a visible countdown, with "delete now" and an automatic purge when the tab closes | F6, LR5 | B6 |
| **Document toolkit** — PDF and image work, including true redaction and OCR in Thai / English / Burmese | F7, F8 | B7, B8 |
| **Media toolkit** — video and audio jobs in the same place as document jobs | F9 | B18 |
| **Workflows** — save a repeated multi-step chore and run a batch of files through it | F10, F11 | B19, B20 |
| **Network honesty** — any tool that must fetch from the network says what it will download, and how big, before it starts | F12, F14, LR3 | B10, B14 |
| **Offline install** — installable PWA that keeps working with no connection | F13 | B21 (blocked on B9) |

---

## ⭐ Why "Transform a file on this device" is the core feature

It is the one month-2 BUILD must ship end to end, and it is the feature that kills the top
pain — **H2, custody**: a student scanning a transcript, ID card or medical certificate has no
way to verify a third party's deletion promise. Transform-on-device removes the need for the
promise.

It is also the feature the other six depend on:

- **Result custody** only exists because a result was produced locally.
- **Document toolkit** and **Media toolkit** are the *same* workflow with different parameters.
- **Workflows** chains it; **Network honesty** guards its one exception; **Offline install** is
  it, without a connection.

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

The core feature and five of the seven **ship today**. The two open rows are `Offline install`
(blocked on the 31 MB precache, B9/Q1) and the unverified half of `Network honesty` (B14).

The features are not the risk. **The evidence is** — every row above traces to an `H#`
hypothesis, not a `P#` pain from a real interview. See B16.
