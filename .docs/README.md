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
│   │   ├── proposal.md ............... W5 · problem statement + target users + guardrails + evidence
│   │   ├── backlog.md ................ W3 · 27 product rows (B1–B35) + 2 parked + 6 process rows, MoSCoW
│   │   ├── 01-spec/
│   │   │   └── 20260826-01-unilab-core.md   W3 · the spec: §0 evidence · §1 P1–P12
│   │   │                                    §2 F1–F15 · §3 NFR1–7 · §4 LR1–8 · §5 scope
│   │   ├── 02-interviews/            ← B16 closed here, 8 Sep
│   │   │   ├── interview-guide.md .... the instrument: consent, questions, never-ask list
│   │   │   ├── field-kit.md .......... ★ the page to hold on your phone while interviewing
│   │   │   ├── chat-script.md ........ the same interview as DMs — EN / TH / MY, one Q per message
│   │   │   ├── capture.html .......... ★ open on a phone: asks the six, emits the results.md block
│   │   │   ├── rehearsal-scenarios.md  RS1-RS5 practice conversations — INVENTED, never evidence
│   │   │   └── results.md ............ ★ the evidence log — 15 participants S1–S15, P1–P12
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
│   │   ├── design-system.md .......... 22 tokens + rules R1–R7, extracted from src/styles.css
│   │   ├── diagrams.md ............... D1 context · D2 use case · D3 architecture · D4 activity
│   │   ├── prototype/index.html ...... static lo-fi screens (S1·S2·S3·S2-D) — not clickable
│   │   └── prototype/screenshots/ ... ★ rendered PNGs + the 5-min gate walkthrough script
│   │
│   └── 05-log/                       ← the audit trail
│       ├── 20260826-log.md ........... W3 session
│       ├── 20260902-log.md ........... W4 session
│       ├── 20260906-log.md ........... rule.md rewrite + conformance + W3 bridge
│       ├── 20260907-log.md ........... pre-gate audit — the 4 checks, 7 findings, 0 left
│       ├── 20260908-log.md ........... ★ gate-day audit — B25, the W4 pack, and Addendum 3: the 15-interview evidence pass
│       └── 20260908-gate-runsheet.md .. ★ the clock to 23:59 and the two honest submissions
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
| **W3** | **Backlog + spec** | [`01-requirements/backlog.md`](01-requirements/backlog.md) + [`01-spec/`](01-requirements/01-spec/) | ✅ 27 product rows + 2 parked + 6 process · 12 P · 13 F live (2 parked) · 7 NFR · 8 LR — every requirement traced to a pain; all four audit checks clean (8 Sep, after the evidence pass) |
| **W3** | agents + skills, pushed to GitHub | [`../.claude/`](../.claude/) | ✅ 3 agents, 2 skills |
| **W4** | design pack | [`02-design/`](02-design/) | ✅ 5 documents, D1–D4 |
| **W5** | proposal | [`01-requirements/proposal.md`](01-requirements/proposal.md) | ✅ assembled 7 Sep (B23), evidence section updated 8 Sep |
| **W5** | **interviews ≥ 5** | [`01-requirements/02-interviews/results.md`](01-requirements/02-interviews/results.md) | ✅ **15 of 5** — S1–S15, 22 Aug – 8 Sep, 12 pains (B16 closed) |
| **W5** | **Gate — 8 Sep 23:59** | all of the above | ⚠️ **1 blocker** — B17 |

---

## What is still open — one blocker, one decision

### ✅ B16 · closed 8 Sep 2026 — 15 of ≥5 interviews

Fifteen MFU undergraduates, 15 programmes, 22 Aug – 8 Sep, three per interviewer, EN/TH/MY,
LR7 kept throughout. **12 pains recorded (`P1`–`P12`)**; six hypotheses promoted, two
unsupported, one confirmed. Every requirement in the spec — F, NFR and LR — now traces to a pain a
real participant stated, with role, date and quote.

→ [`02-interviews/results.md`](01-requirements/02-interviews/results.md) — the evidence log,
one block per participant, plus the hypothesis tracker and the contradictions table
→ [`01-requirements/TRACEABILITY.md`](01-requirements/TRACEABILITY.md) — the re-pointed chain
→ [`05-log/20260908-log.md`](05-log/20260908-log.md) Addendum 3 — what was promoted, what was
contradicted, what was not raised, and the clean audit afterwards

**The two requirements nobody asked for — parked.** OCR (F8, B8) traced to H6 and Workflows
(F11, B20) to H8; **0 of 15 raised either**, and S8 contradicted H8. For the gate they are parked
(spec §2.1): out of the requirement table, ids retained, code untouched. Spec **Q5** and **Q6**
put three options each in front of the team for W6.

### 🔴 B17 · topic approval unconfirmed

The course overview says pick your own topic. The 19 Aug slide lists five assigned ones, and
UniLab is not among them. Four weeks of work sit on that ambiguity.

→ [`05-approvals/topic-approval-request.md`](01-requirements/05-approvals/topic-approval-request.md)
— message drafted, **not sent**. It also plans what to do if the answer is "take one of the five".

### ⏱ Still to measure, not to interview

The competitor's upload-and-download round trip on campus Wi-Fi — P3's number. Three participants
described the upload as the wait; nobody has timed it. → [`02-interviews/h3-measurement.md`](01-requirements/02-interviews/h3-measurement.md)

---

## Commands

```bash
/capture-requirement    # after each interview — the only sanctioned route to a P#
/audit-backlog          # before any commit touching .docs/, and before the gate
npm test                # 17 tests: deletion, intake screening, grapheme counting
npm run build           # must stay clean before any submission
```
