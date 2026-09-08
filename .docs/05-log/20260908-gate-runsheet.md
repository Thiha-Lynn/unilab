> ⏭ **Superseded, 8 Sep 2026 (evening).** This runsheet was written at 20:24 with the interview
> count at **0**. The 15 conversations run between 22 Aug and 8 Sep were captured that evening
> through `/capture-requirement` — **B16 closed at 15 of 5**, 12 pains recorded, every citation
> re-pointed, audit clean. The "if you reached 5" branch below is the one that was executed; see
> `20260908-log.md` Addendum 3. *This file is a dated record and is deliberately not rewritten.*

# Gate-day runsheet — 8 Sep 2026, 20:24 → 23:59

**Course:** 1305493 · W5 User Validation Gate · 10 pts (Project 50 → Discover 10)
**Submit:** once per company, PO or Tech Lead · *Add attachment → Link →* `https://github.com/Thiha-Lynn/unilab`
**Deadline:** tonight, 23:59. **Gate class:** tomorrow, 9 Sep.

---

## Where the packet actually stands

The four required repo contents are **done, pushed, and verified on the remote** — this was
re-checked at 20:15 after the local tracking ref reported `ahead 8` and turned out to be stale.

| # | Required by the assignment | State |
|---|---|---|
| 1 | Updated Proposal (problem statement + target users) | ✅ `.docs/01-requirements/proposal.md` |
| 2 | Product Backlog | ✅ `.docs/01-requirements/backlog.md` |
| 3 | Design draft — feature-list, user-journey, prototype, **4 diagrams** | ✅ `.docs/02-design/` — D1·D2·D3·D4 rendered and inspected |
| 4 | Compliance — `rule.md` + legal spec traced from W2 | ✅ `rule.md` LR1–LR8 + `.docs/01-requirements/04-legal/` |

The three **pass criteria** are a different list, and only two of them are met:

| Criterion | State |
|---|---|
| All 4 diagrams present | ✅ present, consistent, cross-checked by `diagram-checker` |
| Every requirement traces back to a real user pain | ⚠️ traces to `H#`, not `P#` — blocked by the row below |
| **≥ 5 real users interviewed so far** | ❌ **0.** This is the whole gate risk |

**Nothing in the repo closes that last row.** No commit, no diagram, no audit. Five conversations
close it, and there are 3h 34m to have them.

---

## The clock

| By | What | Who |
|---|---|---|
| **20:45** | **Send, don't plan.** 5 DMs each = 25 sent. Burmese first (`chat-script.md` §1). Open `capture.html` on your phone now, not when someone replies | All five |
| **20:45** | Send the B17 message to Dr. Prasara — Classroom or email, text is written and needs no editing | Myo Zin Thant |
| **21:00–22:30** | Run whoever answers. **One question per message.** Several in parallel is normal and fine | All five |
| **21:30** | The H3 measurement — 10 MB PDF, campus Wi-Fi, competitor round trip vs UniLab. Two numbers. **Five minutes, and it is not an interview** | Zaw Win Htut |
| **22:30** | **Count. Whatever the number is, it is the number.** Paste every block into `results.md`, update the running count in the same edit | PO |
| **22:45** | Promote only what earns it: `H#` → `P#` needs **two different participants, unprompted**. Re-run `/audit-backlog` | Tech Lead |
| **23:00** | Final recheck (below), commit, push | Tech Lead |
| **23:15** | Submit the link. **Do not leave this to 23:55** | PO |

> **20:45 is the real deadline.** A DM sent at 22:00 gets answered tomorrow. A DM sent now gets
> answered tonight, because everyone in the cohort is also awake and also working.

---

## Rehearse only if it does not cost you a send

`rehearsal-scenarios.md` holds five worked conversations (`RS1`–`RS5`). Twelve minutes in pairs, and
the five failure modes it names are the ones that will actually happen tonight — especially **RS2**,
the participant with no recent submission, at 22:30, when four is not five.

**Send first, rehearse while you wait for replies.** Rehearsal that does not end in a sent message
was procrastination with extra steps.

---

## At 22:30 — the two honest submissions

Whatever happens, **you submit tonight.** These are the only two versions.

### If you reached 5 (or more)

Update in one commit:
- `results.md` — the blocks, the running count, the hypothesis tracker ticks, any contradiction
- spec §0 — the evidence table, `P#` count no longer zero
- spec §1.2 — any `H#` that earned promotion, moved to the pains table
- `backlog.md` + `TRACEABILITY.md` — every row that cited a promoted `H#` re-pointed at its `P#`
- Re-run `/audit-backlog`. **It must be clean before you push.**

### If you reached fewer than 5

**Submit anyway, and say the number.** Do not round it up, do not pad it, and do not write a block
for a conversation that did not happen. Put this at the top of `results.md`:

> **Evidence position at submission: N interviews conducted, M pains recorded.** The gate minimum
> is 5. We are reporting the true count rather than a padded one. Every requirement in the spec
> traces to a numbered hypothesis `H1`–`H9`, each carrying the real artefact it came from, and
> §0 has stated since 26 Aug that this is the project's largest gate risk. The instrument
> (`interview-guide.md`, `field-kit.md`, `chat-script.md`, `capture.html`) is complete and
> assigned; what is missing is conversations, and we are still running them toward ≥ 15.

**A CONDITIONAL on an honest count is recoverable in a week.** A pass built on invented
participants is not recoverable at all — and it fails at the first question anyone asks about it,
which is *"tell me about one of them."*

---

## The 23:00 recheck — run all of it, in this order

```bash
npm test                                    # expect 17 pass · 0 fail
npm run build                               # expect clean
/audit-backlog                              # expect 4 of 4 checks clean
```

Then the subagent pass — `diagram-checker` against `.docs/02-design/`, expecting:

- every actor in D1 / D2 / D4 appears in spec §1.1
- D4's numbered actions = `user-journey.md` steps, same order
- D2's core use case = the starred core feature in `feature-list.md`
- every module named in D3 exists in `src/`
- no id mismatch across `.docs/02-design/`, `d2-use-case.svg` included

And the four things only a human eye catches:

| Check | Why it is on this list |
|---|---|
| `git status` clean, `git log origin/main..main` **empty** | The submission is a *link*. Work that is only local scores zero — and the tracking ref lied about this once today already |
| Open the GitHub link in a **logged-out** browser | A private repo looks identical to you and is unreadable to the grader |
| `results.md` count matches the number of blocks below it | The one inconsistency a grader checks in ten seconds |
| No `RS1`–`RS5` string anywhere outside `rehearsal-scenarios.md` | Rehearsal must not have leaked into evidence |
| `S1`–`S3` mean *prototype screens* in `.docs/02-design/` and *participants* in `results.md` | Pre-existing, disambiguated by document, and outside `diagram-checker`'s scope — but know the answer before a grader asks |

```bash
# rehearsal content must not appear inside the evidence log's participant section
awk '/^## Participants/,0' .docs/01-requirements/02-interviews/results.md | grep -nE '\bRS[0-9]'
# expect: no output
#
# (RS, not R — R1–R7 are design-system.md's component rules and would always match.
#  Files that *describe* the RS convention — .docs/README.md, results.md's header,
#  this runsheet — are references, not leakage, so the check looks only where
#  participant blocks live.)
```

---

## The two blockers, restated for the log

| | Blocker | Owner | Closes when |
|---|---|---|---|
| **B16** | 0 of 5 required interviews | All five | Five real people have answered the six questions |
| **B17** | Topic approval unconfirmed — UniLab is not on the 19 Aug assigned list | Myo Zin Thant | Dr. Prasara replies. **The message is written; it needs sending, not writing** |

Both are evidence, not code. Neither has moved since 6 Sep, and neither moves by editing this
repository. The product and the design pack are four weeks ahead of the evidence, which is a
better problem than the reverse — but it is still the problem.

---

*1305493 Software Engineering Case Studies · 1/2569 · DIGITAL IMPOSTERS PVT. CO., LTD.*
