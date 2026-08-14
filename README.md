<p align="center">
  <img src="docs/banner.png" alt="UniLab — every tool a student needs, in one place" width="100%" />
</p>

<p align="center">
  <a href="https://mfu-hlaing.github.io/unilab/"><b>🎒 Open UniLab →</b></a>
</p>

<p align="center">
  <a href="https://github.com/mfu-hlaing/unilab/actions/workflows/deploy.yml"><img src="https://github.com/mfu-hlaing/unilab/actions/workflows/deploy.yml/badge.svg" alt="Deploy status" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-5b5bd6" alt="MIT license" /></a>
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-2a9d8f" alt="PRs welcome" /></a>
  <img src="https://img.shields.io/badge/servers-zero-e1972b" alt="Zero servers" />
</p>

**UniLab** is a free, open-source toolbox for students — think iLovePDF /
iLoveIMG, but with one radical difference: **everything runs 100% inside your
browser.** No uploads, no accounts, no ads, no task limits, no file-size caps,
and your documents never touch a server. Once loaded, it even works offline as
an installable PWA.

Built by students at Mae Fah Luang University for **1305493 Software
Engineering Case Studies** (1/2569) — and for every student who has fought an
LMS upload cap at 11:55pm.

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

## The tools (19)

| Category | Tools |
| --- | --- |
| 🖼️ **Image** | Compress (with *"must be under X MB"* target mode) · Resize · Crop (ID-photo presets) · Convert (JPG/PNG/WebP) · Images→PDF · **HEIC→JPG** |
| 📄 **PDF** | Merge · Split/Extract · Compress · PDF→Images · Organize (reorder/rotate/delete with thumbnails) · Watermark · Page Numbers |
| ✍️ **Text** | Word Counter (Unicode-correct — see below) · Citation Generator (APA 7 / MLA 9) |
| 🎓 **Study** | GPA Calculator (Thai university scale, saved on-device) · Pomodoro Focus Timer |
| 🧰 **Everyday** | QR Code Maker (link + Wi-Fi, never expires) · Unit Converter (incl. Thai land units ไร่/งาน/ตร.วา) |

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
git clone https://github.com/mfu-hlaing/unilab.git
cd unilab
npm install
npm run dev
```

Vite + vanilla JavaScript — no framework to learn. Processing is done by
[pdf-lib](https://pdf-lib.js.org), [pdf.js](https://mozilla.github.io/pdf.js/),
[browser-image-compression](https://github.com/Donaldcwl/browser-image-compression),
[cropperjs](https://fengyuanchen.github.io/cropperjs/),
[heic2any](https://github.com/alexcorvi/heic2any),
[jszip](https://stuk.github.io/jszip/) and
[qrcode](https://github.com/soldair/node-qrcode) — all in-browser.

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
