# Diagrams D1–D4 — UniLab

**Course:** 1305493 · W4 · 2 Sep 2026
**Source:** Mermaid, rendered natively by GitHub. The `.md` **is** the source file — there is no
separate binary to fall out of date with the spec.
**Checked by:** [`.claude/agents/diagram-checker.md`](../../.claude/agents/diagram-checker.md)

Every actor name below appears in spec §1.1. Every step in D4 appears in
[`user-journey.md`](user-journey.md), in the same order. The architecture in D3 names only
components that exist in `src/`.

---

## D1 · System Context

The system as one box: who talks to it, and what crosses the boundary.

```mermaid
flowchart LR
    U1(["U1 — Undergraduate at MFU"])
    U2(["U2 — Student handling identity documents"])
    U3(["U3 — Group-work coordinator"])

    SYS["UniLab<br/>browser application"]

    DEV[("Device file storage")]
    LMS["MFU LMS<br/>submission target"]
    HOST["Static host — GitHub Pages"]
    MODEL["Model / language-data host"]

    U1 -- "picks a file, sets options" --> SYS
    U2 -- "picks an ID document" --> SYS
    U3 -- "picks several sections" --> SYS

    SYS -- "reads file bytes locally" --> DEV
    SYS -- "writes the downloaded result" --> DEV
    DEV -- "student uploads the result themselves" --> LMS

    HOST -- "program code only, no user data" --> SYS
    MODEL -- "OCR engine / ONNX model, disclosed first (F12, LR3)" --> SYS

    style SYS fill:#eeeefc,stroke:#5b5bd6,stroke-width:2px,color:#171c26
    style LMS stroke-dasharray: 4 4
```

**What this diagram is claiming.** There is **no arrow carrying user file content out of the
box**. The only inbound arrows are program code and model data. Submission to the LMS is drawn
dashed and *outside* the system: the student does it themselves, from their own device, after
UniLab is finished. That absence is LR1, and it is why §4.1 of the spec can dissolve the CCA §26
logging duty — there is no event to log.

**In scope:** the transform. **Out of scope:** submission, storage, accounts, delivery.

---

## D2 · Use Case

Who can do what. The core use case is central; every other use case is a parameterisation of it.

```mermaid
flowchart TB
    U1(["U1 — Undergraduate at MFU"])
    U2(["U2 — Student handling identity documents"])
    U3(["U3 — Group-work coordinator"])

    subgraph BOUNDARY["UniLab"]
        UC1(["Transform a file on this device"])
        UC2(["Compress to a named size cap"])
        UC3(["Convert HEIC to JPG"])
        UC4(["Redact an ID document"])
        UC5(["OCR a scan — Thai / English / Burmese"])
        UC6(["Merge sections with page ranges"])
        UC7(["Run a saved workflow on a batch"])
        UC8(["Hold the result in the vault"])
        UC9(["Disclose a network download"])
        UC10(["Delete the result now"])
    end

    U1 --- UC2
    U1 --- UC3
    U1 --- UC5
    U1 --- UC10
    U2 --- UC4
    U2 --- UC10
    U3 --- UC6
    U3 --- UC7

    UC2 -.->|"«extend»"| UC1
    UC3 -.->|"«extend»"| UC1
    UC4 -.->|"«extend»"| UC1
    UC5 -.->|"«extend»"| UC1
    UC6 -.->|"«extend»"| UC1
    UC7 -.->|"«extend»"| UC1

    UC1 -.->|"«include»"| UC8
    UC5 -.->|"«include»"| UC9

    style UC1 fill:#eeeefc,stroke:#5b5bd6,stroke-width:2px,color:#171c26
```

**Reading the notation.** Plain solid lines join an actor to a use case. Dashed arrows are
UML stereotypes.

- **`«include»` is used twice, and only where it is genuinely unconditional.** Every transform
  *always* puts its result in the vault (F6/LR5), so `UC1 «include» UC8`. OCR *always* fetches a
  language pack before it can run, so it must always disclose (F12/LR3).
- **`«extend»` carries the rubric argument.** The specific tools extend the core use case rather
  than sitting beside it — that is the diagram-level statement of "58 settings of one workflow".
- U1 and U2 are the **same person at a different moment** (spec §1.1). Both are drawn because
  the custody stakes differ: a lecture handout and a passport scan are not the same risk.

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

    FILE -- "File handle, read in-page" --> TS
    MAIN --> REG
    REG -- "lazy import" --> TS
    TS --> OUI
    TS -- "options + file" --> ENGINE
    OPS --> PDF
    OPS --> MEDIA
    OPS --> AUDIO
    ENGINE -- "result blob" --> VAULT
    VAULT -- "object URL, download" --> FILE
    CDN -- "code + model, disclosed" --> SW
    SW -- "cached assets" --> MAIN

    NOSRV["No application server, no database,<br/>no session store, no access log —<br/>see spec §4.1"]
    style NOSRV fill:#e4f6ef,stroke:#1d9e77,stroke-dasharray: 5 5,color:#171c26
    style VAULT fill:#eeeefc,stroke:#5b5bd6,stroke-width:2px,color:#171c26
```

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

    %% every choice node is declared before it is referenced, so mermaid renders
    %% all four as UML diamonds instead of turning a forward reference into a box
    state meets_cap <<choice>>
    state merge_run <<choice>>
    state disposed  <<choice>>
    state merge_end <<choice>>

    OpenTool  : 1. Open UniLab, tap Compress PDF
    PickFile  : 2. Pick the scanned PDF from the device
    ReadLocal : Read file bytes in-page (no upload)
    SetTarget : 3. Enter target size — 5 MB
    Estimate  : Render live preview + estimated output size
    Compress  : 4. Run pdf.js on-device, yielding every ~24 ms
    Store     : Store result in vault — 30 min countdown starts
    Download  : 5. Download the result
    DeleteNow : Revoke object URL, drop from memory
    Expire    : Purge on pagehide / TTL

    [*]       --> OpenTool
    OpenTool  --> PickFile
    PickFile  --> ReadLocal
    ReadLocal --> SetTarget
    SetTarget --> Estimate
    Estimate  --> meets_cap

    meets_cap --> SetTarget : [estimate misses the cap]
    meets_cap --> merge_run : [estimate meets the cap]
    merge_run --> Compress

    Compress  --> Store
    Store     --> Download
    Download  --> disposed

    disposed  --> DeleteNow : [student taps Delete now]
    disposed  --> Expire    : [countdown ends or tab closes]
    DeleteNow --> merge_end
    Expire    --> merge_end
    merge_end --> [*]
```

**Notation.** `[*]` renders as the UML initial node (●) and the final node (◉) — no labelled
"Start"/"End" box anywhere. Diamonds are `<<choice>>` nodes, used both as **decision** (`meets_cap`,
`disposed`) and as **merge** (`merge_run`, `merge_end`), which is UML-correct: both are diamonds, and
both branches rejoin at a merge before the final node. Guards are in `[brackets]`.

**The two branches are the two requirements this scenario exists to prove.** `meets_cap` loops
back into step 3 rather than forward into the run — that is F5, and it is why the student does
not discover the file is still too big after submitting. `disposed` has **no path that keeps the
file**: both branches destroy it. That is F6 and LR5 drawn as a shape, not asserted in prose.

---

## Consistency statement

| Must agree | D1 | D2 | D3 | D4 |
|---|---|---|---|---|
| Actors named exactly as spec §1.1 | ✅ U1, U2, U3 | ✅ U1, U2, U3 | — (no actors) | ✅ the student of U1 |
| No arrow carries user file content off-device | ✅ | ✅ | ✅ | ✅ (step 2 reads in-page) |
| Steps match `user-journey.md` order | — | ✅ core use case | — | ✅ 1–5 |
| Components exist in `src/` | — | — | ✅ | ✅ pdf.js, vault |
| Tech stack matches the spec | — | — | ✅ | ✅ |
