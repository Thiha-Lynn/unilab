#!/usr/bin/env bash
# Re-render the gate screenshots from the prototype itself.
# The prototype is the source of truth; these PNGs are its output. Never edit a PNG by hand.
#   ./​.docs/02-design/prototype/capture-screenshots.sh      (run from the repo root)
set -euo pipefail

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
[ -x "$CHROME" ] || { echo "Chrome not found. Set CHROME=/path/to/chrome"; exit 1; }
command -v magick >/dev/null || { echo "ImageMagick 'magick' not found (brew install imagemagick)"; exit 1; }

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT="$HERE/screenshots"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
mkdir -p "$OUT"

echo "→ rendering the prototype board"
"$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
  --screenshot="$TMP/board.png" --window-size=1400,2400 "file://$HERE/index.html" 2>/dev/null

magick "$TMP/board.png" -crop 2800x3080+0+0    +repage "$OUT/00-prototype-board.png"
magick "$TMP/board.png" -crop  830x1590+140+320  +repage "$OUT/01-S1-tool-picker.png"
magick "$TMP/board.png" -crop  830x1610+985+320  +repage "$OUT/02-S2-work-stage.png"
magick "$TMP/board.png" -crop  830x1560+1830+320 +repage "$OUT/03-S3-download-custody.png"
magick "$TMP/board.png" -crop 2040x1060+140+1920 +repage "$OUT/04-S2D-desktop-two-pane.png"

echo "→ rendering the live build"
LIVE="${LIVE_URL:-https://thiha-lynn.github.io/unilab/}"
"$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
  --virtual-time-budget=6000 --screenshot="$TMP/phone.png" --window-size=430,932 "$LIVE" 2>/dev/null
"$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
  --virtual-time-budget=6000 --screenshot="$TMP/desk.png"  --window-size=1440,900 "$LIVE" 2>/dev/null
magick "$TMP/phone.png" -resize 860x  "$OUT/05-live-home-phone.png"
magick "$TMP/desk.png"  -resize 1600x "$OUT/06-live-home-desktop.png"

echo
for f in "$OUT"/*.png; do printf "  %-38s %s\n" "$(basename "$f")" "$(magick identify -format '%wx%h' "$f")"; done
echo
echo "Walkthrough script: $OUT/README.md"
