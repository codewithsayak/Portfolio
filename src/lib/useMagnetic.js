import { useEffect } from 'react';
import { gsap, prefersReducedMotion } from './gsap';

/**
 * Magnetic hover: elements with [data-magnetic] lean toward the cursor.
 * Cheap, pointer-only, and disabled for touch + reduced motion.
 */
export function useMagnetic() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    const cleanups = [];
    document.querySelectorAll('[data-magnetic]').forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic) || 0.35;
      const xTo = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' });

      const onMove = (event) => {
        const rect = el.getBoundingClientRect();
        const relX = event.clientX - (rect.left + rect.width / 2);
        const relY = event.clientY - (rect.top + rect.height / 2);
        xTo(relX * strength);
        yTo(relY * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
        gsap.set(el, { x: 0, y: 0 });
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
