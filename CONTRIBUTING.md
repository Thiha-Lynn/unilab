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
  main.js                hash router + home page
  registry.js            the tool list — categories, ids, icons, lazy loaders
  styles.css             the entire design system (CSS custom properties)
  ui.js                  shared helpers: dropzone, file lists, progress, toasts
  tool-shell.js          the three-stage, two-pane frame the heavy tools run in
  option-ui.js           the sidebar option components (tabs, steppers, chips…)
  vault.js               finished files + the auto-clear countdown
  ops.js                 composable operations behind Workflows
  pdf-utils.js           pdf.js setup (worker registration, page rendering)
  media-utils.js         video/audio engine: probe, convert, frame extraction
  media-ui.js            media widgets: preview player, trim timeline, job progress
  tools/*.js             one module per tool
```

## The two kinds of tool

Small tools (GPA calculator, unit converter, word counter) render straight into
`container` with the helpers from `ui.js`. Anything that takes files and produces
files should use **the tool shell** instead:

```js
import { toolShell } from '../tool-shell.js';

export default function render(container, tool) {
  toolShell(container, tool, {
    accept: 'application/pdf,.pdf',
    actionLabel: 'Split PDF',
    options(host, ctx) { /* build the sidebar from option-ui.js */ },
    workarea(host, ctx) { /* draw what the settings will do */ },
    async run(ctx) { return { outputs: [{ name, blob }] }; },
    continueTo: ['merge-pdf', 'compress-pdf'],
  });
}
```

The shell gives every tool the same three stages — choose files, work, download —
plus cancellation, progress, the auto-clear countdown, and the "Continue to…"
hand-off. `src/tools/split-pdf.js` is the reference implementation; copy its shape.

Two rules that carry most of the quality:

- **The workarea shows the operation, not the file.** Split PDF draws the pages
  grouped into the ranges the sidebar currently describes; Crop PDF draws the crop
  rectangle on the page. A file card with a filename under it is the fallback, not
  the goal.
- **Every tool has a live-explain sentence** (`liveExplain()` from `option-ui.js`)
  that restates the current settings in plain English before the user commits.

## Files are never stored

`vault.js` holds finished outputs in memory only, counts down, and drops them —
on the timer, when the tab closes, or when the user presses the bin. Nothing is
written to Cache Storage or OPFS, because a countdown you can verify is worth more
than results that survive a reload. Don't add persistence without a very good
reason.

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

## Adding a media tool (video & audio)

Media tools run on [Mediabunny](https://mediabunny.dev), which drives the
browser's **WebCodecs** API — the same hardware decoder the video player uses.
That is why a 500 MB lecture recording can be trimmed in a few seconds without
being uploaded anywhere. We deliberately did *not* use `ffmpeg.wasm`: it would
mean shipping ~31 MB of WebAssembly and decoding on the CPU.

Never call Mediabunny directly from a tool. Go through `media-utils.js`:

```js
const probe = await probeMedia(file);          // duration, video{…}, audio{…}
const { blob, ext, warnings } = await convertMedia({
  file, container: 'mp4',
  video: { width, height, fit: 'cover', codec: await pickVideoCodec('mp4', { width, height }) },
  audio: { codec: await pickAudioCodec('mp4'), quality: quality(128_000) },
  trim: { start, end },
  onProgress: (fraction) => job.update(fraction),
  signal,                                       // from jobProgress().start()
});
```

Rules specific to media tools:

- Start with `if (!requireWebCodecs(container)) return;` in any tool that
  decodes or encodes. Older browsers get a friendly explanation instead of a
  broken page.
- Use `jobProgress()` from `media-ui.js`, not the plain progress bar — a media
  job can run for a minute and **must** be cancellable. Call `job.stop()` on
  the failure path too.
- `forceTranscode: true` when the point of the tool is to re-encode (compress,
  resize). Leave it off when a copy is the point (trim, container swap) — then
  the job is near-instant and lossless.
- `mediaPreview()` returns a `destroy()`; call it before loading another file
  or you keep the whole video in memory. Recorders must `stop()` every
  `MediaStreamTrack` and clean up on `hashchange`.
- Always pass `warnings` from `convertMedia` into `resultCard` — that is how a
  user learns their browser could not encode one of the tracks.
- MP3 encoding needs `await ensureMp3Encoder()` first; browsers ship an MP3
  decoder but almost never an encoder.
- Frame loops (`streamFrames`, `grabFrames`) must `await yieldToBrowser()` each
  iteration, and must never hold on to the canvas the sink handed them — those
  canvases are pooled and reused.

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
