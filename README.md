# UniLab coursework

Assignment evidence and the retained application baseline for **1305493 Software Engineering Case Studies**, Mae Fah Luang University.

[Open UniLab](https://unilab.ztvmm.live/) · [Product source and downloads](https://github.com/Thiha-Lynn/unilab-releases) · [Coursework preview](https://thiha-lynn.github.io/unilab/)

## Repository separation

This repository is the **assignment and coursework record**, with the v0.2.0 application baseline retained for traceability. The independently maintained product source, Android APK, desktop installers and all releases from v0.3.0 live in [Thiha-Lynn/unilab-releases](https://github.com/Thiha-Lynn/unilab-releases).

- **Assignment / evidence:** this repository and its `.docs/` directory.
- **Product source / release builds:** `unilab-releases/app`, `desktop` and `mobile`; its build pipeline does not check out this assignment repository.
- **Canonical product:** [unilab.ztvmm.live](https://unilab.ztvmm.live/).
- **Coursework preview:** [GitHub Pages](https://thiha-lynn.github.io/unilab/), built from this repository's baseline.

The product packages use their documented dependency licenses (including AGPL background removal); original UniLab source retains its MIT notices. Product releases do not establish lecturer approval or a passed Week 5 gate. Those outcomes remain pending the presentation and must be recorded from actual feedback.

## Coursework — start here if you are grading this

Everything for the course lives in [`.docs/`](.docs/). The one-screen map is
[`.docs/README.md`](.docs/README.md); the traceability chain is
[`TRACEABILITY.md`](.docs/01-requirements/TRACEABILITY.md).

| W5 User Validation Gate requires | Where it is |
|---|---|
| 1 · Updated Proposal — problem statement + target users | [`proposal.md`](.docs/01-requirements/proposal.md) |
| 2 · Product Backlog | [`backlog.md`](.docs/01-requirements/backlog.md) |
| 3 · Design draft — feature list, user journey, prototype, 4 diagrams | [`.docs/02-design/`](.docs/02-design/) — [feature-list](.docs/02-design/feature-list.md) · [user-journey](.docs/02-design/user-journey.md) · [design-system](.docs/02-design/design-system.md) · [prototype](.docs/02-design/prototype/index.html) · [**D1–D4**](.docs/02-design/diagrams.md) |
| 4 · Compliance — `rule.md` + the legal spec traced from W2 | [`rule.md`](rule.md) · [spec §4 LR1–LR8](.docs/01-requirements/01-spec/20260826-01-unilab-core.md) · [W2 original, verbatim](.docs/01-requirements/04-legal/rule-as-submitted-20260819.md) |

**Evidence position, stated plainly:** the gate also requires **≥ 5 real users interviewed**.
**15 were interviewed between 22 Aug and 8 Sep 2026** — MFU undergraduates from 15 programmes,
three per team member, recorded as role, pain and quote only (LR7) in
[`results.md`](.docs/01-requirements/02-interviews/results.md). Twelve pains (`P1`–`P12`) came
out of them, and every requirement in the spec now traces to one. Two shipped features — OCR and
Workflows — traced to hypotheses **no participant raised**, so they are **parked** for the gate
(spec §2.1, Q5, Q6) rather than papered over: ids kept, code untouched, decision in W6. The interview instrument is in
[all questions, EN/TH/MY](.docs/01-requirements/02-interviews/ALL-QUESTIONS.md).

## Why client-side?

| | Upload-based sites | UniLab |
|---|---|---|
| Your transcript / ID scan | goes to their server | never leaves your device |
| Free tier | 2 tasks/day, size caps, ads, watermarks | everything, always |
| Slow campus Wi-Fi | upload + download round-trip | instant |
| Offline | ✗ | ✓ (PWA) |
| PDPA / privacy story | a policy you must trust | an architecture you can verify |

The trade-off, stated honestly: no server-grade conversions (PDF→Word needs a
server; we don't do it), and PDF compression rasterizes text. We think that's
the right trade for student daily life.

## The tools (59)

| Category | Tools |
| --- | --- |
| **Image** (13) | Compress (*"must be under X MB"* target mode) · Resize · Crop (ID-photo presets) · Convert · Images→PDF · **HEIC→JPG** · Add Text · Rotate · Watermark · **Remove Background** · **Blur Faces** · Enlarge (Lanczos-3) · Photo Editor |
| **Video** (7) | Compress · Trim · Convert · Resize for 9:16/1:1/16:9 · Video→GIF · Video→Photos · Screen Recorder |
| **Audio** (11) | **Enhance Voice** (one-press clean-up) · **Remove Noise** (spectral + optional on-device neural) · Fix Volume (LUFS) · Change Speed (pitch-preserved) · Cut Silences · Equalizer (live preview) · Join Audio · Extract Audio · Trim · Convert · Voice Recorder |
| **PDF** (21) | **Lecture HTML→PDF** · Merge (page ranges + contents page) · Split (named parts) · Compress (3 levels or a size cap) · Rotate · PDF→Images · Organize · Watermark · Page Numbers · **Sign** · Crop · **Edit** · **OCR (19 languages)** · Fill Form · Unlock · **Redact** · Compare · PDF→Markdown · Scan to PDF · Word→PDF · Excel→PDF |
| **Text** (2) | Word Counter (Unicode-correct — see below) · Citation Generator (APA 7 / MLA 9) |
| **Study** (2) | GPA Calculator (Thai university scale, saved on-device) · Pomodoro Focus Timer |
| **Everyday** (3) | **Workflows** · QR Code Maker (link + Wi-Fi, never expires) · Unit Converter (incl. Thai land units ไร่/งาน/ตร.วา) |

### Lecture HTML → PDF

Select a self-contained .html lecture, review every slide, and download a PDF on
the same device. Original-layout mode preserves slides, embedded diagrams and CSS;
portrait reading mode makes a one-column copy. The download uses page images for
consistent display in PDF readers. Browser Print / Save PDF can retain selectable
text. JavaScript is disabled; external assets and script-generated content are
not fetched. The UI reports missing images and script limitations. Limits: 20 MB,
150 pages. Actual W3 (34 slides) and W4 (18 slides) lectures are local QA references,
not redistributed in this repository.

### Workflows — chained tools, free

iLovePDF sells *Workflows* as a Premium feature, and it has to be paid for: every hop
in a chain costs them another upload, another store and another download. In a browser
the file is already in memory, so a chain is not only free — it is **faster** than
running the tools one at a time.

Pick your steps, save the chain, drop your files in. Ready-made ones cover the evenings
that actually happen: *photos of notes → one small numbered PDF*, *lecture video → a
64 kbps MP3*, *report → stamped DRAFT and numbered*.

### The audio lab

Adobe's Podcast Enhance does its cleaning on Adobe's servers. UniLab's audio lab does
real signal processing in the tab: spectral noise gating that learns the room from the
gaps between sentences, mains-hum notching, LUFS loudness normalisation, pitch-preserving
speed change, silence cutting that tells you how many minutes it saves — and an optional
**neural voice mode** running RNNoise as WebAssembly, bundled with the site (112 KB,
same-origin, works offline). Honest limits, stated in the tools themselves: steady
background noise comes out; a voice drowned by a passing truck does not come back.

### Video and audio, which no comparable site has

Neither iLovePDF nor iLoveIMG has a single video or audio tool. UniLab has **eighteen**
— 7 video and 11 audio. The video side runs on **WebCodecs**, the browser API that hands a
page the same hardware decoder the video player uses; the audio side runs on our own
`audio-fx.js` (FFT, spectral gate, LUFS, WSOLA). That is how a 500 MB lecture recording gets trimmed in seconds without being
uploaded. We deliberately did *not* use `ffmpeg.wasm`: it would mean shipping ~31 MB of
WebAssembly and decoding on the CPU.

### Your files are never stored — and you can watch the clock

Finished files live in this tab's memory with a countdown on screen, and are dropped when
it runs out, when you close the tab, or when you press the bin. Upload-based sites show
you the same countdown; the difference is that theirs is a promise about a copy on their
servers, and ours is about the only copy there has ever been.

## Unicode done right 🇹🇭🇲🇲

Most counters get Southeast Asian scripts wrong. UniLab counts what you
actually see:

- Burmese **ရွဲ့** = **1 character** (not 4) — grapheme-cluster counting via
  `Intl.Segmenter`, with a separate *code points* stat for portals that count
  the raw way, and a combo inspector that shows the decomposition (ရ + ွ + ဲ + ့).
- Thai **สวัสดี** = 4 characters, and word counting works without spaces.
- Zero-width spaces (the invisible separators in Myanmar text) count as
  spaces; **။** and **។** count as sentence ends.
- 👨‍👩‍👧‍👦 = 1 character, like your eyes say.

## Run it locally

```bash
git clone https://github.com/Thiha-Lynn/unilab.git
cd unilab
npm install
npm run dev
```

Vite + vanilla JavaScript — no framework to learn. Processing is done by
[pdf-lib](https://pdf-lib.js.org), [pdf.js](https://mozilla.github.io/pdf.js/),
[mediabunny](https://mediabunny.dev) (WebCodecs video/audio),
[tesseract.js](https://tesseract.projectnaptha.com) (OCR),
[mammoth](https://github.com/mwilliamson/mammoth.js) (.docx),
[browser-image-compression](https://github.com/Donaldcwl/browser-image-compression),
[cropperjs](https://fengyuanchen.github.io/cropperjs/),
[heic2any](https://github.com/alexcorvi/heic2any),
[gifenc](https://github.com/mattdesl/gifenc),
[jszip](https://stuk.github.io/jszip/) and
[qrcode](https://github.com/soldair/node-qrcode) — all in-browser.

Two tools download a model on first use — OCR fetches its language data, and Remove
Background fetches an ONNX model. Both are gated behind an explicit button that states
the size, and in both cases it is the *engine* that is downloaded: your file stays here.

## What we deliberately don't do

PDF→Word, PDF→PowerPoint, PDF→Excel, HTML→PDF, password *protection*, PDF/A and repair
all need a server, so they are not here. Neither is an AI summariser or translator: those
send your document to a model provider, which is the exact thing this project exists to
avoid. Compress PDF rasterises pages, so its output has no selectable text — the tool
says so on screen.

Deploys to GitHub Pages automatically on every push to `main`
([workflow](.github/workflows/deploy.yml)).

## Contributing

New tools, translations (Thai/Burmese UI is on the roadmap), bug reports and
first-time contributions are all welcome — a new tool is ~1 file plus a
registry entry. Start with **[CONTRIBUTING.md](CONTRIBUTING.md)**; the one
unbendable rule is that everything must run client-side.

## AI use disclosure

Prototype scaffolding and market research were AI-assisted (Claude), as
encouraged by the course's AI-first policy. All code is reviewed, tested in
the browser with real files, and owned by the team.

## License

[MIT](LICENSE) — free to use, learn from, and fork.

## Current release and Week 6

Production and rollback: [ops/README.md](ops/README.md). CI runs tests and enforces
the offline size budget before publishing the Pages preview. Production is an
explicit, tested, atomic release; its commit is visible at `/release.json`.

[Week 6 scope and evidence](.docs/03-build/20260916-week6.md) distinguishes shipped
software from course approval and pending physical-device evidence.

### UniLab 0.2.0 — installation and sharing

[Install or download UniLab](https://unilab.ztvmm.live/#/install). Android and
 iOS/iPadOS use the home-screen web app. macOS, Windows and Linux preview packages
are maintained in [unilab-releases](https://github.com/Thiha-Lynn/unilab-releases),
with a pinned source revision, build workflows, SHA-256 checksums and explicit
platform testing notes. These are unsigned previews, not app-store releases.

The static HTML includes Open Graph and Twitter large-image metadata and a
1200 × 630 PNG. Regenerate it with `node scripts/social-card.mjs`. Chat services
may cache previews of previously shared links; the site cannot force a refresh
of an existing message. Hash routes share the same site-wide card.
