#!/bin/sh
# Start a new graphic:  npm run new -- <name> [feed|map|diorama]   (default: feed)
#   feed     2D motion infographic readable in the feed (motion-infographic)
#   map      2D animated system map: stages, icon cards, connectors (motion-infographic)
#   diorama  3D scene (diorama-3d)
set -e
ROOT=$(cd "$(dirname "$0")/.." && pwd)
NAME=$1; KIND=${2:-feed}
[ -n "$NAME" ] || { echo "usage: npm run new -- <name> [feed|map|diorama]"; exit 1; }
DEST="$ROOT/output/$NAME"
[ -e "$DEST" ] && { echo "already exists: output/$NAME"; exit 1; }
mkdir -p "$ROOT/output"
case "$KIND" in
  feed|motion|map)
    [ "$KIND" = motion ] && KIND=feed
    cp -R "$ROOT/skills/motion-infographic/kit" "$DEST"
    cp "$ROOT/skills/motion-infographic/starters/$KIND/scene.js" "$DEST/scene.js"
    mkdir -p "$DEST/assets"
    printf 'frames/\noutput/\n' > "$DEST/.gitignore"
    echo "created output/$NAME from the $KIND starter"
    echo "  edit  output/$NAME/scene.js   (copy, timing, layout; brand is in brand.js)"
    echo "  open  output/$NAME/scene.html (live preview; ?t=3 freezes a moment)"
    echo "  run   cd output/$NAME && ./make.sh" ;;
  diorama)
    cp -R "$ROOT/skills/diorama-3d/starter" "$DEST"
    echo "created output/$NAME from the diorama starter"
    echo "  edit  output/$NAME/scene.js, scene.html, scene.css"
    echo "  run   cd output/$NAME && ./build.sh && node capture.mjs frames 25 && ./encode.sh frames $NAME" ;;
  *) echo "unknown kind: $KIND (feed, map or diorama)"; exit 1 ;;
esac
