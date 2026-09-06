---
name: capture-requirement
description: Captures one real interview into the requirement chain — records the pain as a numbered P#, converts the hypothesis it replaces, re-points every requirement and backlog row that cited that hypothesis, and logs it. Use immediately after an interview, one interview at a time. Never invents a pain; if the interview does not support a requirement, it says so.
---

# capture-requirement

Turn **one** completed interview into the traceability chain the W5 gate grades:

```
pain (P#)  →  requirement (F# / NFR# / LR#)  →  backlog row (B#)
```

Invoke with `/capture-requirement` straight after an interview, while the notes are fresh.
One interview per run — batching them is how quotes get blurred together.

## Why this skill exists

The spec was written before any interview happened, so every requirement currently traces to
an **`H#` — a hypothesis** carrying a real artefact (a competitor teardown, a platform
constraint, a measurement of our own build) rather than a user. An artefact is not a user.
`B16` is the backlog row that says so, and it is the largest open risk in the project.

This skill is the only sanctioned way to close it. It exists so that converting `H` to `P`
is a mechanical, repeatable edit rather than a rewrite anyone has to reason through at 11pm
before the gate.

## What to read first

1. `.docs/01-requirements/02-interviews/interview-guide.md` — the recording rules, especially LR7.
2. `.docs/01-requirements/02-interviews/results.md` — existing `S#` participants, so you
   continue the numbering.
3. `.docs/01-requirements/01-spec/` — the current `H#` table and every requirement's `Traces to`.
4. `.docs/01-requirements/backlog.md`.

## What you may record — LR7, non-negotiable

**Role, pain and quote only.** Year and programme ("3rd-year SE") is a role. A name, a student
id, an email, a LINE id or a phone number is not, and must never reach the repository — it is
a public GitHub repo. Participants are `S1`, `S2`, `S3`… and the mapping from code to person is
never written down anywhere.

If the notes handed to you contain a name, **strip it, say that you stripped it, and continue.**
Do not ask whether to keep it.

## Steps

**1. Record the participant** in `.docs/01-requirements/02-interviews/results.md` using the
block from the interview guide: date, role, language, the task they described, the pains in
their words, a verbatim quote, and which hypotheses the interview touched.

**2. Decide, honestly, what the interview supports.** For each pain the participant actually
described, check whether an existing `H#` says the same thing.

- **The interview supports an existing `H#`** → note it as corroboration. A hypothesis needs
  **two different participants** describing it unprompted before it becomes a `P#`. One
  participant is an anecdote.
- **Two participants now agree** → promote it: allocate the next `P#`, write it in the spec's
  Problem & users section with role, date and quote, and continue to step 3.
- **The pain is new** → allocate the next `P#` directly, and note that no hypothesis predicted
  it. A pain we did not predict is the most valuable thing an interview produces; say so in
  the log rather than quietly filing it.
- **The interview contradicts an `H#`** → record the contradiction prominently. This is a
  finding, not a failure, and it is worth more marks than another confirmation.

**3. Re-point every citation.** When `H_n` becomes `P_m`:

- In the spec, move the row from the hypothesis table to the pains table, keeping its evidence.
- Update every requirement whose `Traces to` cites `H_n` so it cites `P_m`.
- Update every backlog row whose `Traces to` cites `H_n` the same way.
- Leave the `H` number retired. **Never reuse or renumber it** — other files cite these ids,
  and renumbering silently breaks the chain the gate checks.

**4. Update the counts.** The spec's §0 evidence table states interviews conducted and pains
recorded. Both are wrong the moment you add a participant; fix them in the same edit.

**5. Re-run `/audit-backlog`** and fix anything it reports before finishing.

**6. Log it** in `.docs/05-log/{YYYYMMDD}-log.md`: which participant, which hypotheses were
touched, what was promoted, and — separately — anything that was contradicted.

## What this skill must never do

- **Never invent a pain, or a participant.** The course policy is explicit that fabricating
  interviews is not allowed, and a fabricated `P#` is worse than an honest `H#` because it
  looks finished. If asked to write a pain with no interview behind it, refuse and say why.
- **Never promote on one participant.** Two, unprompted, or it stays a hypothesis.
- **Never delete a hypothesis that no one raised.** Mark it unsupported and let it be deleted
  deliberately, with the backlog rows that existed only to serve it. That deletion is a
  finding.
- **Never soften a quote** to fit a requirement we already wrote. If the words do not support
  the requirement, the requirement is what changes.

## The rule that overrides everything

**If anything is unclear, stop and ask — and offer at least 3 concrete options.** Never guess.
Particularly: if you cannot tell whether two participants described the *same* pain or two
neighbouring ones, ask. Merging them silently inflates the evidence, which is the one thing
this whole chain exists to prevent.
