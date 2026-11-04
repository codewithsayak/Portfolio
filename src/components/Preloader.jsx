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
    const finish = () => {
      unlockScroll();
      setGone(true);
      onDone?.();
    };

    if (reduced) {
      setCount(100);
      finish();
      return undefined;
    }

    const tl = gsap.timeline({ defaults: { ease: 'house' } });

    tl.to(counter, {
      value: 100,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(counter.value)),
    })
      .to(bar, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, 0)
      .to('.preloader__name span', { yPercent: -110, duration: 0.55, stagger: 0.045 }, '-=0.18')
      .to('.preloader__mark, .preloader__count, .preloader__bar', { opacity: 0, duration: 0.3 }, '<')
      .to(
        root.current,
        {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete: finish,
        },
        '-=0.1'
      );

    return () => {
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
        <h1 className="preloader__name">
          {siteMeta.preloadWords.map((word) => (
            <span key={word} style={{ marginRight: '0.22em' }}>
              {word}
            </span>
          ))}
        </h1>
        <div className="preloader__bar">
          <i />
        </div>
        <p className="preloader__count">{String(count).padStart(3, '0')}%</p>
      </div>
    </div>
  );
}
