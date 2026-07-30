#!/usr/bin/env bash
# Render study.html to an MP4 by screenshotting one frame at a time.
#
# The animation is a pure function of the ?f= query parameter, so every frame is
# deterministic and the capture cannot race the animation clock. That is the whole
# reason the page takes a frame number instead of playing on a timer.
#
#   ./render.sh                      -> LV_draw-on_1080x1920.mp4
#   ./render.sh out.mp4 1080 1920    -> explicit name and size
#
# Needs: a Chromium headless_shell and an ffmpeg on PATH (or set CHROME / FF).

set -euo pipefail
cd "$(dirname "$0")"

OUT=${1:-LV_draw-on_1080x1920.mp4}
W=${2:-1080}
H=${3:-1920}
FPS=30
FRAMES=105            # keep in sync with FPS * DUR in study.html

CHROME=${CHROME:-$(command -v headless_shell || command -v chromium || command -v google-chrome || true)}
FF=${FF:-$(command -v ffmpeg || true)}

[ -x "${CHROME:-}" ] || { echo "no chromium found; set CHROME=/path/to/headless_shell" >&2; exit 1; }
[ -x "${FF:-}" ]     || { echo "no ffmpeg found; set FF=/path/to/ffmpeg" >&2; exit 1; }

rm -rf frames && mkdir -p frames

seq 0 $((FRAMES - 1)) | xargs -P 6 -I{} sh -c \
  '"$1" --headless --disable-gpu --no-sandbox --hide-scrollbars \
        --force-device-scale-factor=1 --window-size='"$W"','"$H"' \
        --screenshot=frames/f$(printf %03d {}).png \
        "file://'"$PWD"'/study.html?f={}" >/dev/null 2>&1' _ "$CHROME"

"$FF" -y -loglevel error -framerate $FPS -i frames/f%03d.png \
      -c:v libx264 -crf 19 -preset slow -pix_fmt yuv420p -movflags +faststart "$OUT"

echo "wrote $OUT"
