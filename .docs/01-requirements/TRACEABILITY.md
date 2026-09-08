# Traceability — W1 Charter → W2 rule.md → W3 spec → backlog

**Course:** 1305493 · 1/2569 · Dr. Prasara Jakkaew
**Company:** DIGITAL IMPOSTERS PVT. CO., LTD. · **Product:** UniLab
**Updated:** 8 Sep 2026 (evidence pass) · **Owner:** Thiha Lin (6631503092), Tech Lead

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

> **LR7 was the rule the interviews ran under.** Fifteen participants, and the repository holds
> a role, a pain and a quote for each — no name, no student id, no handle, and the code-to-person
> mapping was never written down.

---

## W3 · pain → requirement → backlog

**This link closed on 8 Sep 2026.** Until then every functional requirement traced to an `H#`
— a hypothesis with a citable non-user artefact — and this file said so. Fifteen interviews
(22 Aug – 8 Sep) were captured through `/capture-requirement`, one at a time, under the rule
that a hypothesis becomes a pain only when **two different participants describe it unprompted**.

| Symbol | Means | Count today |
|---|---|---|
| `P#` | A pain a real interviewed user described, with role, date and quote | **12** — `P1`–`P6` promoted from a hypothesis, `P7`–`P12` predicted by none |
| `H#` retired | Promoted; number never reused | **6** — H1, H2, H3, H4, H5, H7 |
| `H#` unsupported | 0 of 15 raised it | **2** — H6, H8. **F8 / B8 and F11 / B20 are parked on them** (spec §2.1); re-admit or cut is **Q5**, **Q6** |
| `H#` confirmed | A market finding; nothing traces to it | **1** — H9 |

The pain index — which participants, which quote, which hypothesis it replaced — is in
[`02-interviews/results.md`](02-interviews/results.md) and spec §1.2. The chain, row by row:

| Requirement | Traces to | Participants behind the pain | Backlog |
|---|---|---|---|
| F1 pick a file and get the result, on this device | **P2** · LR1 | S4, S7, S12, S14 | B1 |
| F2 no account, no daily cap | **P1** · LR2 | S1, S3, S9, S13 | B2 |
| F3 compress to a size I name | **P5** | S2, S10, S12, S15 | B3 |
| F4 HEIC → JPG | **P4** | S4, S13 | B4 |
| F5 see the estimate — and the quality — before committing | **P7**, P1, P5 | S1, S2, S4, S7, S9, S10, S13 | B5 |
| F6 results disappear on a visible countdown | **P2** · LR5 | S4, S7, S12, S14 | B6 |
| F7 redact / blur so removed content is absent | **P2** · LR6 | *(carried by LR6 — no participant asked for redaction)* | B7, B15 |
| ~~F8 OCR in the language on the page~~ | **parked** — H6, 0 of 15 (spec §2.1) | none | B8 parked · **Q5** |
| F9 video and audio beside documents | **P6** | S1, S3, S13, S14 · S2, S9, S10 | B18 |
| F10 merge PDFs in a checked order, with page ranges and a contents page | **P8** *(was H8)* | S8, S14 | B19 |
| ~~F11 save a repeated chore as a workflow~~ | **parked** — H8, 0 of 15, contradicted by S8 (spec §2.1) | none | B20 parked · **Q6** |
| F12 told before a tool downloads anything | **P2** *(enforced by LR3 · NFR5)* | S4 ("I don't know how the converter website keeps it") | B14 ✅ |
| F13 install and keep working offline | **P3** | S2, S9, S10 | B21 |
| F14 true coverage and limits shown in-app, before starting | **P7** *(was H6; spec defect D2 closed it)* | S2, S4, S7, S9 | B10 ✅ |
| **F15** every tool completes on a phone — *new, 8 Sep* | **P10**, P9 | S4, S7, S9, S11, S14, S15 · S1, S6 | **B35** |
| NFR1 no file bytes leave the device | LR1 · **P2** | S4, S7, S12, S14 | B11 |
| NFR2 results in memory only, unrecoverable after the countdown | LR5 · **P2** | S12 | B26 |
| NFR3 offline install ≤ 8 MB | F13 · **P3** | S2, S9, S10 | B9 |
| NFR4 interactive < 2 s on the reference device | F1 · **P10** | S4, S7, S9, S11, S14, S15 | B34 |
| NFR5 disclose before any fetch | F12 · LR3 · **P2** | S4 | B14 ✅ |
| NFR6 no tab freeze, even in the background | F9, F1 · **P6** | S2, S10 | B33 |
| NFR7 Thai / Burmese text handled correctly | F1 · **P12** | S3 | B32 ✅ |

Two pains have **no feature** behind them, by design, and the spec's Won'ts cite them so the
boundary is explicit rather than silent: **P11** (submission uncertainty — S2, S5, S15 → W5,
LMS-side) and **P12** (office export fidelity — S3, S5, S8 → W1, needs a server; it does,
however, constrain NFR7 — our own tools must not break Thai script the way S3's cover broke).

> **What the interviews changed in this table:** thirteen citations moved from `H` to `P`;
> F5 gained P7, the largest pain in the sample and one no hypothesis predicted; F10 moved from
> an unsupported hypothesis to the pain that actually supports it; F14 likewise; **F15 and B35
> were added**; every NFR and LR gained an explicit pain; and **F8 / F11 were parked** — out of
> the table with ids retained, code untouched, the absence of evidence written beside them
> (spec §2.1). **B16 is closed.** Nothing was renumbered.

---

## W3 → W4 · what the design pack was built on

The W4 deliverables under `.docs/02-design/` — feature list, user journey, design system,
prototype, and diagrams D1–D4 — all derive from the backlog above, and `diagram-checker`
enforces it: an actor or label that appears in a diagram but not in the spec is a reported
mismatch. The journey's chosen instance — *compress a scanned PDF to the LMS cap, on a phone* —
is now the most-evidenced path in the product (P5, P7, P10).

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
