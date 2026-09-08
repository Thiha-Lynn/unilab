# Screenshots — what to show, in what order

**For:** the W5 gate review, 9 Sep 2026 · **Company 18 · DIGITAL IMPOSTERS PVT. CO., LTD.**
Captured 8 Sep 2026 from `../index.html` (headless Chrome, 2× device scale) and from the live
build at <https://thiha-lynn.github.io/unilab/>.

**Regenerate:** these are rendered from the prototype file itself, so if a screen changes, re-run
the capture rather than editing a PNG. The prototype is the source; these are its output.

---

## The files

| File | What it is | Journey step |
|---|---|---|
| `00-prototype-board.png` | All four screens on one board, with the design-rule annotations | 1–5 |
| `01-S1-tool-picker.png` | **S1** — the student types what they want to *do* | 1 |
| `02-S2-work-stage.png` | **S2** — the estimate appears **before** the run | 2–4 |
| `03-S3-download-custody.png` | **S3** — the countdown, and *Delete now* | 5 |
| `04-S2D-desktop-two-pane.png` | **S2-D** — the same stage at ≥ 960 px, the layout a reviewer opens | 2–4 |
| `05-live-home-phone.png` | The **shipping product**, phone width | — |
| `06-live-home-desktop.png` | The **shipping product**, desktop | — |

**Why both prototype and live.** The rubric asks for a design draft, and the prototype is that
draft — drawn only from `design-system.md`, with nothing invented. The live shots exist to show
the draft is not aspirational: the product it describes is running. Do not substitute one for the
other; a reviewer asking "is this real?" should get both answers.

---

## The walkthrough — 5 minutes, in this order

Say the step, show the screen, name the artefact it traces to. **One thread, six documents.**

### 0 · Frame it — 20 seconds
> "One core workflow: **select a file → transform it on this device → download the result.**
> Fifty-eight tools are fifty-eight *settings* of that workflow, not fifty-eight workflows."

That sentence is the answer to the one-month, one-workflow constraint. Say it first, before any
screen, or the tool count reads as scope sprawl.

### 1 · S1 — `01-S1-tool-picker.png`
> "Step 1. She types **compress** — what she wants to do, not a menu she has to learn."

Point at the pill: **"Nothing is uploaded."** It is on screen before she has chosen anything.
→ traces to **F1**, and the pill is **LR1** made visible.

### 2 · S2 — `02-S2-work-stage.png`  ★ the screen that earns the marks
> "Steps 2 to 4. She picks the file, types the cap her LMS gave her — **5 MB** — and the estimate
> says **≈ 4.6 MB** *before* she runs anything."

This is **F5**, and it is the whole argument: she never burns a submission attempt finding out.
Then point at **"No download needed for this tool"** → **F12 / LR3**, network honesty.
→ **R1** one primary action, pinned to the foot. **R2** the input is 16 px so iOS does not zoom.

### 3 · S3 — `03-S3-download-custody.png`
> "Step 5. The result is in the vault. **29:47 until this is gone** — she can *watch* it, not
> trust a promise. And *Delete now* is the same purge the countdown performs."

→ **LR5**, and `test/vault-deletion.test.mjs` asserts both exits. Neither keeps the file.
If asked: **this is why we never say "we delete your files quickly" — we never receive them.**

### 4 · S2-D — `04-S2D-desktop-two-pane.png`
> "The same steps at the desktop breakpoint. Not a second design — the *widening* of S2:
> preview left, options right, same tokens, no new component."

→ **R3** three stages, never more.

### 5 · The live product — `05` / `06`
> "And it ships. This is the same workflow running at
> [thiha-lynn.github.io/unilab](https://thiha-lynn.github.io/unilab/), today."

**If there is a laptop: do the airplane-mode demo instead of showing `06`.** Turn the Wi-Fi off,
compress a file, download it. It works. That single act proves the custody claim better than any
slide, and it is the thing nobody else in the room can do.

---

## W1 → W4 — the thread a reviewer follows

Every screen above traces backwards. This is the chain, and it is the thing being graded.

| Week | Artefact | What it fixed | Where it shows up on screen |
|---|---|---|---|
| **W1** | [Company Charter](../../../01-requirements/03-charter/charter.html) | Who we are, the problem, the KPIs | The problem S1 opens on |
| **W2** | [`rule.md`](../../../../rule.md) → **LR1–LR8** | PDPA, CCA, ETA — compliance made *architectural* | S1's "Nothing is uploaded" pill (LR1) · S3's countdown (LR5) · S2's network note (LR3) |
| **W3** | [spec](../../../01-requirements/01-spec/20260826-01-unilab-core.md) **F1–F14 · NFR1–7** → [`backlog.md`](../../../01-requirements/backlog.md) | Every requirement numbered and prioritised | S2's estimate is **F5** · the disclosure is **F12** |
| **W4** | [feature list](../../feature-list.md) · [journey](../../user-journey.md) · [design system](../../design-system.md) · **prototype** · [D1–D4](../../diagrams.md) | What it does, how one task flows, what it looks like | **These screenshots** |

**Read it out loud in one sentence when asked "how does this trace?":**

> A student cannot verify a deletion promise *(W1 problem)* → so no file may leave the device
> *(W2, LR1)* → so the tool must show the result size before it runs *(W3, F5)* → so S2 puts the
> estimate above the button *(W4, this screenshot)*.

That is `pain → requirement → backlog → design`, said in one breath.

---

## The question you will be asked, and the answer

> **"How many users have you interviewed?"**

Answer it first, plainly, and do not let it arrive as a discovery at the end:

> "Fifteen, between 22 August and 8 September — MFU undergraduates from fifteen programmes,
> three per team member, in English, Thai and Burmese. Role, pain and quote only; no names
> anywhere in the repo. Twelve pains came out of them, and every requirement in the spec now
> traces to one. Two that we'd built — OCR and Workflows — had nobody behind them, so we parked
> them for this submission rather than pretend: the code stays, and whether they come back is a
> decision we've written down for next month."

**Lead with it, including the two that failed.** A reviewer who finds the unsupported
hypotheses themselves reads the pack as evasive; a team that names them first reads as one that
ran the research to learn something. Then the follow-up — *"tell me about one of them"* — is
answered from `results.md` by whoever interviewed that participant (the table at its foot says
who did which three).
