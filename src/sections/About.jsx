import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import { profile, principles, stats } from '../data/site';
import { useCounters } from '../lib/useCounters';

export default function About() {
  const root = useRef(null);
  useCounters([]);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      // Portrait drifts + tilts slightly as the section passes
      gsap.fromTo(
        '.brand-card',
        { rotate: -2.2, y: 34 },
        {
          rotate: 0,
          y: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about__figure',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );

      // The "currently building" note pops in
      gsap.from('.about__figure .note', {
        scale: 0.6,
        opacity: 0,
        rotate: -14,
        duration: 0.9,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.about__figure', start: 'top 78%', once: true },
      });

      // Word-by-word emphasis on the lede
      const lede = root.current.querySelector('.about__lede');
      if (lede) {
        const words = lede.textContent.split(' ');
        lede.innerHTML = words
          .map((w) => `<span style="display:inline-block;opacity:.18">${w}</span>`)
          .join(' ');
        gsap.to(lede.querySelectorAll('span'), {
          opacity: 1,
          stagger: 0.03,
          ease: 'none',
          scrollTrigger: {
            trigger: lede,
            start: 'top 82%',
            end: 'bottom 52%',
            scrub: true,
          },
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section about" id="about" ref={root} aria-labelledby="about-title">
      <div className="container">
        <div className="section-head split">
          <div style={{ display: 'grid', gap: 20 }}>
            <p className="eyebrow" data-reveal>
              <span className="num">03</span> About
            </p>
            <h2 className="title" id="about-title" data-split>
              A developer who cares about the last 10%
            </h2>
          </div>
          <p className="lede" data-reveal>
            The difference between a working page and a good one is invisible: the easing, the empty states, the
            keyboard path. That is the part I chase.
          </p>
        </div>

        <div className="about__grid">
          <div className="about__figure">
            <div className="brand-card" data-reveal="clip">
              <div className="brand-card__media">
                <img
                  src={profile.portrait}
                  alt="Code with Sayak — Learn, Code, Grow"
                  width="800"
                  height="800"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="brand-card__frame" aria-hidden="true" />
              <span className="brand-card__tag">Learn / Code / Grow</span>
            </div>
            <span className="note">
              <span className="pulse" aria-hidden="true" /> Currently building in public
            </span>
          </div>

          <div className="about__copy">
            <p className="about__lede">
              I turn rough ideas into interfaces people enjoy using.
            </p>
            <p className="body" data-reveal>
              {profile.about}
            </p>

            <ul className="principles" data-stagger>
              {principles.map((principle, i) => (
                <li className="principle" key={principle.title}>
                  <span className="principle__n">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h4>{principle.title}</h4>
                    <p>{principle.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="about__cards" data-stagger>
              {profile.cards.map((card) => (
                <div className="mini-card" key={card.label}>
                  <span>{card.label}</span>
                  <b>{card.value}</b>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="stats" style={{ marginTop: 'clamp(40px,6vw,72px)' }} data-reveal>
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <span className="stat__value">
                <span data-count={stat.value} />
                {stat.suffix}
              </span>
              <span className="stat__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
