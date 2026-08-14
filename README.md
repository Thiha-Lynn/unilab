# 🎒 UniLab — Every tool a student needs, in one place

A free, private, student-friendly toolbox website (think iLovePDF / iLoveIMG, but built
for students): PDF tools, image tools, and daily study utilities — with **100% client-side
processing**. Files never leave the device: no uploads, no server, no sign-up, no ads.

Built for **1305493 Software Engineering Case Studies** (Mae Fah Luang University, 1/2569).

## The one core workflow

> **Select file(s) → transform locally in the browser → download the result.**

Every file tool is a parameterization of this single pipeline (one dropzone component,
one transform layer, one download/ZIP step). Tools are plugin modules registered in
`src/main.js` — adding a tool never adds a workflow.

**Stated architecture trade-off:** fully client-side processing gives us privacy
(PDPA-friendly by construction — no personal data ever transferred), zero server cost, and
instant results on slow campus Wi-Fi — in exchange, we cannot offer heavy conversions that
need server-grade fidelity (e.g. PDF→Word), and PDF compression rasterizes text.

## Tools (16, all working)

| Category | Tools |
| --- | --- |
| Image | Compress (target-KB mode), Resize, Crop (ID-photo presets), Convert, Images→PDF |
| PDF | Merge, Split/Extract, Compress, PDF→Images, Organize (reorder/rotate/delete) |
| Text | Word counter (Thai-aware via `Intl.Segmenter`), Citation generator (APA 7 / MLA 9) |
| Study | GPA calculator (MFU scale, saved locally), Pomodoro focus timer |
| Everyday | QR code maker (link + Wi-Fi, never expires), Unit converter (incl. ไร่/งาน/ตร.วา) |

## Run it

```bash
npm install
npm run dev        # dev server
npm run build      # production build → dist/ (static, deploy anywhere)
```

## Stack

Vite + vanilla JavaScript. Processing libraries (all in-browser):
[pdf-lib](https://pdf-lib.js.org) (PDF create/merge/split/rotate),
[pdf.js](https://mozilla.github.io/pdf.js/) (PDF rendering — note: we render with
`intent: 'print'` so jobs keep running in backgrounded tabs),
[browser-image-compression](https://github.com/Donaldcwl/browser-image-compression)
(target-size compression), [cropperjs](https://fengyuanchen.github.io/cropperjs/),
[jszip](https://stuk.github.io/jszip/), [qrcode](https://github.com/soldair/node-qrcode).

## AI use disclosure

Initial prototype scaffolded with AI assistance (Claude); market research on competitor
tool suites and student pain points was AI-assisted. All code is reviewed, tested and
owned by the team.
