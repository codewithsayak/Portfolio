import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap';
import { onScrollLock, isScrollLocked } from './scrollLock';

/**
 * Smooth scrolling (Lenis) wired into GSAP's ticker + ScrollTrigger so pinning
 * and scroll-driven timelines stay perfectly in sync with the eased scroll.
 *
 * Returns a ref holding the Lenis instance so any component can call
 * `scrollTo('#id')`.
 */
export function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      lerp: 0.1,
    });
    lenisRef.current = lenis;

    // A lock may already be held (the preloader mounts before this hook).
    if (isScrollLocked()) lenis.stop();

    lenis.on('scroll', ScrollTrigger.update);

    // Freeze/unfreeze the page for modals and the mobile menu.
    const release = onScrollLock((isLocked) => {
      if (isLocked) lenis.stop();
      else lenis.start();
    });

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Anchor links inside the page use Lenis for a cinematic glide.
    const onClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link || link.classList.contains('skip')) return;
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -10, duration: 1.5 });
    };
    document.addEventListener('click', onClick);

    return () => {
      release();
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
