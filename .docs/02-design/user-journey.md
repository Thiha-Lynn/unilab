# User journey — the one core workflow

**Course:** 1305493 · W4 · 2 Sep 2026
**Core feature:** ⭐ Transform a file on this device ([`feature-list.md`](feature-list.md))
**Traces to:** F1, F3, F5, F6 · H5, H2 · B1, B3, B5, B6

---

## The scenario

**Actor:** **U1 — Undergraduate at MFU** (spec §1.1), on a phone, the night a report is due.
**Instance chosen:** *Compress a scanned PDF to the 5 MB LMS cap.*

Why this instance: it is the shortest path that exercises the whole core feature — pick a file
(F1), name a target (F3), preview before committing (F5), and take custody of the result (F6).
Every other tool is the same five steps with different options.

**Mobile-first.** The phone is the primary camera and often the primary computer for this user
(spec §1.1), so the journey is written for a 390 px screen and the desktop layout is the
widening of it, not the other way round.

---

## The five steps

| # | The student does | The system does | Screen |
|---|---|---|---|
| **1** | Opens UniLab and taps **Compress PDF** | Loads the tool module; shows the uploader stage | S1 · Tool picker |
| **2** | Picks the scanned PDF from the device | Reads the file **in the browser**. No request carries file bytes | S2 · Compress (uploader) |
| **3** | Types the target — **5 MB** — and reads the live estimate | Renders a live preview and an estimated output size **before** anything is committed | S2 · Compress (work) |
| **4** | Taps **Compress PDF** | Runs pdf.js on-device, yielding every ~24 ms so the tab never freezes | S2 → S3 |
| **5** | Downloads the result, sees the custody countdown start, and **chooses**: press *Delete now*, or let the countdown run out | Holds the result in memory only; counts down from 30:00; purges either way — on the press, on expiry, or on tab close | S3 · Download |

---

## The two decisions

D4 draws exactly these two, and no others. Both are diamonds; both have two guarded exits.

### Decision 1 — at step 3, after the estimate appears

> **Is the estimate under 5 MB?**  *(guards in D4: `[yes]` / `[no]`)*
> - **`[yes]`** → continue to step 4 and run it.
> - **`[no]`** → the student changes the target or the quality; the estimate re-renders. They
>   loop back inside step 3, and **do not burn a run to find out.**

That loop is the whole point of **F5**. Discovering the file was still too big *after* the run is
the failure this design exists to prevent.

### Decision 2 — at step 5, once the result is downloaded

> **Delete it now?**  *(guards in D4: `[yes]` / `[no]`)*
> - **`[yes]`** → the vault purges immediately. Same purge the countdown performs.
> - **`[no]`** → the 30:00 countdown expires and purges without anyone pressing anything.

**Neither exit keeps the file** — that is the point, and `test/vault-deletion.test.mjs` asserts
both paths. Step 5 is a genuine choice about *when*, never about *whether*, so it is a decision
in D4 rather than a straight-line step. **LR5** made visible.

Everything else — a corrupt PDF, an unsupported encoding, a cancelled job — is an edge case and
lives in the backlog, not here.

---

## What must stay true across the other documents

These four facts are what [`diagrams.md`](diagrams.md) and [`prototype/`](prototype/) are
checked against by `diagram-checker`:

1. **Actors are named as in the spec** — U1 Student, U2 Student handling ID documents,
   U3 Group-work coordinator. No actor appears anywhere that is not in spec §1.1.
2. **Five steps, this order**, and **exactly two decisions** — the step-3 cap check and the
   step-5 delete choice. D4 draws both as diamonds with `[yes]` / `[no]` guards, and has no
   third diamond and no merge diamonds: flows rejoin by entering a node directly.
3. **No upload arrow may appear in any diagram.** The one permitted outbound arrow is the
   disclosed program/model fetch (F12, LR3) — never user file content.
4. **The result lives in the vault, not on a disk or a server.** Step 5 is not decoration; it is
   LR5 made visible.
