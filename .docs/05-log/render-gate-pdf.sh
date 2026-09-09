#!/usr/bin/env bash
# Build the two gate PDFs from 20260909-gate-deck.html. The deck is the only source:
# the slide pages are screenshots of the deck itself, and the speaker script is read
# out of the deck's own <aside class="notes"> blocks, so neither PDF can drift from it.
#
#   UniLab-gate-slides.pdf         10 pages, 16:9, projector-ready
#   UniLab-gate-speaker-notes.pdf  A4: run sheet, then each slide with the words to say
#
# Needs Google Chrome. Run from anywhere:  .docs/05-log/render-gate-pdf.sh
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORK="${TMPDIR:-/tmp}/unilab-gate-pdf"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
[ -x "$CHROME" ] || { echo "Chrome not found at $CHROME — set CHROME=..." >&2; exit 1; }

rm -rf "$WORK"; mkdir -p "$WORK/png" "$WORK/thumb"

# 1 · an export copy of the deck with the on-screen furniture hidden
python3 - "$HERE" "$WORK" <<'PY'
import sys, pathlib
here, work = (pathlib.Path(p) for p in sys.argv[1:3])
s = (here / "20260909-gate-deck.html").read_text(encoding="utf-8")
(work / "deck-export.html").write_text(
    s.replace("</style>", "\n.tb,#bar{display:none !important}\n</style>", 1), encoding="utf-8")
PY

# 2 · one screenshot per slide, at 2x for print
for i in 0 1 2 3 4 5 6 7 8 9; do
  "$CHROME" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
    --force-device-scale-factor=2 --window-size=1600,900 --virtual-time-budget=6000 \
    --screenshot="$WORK/png/slide-$i.png" "file://$WORK/deck-export.html#$i" >/dev/null 2>&1
  sips -Z 1600 "$WORK/png/slide-$i.png" --out "$WORK/thumb/slide-$i.png" >/dev/null
  printf '.'
done; echo " 10 slides rendered"

# 3 · compose both documents
python3 "$HERE/build-gate-pdf.py" "$HERE" "$WORK"

# 4 · print
for pair in "slides:UniLab-gate-slides.pdf" "notes:UniLab-gate-speaker-notes.pdf"; do
  "$CHROME" --headless=new --disable-gpu --no-sandbox --no-pdf-header-footer \
    --run-all-compositor-stages-before-draw --virtual-time-budget=12000 \
    --print-to-pdf="$HERE/${pair##*:}" "file://$WORK/${pair%%:*}.html" >/dev/null 2>&1
  echo "  → .docs/05-log/${pair##*:}  ($(du -h "$HERE/${pair##*:}" | cut -f1))"
done
