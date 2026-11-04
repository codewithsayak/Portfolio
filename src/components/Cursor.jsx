import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';

/**
 * A blended cursor: a small dot that tracks instantly plus a lagging ring that
 * grows over interactive elements and shows a label over project cards.
 * Only mounts when a real pointer is present.
 */
export default function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine || prefersReducedMotion()) return undefined;

    const ringEl = ring.current;
    const dotEl = dot.current;

    const moveDot = gsap.quickTo(dotEl, 'x', { duration: 0.12, ease: 'power3.out' });
    const moveDotY = gsap.quickTo(dotEl, 'y', { duration: 0.12, ease: 'power3.out' });
    const moveRing = gsap.quickTo(ringEl, 'x', { duration: 0.5, ease: 'power3.out' });
    const moveRingY = gsap.quickTo(ringEl, 'y', { duration: 0.5, ease: 'power3.out' });

    const onMove = (e) => {
      moveDot(e.clientX);
      moveDotY(e.clientY);
      moveRing(e.clientX);
      moveRingY(e.clientY);
    };

    const INTERACTIVE = 'a, button, [data-cursor="hover"], input, textarea, [role="button"]';

    const onOver = (e) => {
      const target = e.target.closest(INTERACTIVE);
      const labelEl = e.target.closest('[data-cursor-label]');
      ringEl.classList.toggle('is-label', Boolean(labelEl));
      ringEl.classList.toggle('is-hover', Boolean(target) && !labelEl);
      if (labelEl) label.current.textContent = labelEl.dataset.cursorLabel;
      gsap.to(dotEl, { scale: target ? 0 : 1, duration: 0.3 });
    };

    const onLeave = () => gsap.to([ringEl, dotEl], { opacity: 0, duration: 0.3 });
    const onEnter = () => gsap.to([ringEl, dotEl], { opacity: 1, duration: 0.3 });

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={ring} aria-hidden="true">
        <span className="cursor__label" ref={label} />
      </div>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  );
}
