import { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import { journey, profile } from '../data/site';

/**
 * Journey: a timeline whose accent line draws itself with scroll and whose
 * entries light up as they pass the viewport centre.
 */
export default function Journey() {
  const root = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      root.current?.querySelectorAll('.titem').forEach((el) => el.classList.add('is-active'));
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.timeline__fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline',
            start: 'top 72%',
            end: 'bottom 62%',
            scrub: 0.4,
          },
        }
      );

      gsap.utils.toArray('.titem').forEach((item) => {
        gsap.from(item, {
          x: -18,
          opacity: 0,
          duration: 0.8,
          ease: 'house',
          scrollTrigger: { trigger: item, start: 'top 86%', once: true },
        });

        const st = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 78%',
            end: 'bottom 42%',
            onEnter: () => item.classList.add('is-active'),
            onEnterBack: () => item.classList.add('is-active'),
            onLeaveBack: () => item.classList.remove('is-active'),
          },
        });
        return () => st.kill();
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section journey" id="journey" aria-labelledby="journey-title" ref={root}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow" data-reveal>
            <span className="num">06</span> Journey
          </p>
          <h2 className="title" id="journey-title" data-split>
            How I got here
          </h2>
        </div>

        <div className="journey__wrap">
          <aside className="journey__aside">
            <h3 className="display-sm">
              Self-taught,
              <br />
              <span className="serif grad-text">still learning.</span>
            </h3>
            <p>
              A path from first static page to full interactive applications — documented in commits rather than
              certificates.
            </p>
            <div className="side-note" style={{ maxWidth: 300 }}>
              <h5>Based in</h5>
              <p>{profile.location}</p>
              <h5 style={{ marginTop: 6 }}>Timezone</h5>
              <p>{profile.timezone}</p>
            </div>
          </aside>

          <ol className="timeline">
            <span className="timeline__fill" aria-hidden="true" />
            {journey.map((item) => (
              <li className="titem" key={item.title}>
                <p className="titem__year">
                  {item.year} <span className="tag">{item.tag}</span>
                </p>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
