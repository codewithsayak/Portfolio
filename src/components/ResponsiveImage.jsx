import { buildSrcSet, hasDerivatives } from '../lib/images';

const WIDTHS = [640, 1200];

/**
 * One `<img>` that upgrades itself to `<picture>` when a derivative ladder
 * exists for the source: AVIF first, WebP second, then the plain file.
 *
 * `width`/`height` are always forwarded so the intrinsic aspect ratio is known
 * before the bytes land — that is what stops cards jumping as images decode.
 */
export default function ResponsiveImage({
  src,
  alt = '',
  sizes,
  widths = WIDTHS,
  width,
  height,
  className,
  style,
  ...rest
}) {
  const img = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      {...rest}
    />
  );

  if (!hasDerivatives(src) || !sizes) return img;

  const avif = buildSrcSet(src, widths, 'avif');
  const webp = buildSrcSet(src, widths, 'webp');

  return (
    <picture>
      {avif && <source type="image/avif" srcSet={avif} sizes={sizes} />}
      {webp && <source type="image/webp" srcSet={webp} sizes={sizes} />}
      {img}
    </picture>
  );
}
