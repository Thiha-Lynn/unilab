# Retest and live-demo procedure

**Status: procedure prepared; no new execution results implied.** Use synthetic fixtures. No personal documents, real signatures, consent sheets or names on the projector. The four scenarios reproduce the existing plan; do not change acceptance thresholds to obtain a pass.

## Before starting

Record tester code, actual Bangkok timestamp, device/OS/browser, product release revision and fixture names. Use a new retest record rather than overwrite the original session. Record help separately. Give the task goal, not the button-by-button answer. Save screenshots only if they contain synthetic data. Record the exact output checks and defects, not just “works.”

## Four demonstration checks

| Task | Required observable result | Failure evidence |
|---|---|---|
| T1 slides | Page3 upright; grayscale; <=5,000,000 bytes; text readable after opening saved PDF | Actual bytes, wrong rotation, unreadable text or help required |
| T2 mixed assembly | PDF + JPG + PNG form exactly3 pages in specified order | Page count/order mismatch or missing image |
| T3 sign/protect | Invented signature visible; missing/wrong password rejected; correct password opens | Failure to reject or open; never publish the password for a real document |
| T4 extraction | Single output page corresponds to source page42 of120 | Wrong page, page count or failed export |

## Remaining acceptance coverage

- HEIC: use a synthetic/test photo, convert, reopen JPG and inspect orientation/readability.
- Redaction: attempt text extraction from output and inspect raster region; a visible overlay alone is insufficient.
- Custody: verify result appears, countdown works, delete-now makes it inaccessible; test tab lifecycle. A downloaded copy remains user-controlled.
- Network: capture actual requests for the chosen scenario and inspect payloads; asset downloads are not document uploads. Do not extrapolate a scenario to all59tools.
- Physical mobile: run pick → process → download → reopen on an actual iPhone and Android; desktop resizing does not satisfy this.
- Model loading: verify download disclosure, decline/cancel behavior and error handling; do not claim accuracy without ground truth.

## Reproduce reported concerns

ISS-009 navigation: start on home and locate the task without help; record wrong turns and confusing labels.
ISS-010 saving: finish T1, ask the participant to save and reopen; record whether a reminder is needed.
ISS-011 mobile: use an actual phone and record unreadable text, clipping, unreachable controls or mis-taps.
ISS-012 delay/errors: record fixture size, elapsed time, displayed progress and the actual error message. Separate download time from processing.

For each confirmed defect add severity using the existing plan, exact steps, expected/actual result and build. Only mark fixed after a linked code change; only mark retested after rerunning those steps on the changed build. Preserve original ratings. A new wave uses a distinct identifier and actual date; returning users must be labelled returning rather than first-time.

## Presentation handoff

At09:10 have the presentation laptop, charger, working app and synthetic fixtures ready. Set browser zoom and projector font size, disable personal notifications, open outputs locally. Keep a genuinely recorded backup video if one exists; it does not replace the live demo. The existing 1.07-second clip is not suitable.

Classroom reply text for a team member to send: “Our UniLab product source and releases are maintained in a second repository: https://github.com/Thiha-Lynn/unilab-releases . Coursework and final evidence: https://github.com/Thiha-Lynn/unilab/tree/audit/final-readiness-20261116/.docs/final .” This text is prepared only; it has not been sent.
