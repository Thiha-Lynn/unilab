# Diagrams D1–D4 — UniLab

**Course:** 1305493 · W4 · 2 Sep 2026
**Source:** D1, D3 and D4 are Mermaid, rendered natively by GitHub. D2 is
[`d2-use-case.svg`](d2-use-case.svg) — hand-authored SVG, because Mermaid has no use-case
diagram type and cannot draw a UML actor. **Nothing here is a binary export:** every diagram is
plain text in this repository and diffs like code, so none of them can silently fall out of date
with the spec.
**Checked by:** [`.claude/agents/diagram-checker.md`](../../.claude/agents/diagram-checker.md)

Every actor name below appears in spec §1.1. Every step in D4 appears in
[`user-journey.md`](user-journey.md), in the same order. The architecture in D3 names only
components that exist in `src/`.

---

## D1 · System Context

The system as one box: who talks to it, and what crosses the boundary.

```mermaid
flowchart LR
    U1(["«actor»<br/>U1 — Undergraduate at MFU"])
    U2(["«actor»<br/>U2 — Student handling identity documents"])
    U3(["«actor»<br/>U3 — Group-work coordinator"])

    SYS["UniLab<br/>browser application<br/>— the system —"]

    DEV[("Device file storage<br/>the student's own device")]
    HOST["«external»<br/>Static host — GitHub Pages"]
    MODEL["«external»<br/>Model / language-data host"]
    LMS["«external — out of scope»<br/>MFU LMS, submission target"]

    U1 -- "picks a file, sets options" --> SYS
    U2 -- "picks an ID document" --> SYS
    U3 -- "picks several sections" --> SYS

    SYS -- "reads file bytes locally" --> DEV
    SYS -- "writes the downloaded result" --> DEV

    HOST -- "program code only, no user data" --> SYS
    MODEL -- "OCR engine / ONNX model, disclosed first (F12, LR3)" --> SYS

    U1 -. "submits the finished file themselves — UniLab is not involved" .-> LMS

    style SYS fill:#eeeefc,stroke:#5b5bd6,stroke-width:2px,color:#171c26
    style LMS stroke-dasharray: 4 4
```

**What this diagram is claiming.** There is **no arrow carrying user file content out of the
box**. The only inbound arrows are program code and model data. Submission to the LMS is drawn
dashed and *outside* the system: the student does it themselves, from their own device, after
UniLab is finished. That absence is LR1, and it is why §4.1 of the spec can dissolve the CCA §26
logging duty — there is no event to log.

**Every node is typed**, so the boundary reads without the prose: `«actor»` ×3, `«external»`
×2, one data store, and the system itself as a single box with nothing drawn inside it.

**The LMS arrow starts at the student, not at the device.** It used to run
`Device file storage → MFU LMS`, which said a *data store* performs an upload. It does not — the
**student** does, from their own machine, after UniLab has finished. It is now a dashed arrow
from U1 marked *"UniLab is not involved"*, which is the honest boundary statement and the reason
the arrow is drawn at all.

**In scope:** the transform. **Out of scope:** submission, storage, accounts, delivery.

---

## D2 · Use Case

Who can do what. The core use case is central; every other use case is a specialisation of it.

![D2 — UniLab use case diagram: three stick-figure actors outside the UniLab system boundary; six tool use cases generalise to the core use case "Transform a file on this device"; the core includes "Hold the result in the vault"; "OCR a scan" includes "Disclose a network download"; "Delete the result now" extends the vault use case.](d2-use-case.svg)

> **Source:** [`d2-use-case.svg`](d2-use-case.svg) — hand-authored SVG, not a binary export. It is
> plain text, diffs like code, and every colour in it is a token from
> [`design-system.md`](design-system.md). It replaced a Mermaid `flowchart` on 7 Sep 2026:
> Mermaid has no use-case diagram type, so actors were drawn as rounded boxes and associations
> carried arrowheads. **Both are UML errors**, and the W4 deck grades the notation explicitly.

### The notation, and why each relationship is the one it is

| Relationship | Drawn as | Used here for |
|---|---|---|
| **Association** | plain solid line, **no arrowhead** | An actor uses a use case. U1 → compress / convert / OCR / delete · U2 → redact / delete · U3 → merge / batch workflow |
| **Generalization** | solid line, **hollow triangle** at the general case | The six tools are each *a kind of* "Transform a file on this device" |
| **«include»** | dashed line, **open arrowhead**, base → included | Behaviour that **always** runs |
| **«extend»** | dashed line, **open arrowhead**, extension → base | Behaviour that runs **only sometimes** |

**Generalization is doing the rubric's work.** The earlier version drew the six tools as
`«extend»` of the core, which was wrong twice over: `«extend»` means *optional, conditional*
behaviour at an extension point, and compressing a PDF is neither optional nor an addition to
transforming a file — **it is a transform**. Drawn as generalization, the diagram now states the
claim the rubric turns on: *58 tools are 58 settings of one workflow, not 58 workflows.*

**The two `«include»`s are the two things that are never skipped.**

- `Transform a file` **«include»** `Hold the result in the vault` — every transform puts its
  output in the vault. That is F6 and LR5, and there is no path that skips it.
- `OCR a scan` **«include»** `Disclose a network download` — OCR cannot run until a language
  pack is fetched, so the disclosure always precedes it. That is F12 and LR3.

**The one `«extend»` is the one thing that is genuinely optional.** `Delete the result now`
**«extend»** `Hold the result in the vault`: the student *may* press it, and if they never do,
the countdown expires the result anyway. Optional behaviour on a base use case is exactly what
`«extend»` is for — and it is the only place in this diagram that qualifies.

**Both U1 and U2 are drawn** although spec §1.1 says they are the same person at a different
moment, because the custody stakes differ: a lecture handout and a passport scan are not the
same risk, and only U2 reaches for redaction.

---

## D3 · High-level Architecture

Components and the direction data moves. Matches the stack named in the spec: Vite + vanilla JS,
pdf.js, mediabunny/WebCodecs, ONNX Runtime Web, Tesseract.

```mermaid
flowchart TB
    subgraph TAB["Browser tab — the entire runtime"]
        direction TB

        subgraph SHELL["Presentation"]
            MAIN["main.js<br/>router + home"]
            REG["registry.js<br/>tool list, lazy loaders"]
            TS["tool-shell.js<br/>uploader / work / downloader"]
            OUI["option-ui.js<br/>sidebar components"]
        end

        subgraph ENGINE["Transform engines — all on-device"]
            PDF["pdf-utils.js<br/>pdf.js"]
            MEDIA["media-utils.js<br/>mediabunny / WebCodecs"]
            AUDIO["audio-fx.js<br/>FFT, LUFS, WSOLA"]
            OPS["ops.js + workflows.js<br/>13 composable operations"]
        end

        subgraph CUSTODY["Custody"]
            VAULT["vault.js<br/>in-memory, 30 min TTL, purge on pagehide"]
        end

        SW["service-worker<br/>network-first for navigations"]
    end

    FILE[("Device file storage")]
    CDN["Static host + model host"]

    FILE -- "file handle, read in-page" --> TS
    MAIN -- "route" --> REG
    REG -- "lazy import" --> TS
    TS -- "renders" --> OUI
    TS -- "options + file" --> OPS
    OPS -- "dispatch" --> PDF
    OPS -- "dispatch" --> MEDIA
    OPS -- "dispatch" --> AUDIO
    PDF -- "result blob" --> VAULT
    MEDIA -- "result blob" --> VAULT
    AUDIO -- "result blob" --> VAULT
    VAULT -- "object URL, download" --> FILE
    CDN -- "code + model, disclosed" --> SW
    SW -- "cached assets" --> MAIN

    NOSRV["No application server, no database,<br/>no session store, no access log —<br/>see spec §4.1"]
    style NOSRV fill:#e4f6ef,stroke:#1d9e77,stroke-dasharray: 5 5,color:#171c26
    style VAULT fill:#eeeefc,stroke:#5b5bd6,stroke-width:2px,color:#171c26
```

**Every arrow is labelled with what crosses it, and every arrow joins two components.** Two
edges used to point at the `ENGINE` *subgraph* rather than at a component inside it, which
renders as an arrow into a group boundary — ambiguous about which module is actually called. The
call path is now explicit: `tool-shell → ops → pdf-utils / media-utils / audio-fx → vault`.

**The tier that is not here is the design.** Every box sits inside one browser tab. There is no
API tier and no database tier, so there is nowhere for an `access_log` table or a `consent`
store to live — which is exactly why the duties in spec §4.1 dissolve rather than being
discharged. The one boundary crossing, `CDN → service worker`, carries program code and model
data only.

**Where the known defect lives:** the `CDN → service worker` precache is **31 MB**, 23 MB of it
the ONNX runtime for a single tool (D1 in the spec, B9). It is a defect of this architecture,
drawn here rather than hidden.

---

## D4 · Activity

One scenario, start to end: **compress a scanned PDF to the 5 MB cap** — the five steps of
[`user-journey.md`](user-journey.md), in order.

```mermaid
stateDiagram-v2
    direction TB

    %% Two decisions and two merges. Declared before use so mermaid renders every
    %% one as a UML diamond rather than turning a forward reference into a box.
    state retarget  <<choice>>
    state under_cap <<choice>>
    state disposal  <<choice>>
    state rejoin    <<choice>>

    OpenTool  : 1. Open UniLab, tap Compress PDF
    PickFile  : 2. Pick the scanned PDF from the device
    ReadLocal : Read the file bytes in-page — no upload
    SetTarget : 3. Enter the target size — 5 MB
    Estimate  : Render live preview + estimated output size
    Compress  : 4. Run pdf.js on-device, yielding every ~24 ms
    Store     : Store the result in the vault — 30:00 countdown starts
    Download  : 5. Download the result
    DeleteNow : Revoke the object URL, drop it from memory
    Expire    : Purge on pagehide, or when the countdown ends

    [*] --> OpenTool
    OpenTool --> PickFile
    PickFile --> ReadLocal

    ReadLocal --> retarget
    retarget --> SetTarget
    SetTarget --> Estimate

    Estimate --> under_cap : is the estimate under 5 MB?
    under_cap --> Compress : [yes] at or under the cap
    under_cap --> retarget : [no] over the cap, change the target

    Compress --> Store
    Store --> Download

    Download --> disposal : delete it now?
    disposal --> DeleteNow : [yes] student presses Delete now
    disposal --> Expire : [no] countdown ends, or the tab closes

    DeleteNow --> rejoin
    Expire --> rejoin
    rejoin --> [*]
```

### Every diamond, and what it is

A diamond in UML is one of exactly two things, and each has a shape rule. **A diamond with one
line in and one line out is neither, and is a defect** — the previous version of this diagram had
one (`merge_run`), which is why it read as a decision that had never been answered.

| Diamond | Kind | In | Out | Reads as |
|---|---|---|---|---|
| `under_cap` | **decision** | 1 | **2** | *is the estimate under 5 MB?* → `[yes]` / `[no]` |
| `disposal` | **decision** | 1 | **2** | *delete it now?* → `[yes]` / `[no]` |
| `retarget` | **merge** | **2** | 1 | where the retry loop rejoins the main flow |
| `rejoin` | **merge** | **2** | 1 | where both disposal paths rejoin before the end |

Every decision has **two labelled outputs**; every merge has **two inputs**. The question is on
the edge entering the diamond, the answers are on the edges leaving it, and every guard is in
`[brackets]` as the deck requires.

**Notation.** `[*]` renders as the UML initial node (●) at the top and the final node (◉) at the
bottom — no labelled "Start"/"End" box anywhere.

### What the two decisions are there to prove

**`under_cap` loops backwards, and that is the whole point of F5.** `[no]` returns to the
`retarget` merge and back into step 3, so the student changes the target and re-reads the
estimate. They never spend a run to discover the file is still too big. The merge is what makes
this legal UML: without it, the `[no]` edge would re-enter a step that already has an incoming
flow, and the diagram would not say where the two paths join.

**`disposal` has no output that keeps the file.** `[yes]` revokes the object URL immediately;
`[no]` lets the countdown or `pagehide` purge it. Both edges lead to destruction, then to the
final node. That is F6 and LR5 drawn as a shape rather than asserted in prose — a reader can
check the claim by looking for an exit that keeps the result, and finding none.

---

## Consistency statement

| Must agree | D1 | D2 | D3 | D4 |
|---|---|---|---|---|
| Actors named exactly as spec §1.1 | ✅ U1, U2, U3 | ✅ U1, U2, U3 | — (no actors) | ✅ the student of U1 |
| No arrow carries user file content off-device | ✅ | ✅ | ✅ | ✅ (step 2 reads in-page) |
| Steps match `user-journey.md` order | — | ✅ core use case | — | ✅ 1–5 |
| Components exist in `src/` | — | — | ✅ | ✅ pdf.js, vault |
| Tech stack matches the spec | — | — | ✅ | ✅ |
| **UML notation is correct** | ✅ one box, actors outside | ✅ stick figures · ovals in the boundary · associations with no arrowhead · hollow-triangle generalization · dashed open-arrow stereotypes | ✅ layers, not code | ✅ ● initial / ◉ final · every diamond is a 1→2 decision or a 2→1 merge · guards in `[brackets]` |

### Notation audit, 7 Sep 2026

Both diagrams the W4 deck grades on notation were rebuilt:

| Was wrong | Now |
|---|---|
| **D2 actors were rounded boxes.** Mermaid `flowchart` has no actor glyph, so U1–U3 rendered as stadium shapes — not UML | Stick figures, drawn in SVG |
| **D2 associations carried arrowheads** (`---` renders a line, but the tool-to-core links used `-.->`) | Associations are plain solid lines with **no arrowhead** |
| **D2 used `«extend»` six times** for the tools. `«extend»` means *optional, conditional* — but compressing a PDF *is* a transform, not an optional addition to one | **Generalization** (hollow triangle): each tool *is a kind of* the core use case. `«extend»` now appears once, where the behaviour really is optional |
| **D4 had a 1-in / 1-out diamond** (`merge_run`) — neither a decision nor a merge, and it read as an unanswered question | Removed. The retry loop rejoins at `retarget`, a real 2-in merge |
| **D1 drew the upload to the LMS as leaving the device storage** — a data store does not perform an upload | The dashed arrow now starts at **U1**, the actor who actually does it, labelled *UniLab is not involved* |
| **D1 externals were untyped** — nothing on the diagram said which box was an actor and which a third-party system | Every external carries `«actor»` or `«external»`; the out-of-scope LMS says so on its face |
| **D3 pointed two arrows at a subgraph** rather than at a component, so the call was ambiguous | `tool-shell → ops → pdf-utils / media-utils / audio-fx → vault`, component to component |
| **D3 had four unlabelled arrows** — the deck asks arrows to show what moves | All 14 arrows carry a label |
| **D4 decisions had no yes/no** — guards described the condition but never answered it | Every decision asks its question on the inbound edge and answers `[yes]` / `[no]` on both outbound edges |

Verified mechanically, all four diagrams:

| Check | Result |
|---|---|
| Mermaid parses D1, D3, D4 | **3 of 3, 0 syntax errors** |
| D1 — system drawn as one box, no internals | ✅ |
| D1 — externals typed, ≥ 2 actors | ✅ 3 actors, 2 `«external»`, 1 data store |
| D3 — no arrow points at a subgraph | ✅ 0 |
| D3 — every arrow labelled | ✅ 14 of 14 |
| D4 — every diamond a valid decision or merge | ✅ 2 decisions (1→2, both guarded) · 2 merges (2→1) |
| D2 — notation counts | ✅ 3 stick figures · 8 associations · 6 generalizations · 2 `«include»` · 1 `«extend»` |
