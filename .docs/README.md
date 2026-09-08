# `.docs/` — where every course artifact lives

**Company 18 · DIGITAL IMPOSTERS PVT. CO., LTD. · UniLab**
1305493 Software Engineering Case Studies · 1/2569 · Dr. Prasara Jakkaew

Start here: **[`01-requirements/TRACEABILITY.md`](01-requirements/TRACEABILITY.md)** — the whole
chain on one screen. Everything below hangs off it.

---

## The chain the gate grades

```
W1  Charter ─────────► what the product IS
      │                 (one core workflow, users, scope, metric)
      ▼
W2  rule.md ─────────► what the LAW requires of THAT product
      │                 (PDPA · CCA §26 · ETA §9/26/28 → LR1–LR8)
      ▼
W3  spec + backlog ──► P# / F# / NFR# / LR#  →  B# rows
      │                 pain → requirement → backlog item
      ▼
W4  design pack ─────► feature list · journey · design system · prototype · D1–D4
      ▼
W5  GATE (8 Sep) ────► proposal + backlog + design + compliance + ≥5 real users
```

---

## Repo map

```
webapp/
├── CLAUDE.md ...................... permanent project rules, loaded every session
├── rule.md ........................ W2 · legal & compliance rules, derived from the Charter
│
├── .claude/
│   ├── agents/
│   │   ├── requirement-writer.md ..... pain notes → spec + backlog rows
│   │   ├── backlog-auditor.md ........ the 4 checks, delegated · read-only
│   │   └── diagram-checker.md ........ W4 design pack still agrees with the spec
│   └── skills/
│       ├── capture-requirement/ ...... /capture-requirement · one interview → P#
│       └── audit-backlog/ ............ /audit-backlog · coverage·provenance·priority·legal
│
├── .docs/
│   ├── 01-requirements/
│   │   ├── TRACEABILITY.md ........... ★ START HERE — the whole chain, one screen
│   │   ├── proposal.md ............... W5 · problem statement + target users + guardrails
│   │   ├── backlog.md ................ W3 · 31 product rows (B1–B34) + 3 gate rows, MoSCoW
│   │   ├── 01-spec/
│   │   │   └── 20260826-01-unilab-core.md   W3 · the spec: §0 evidence · §1 problem
│   │   │                                    §2 F1–F14 · §3 NFR1–7 · §4 LR1–8 · §5 scope
│   │   ├── 02-interviews/            ← B16 lives here
│   │   │   ├── interview-guide.md .... the instrument: consent, questions, never-ask list
│   │   │   ├── field-kit.md .......... ★ the page to hold on your phone while interviewing
│   │   │   ├── chat-script.md ........ the same interview as DMs — EN / TH / MY, one Q per message
│   │   │   ├── capture.html .......... ★ open on a phone: asks the six, emits the results.md block
│   │   │   ├── rehearsal-scenarios.md  RS1-RS5 practice conversations — INVENTED, never evidence
│   │   │   └── results.md ............ the evidence log — EMPTY, 0 of 5
│   │   ├── 03-charter/               ← W1
│   │   │   ├── charter.html .......... source of the published Google Doc
│   │   │   └── README.md ............. how to regenerate the Doc from it
│   │   ├── 04-legal/                 ← W2 history
│   │   │   ├── rule-as-submitted-20260819.md   the graded class draft, VERBATIM — never edit
│   │   │   └── README.md ............. why rule.md was rewritten
│   │   └── 05-approvals/             ← B17 lives here
│   │       └── topic-approval-request.md ..... ★ DRAFT, NOT SENT
│   │
│   ├── 02-design/                    ← W4
│   │   ├── feature-list.md ........... the 7 features, traced to F# and B#
│   │   ├── user-journey.md ........... the 5 steps of the one core workflow
│   │   ├── design-system.md .......... 23 tokens extracted from src/styles.css
│   │   ├── diagrams.md ............... D1 context · D2 use case · D3 architecture · D4 activity
│   │   └── prototype/index.html ...... clickable prototype
│   │
│   └── 05-log/                       ← the audit trail
│       ├── 20260826-log.md ........... W3 session
│       ├── 20260902-log.md ........... W4 session
│       ├── 20260906-log.md ........... rule.md rewrite + conformance + W3 bridge
│       └── 20260907-log.md ........... ★ pre-gate audit — the 4 checks, 7 findings, 0 left
│
└── test/ ......................... proves the claims rather than asserting them
    ├── vault-deletion.test.mjs ....... LR5 · bytes unreachable after purge
    ├── intake-screening.test.mjs ..... PDPA 8 · type/size refused on every path
    └── grapheme-counting.test.mjs .... NFR7 · 0 miscounts over 23 fixtures
```

---

## By assignment

| Week | Assignment | Where it is | State |
|---|---|---|---|
| **W1** | Company Charter | [`01-requirements/03-charter/`](01-requirements/03-charter/) + [published Doc](https://docs.google.com/document/d/1D10q6PEqQ_sskQpPEEDYESxWUno8BGYK1mQv8IvPN0o/edit) | ✅ submitted, row 22 of the class sheet |
| **W2** | `rule.md` | [`../rule.md`](../rule.md) · draft preserved in [`04-legal/`](01-requirements/04-legal/) | ✅ rewritten from the Charter (B12) |
| **W3** | **Backlog + spec (draft)** | [`01-requirements/backlog.md`](01-requirements/backlog.md) + [`01-spec/`](01-requirements/01-spec/) | ✅ 34 rows · 14 F · 7 NFR · 8 LR — all four audit checks clean (7 Sep) |
| **W3** | agents + skills, pushed to GitHub | [`../.claude/`](../.claude/) | ✅ 3 agents, 2 skills |
| **W4** | design pack | [`02-design/`](02-design/) | ✅ 5 documents, D1–D4 |
| **W5** | proposal | [`01-requirements/proposal.md`](01-requirements/proposal.md) | ✅ assembled 7 Sep (B23) |
| **W5** | **Gate — 8 Sep 23:59** | all of the above | ⚠️ **2 blockers** |

---

## The two blockers — neither is code

### 🔴 B16 · 0 of ≥5 interviews

Every one of the 14 functional requirements traces to an **`H#` (hypothesis)** — backed by the
22 Aug competitor teardown or a platform constraint — not a **`P#` (a pain a real user
described)**. The gate asks for a user.

**The instruments are ready; the conversations are not.**
→ [`02-interviews/capture.html`](01-requirements/02-interviews/capture.html) — **start here on a
phone.** Asks the six questions and emits the `results.md` block; no name field exists on it, so
LR7 holds by construction
→ [`02-interviews/chat-script.md`](01-requirements/02-interviews/chat-script.md) — the DM version.
One question per message; a chat answer *is* an interview
→ [`02-interviews/field-kit.md`](01-requirements/02-interviews/field-kit.md) — where to stand,
what to say, the six questions, what never to ask
→ [`02-interviews/rehearsal-scenarios.md`](01-requirements/02-interviews/rehearsal-scenarios.md) —
five invented practice conversations, `RS1`–`RS5`. **Rehearsal only. No `P#` may cite an `RS#`,
and nothing there is copied into `results.md`**
→ run `/capture-requirement` after each real one; it converts the hypothesis and re-points every
citation so nothing goes stale

A hypothesis becomes a pain when **two different participants raise it unprompted.** One is an
anecdote.

### 🔴 B17 · topic approval unconfirmed

The course overview says pick your own topic. The 19 Aug slide lists five assigned ones, and
UniLab is not among them. Four weeks of work sit on that ambiguity.

→ [`05-approvals/topic-approval-request.md`](01-requirements/05-approvals/topic-approval-request.md)
— message drafted, **not sent**. It also plans what to do if the answer is "take one of the five".

---

## Commands

```bash
/capture-requirement    # after each interview — the only sanctioned route to a P#
/audit-backlog          # before any commit touching .docs/, and before the gate
npm test                # 17 tests: deletion, intake screening, grapheme counting
npm run build           # must stay clean before any submission
```
