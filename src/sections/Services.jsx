import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import { services } from '../data/site';

/**
 * Services: an editorial list where hovering a row reveals a floating preview
 * image that follows the pointer with GSAP quickTo.
 */
export default function Services() {
  const root = useRef(null);
  const preview = useRef(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const el = preview.current;
    if (!el) return undefined;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3', delay: 0.04 });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3', delay: 0.04 });

    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const ctx = gsap.context(() => {
      gsap.from('.srow', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'house',
        scrollTrigger: { trigger: '.services__list', start: 'top 82%', once: true },
      });
    }, root);

    return () => {
      window.removeEventListener('mousemove', onMove);
      ctx.revert();
    };
  }, []);

  return (
    <section className="section services" id="services" aria-labelledby="services-title" ref={root}>
      <div className="container">
        <div className="section-head split">
          <div style={{ display: 'grid', gap: 20 }}>
            <p className="eyebrow" data-reveal>
              <span className="num">05</span> Services
            </p>
            <h2 className="title" id="services-title" data-split>
              How I can help your team
            </h2>
          </div>
          <p className="lede" data-reveal>
            Available for junior frontend roles, internships and select freelance builds. Clear scope, honest
            timelines, no surprises.
          </p>
        </div>

        <div className="services__list">
          {services.map((service) => (
            <article
              className="srow"
              key={service.id}
              onMouseEnter={() => setHovered(service)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="srow__num">{service.id}</span>
              <h3 className="srow__title">{service.title}</h3>
              <p className="srow__desc" style={{ justifySelf: 'end' }}>
                {service.description}
              </p>
              <span className="srow__arrow" aria-hidden="true">
                <ArrowUpRight size={17} strokeWidth={2} />
              </span>
              <div className="srow__deliverables">
                {service.deliverables.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="srow__hoverimg" ref={preview} aria-hidden="true">
        <div className={`srow__hoverimg-inner ${hovered ? 'is-on' : ''}`}>
          {hovered && <img src={hovered.image} alt="" />}
        </div>
      </div>
    </section>
  );
}
