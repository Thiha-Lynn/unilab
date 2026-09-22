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

## Application baseline

The retained v0.2.0 source provides 59 tools across PDF, image, video, audio, text, study and utility categories. They share one workflow: **select a file → process on this device → download**.

Files are processed locally. Optional OCR languages and background-removal models need an initial download. Device memory, supported codecs and file-size limits affect what can run. Compression and lecture HTML conversion may rasterize output; inspect readability before submitting a document.

The current web app and native packages are maintained independently in the [product repository](https://github.com/Thiha-Lynn/unilab-releases). Its installation guide is the source of truth for current versions, offline capabilities and platform testing limitations.

## Run it locally

```bash
git clone https://github.com/Thiha-Lynn/unilab.git
cd unilab
npm ci
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

## Development and contribution

Use this repository for course evidence and baseline corrections. Product changes belong in [unilab-releases](https://github.com/Thiha-Lynn/unilab-releases). Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Main is protected and requires the test/build check.

Current collaborators with write access: [6631503097](https://github.com/6631503097), [6631503088](https://github.com/6631503088), [zawwinhuttt](https://github.com/zawwinhuttt), and [myo-zin-thant18](https://github.com/myo-zin-thant18). Repository owner: [Thiha-Lynn](https://github.com/Thiha-Lynn).

Repository access and historical contribution credit are different. The owner confirmed that nine early commits used the wrong Git identity. [`.mailmap`](.mailmap) corrects their mapped attribution while retaining commit IDs and history. GitHub's contributor display may still show the original identity.

## Validation and publication

Run `npm test` and `npm run build` before proposing source changes. [CI](.github/workflows/deploy.yml) verifies changes before publishing the coursework Pages preview. Production is deployed from the independent product repository. [Operations notes](ops/README.md) explain the separation.

[Week 6 scope and evidence](.docs/03-build/20260916-week6.md) distinguishes shipped software from course approval and pending physical-device evidence. A successful build is not evidence of instructor approval or universal device compatibility.

## AI use and licensing

Prototype scaffolding and development used AI assistance. Test results and documented limitations should be read alongside implementation claims; physical-device coverage remains incomplete.

Original UniLab source retains [MIT notices](LICENSE). Dependencies have their own licenses. The combined product distribution is AGPL-3.0-only; see the [product license and third-party notices](https://github.com/Thiha-Lynn/unilab-releases#license-and-source).
