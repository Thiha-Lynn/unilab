# Design system — UniLab

**Course:** 1305493 · W4 · 2 Sep 2026 · **Revised:** 23 Sep 2026 (premium visual pass)
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

The look is **warm ivory paper, near-black ink, champagne-gold detailing**, with serif display
headings. Every token has a dark-mode value, applied under `@media (prefers-color-scheme: dark)`.

### 1.1 Surface & text

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#f7f4ee` | `#0d0e11` | Page ground. Never white — cards must lift off it. |
| `--bg-2` | `#efe9df` | `#121318` | Secondary ground, for a recessed band inside a page. |
| `--card` | `#fffdf9` | `#15171c` | Any raised surface: tool card, panel, sidebar, modal. |
| `--ink` | `#16171b` | `#eeeae2` | Primary text and headings. |
| `--muted` | `#5d5850` | `#aaa498` | Secondary text, descriptions, hints. |
| `--faint` | `#857f75` | `#7b766c` | Metadata, placeholders, disabled labels. |
| `--line` | `#e6dfd3` | `#26282f` | Every border and divider. |
| `--line-strong` | `#d6cbb8` | `#3a3a3f` | Input borders, secondary-button outlines, dashed group frames. |

### 1.2 Accent, gold & state

| Token | Light | Dark | Use |
|---|---|---|---|
| `--accent` | `#16171b` | `#e5d2a4` | The single primary action on a screen (ink-black; champagne in dark). |
| `--accent-strong` | `#000000` | `#f2e4c2` | Hover / pressed state of that action only. |
| `--accent-soft` | `#f1ebdf` | `#221f18` | Selected chips, active tabs, accent-tinted fills. |
| `--on-accent` | `#fffdf9` | `#16171b` | Text on an `--accent` fill. Never hardcode `#fff` on `--accent`. |
| `--gold` | `#a8843f` | `#d9bb7c` | Decorative detailing only: focus rings, hairlines, hover borders. Not for body text in light mode (3.2:1). |
| `--gold-ink` | `#8a6a32` | `#d9bb7c` | Gold used **as text** — eyebrow, italic headline accent, logo, links on hover (≥ 4.5:1). |
| `--gold-soft` | `#f3ead8` | `#26211a` | Dropzone fill, secondary-button hover, the hero glow. |
| `--good` | `#2f7a5c` | `#62c194` | Success, "done", the privacy pill. |
| `--good-soft` | `#e8f1eb` | `#13271e` | Success background fill. |
| `--warn` | `#b86e12` | `#e4a24a` | A caution the user can proceed past — e.g. a disclosed download. |
| `--danger` | `#b3413a` | `#e0706a` | Destructive only: "Delete now", remove a file. |

### 1.3 Category colours

One deep jewel tone per tool category. Used for the tool's icon tile, its category label, the
card's hover accent line, and the tool page's own action buttons (`--cc`). Every value holds
**≥ 5:1 contrast with white text**, so buttons stay readable. In dark mode the category label
is mixed toward `--ink` for legibility.

| Token | Value | Category |
|---|---|---|
| `--c-image` | `#a3456a` | Image (13 tools) |
| `--c-pdf` | `#a8433a` | PDF (20) |
| `--c-video` | `#93641f` | Video (7) |
| `--c-audio` | `#24707e` | Audio (11) |
| `--c-text` | `#36628f` | Text (2) |
| `--c-study` | `#2d7156` | Study (2) |
| `--c-utility` | `#684a9a` | Everyday (3) |

### 1.4 Shape, depth, type, motion, space

| Token | Value | Rule |
|---|---|---|
| `--radius` | `16px` | Base radius. Controls `10–12px`; icon tiles `9–11px`; large surfaces (tool cards, panels, work stage, modals) `18–22px`. |
| `--shadow` | `0 1px 1px rgba(40,32,20,.04), 0 2px 6px rgba(40,32,20,.04), 0 18px 40px -18px rgba(40,32,20,.16)` | Resting depth for every raised surface. Warm-tinted, never grey. |
| `--shadow-lift` | `0 1px 2px rgba(40,32,20,.05), 0 10px 20px -8px rgba(40,32,20,.12), 0 30px 60px -24px rgba(40,32,20,.22)` | Hover / elevated state only: a hovered card, the work stage, modals, toasts. These two are the **only** shadows. |
| `--font-sans` | `-apple-system, BlinkMacSystemFont, "Segoe UI Variable Text", "Segoe UI", Inter, system-ui, "Noto Sans Thai", "Noto Sans Myanmar", sans-serif` | Body and UI text. **`Noto Sans Thai` is not optional** — a large part of the user base reads Thai, and a missing Thai face renders as tofu. |
| `--font-display` | `"Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", "URW Palladio L", Georgia, "Noto Serif", "Noto Serif Thai", serif` | Headings only: hero, tool title, sidebar title, done title, logo, stat numbers. **System fonts only — no web-font request**, so nothing is fetched from a third party (privacy + offline). |
| `--ease` | `cubic-bezier(.2, .7, .2, 1)` | The one easing curve. Transitions 0.12–0.35 s. All motion is disabled under `prefers-reduced-motion`. |
| Type scale | `10.5 · 11 · 11.5 · 12 · 12.5 · 13 · 13.5 · **14** · 14.5 · 15 · 16 · 18 · 19 · 20 · 21 · 22 px`, privacy h1 `40px`, hero `clamp(34px, 5.6vw, 64px)` | `14px` is the body default. Display headings use weight 500–600; small caps labels use letter-spacing `.14–.22em`. Do not introduce a size outside this scale. |
| Space scale | `6 · 8 · 10 · 12 · 14 · 16 · 18 · 22 · 30 · 34 px`, hero top `64px` (phone `34px`) | Multiples of 2 from a 10–14 px base. |
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

**R8 — Gold is a detail, never a surface.** `--gold` / `--gold-ink` appear only as hairlines,
focus rings, small-caps labels, an italic headline accent, and hover states. A gold-filled
button or a gold background panel breaks the look. Text in gold always uses `--gold-ink`.

**R9 — Style overrides live in the premium layer.** The visual polish is one block at the end of
`styles.css`. It must not set the paddings or font sizes that the phone
`@media (max-width: 640px)` rules control; desktop-only spacing goes in
`@media (min-width: 641px)`. Otherwise the later block silently overrides the mobile layout.

---

## 3. What the prototype may and may not do

| May | May not |
|---|---|
| Use any token in §1 | Introduce a colour, radius, or shadow not in §1 |
| Use the components named in R4 | Invent a new component or CSS class |
| Show all three stages | Add a fourth stage or a second primary action |
| Be lo-fi and unstyled in places | Contradict the user-journey step order |
| Use `--font-display` for headings | Load a web font from a third-party server |
