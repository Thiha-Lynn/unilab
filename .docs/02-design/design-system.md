# Design system — UniLab

**Course:** 1305493 · W4 · 2 Sep 2026
**Source of truth:** [`src/styles.css`](../../src/styles.css) `:root`, and the component
vocabulary in [`src/option-ui.js`](../../src/option-ui.js).

This file is to the UI what `rule.md` is to the law: institutional knowledge an agent applies
every time it draws a screen. **It was extracted from the shipping product, not invented** — the
values below are the ones a browser actually renders today, so the prototype and the app cannot
drift apart.

> **Rule zero:** never hardcode a hex, a radius, or a shadow. If a value is not a token here, it
> does not go in a screen. Add the token first.

---

## 1. Tokens

### 1.1 Surface & text

| Token | Value | Use |
|---|---|---|
| `--bg` | `#f6f7fb` | Page ground. Never white — cards must lift off it. |
| `--card` | `#ffffff` | Any raised surface: tool card, panel, sidebar, modal. |
| `--ink` | `#171c26` | Primary text and headings. |
| `--muted` | `#5b6472` | Secondary text, descriptions, hints. |
| `--faint` | `#8a93a2` | Metadata, placeholders, disabled labels. |
| `--line` | `#e4e7ee` | Every border and divider. One line colour, no exceptions. |

### 1.2 Accent & state

| Token | Value | Use |
|---|---|---|
| `--accent` | `#5b5bd6` | The single primary action on a screen. |
| `--accent-strong` | `#4747c2` | Hover / pressed state of that action only. |
| `--accent-soft` | `#eeeefc` | Selected chips, active tabs, accent-tinted fills. |
| `--good` | `#1d9e77` | Success, "done", the privacy pill. |
| `--good-soft` | `#e4f6ef` | Success background fill. |
| `--warn` | `#d97706` | A caution the user can proceed past — e.g. a disclosed download. |
| `--danger` | `#d64545` | Destructive only: "Delete now", remove a file. |

### 1.3 Category colours

One hue per tool category, used for the tool-card icon tile and nothing else. Never as a text
or background colour.

| Token | Value | Category |
|---|---|---|
| `--c-image` | `#d64593` | Image (13 tools) |
| `--c-pdf` | `#d65045` | PDF (20) |
| `--c-video` | `#d3891a` | Video (7) |
| `--c-audio` | `#0e9bb5` | Audio (11) |
| `--c-text` | `#3d8bd6` | Text (2) |
| `--c-study` | `#1d9e77` | Study (2) |
| `--c-utility` | `#9147d6` | Everyday (3) |

### 1.4 Shape, depth, type, space

| Token | Value | Rule |
|---|---|---|
| `--radius` | `14px` | Cards and panels. Controls use `10px`; icon tiles `9px`. |
| `--shadow` | `0 1px 2px rgba(23,28,38,.05), 0 10px 30px rgba(23,28,38,.07)` | The **only** shadow. Two layers: a contact shadow and a soft lift. |
| Font stack | `-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, system-ui, "Noto Sans Thai", sans-serif` | **`Noto Sans Thai` is not optional** — a large part of the user base reads Thai, and a missing Thai face renders as tofu. |
| Type scale | `11 · 12 · 12.5 · 13 · 13.5 · **14** · 14.5 · 15 · 16 · 18 · 19 px`, hero `clamp(28px, 4.5vw, 44px)` | `14px` is the body default. Do not introduce a size outside this scale. |
| Space scale | `6 · 8 · 10 · 12 · 14 · 16 · 18 · 22 · 30 px` | Multiples of 2 from a 10–14 px base. |
| Breakpoints | `640px` phone · `900px` tablet/stack · `1440px` wide | Mobile-first: write the phone rule, widen upward. |

---

## 2. Component rules

Rules an agent can act on — each is checkable by looking at a screen.

**R1 — One primary action per screen.** Exactly one `--accent` button is visible at a time. It
is the tool's action button, pinned to the bottom of the sidebar (`.ts__side__foot`). Everything
else is secondary or ghost. If a screen seems to need two primary actions, one of them belongs
on the next stage.

**R2 — Touch targets ≥ 38 px, and text inputs are 16 px on phones.** Under `@media (hover: none)`
icon buttons become 38×38. Under `@media (max-width: 640px)` every text-entry control goes to
`font-size: 16px` — **not for readability, but because iOS Safari zooms the whole page when a
focused control is under 16px.** Dropping below either number is a bug, not a style choice.

**R3 — Three stages, never more.** Every heavy tool runs in `tool-shell.js`:
`uploader → work → downloader`, driven by `data-stage`. The work stage is two panes — live
preview left, options sidebar right — which stack vertically under 900 px. A tool that needs a
fourth stage has been mis-scoped.

**R4 — Use the existing sidebar vocabulary; do not invent CSS classes.** Options are built from
`option-ui.js`: `tabCards`, `segmented`, `numberField`, `measureField`, `sliderField`,
`tokenSelect`, `checkRow`, `colorField`, `repeatRows`, `fileFacts`, `liveExplain`, `infoBox`.
If a control is missing, add it to `option-ui.js` so every tool gets it — never inline it.

**R5 — Every destructive control is `--danger` and every one is reversible or confirmed.**
"Delete now" in the vault is the model: red, unmistakable, and it does exactly what it says.

**R6 — State the cost before the user pays it.** Any control that triggers a network fetch or a
long job must show what will happen first — `liveExplain` for the estimate, an explicit note for
a download (F12 / LR3). A spinner that appears without warning is a design defect here, not a
loading state.

**R7 — Hidden is hidden.** `[hidden] { display: none !important; }` is in `styles.css` because
`[hidden]` is `display:none` at the lowest specificity and any `display:flex/grid` component
silently ignores it. Toggle visibility with `el.hidden`, never by editing `style.display`.

---

## 3. What the prototype may and may not do

| May | May not |
|---|---|
| Use any token in §1 | Introduce a colour, radius, or shadow not in §1 |
| Use the components named in R4 | Invent a new component or CSS class |
| Show all three stages | Add a fourth stage or a second primary action |
| Be lo-fi and unstyled in places | Contradict the user-journey step order |
