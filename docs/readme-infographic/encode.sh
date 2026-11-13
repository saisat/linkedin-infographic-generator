#!/bin/sh
# Encode captured frames: the MP4 for a LinkedIn video post, a GIF (target under 5 MB) and a filmstrip for review.
#   ./encode.sh <frames-dir> <name> [fps=25] [gif-fps=15] [gif-width=720]
# For a full-size GIF use gif-fps 15 and gif-width 1080; check the size, cut colours if over 5 MB.
set -e
DIR=$1; NAME=$2; FPS=${3:-25}; GFPS=${4:-15}; GW=${5:-720}
[ -n "$DIR" ] && [ -n "$NAME" ] || { echo "usage: ./encode.sh <frames-dir> <name> [fps] [gif-fps] [gif-width]"; exit 1; }
OUT="$(cd "$(dirname "$0")" && pwd)/output"; mkdir -p "$OUT"
ffmpeg -y -loglevel error -framerate "$FPS" -i "$DIR/f%04d.png" -vf "scale=1080:1350:flags=lanczos" \
  -c:v libx264 -crf 18 -pix_fmt yuv420p -movflags +faststart "$OUT/$NAME.mp4"
ffmpeg -y -loglevel error -framerate "$FPS" -i "$DIR/f%04d.png" \
  -vf "fps=$GFPS,scale=$GW:-1:flags=lanczos,split[a][b];[a]palettegen=stats_mode=full:max_colors=160[p];[b][p]paletteuse=dither=sierra2_4a:diff_mode=rectangle" \
  "$OUT/$NAME.gif"
# Filmstrip: 14 evenly spaced frames, to check the build order and the loop at a glance.
N=$(ls "$DIR" | grep -c '^f.*\.png$'); STEP=$(( (N + 13) / 14 ))
ffmpeg -y -loglevel error -framerate "$FPS" -i "$DIR/f%04d.png" \
  -vf "select='not(mod(n\,$STEP))',scale=270:-1,tile=7x2:padding=6:color=white" -frames:v 1 "$OUT/$NAME-filmstrip.png"
ls -lh "$OUT/$NAME.mp4" "$OUT/$NAME.gif" "$OUT/$NAME-filmstrip.png"
SIZE=$(wc -c < "$OUT/$NAME.gif")
[ "$SIZE" -le 5242880 ] || echo "warning: GIF is over 5 MB; lower gif-fps, gif-width or max_colors"
