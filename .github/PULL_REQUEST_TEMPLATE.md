## What does this PR do?

<!-- One or two sentences. Link the issue if there is one. -->

## How was it tested in the browser?

<!-- "npm run build passes" is not testing. What files did you run through it?
     For text tools: did you try Thai / Burmese / emoji input? -->

## Checklist

- [ ] Everything still runs 100% client-side — no uploads, no new network calls
- [ ] Used the shared `ui.js` helpers (no hand-rolled dropzones/progress bars)
- [ ] Long loops yield with `setTimeout(0)`, not `requestAnimationFrame`
- [ ] Tested in the browser with real files (say which, above)
