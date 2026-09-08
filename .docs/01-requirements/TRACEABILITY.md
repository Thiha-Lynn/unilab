# Traceability — W1 Charter → W2 rule.md → W3 spec → backlog

**Course:** 1305493 · 1/2569 · Dr. Prasara Jakkaew
**Company:** DIGITAL IMPOSTERS PVT. CO., LTD. · **Product:** UniLab
**Updated:** 7 Sep 2026 · **Owner:** Thiha Lin (6631503092), Tech Lead

The W5 gate grades one chain, and the W3 deck states it plainly:

> **pain → requirement → backlog item.**
> "The W5 Gate checks whether your backlog is tied to real interview pain — not just whether
> a table exists."

This file is that chain, end to end, on one screen. Every id below is live in another file;
if you change one, `/audit-backlog` will tell you what else moved.

---

## The four documents, and what each one is allowed to decide

| Week | Document | Decides | Must not |
|---|---|---|---|
| **W1** | Company Charter | What the product **is**: the one core workflow, the users, the scope, the metric | — |
| **W2** | `rule.md` | What the **law** requires of *that* product, as commands to an AI agent | Describe a different product than the Charter's |
| **W3** | `01-spec/…md` | `P#` / `F#` / `NFR#` / `LR#` — the numbered requirements | Contain a requirement that traces to nothing |
| **W3** | `backlog.md` | What gets **built**, in what order | Contain a row that traces to no requirement |

Each week constrains the next. The bridge that had to be repaired was **W1 → W2**: the
`rule.md` drafted in class analysed a server-upload, ad-funded service, which is not the
Charter's product. It was rewritten on 6 Sep 2026 (**B12**); the class submission is preserved
verbatim at [`04-legal/rule-as-submitted-20260819.md`](04-legal/rule-as-submitted-20260819.md).

---

## W1 → W2 · the Charter decides what the law is applied to

| Charter says | `rule.md` therefore says | Rules |
|---|---|---|
| One core workflow: *select a file → transform on this device → download* | If a transformation can run in the browser, run it there and never upload | PDPA 1–2 |
| No accounts (Won't W2 in the Charter) | Must not require an account, email, name or phone | PDPA 3 |
| No advertising, no analytics (Won't W3) | No consent banner is needed **because there is nothing to consent to**; if ads are ever added, rules 23–25 are revisited in the same change | PDPA 26, ETA 1 |
| No file content to an AI model or third-party API (Won't W4) | On-device only; escalate rather than build it | PDPA 17 |
| Results held in memory, 30-minute countdown, delete-now | Memory only, hard expiry, revoke the URL, purge on tab close | PDPA 9–15 |
| No upload endpoint exists in the codebase | **We are not a service provider under CCA §3(2)** — we never store data for another person, so §26 does not attach | CCA 1–2, 8 |

> The Charter is the reason `rule.md` reaches the conclusions it does. Change the Charter's
> architecture and most of `rule.md` changes with it — which is exactly why §26 is written
> conditionally ("if the system ever stores a file for a user, this duty returns in full")
> rather than deleted.

---

## W2 → W3 · rule.md's Must rules become LR items in the spec

The W3 deck: *"`rule.md` doesn't sit separately anymore — its Must-have rules turn into
LR-numbered items inside today's requirement spec."*

| LR | Requirement | From `rule.md` | Statute |
|---|---|---|---|
| **LR1** | No user file content leaves the device; no upload endpoint exists | PDPA 1–2 | PDPA (minimisation) |
| **LR2** | No account, email, name or phone for any tool | PDPA 3 | PDPA |
| **LR3** | Network fetches carry program code or model data only, disclosed beforehand | PDPA 18 | PDPA |
| **LR4** | No claim that files never leave the device unless the architecture makes it true | PDPA 23–24 | PDPA |
| **LR5** | Results in memory only, expire unaided, erasable on demand, unreachable once dropped | PDPA 9–15 | PDPA (retention) |
| **LR6** | Redaction, blurring and metadata stripping remove content rather than covering it | PDPA 7, 19 | PDPA (sensitive data) |
| **LR7** | No interview PII into an AI tool or the public repo; role, pain and quote only | PDPA 30–32 | PDPA (our own research) |
| **LR8** | No filename, file content or object URL reaches the console or an error tracker in production | PDPA 6 | PDPA (minimisation) |

All eight are live in the spec §4 and cited by backlog rows. `/audit-backlog` check 4 fails if a
Must-level rule in `rule.md` has no LR.

> **LR8 was added by the pre-gate audit on 7 Sep 2026.** `rule.md` PDPA rule 6 — no filename in
> a production console — is a Must-level rule that never became an LR, so `B30` cited the raw
> rule instead of a requirement id. Check 4 had been failing quietly since the W2 rewrite.

---

## W3 · pain → requirement → backlog

**This is the link that is not yet complete, and pretending otherwise would fail the gate.**

| Symbol | Means | Count today |
|---|---|---|
| `P#` | A pain a real interviewed user described, with role, date and quote | **0** |
| `H#` | A hypothesis with a citable non-user source, awaiting validation | **9** |

Every functional requirement currently traces to an `H#`, not a `P#`. Each `H#` carries a real
artefact — the 22 Aug competitor teardown, a platform constraint, a measurement of our own
build — but **an artefact is not a user**, and the gate asks for a user.

| Requirement | Traces to | Backlog |
|---|---|---|
| F1 pick a file and get the result, on this device | H2 · LR1 | B1 |
| F2 no account, no daily cap | H1 · LR2 | B2 |
| F3 compress to a size I name | H5 | B3 |
| F4 HEIC → JPG | H4 | B4 |
| F5 see the estimate before committing | H5 | B5 |
| F6 results disappear on a visible countdown | H2 · LR5 | B6 |
| F8 OCR in the language on the page (19 shipped) | H6 | B8 |
| F9 video and audio beside documents | H7 | B18 |
| F7 redact / blur so removed content is absent | H2 · LR6 | B7, B15 |
| F10 merge PDFs with page ranges and a contents page | H8 | B19 |
| F11 save a repeated chore as a workflow | H8 | B20 |
| F12 told before a tool downloads anything | LR3 · NFR5 | B14 ✅ |
| F13 install and keep working offline | H3 | B21 |
| F14 true language coverage shown in-app | D2 | B10 ✅ |

**Converting `H` to `P` is `/capture-requirement`'s only job**, and it is the only sanctioned
route. A hypothesis is promoted when **two different participants describe it unprompted** —
one is an anecdote. Tracked as **B16**, and it is the largest open risk in the project.

---

## W3 → W4 · what the design pack was built on

The W4 deliverables under `.docs/02-design/` — feature list, user journey, design system,
prototype, and diagrams D1–D4 — all derive from the backlog above, and `diagram-checker`
enforces it: an actor or label that appears in a diagram but not in the spec is a reported
mismatch.

---

## The tooling that keeps this file true

| Tool | Kind | Job |
|---|---|---|
| `requirement-writer` | subagent | Raw pain notes → spec (F / NFR / LR) + backlog rows |
| `capture-requirement` | skill | One interview → `P#`, converts the `H#` it replaces, re-points every citation |
| `audit-backlog` | skill | The four checks, run in front of you: coverage, provenance, priority agreement, legal coverage |
| `backlog-auditor` | subagent | The same four checks, delegated — reads the whole `.docs/` tree in its own context and returns only the mismatches |
| `diagram-checker` | subagent | W4 design pack still agrees with the spec |

The W3 deck notes the auditor can be built as either a subagent or a skill. Both exist here
because they differ in *who asks*: the skill is what a person types when they want the report
in front of them; the subagent is delegated to and keeps the whole `.docs/` read out of the
main context. `SKILL.md` is the authority on what the four checks mean — if the two ever
disagree, the subagent is instructed to say so and defer.

## Running the chain

```bash
/capture-requirement    # after each interview — the only way to create a P#
/audit-backlog          # before any commit touching .docs/, and before the gate
npm test                # proves the LR5 deletion claim and the PDPA 8 intake rules
```
