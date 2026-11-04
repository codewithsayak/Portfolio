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
 * Reliability rules (content must never be permanently invisible):
 *  1. No `gsap.from()` for reveals — a from() tween writes its hidden start
 *     state immediately and stays hidden if its ScrollTrigger never fires.
 *     Elements are revealed with fromTo() advanced by a ScrollTrigger whose
 *     `once` callback sets the final state, and any element that is already in
 *     (or above) the viewport at setup time is revealed straight away.
 *  2. A safety net re-checks every reveal after layout settles and on the
 *     first scroll, so a missed trigger can only ever cost a few frames.
 *  3. SplitText nodes are restored before re-splitting, which keeps React's
 *     strict double-mount from orphaning line wrappers and stranding text
 *     translated outside its mask.
 */
export function useReveal() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    const splits = [];

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        /* ---------- split headlines ---------- */
        document.querySelectorAll('[data-split]').forEach((el) => {
          if (el.dataset.splitDone === 'true') return;

          let split;
          try {
            split = new SplitText(el, { type: 'lines', linesClass: 'split-line', mask: 'lines' });
          } catch {
            return; // splitting failed → leave the heading exactly as written
          }
          splits.push({ el, split });
          el.dataset.splitDone = 'true';

          if (!split.lines?.length) return;

          gsap.fromTo(
            split.lines,
            { yPercent: 118 },
            {
              yPercent: 0,
              duration: 1.1,
              ease: 'house',
              stagger: 0.075,
              scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            }
          );
        });

        /* ---------- stagger groups ---------- */
        document.querySelectorAll('[data-stagger]').forEach((group) => {
          const items = Array.from(group.children);
          if (!items.length) return;
          gsap.fromTo(
            items,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: 'house',
              stagger: 0.07,
              scrollTrigger: { trigger: group, start: 'top 92%', once: true },
            }
          );
        });

        /* ---------- generic reveals ---------- */
        const reveals = document.querySelectorAll('[data-reveal]:not([data-reveal="clip"])');
        reveals.forEach((el) => {
          gsap.fromTo(
            el,
            { y: 26, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'house',
              scrollTrigger: {
                trigger: el,
                start: 'top 94%',
                once: true,
                // Whatever happens, hand the element back in its natural state.
                onEnter: () => el.classList.add('is-revealed'),
              },
            }
          );
        });

        /* ---------- clip reveals ---------- */
        document.querySelectorAll('[data-reveal="clip"]').forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: 'inset(12% 6% 12% 6% round 18px)', opacity: 0.4, scale: 1.03 },
            {
              clipPath: 'inset(0% 0% 0% 0% round 18px)',
              opacity: 1,
              scale: 1,
              duration: 1.25,
              ease: 'house',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                once: true,
                onEnter: () => el.classList.add('is-revealed'),
              },
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

      /* ---------- safety net ----------
         Anything still hidden but sitting inside (or above) the viewport is
         shown immediately. Runs after paint, after fonts, and on first scroll. */
      const forceVisibleInView = () => {
        const vh = window.innerHeight;
        document
          .querySelectorAll('[data-reveal]:not(.is-revealed), [data-stagger] > *')
          .forEach((el) => {
            const rect = el.getBoundingClientRect();
            const inView = rect.top < vh * 0.95 && rect.bottom > -vh;
            const stuck = el.dataset.reveal !== 'clip' && getComputedStyle(el).opacity === '0';
            if (inView && stuck) {
              gsap.set(el, { clearProps: 'all' });
              el.classList.add('is-revealed');
            }
          });
      };

      const onFirstScroll = () => {
        forceVisibleInView();
        window.removeEventListener('scroll', onFirstScroll);
      };

      const t = setTimeout(forceVisibleInView, 250);
      const t2 = setTimeout(forceVisibleInView, 1200);
      window.addEventListener('scroll', onFirstScroll, { once: true, passive: true });
      document.fonts?.ready.then(() => {
        forceVisibleInView();
        ScrollTrigger.refresh();
      });

      return () => {
        clearTimeout(t);
        clearTimeout(t2);
        window.removeEventListener('scroll', onFirstScroll);
        // Restore split text so React sees the DOM it created.
        splits.splice(0).forEach(({ el, split }) => {
          try {
            split.revert();
          } catch {
            /* noop */
          }
          delete el.dataset.splitDone;
        });
        ctx.revert();
      };
    });

    return () => mm.revert();
  }, []);
}

export { prefersReducedMotion };
