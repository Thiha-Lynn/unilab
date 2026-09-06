# UniLab — project rules for Claude

**Course:** 1305493 Software Engineering Case Studies, MFU, 1/2569 · Dr. Prasara Jakkaew
**Repo:** https://github.com/Thiha-Lynn/unilab · **Live:** https://thiha-lynn.github.io/unilab/
**Phase:** DISCOVER (W1–W5). **No production code until the User Validation Gate passes (Sep 8 2026).**

## What UniLab is

A free student toolbox website — the small file jobs a student actually needs (PDF, image,
video, audio), in the spirit of iLovePDF / iLoveIMG, but **100% client-side**.

**The one core workflow:** select a file → transform it on this device → download the result.
Every tool is a *parameterisation of that one workflow*, not a separate workflow. Say it this
way — a tool count read as "58 workflows" fails the rubric.

## Hard product rules

- Everything runs in the browser. **No uploads, no server, no accounts, no ads.**
- Finished files live in memory only (`src/vault.js`), with an on-screen countdown, a
  "delete now" button, and a purge on tab close.
- Nothing may claim "we delete your files quickly" — we never receive them in the first place.
  Compliance here is **architectural**, not procedural.
- **`rule.md` is derived from the W1 Company Charter, and every LR traces back to it.** It was
  rewritten on 6 Sep 2026 (B12) because the class draft analysed a server-upload, ad-funded
  product that is not ours. The graded W2 submission is preserved verbatim at
  `.docs/01-requirements/04-legal/rule-as-submitted-20260819.md` — never edit that copy.
- A claim on the privacy page must be enforced by code and, where possible, proven by a test
  (`rule.md` PDPA 24). `npm test` runs them.

## Architecture — read before adding anything

| File | Job |
|---|---|
| `src/registry.js` | The tool list: categories, ids, icons, lazy loaders |
| `src/main.js` | Router + home page **only** |
| `src/tool-shell.js` | Three-stage two-pane frame: uploader → work → downloader. Reference impl: `src/tools/split-pdf.js` |
| `src/option-ui.js` | The sidebar component vocabulary — don't invent new CSS classes |
| `src/vault.js` | In-memory result custody + countdown |
| `src/intake.js` | File intake policy — type/size screening on **every** path, EXIF stripping (`rule.md` PDPA 7–8) |
| `src/log.js` | Diagnostics that no-op in production, so no filename reaches the console (`rule.md` PDPA 6) |
| `src/privacy.js` | The privacy page at `#/privacy` (`rule.md` PDPA 25) |
| `src/ops.js`, `src/tools/workflows.js` | Composable operations and saved chains |
| `src/media-utils.js`, `src/media-ui.js` | Video/audio on **mediabunny (WebCodecs)** — deliberately not ffmpeg.wasm |
| `src/audio-fx.js` | FFT / spectral gate / LUFS / WSOLA / WAV |
| `src/pdf-utils.js` | pdf.js with `intent:'print'` |

## Engineering gotchas that have already cost time

1. `[hidden]` is `display:none` at the *lowest* specificity — any `display:flex/grid` component
   ignores it. `styles.css` carries `[hidden] { display: none !important; }`.
2. `toolShell()` calls `options()` / `ctx.refresh()` **synchronously**. A `const` arrow function
   declared after the `toolShell()` call is in the temporal dead zone — use hoisted
   `function` declarations inside a tool's `render()`.
3. Long loops yield with `setTimeout(0)`, never `requestAnimationFrame`. Prefer **time-based**
   yielding (yield after ~24 ms of work) over per-row counts in heavy pixel loops.
4. Chained `setTimeout(0)` in a long-hidden tab is throttled by Chrome to ~1/min — heavy loops
   must yield via `MessageChannel` (`audio-fx.js` `breathe()` does).
5. When testing a rebuilt `dist`, unregister the service worker and clear caches first, or you
   get stale chunks and phantom bugs.
6. Unicode counting uses `Intl.Segmenter` grapheme clusters, not code points.

## Documentation pipeline (course requirement)

```
.claude/agents/     specialist subagents
.claude/skills/     invocable procedures — the command is the FOLDER name
.docs/01-requirements/TRACEABILITY.md   W1 Charter → W2 rule.md → W3 spec → backlog, one screen
.docs/01-requirements/01-spec/{YYYYMMDD}-{no}-{topic}.md
.docs/01-requirements/backlog.md
.docs/01-requirements/02-interviews/   interview guide + results (LR7: role/pain/quote only)
.docs/01-requirements/03-charter/      charter source (the Google Doc is generated from it)
.docs/01-requirements/04-legal/        the W2 rule.md exactly as submitted — read-only
.docs/02-design/    feature-list, user-journey, design-system, prototype, D1-D4 diagrams
.docs/05-log/{YYYYMMDD}-log.md
rule.md             legal & compliance rules (W2, rewritten from the Charter)
test/               node --test; proves the deletion and intake claims
```

**Traceability is the rule that gets graded:** every requirement traces
`pain → requirement → backlog item`. A requirement with no interview source does not go in
the spec. If you cannot find the pain, **ask** — do not invent one.
The whole chain is mapped in [`.docs/01-requirements/TRACEABILITY.md`](.docs/01-requirements/TRACEABILITY.md).

**Today every `Traces to` ends at an `H#` (hypothesis), not a `P#` (a pain a real user
described), because 0 interviews have been conducted (B16).** That is stated, not hidden —
see spec §0. Converting `H` to `P` happens only through `/capture-requirement`, and only when
**two different participants** describe the same pain unprompted.

## Agents and skills

| Tool | Kind | Job |
|---|---|---|
| `requirement-writer` | subagent | Raw pain notes → spec (F / NFR / LR) + backlog rows in sync |
| `capture-requirement` | skill | One interview → `P#`; converts the `H#` it replaces and re-points every citation |
| `audit-backlog` | skill | Coverage · provenance · priority agreement · legal coverage. Run before any commit touching `.docs/` |
| `backlog-auditor` | subagent | The same four checks, delegated — its own context, returns only mismatches. Read-only by design |
| `diagram-checker` | subagent | The W4 design pack still agrees with the spec |

The auditor exists as both because they differ in who asks: `/audit-backlog` is what you type;
`backlog-auditor` is what Claude delegates to when the chain is too big to hold in context.
`SKILL.md` defines what the checks mean and wins if they ever disagree.

Every agent and skill file carries the same last line: **if anything is unclear, stop and ask,
and offer at least 3 concrete options. Never guess.** That is the W3 "failure pattern to catch".

Requirement conventions:
- Functional: `F1, F2…` written as "As a **[user]**, I want **[X]**, so that **[Y]**", with a
  MoSCoW priority (Must / Should / Could / Won't).
- Non-functional: `NFR1, NFR2…` and **measurable** — a time, a count, or a percentage.
  "Fast" is not a requirement. "< 2 seconds" is.
- Legal: `LR1, LR2…` derived from `rule.md`, citing the statute (PDPA, CCA §26, ETA §9/26/28).

## Working agreements

- When a task matches a skill, **call the skill** instead of editing the files directly — the
  skills carry the cross-file consistency checks and the log recording.
- If anything is unclear, **ask and offer at least 3 options. Never guess.**
- Every change under `.claude/` or `.docs/` gets committed and pushed the same session —
  a spec that only exists on one laptop does not count at the Gate.
