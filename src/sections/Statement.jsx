import { useEffect, useRef } from 'react';
import { ScrollTrigger, prefersReducedMotion } from '../lib/gsap';
import { profile } from '../data/site';

const TEXT =
  'Design is not decoration. It is the quiet decisions that make an interface feel obvious.';

/**
 * Statement: words illuminate progressively as you scroll — reading becomes
 * visible progress. Driven by one ScrollTrigger reading scroll progress, which
 * is far more reliable than animating a CSS custom property.
 */
export default function Statement() {
  const root = useRef(null);
  const words = TEXT.split(' ');

  useEffect(() => {
    const els = root.current?.querySelectorAll('.statement__text .w');
    if (!els) return undefined;

    if (prefersReducedMotion()) {
      els.forEach((el) => el.classList.add('lit'));
      return undefined;
    }

    const st = ScrollTrigger.create({
      trigger: '.statement__text',
      start: 'top 84%',
      end: 'bottom 48%',
      onUpdate: (self) => {
        const lit = Math.round(self.progress * (els.length + 6));
        els.forEach((el, i) => el.classList.toggle('lit', i < lit));
      },
      onRefresh: (self) => {
        const lit = Math.round(self.progress * (els.length + 6));
        els.forEach((el, i) => el.classList.toggle('lit', i < lit));
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section className="statement" aria-label="Design philosophy" ref={root}>
      <div className="container">
        <p className="statement__text">
          {words.map((word, i) => {
            const isPivot = word === 'decoration.' || word === 'obvious.';
            return (
              <span className={`w ${isPivot ? 'serif' : ''}`} key={`${word}-${i}`}>
                {word}
              </span>
            );
          })}
        </p>
        <div className="statement__aside" data-reveal>
          <span className="eyebrow">Philosophy</span>
          <p className="ink-2" style={{ fontSize: '0.9rem', lineHeight: 1.65 }}>
            I build the same way I read code: slowly at first, then all at once. Every project starts with the
            content and ends with the motion — never the other way around.
          </p>
          <span className="mono" style={{ color: 'var(--text-3)' }}>
            {profile.name} · {profile.timezone}
          </span>
        </div>
      </div>
    </section>
  );
}
