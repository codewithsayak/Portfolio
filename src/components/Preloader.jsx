import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import { siteMeta } from '../data/meta';
import { lockScroll, unlockScroll } from '../lib/scrollLock';

/**
 * Cinematic entrance: a counter, a loading line, then three stacked panels
 * lift away to reveal the hero. Calls `onDone` when finished.
 */
export default function Preloader({ onDone }) {
  const root = useRef(null);
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    lockScroll();
    const reduced = prefersReducedMotion();
    const counter = { value: 0 };
    const bar = root.current?.querySelector('.preloader__bar i');
    let done = false;
    let safetyTimer;

    const finish = () => {
      if (done) return;
      done = true;
      clearTimeout(safetyTimer);
      unlockScroll();
      setGone(true);
      onDone?.();
    };

    if (reduced) {
      setCount(100);
      finish();
      return undefined;
    }

    // Guarantee the preloader never blocks the page if RAF is background-throttled.
    // Was 3800ms; the intro itself is shorter now, so the safety net can be too.
    safetyTimer = setTimeout(finish, 2600);

    const tl = gsap.timeline({ defaults: { ease: 'house' } });

    /* Deliberately quick: every millisecond here is time the visitor spends
       looking at a curtain instead of the hero, and it lands directly on LCP.
       The whole intro is under two seconds end to end. */
    tl.to(counter, {
      value: 100,
      duration: 0.85,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(counter.value)),
    })
      .to(bar, { scaleX: 1, duration: 0.55, ease: 'power2.inOut' }, 0)
      .to('.preloader__name span', { yPercent: -110, duration: 0.5, stagger: 0.04 }, '-=0.12')
      .to('.preloader__mark, .preloader__count, .preloader__bar', { opacity: 0, duration: 0.25 }, '<')
      .to(
        root.current,
        {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.62,
          ease: 'power4.inOut',
          onComplete: finish,
        },
        '-=0.06'
      );

    return () => {
      clearTimeout(safetyTimer);
      tl.kill();
      unlockScroll();
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader__inner">
        <p className="preloader__mark">Code with Sayak</p>
        <span className="preloader__side preloader__side--l">Frontend Developer</span>
        <span className="preloader__side preloader__side--r">Basirhat · IN</span>
        {/* Decorative wordmark, not the page heading — the hero owns the only
            <h1>. A second one here is an accessibility flag and confuses the
            document outline. */}
        <p className="preloader__name">
          {siteMeta.preloadWords.map((word) => (
            <span key={word} style={{ marginRight: '0.22em' }}>
              {word}
            </span>
          ))}
        </p>
        <div className="preloader__bar">
          <i />
        </div>
        <p className="preloader__count">{String(count).padStart(3, '0')}%</p>
      </div>
    </div>
  );
}
