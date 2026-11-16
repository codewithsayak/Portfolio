/**
 * Responsive-image helpers.
 *
 * Every photographic asset ships as a small ladder of AVIF + WebP files (see
 * `scripts/build-images.sh`, which regenerates them). Components use these
 * helpers so the browser downloads the size it actually needs instead of a
 * 1600px screenshot painted into a 400px card — the single biggest win in the
 * Lighthouse "Improve image delivery" audit.
 *
 * Art-directed SVGs are served as-is: they are already tiny and resolution
 * independent.
 */

const isVector = (src) => /\.svg(\?|$)/i.test(src);

/** `/a/b.webp` → `/a/b` (extension stripped) */
const stem = (src) => src.replace(/\.[^./?]+$/, '');

/**
 * Build a `srcset` string from a single source path.
 * `src="/assets/images/projects/orbit.webp"` + widths `[800,1200,1600]` →
 * `/assets/images/projects/orbit-800.webp 800w, …`
 *
 * Vector sources are returned as `undefined` so `<picture>` falls back to the
 * plain `<img src>`.
 */
export function buildSrcSet(src, widths = [], ext) {
  if (!src || isVector(src)) return undefined;
  const base = src.replace(/\.(webp|avif|jpe?g|png)$/i, '');
  return widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ');
}

/** True when a ladder of derivatives exists for this source. */
export const hasDerivatives = (src) => Boolean(src) && !isVector(src);

/**
 * Inline `sizes` presets, kept next to the layout they describe so the two
 * cannot drift apart.
 */
export const SIZES = {
  /* Work gallery card: flex basis clamp(300px, 42vw, 560px) minus 28px padding. */
  gallery: '(min-width: 900px) clamp(272px, 42vw, 532px), 86vw',
  /* Modal media spans the panel, which caps at 980px. */
  modal: '(min-width: 1020px) 980px, 100vw',
  /* Services hover preview is a fixed 300px box. */
  hover: '300px',
  /* About portrait: min(86%, 360px) inside a one-column figure. */
  portrait: '(min-width: 900px) 360px, 86vw',
};
