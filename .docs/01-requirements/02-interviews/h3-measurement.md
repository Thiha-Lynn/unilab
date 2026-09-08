# H3 — the measurement that is not an interview

**Course:** 1305493 · **Company:** DIGITAL IMPOSTERS PVT. CO., LTD.
**Owner:** Zaw Win Htut (QA / Test) · **Serves:** spec §1.2 H3 · **Time needed:** ~5 minutes

---

## Why this is a separate document

Every other driver in the spec is a claim about **people**, and interviews settle those. `H3` is a
claim about **the network**:

> *On campus Wi-Fi, the upload-and-download round trip is itself a meaningful part of the wait.*

Spec §1.2 marks it **"Unvalidated — *and unmeasured*"**, and `README.md` asserts it without a
number behind it. **No quantity of interviews fixes that.** Five students saying "it felt slow" is
a perception; two timings are a measurement. This file produces the two timings.

---

## Part 1 — what is already proven, and what still needs campus Wi-Fi

H3 compares two round trips. They are **not** equally hard to establish.

| Side | Claim | How it is settled |
|---|---|---|
| **UniLab** | The file never traverses the network at all, so the transfer time is **structurally zero** — not "fast", *absent* | ✅ **Measured 8 Sep 2026 — 0 attempts on all five exit APIs.** See Part 2 |
| **Competitor** | Upload 10 MB + process + download the result | Only measurable **on MFU campus Wi-Fi**, because campus Wi-Fi is the claim |

This split matters for how you report it. The UniLab number is not a benchmark result that could
come out differently on a better laptop — it is an architectural property. The competitor number
is a real-world measurement with real variance, and should be reported as such.

---

## Part 2 — the UniLab side: measured 8 Sep 2026, and it is zero

**This half is done.** It was run against the app on 8 Sep 2026 and does not need repeating before
the gate — though Part 2c is worth re-running in the review, live, because it is the demo.

### 2a — dynamic: a real transform, with every exit instrumented

Every API by which bytes could leave the device was wrapped, then a genuine two-step chain was run
through the app's own `ops.js`:

```
chain ............................. compress-image → images-to-pdf
input ............................. 42,319 bytes (1600×1200 PNG, generated in-page)
output ............................ 23,522 bytes, application/pdf
transform ......................... 1,920 ms, entirely local
navigator.onLine .................. true   ← the network was available and went unused

NETWORK ATTEMPTS DURING TRANSFORM ... 0
  fetch ........................... 0
  XMLHttpRequest .................. 0
  navigator.sendBeacon ............ 0
  WebSocket ....................... 0
  RTCPeerConnection ............... 0
```

> **What this does and does not prove.** The instrumentation covers the five APIs a file could be
> *uploaded* by, and all five recorded nothing. It does **not** intercept ES module imports, which
> is correct — those carry the app's own code, never the user's file. The claim being evidenced is
> "no user file bytes leave the device", not "the page makes no requests at all". State it that
> way; the weaker, precise claim is the one that survives a question.

### 2b — static: there is no endpoint to upload to

```
fetch call sites in src/ ................................. 6
  of those, requests with a method or a body ............. 0     ← all six are bare GETs
  what they GET .......................................... app-owned assets only:
                                                           Noto font files under BASE_URL/fonts/,
                                                           the rnnoise WASM binary
FormData / multipart / POST of a file .................... 0 occurrences
XMLHttpRequest / sendBeacon / WebSocket in src/ .......... 0 occurrences
```

The `upload` matches in `sign-pdf.js`, `scan-to-pdf.js` and the watermark tools are **UI labels** —
the tab a student uses to pick a file off their own phone. They are not network calls.

This is why `rule.md` calls the compliance **architectural**: there is no code path to disable,
no retention window to trust and no deletion promise to verify, because there is no endpoint.

### 2c — the demonstration: airplane mode

Numbers invite the question *"zero on what connection?"* — and the honest answer is that the
question does not apply. **Put the device in airplane mode and run a transform anyway. It
completes.** That single fact establishes the UniLab side of H3 more firmly than any stopwatch,
and it is the thing to have ready to do live at the gate review.

Record the UniLab column in Part 4 as `0 (no network path)`, never as a number of seconds — a
duration implies a transfer that could have been slower on a worse connection, and there is none.

---

## Part 3 — the competitor side: on campus, with the same bytes

A comparison is only meaningful if both sides move **the same file**. Generate it:

```bash
node test/fixtures/make-h3-fixture.mjs
```

```
size    10485760 bytes (10.00 MB)
sha256  a2bd25a4c362b0e67cc6b19440a7cd9534b6b8279ab9dc735c59892b192ec2c9
```

**If your sha256 differs, stop** — you are timing a different file and the two numbers cannot be
compared. The generator is seeded with the course code and pins its own creation date, so every
machine emits identical bytes; the 10 MB binary itself is gitignored, because a 3 KB generator
reproduces it exactly and a 10 MB blob in the history does not.

The payload is incompressible noise **on purpose**: H3 is about transfer, not about how clever a
compressor is. Noise holds the payload size steady through the whole round trip, so what you
record is network time rather than the competitor's compression ratio.

### The run

1. **On campus. On campus Wi-Fi, not 4G** — the whole claim is about campus Wi-Fi. Note where you
   are standing; the library and the C5 corridor are not the same network experience.
2. Open a competitor's compress-PDF tool (`iLovePDF` is the one the 22 Aug teardown covers).
3. Start timing when you press *Upload*. Stop when the finished file is on your device.
4. Note the three phases separately if the UI shows them: **upload · process · download.** The
   split is the interesting part — if processing dominates, H3 is weak; if transfer dominates,
   H3 is exactly right.
5. Repeat **three times**, and record all three. One sample of a wireless network is an anecdote.

### Do not

- Do not sign in, and do not use a paid account. The measurement must reflect what a student
  without an account actually experiences.
- Do not upload anything but the fixture. **Never a real transcript, ID or coursework file** —
  LR7 and the entire premise of this project both apply to us, not only to competitors.

---

## Part 4 — record it here and in `results.md`

| Date | Where / network | Run | Upload | Process | Download | Total | UniLab |
|---|---|---|---|---|---|---|---|
| | | 1 | | | | | 0 (no network path) |
| | | 2 | | | | | 0 (no network path) |
| | | 3 | | | | | 0 (no network path) |

**Median competitor total:** ______ · **Airplane-mode transform completed:** ☐ yes ☐ no

Then copy the median row into the `results.md` H3 table, and update spec §1.2 so H3 no longer
reads *"and unmeasured"*.

---

## Part 5 — what each outcome means

Write the conclusion **before** you look at the numbers, so the number decides it and not you.

| If the competitor total is… | Then |
|---|---|
| **Dominated by transfer** (upload + download > processing) | H3 holds. The spec keeps it, and it becomes a supporting argument for the architecture — though **not** the primary one; custody is |
| **Dominated by processing** | H3 is weak as stated. Rewrite it as a claim about *processing* on someone else's queue, or retire it |
| **Fast overall** — the whole round trip is a few seconds | **H3 is wrong, and that is a finding.** Retire it, delete any backlog row that existed only to serve it, and say so in the log |

That last row is the one to hold yourself to. `interview-guide.md` §11 already sets the rule for
hypotheses generally: *a hypothesis that no participant raises is not a pain — delete it, and the
deletion is worth more marks than a feature nobody asked for.* A measurement that comes out
against us is the same thing, and it is cheaper to retire H3 honestly than to defend a number
nobody took.
