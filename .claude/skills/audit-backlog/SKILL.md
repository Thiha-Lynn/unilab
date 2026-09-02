---
name: audit-backlog
description: Checks that the requirement spec and the product backlog agree — every Must-priority requirement has a backlog row, and every backlog row traces to a real requirement id and a real pain. Reports gaps; never edits silently. Run before any commit that touches .docs/, and before submitting the User Validation Gate.
---

# audit-backlog

Verify that `.docs/01-requirements/01-spec/` and `.docs/01-requirements/backlog.md` are still
telling the same story. Invoke with `/audit-backlog`.

## What to read

- Every `*.md` in `.docs/01-requirements/01-spec/`
- `.docs/01-requirements/backlog.md`
- `rule.md` (for the LR items)

## The four checks

**1. Coverage — every Must has a row.**
For each requirement marked **Must** in any spec file, there must be at least one backlog row
whose `Traces to` cites it. A Must with no backlog row is a gap: the thing the product cannot
function without is not planned.

**2. Provenance — every row traces to something real.**
For each backlog row, the requirement id in `Traces to` must exist in a spec file, and the
pain id must exist in that spec's Problem & users section. A row citing `F9` when no `F9`
exists, or citing a pain that was never recorded in an interview, is a break in the chain.

**3. Priority agreement.**
A row's priority must match the priority its requirement carries in the spec. If the spec says
Should and the backlog says Must, one of them moved and nobody said so.

**4. Legal coverage.**
Every Must-level rule in `rule.md` must appear as an `LR` item in some spec file. A legal duty
that never became a numbered requirement will not be traced at the Gate.

## Report format

```
## audit-backlog — {YYYY-MM-DD}

PASS  n checks
FAIL  n checks

### Gaps
- [coverage] F3 "…" is Must but has no backlog row
- [provenance] B7 traces to P4, which no spec file records
- [priority] F5 is Should in 20260826-01-file-custody.md but Must in backlog.md
- [legal] rule.md Must-rule "…" has no LR item

### Suggested fixes
…one concrete fix per gap, as a proposal — not applied…
```

## Rules

- **Report, do not repair.** List the gaps and propose fixes. Apply a fix only when the user
  says which one.
- **If you are unsure whether two items are the same thing, ask — do not merge them silently.**
  Offer at least 3 options: treat as duplicates, keep both and re-scope one, or keep both as-is
  and record why they differ.
- Do not renumber anything. Ids are cited from other files; renumbering breaks the chain.
- Append the report to `.docs/05-log/{YYYYMMDD}-log.md` so the audit history is in git.
