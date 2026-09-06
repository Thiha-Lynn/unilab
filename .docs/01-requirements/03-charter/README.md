# Project charter — source

`charter.html` is the **source of truth** for the Google Doc submitted as the W1/W5
charter deliverable:

> https://docs.google.com/document/d/1D10q6PEqQ_sskQpPEEDYESxWUno8BGYK1mQv8IvPN0o/edit

It is kept as HTML rather than as a `.docx` for one reason: Google Docs converts pasted
HTML into *native* Docs structure — real headings that populate the outline, real tables
with cell shading, real bullet lists. Uploading a `.docx` and converting loses some of
that; pasting HTML does not.

Structure follows the model charter circulated for this course (YummyNaKha!), section for
section: Purpose, Problem Statement, Objectives, Scope, Target Users / Stakeholders,
Proposed Solution, Key Features, User Roles, Success Criteria / KPIs, Project
Implementation Timeline, Risks & Constraints, Assumptions.

**Colours are not decoration.** Every hex value in this file is a real design token
extracted from `src/styles.css` `:root` — `--accent #5b5bd6`, `--accent-soft #eeeefc`,
and the per-category colours (`--c-pdf #d65045`, `--c-image #d64593`, `--c-audio #0e9bb5`,
`--c-video #d3891a`, `--c-study #1d9e77`, `--c-text #3d8bd6`, `--c-utility #9147d6`).
The charter and the product therefore cannot drift apart visually.

## To update the Google Doc after editing this file

1. Open the doc, click into the body.
2. Load this file's contents onto the clipboard as `text/html`.
3. Select all (Cmd+A) and paste (Cmd+V) — this replaces the body and re-creates the
   headings, tables and shading.
4. Delete the trailing empty bullet the paste leaves behind.

## Known state at time of writing (6 Sep 2026)

- The doc is owned by **koshanlay1994@gmail.com**, a personal account — not the
  `@lamduan.mfu.ac.th` account. Consider re-creating it under the MFU account.
- Link sharing is still **Restricted**. Google returned "Sorry, sharing is unavailable at
  this time" on every attempt; it needs one manual pass: Share → General access →
  Anyone with the link → Viewer.
