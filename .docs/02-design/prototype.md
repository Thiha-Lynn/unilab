# Prototype — three core screens

**Course:** 1305493 · W4 · 2 Sep 2026
**File:** [`prototype/index.html`](prototype/index.html) — open it in any browser
**Built from:** [`design-system.md`](design-system.md) tokens only + [`user-journey.md`](user-journey.md) step order

Lo-fi on purpose. This tests the **flow**, not the polish.

---

## The three screens

| Screen | Journey steps | What it has to prove |
|---|---|---|
| **S1 · Tool picker** | 1 | A student finds the right tool by typing what they want to *do*, not by learning a menu. |
| **S2 · Compress PDF, work stage** | 2 – 4 | The estimate appears **before** the run. Options live in the sidebar; the single primary action is pinned to the foot. |
| **S3 · Download & custody** | 5 | The countdown is watchable and the result is destroyable on demand. |

All three are drawn at 480 px, the phone width, because the phone is the primary device for
this user (spec §1.1). The desktop layout widens S2 into the two-pane work stage; it does not
change the steps.

---

## Design-system compliance

Checked mechanically, not asserted:

```
grep -o "#[0-9a-f]\{6\}" prototype/index.html | sort -u   →  19 hexes, all inside :root
awk '/:root\{/,/\}/{next} /#[0-9a-f]{6}/'                 →  0 matches
```

**Zero rogue colours.** Every hex in the file is a token declaration copied verbatim from
`src/styles.css`; no rule outside `:root` names a colour directly.

| Rule | How this prototype obeys it |
|---|---|
| **R1** — one primary action per screen | S2 has exactly one `--accent` button (`Compress PDF`), pinned to `.foot`. S3's `Download` is the single primary; `Delete now` is `--danger`, `Continue to…` is ghost. |
| **R2** — targets ≥ 38 px, inputs 16 px on phones | `.btn { min-height:38px }`, `.seg span { min-height:38px }`, `.search` and `.num input` are `font-size:16px`. |
| **R3** — three stages, never more | S1 → S2 (uploader+work) → S3 (downloader). No fourth screen. |
| **R4** — existing vocabulary only | Tool card, search field, `segmented`, `numberField` + unit, `liveExplain`, `fileFacts`, pinned foot. Nothing invented. |
| **R5** — destructive is `--danger`, and honest | `Delete now` is the only red control and it does exactly what it says. |
| **R6** — state the cost first | S2 shows `≈ 4.6 MB — under your 5 MB cap` before the run, plus an explicit "no download needed for this tool" note. |
| **R7** — `[hidden]` | Not exercised in a static prototype; recorded so the built screens keep it. |

---

## What the screens changed about the design

Two things surfaced only once the screens existed:

1. **The estimate has to name the user's own number back to them.** "≈ 4.6 MB" alone does not
   answer the question; "≈ 4.6 MB — **under your 5 MB cap**" does. The comparison, not the
   figure, is what closes the step-3 decision in D4.
2. **The custody countdown needs a sentence, not just a timer.** A bare `29:47` reads as a
   restriction. The line "held in this tab's memory only… deleted the moment you close this tab"
   is what turns it from a limitation into the product's central claim.

---

## Known gaps in this prototype

- The **desktop** two-pane layout is not drawn. Mobile-first is deliberate, but the gate design
  should show both; W5 addition.
- Only the **happy path** is drawn. The step-3 "misses the cap" branch exists in D4 but has no
  screen — it re-renders the same estimate, so it needs no new screen, but that should be said
  rather than assumed.
- Screens are **static HTML**. Not clickable; the flow is verified by reading D4 alongside them.
