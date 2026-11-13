#!/bin/sh
# Still + layout check, frame capture and encode in one go.
#   ./make.sh [name=<folder name>] [fps=25] [scale=1] [page=scene.html]
# Draft at scale 1; use scale 2 for the final MP4 (sharper, slower).
set -e
HERE=$(cd "$(dirname "$0")" && pwd)
NAME=${1:-$(basename "$HERE")}; FPS=${2:-25}; SCALE=${3:-1}; PAGE=${4:-scene.html}
cd "$HERE"
node render.mjs "$PAGE"
node capture.mjs frames "$FPS" "$SCALE" "$PAGE"
./encode.sh frames "$NAME" "$FPS"
