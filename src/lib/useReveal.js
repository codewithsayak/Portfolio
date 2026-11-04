import { useEffect } from 'react';
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from './gsap';

/**
 * Site-wide scroll reveals.
 *
 * - [data-reveal]            fade + rise, once
 * - [data-reveal="clip"]     image clip-path wipe
 * - [data-split]             SplitText line-mask reveal (headings)
 * - [data-parallax="0.15"]   subtle y-parallax while scrolling
 * - [data-stagger]           stagger direct children
 *
 * Everything is created inside a gsap.matchMedia so `prefers-reduced-motion`
 * gets a static, fully visible page.
 */
export function useReveal() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        /* ---------- split headlines ---------- */
        document.querySelectorAll('[data-split]').forEach((el) => {
          const split = new SplitText(el, {
            type: 'lines',
            linesClass: 'split-line',
            mask: 'lines',
          });

          gsap.from(split.lines, {
            yPercent: 118,
            duration: 1.15,
            ease: 'house',
            stagger: 0.085,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          });
        });

        /* ---------- stagger groups ---------- */
        document.querySelectorAll('[data-stagger]').forEach((group) => {
          const items = Array.from(group.children);
          if (!items.length) return;
          gsap.from(items, {
            y: 26,
            opacity: 0,
            duration: 0.85,
            ease: 'house',
            stagger: 0.075,
            scrollTrigger: { trigger: group, start: 'top 90%', once: true },
          });
        });

        /* ---------- generic reveals ---------- */
        ScrollTrigger.batch('[data-reveal]:not([data-reveal="clip"])', {
          start: 'top 92%',
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(
              batch,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.95,
                ease: 'house',
                stagger: 0.07,
                overwrite: true,
                clearProps: 'transform,opacity',
              }
            ),
        });

        /* ---------- clip reveals ---------- */
        document.querySelectorAll('[data-reveal="clip"]').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(14% 6% 14% 6% round 18px)', opacity: 0.35, scale: 1.04 },
            {
              clipPath: 'inset(0% 0% 0% 0% round 18px)',
              opacity: 1,
              scale: 1,
              duration: 1.3,
              ease: 'house',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            }
          );
        });

        /* ---------- parallax ---------- */
        document.querySelectorAll('[data-parallax]').forEach((el) => {
          const depth = parseFloat(el.dataset.parallax) || 0.12;
          gsap.fromTo(
            el,
            { yPercent: depth * -60 },
            {
              yPercent: depth * 60,
              ease: 'none',
              scrollTrigger: {
                trigger: el.closest('section') || el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        });
      });

      // Fonts can load after first paint and change line boxes; re-measure.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);
}
