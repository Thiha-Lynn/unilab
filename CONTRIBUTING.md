# Contributing to UniLab

Thanks for helping build the toolbox every student deserves! UniLab is a
student-run open-source project from Mae Fah Luang University. Contributions of
all sizes are welcome — a typo fix, a translation, a whole new tool.

## The one rule that never bends

**Everything runs 100% in the browser.** No servers, no uploads, no analytics,
no trackers. A user's file must never leave their device. If a feature can't be
built client-side, it doesn't go in — this is our privacy promise (and our PDPA
compliance story), not just an implementation detail.

## Getting started

```bash
git clone https://github.com/mfu-hlaing/unilab.git
cd unilab
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

No frameworks — the app is Vite + vanilla JavaScript. If you can read HTML and
JS, you can contribute.

## Project structure

```
index.html               app shell
public/                  static assets, PWA manifest, service worker
src/
  main.js                tool registry + hash router + home page
  styles.css             the entire design system (CSS custom properties)
  ui.js                  shared helpers: dropzone, file lists, progress, toasts
  pdf-utils.js           pdf.js setup (worker registration, page rendering)
  tools/*.js             one module per tool
```

## Adding a new tool (3 steps)

1. **Create `src/tools/your-tool.js`** that default-exports
   `render(container)`. Copy the closest existing tool as a starting point —
   `merge-pdf.js` for single-file PDF tools, `convert-image.js` for batch
   image tools, `unit-converter.js` for no-file utilities.
2. **Register it** in the `TOOLS` array in `src/main.js` (id, name, one emoji
   icon, category, one-line description written for students, lazy `load`).
3. **Test it in the browser** with real files, including at least one
   non-Latin-script filename and, for text tools, Thai/Burmese input.

Conventions the codebase follows (please match them):

- Use the shared helpers from `ui.js` — don't hand-roll dropzones or progress
  bars, and don't add new global CSS classes for one tool.
- Long loops over pages/files must update the progress bar and yield with
  `await new Promise((r) => setTimeout(r, 0))` — **never**
  `requestAnimationFrame`, which stalls forever in backgrounded tabs.
- pdf.js rendering goes through `renderPage()` in `pdf-utils.js` (it uses
  `intent: 'print'` for the same backgrounded-tab reason).
- Errors surface through `errorBox()` with a plain-English message that says
  what to do next; never leave a silent failure.
- Output filenames: `<original-stem>-<what-happened>.<ext>`.

## Text & language handling

Students here write in English, Thai, and Burmese — often in one document.

- Count **words** with `Intl.Segmenter` (`granularity: 'word'`), never by
  splitting on spaces.
- Count **characters** as grapheme clusters (`granularity: 'grapheme'`), never
  with `.length` — Burmese ရွဲ့ is one character, not four.
- Treat zero-width spaces (U+200B) as spaces; recognize ။ and ។ as sentence
  ends.

## Pull requests

- One change per PR; keep them small enough to review in a few minutes.
- Describe **what you tested in the browser** — "it builds" is not tested.
- CI deploys `main` straight to GitHub Pages, so `main` must always work.

## Reporting bugs / requesting tools

Use the issue templates. For bugs, the file that triggered the problem (or an
exact description of it) matters more than anything else — but **never upload
private documents to an issue**; describe them instead.
