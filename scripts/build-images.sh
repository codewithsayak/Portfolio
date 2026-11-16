#!/usr/bin/env bash
# Regenerate the responsive image ladders in public/assets/images.
#
#   ./scripts/build-images.sh
#
# Requires ImageMagick with AVIF support (`convert -list format | grep AVIF`).
# Source files are the full-size originals in public/assets/images; every
# derivative is written to a subfolder so the names never collide:
#
#   hero/badge-{320,560}.{avif,webp}          ← profile-badge.webp  (hero orb)
#   portrait/portrait-{400,720}.{avif,webp}   ← profile.webp        (about card)
#   projects/<name>-{640,1200}.{avif,webp}    ← <name>.webp         (work cards)
#
# Widths are chosen from the largest CSS size each asset is painted at, times
# ~2 for high-DPI screens — not from the source dimensions. Keeping the list
# short is the point: the browser must never fetch a 1600px screenshot for a
# 500px card.
set -euo pipefail

cd "$(dirname "$0")/.."
SRC=public/assets/images
OUT=$SRC

avif() { convert "$1" -resize "$2" -strip -quality "${4:-58}" "$3"; }
webp() { convert "$1" -resize "$2" -strip -quality "${4:-74}" "$3"; }

mkdir -p "$OUT/hero" "$OUT/portrait" "$OUT/projects"

# --- hero orb badge: painted at most ~271 CSS px on desktop ------------------
cp "$SRC/profile-badge.webp" "$OUT/hero/badge.webp"
for s in 320 560; do
  avif "$OUT/hero/badge.webp" "${s}x${s}" "$OUT/hero/badge-$s.avif" 52
  webp "$OUT/hero/badge.webp" "${s}x${s}" "$OUT/hero/badge-$s.webp"
done

# --- about portrait: capped at min(86%, 360px) -------------------------------
cp "$SRC/profile.webp" "$OUT/portrait/portrait.webp"
for s in 400 720; do
  avif "$OUT/portrait/portrait.webp" "${s}x${s}" "$OUT/portrait/portrait-$s.avif" 52
  webp "$OUT/portrait/portrait.webp" "${s}x${s}" "$OUT/portrait/portrait-$s.webp"
done

# --- project previews: gallery cards clamp(300px, 42vw, 560px) ---------------
for name in portfolio gradient orbit atlas; do
  case $name in
    portfolio) src="$SRC/portfolio.webp" ;;
    gradient)  src="$SRC/gradient.webp" ;;
    orbit)     src="$SRC/project-orbit.webp" ;;
    atlas)     src="$SRC/project-atlas.webp" ;;
  esac
  cp "$src" "$OUT/projects/$name.webp"
  for s in 640 1200; do
    avif "$OUT/projects/$name.webp" "${s}x" "$OUT/projects/$name-$s.avif" 62
    webp "$OUT/projects/$name.webp" "${s}x" "$OUT/projects/$name-$s.webp"
  done
done

# --- fonts: latin-subset woff2, copied out of node_modules -------------------
# index.html preloads these, so they must be stable, unhashed public URLs.
mkdir -p public/fonts
cp node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2 public/fonts/
cp node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2 public/fonts/
cp node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2 public/fonts/
cp node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2 public/fonts/

echo "Done. Ladders written under $OUT/{hero,portrait,projects} and public/fonts."
du -sh "$OUT/hero" "$OUT/portrait" "$OUT/projects" public/fonts
