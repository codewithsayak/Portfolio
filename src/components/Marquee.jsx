import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';

/**
 * Seamless infinite marquee.
 *
 * Two identical tracks sit side by side. Sliding both left by exactly one track
 * width and looping produces a perfect seam. Scroll velocity nudges the
 * timescale so the band speeds up as you flick the page.
 */
export default function Marquee({ items = [], speed = 26, reverse = false, outline = false, className = '' }) {
  const trackA = useRef(null);
  const trackB = useRef(null);

  useEffect(() => {
    const a = trackA.current;
    const b = trackB.current;
    if (!a || !b) return undefined;

    const width = a.getBoundingClientRect().width;
    if (!width) return undefined;

    if (prefersReducedMotion()) {
      gsap.set([a, b], { x: 0 });
      return undefined;
    }

    // Forward: 0 → -width. Reverse: -width → 0.
    if (reverse) gsap.set([a, b], { x: -width });
    else gsap.set([a, b], { x: 0 });

    const tween = gsap.to([a, b], {
      x: reverse ? 0 : -width,
      duration: speed,
      ease: 'none',
      repeat: -1,
    });

    let current = 1;
    let target = 1;
    const tick = () => {
      const velocity = Math.abs(window.__scrollVelocity || 0);
      target = 1 + Math.min(velocity * 0.05, 2.4);
      current += (target - current) * 0.06;
      tween.timeScale(current);
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      tween.kill();
    };
  }, [speed, reverse, items.length]);

  const row = (ref, key) => (
    <div className="marquee__track" ref={ref} key={key} aria-hidden="true">
      {items.map((item, i) => (
        <span className="band__item" key={`${item}-${i}`}>
          <span className={i % 2 === 1 ? 'band__text band__serif' : 'band__text'}>{item}</span>
          <span className="band__dot" />
        </span>
      ))}
    </div>
  );

  return (
    <div className={`band ${outline ? 'band--outline' : ''} ${className}`} aria-hidden="true">
      <div className="marquee">
        {row(trackA, 'a')}
        {row(trackB, 'b')}
      </div>
    </div>
  );
}
