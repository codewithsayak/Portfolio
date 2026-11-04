import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';
import { projects } from '../data/site';

/**
 * Work: a horizontal gallery driven by vertical scroll.
 * Desktop  → pinned section, cards translate on X as you scroll (scrubbed).
 * Mobile / reduced motion → a clean vertical stack.
 */
export default function Work({ onOpenProject }) {
  const root = useRef(null);
  const pin = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const getDistance = () => {
        const viewport = track.current.parentElement;
        const styles = window.getComputedStyle(viewport);
        const padLeft = parseFloat(styles.paddingLeft) || 0;
        const padRight = parseFloat(styles.paddingRight) || 0;
        const visible = viewport.clientWidth - padLeft - padRight;
        return Math.max(track.current.scrollWidth - visible, 0);
      };

      const tween = gsap.to(track.current, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin.current,
          start: 'top top',
          end: () => `+=${getDistance() + window.innerHeight * 0.35}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* Cards lean into the scroll direction — a tiny bit of physics */
      const skewSetters = gsap.utils.toArray('.pcard').map((card) =>
        gsap.quickTo(card, 'skewY', { duration: 0.6, ease: 'power3' })
      );
      ScrollTrigger.create({
        trigger: pin.current,
        start: 'top top',
        end: () => `+=${getDistance() + window.innerHeight * 0.35}`,
        onUpdate: (self) => {
          const skew = gsap.utils.clamp(-6, 6, self.getVelocity() / -420);
          skewSetters.forEach((set) => set(skew));
        },
      });

      /* Progress bar for the gallery */
      gsap.to('.work__bar i', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: pin.current,
          start: 'top top',
          end: () => `+=${getDistance() + window.innerHeight * 0.35}`,
          scrub: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        skewSetters.forEach((set) => set(0));
      };
    });

    // Re-measure once the first paint and images have settled.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      mm.revert();
    };
  }, []);

  useEffect(() => {
    const fonts = document.fonts;
    fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <section className="work" id="work" ref={root} aria-labelledby="work-title">
      <div className="work__pin" ref={pin}>
        <div className="work__head">
          <div className="container">
            <div className="work__intro">
              <p className="eyebrow" data-reveal>
                <span className="num">02</span> Selected work
              </p>
              <div className="section-head split" style={{ marginBottom: 0 }}>
                <h2 className="title" id="work-title" data-split>
                  Projects built with intent, not templates
                </h2>
                <div className="work__side" data-reveal>
                  <p className="lede">
                    Interfaces, tools and experiments — each one designed and coded from the first pixel to the
                    last commit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="work__viewport">
          <div className="work__track" ref={track}>
            {projects.map((project) => (
              <article className="pcard" key={project.id}>
                <button
                  className="pcard__open"
                  type="button"
                  onClick={() => onOpenProject(project)}
                  aria-label={`View details for ${project.title}`}
                  data-cursor-label="View"
                />
                <div className="pcard__media" data-cursor-label="View">
                  <span className="pcard__idx">{project.index}</span>
                  <span className="pcard__year">{project.year}</span>
                  <img
                    src={project.image}
                    alt=""
                    width="1200"
                    height="675"
                    loading="lazy"
                    decoding="async"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="pcard__body">
                  <h3 className="pcard__title">
                    {project.title}
                    <ArrowUpRight size={19} strokeWidth={2} aria-hidden="true" />
                  </h3>
                  <p className="pcard__short">{project.short}</p>
                  <div className="pcard__tags">
                    {project.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}

            <article className="pcard pcard--cta" key="cta">
              <div className="pcard__body" style={{ padding: '26px 22px', height: '100%', alignContent: 'center' }}>
                <p className="mono" style={{ color: 'var(--accent)' }}>
                  More in the wild
                </p>
                <h3 className="pcard__title" style={{ fontSize: 'clamp(1.5rem,2.4vw,2.1rem)' }}>
                  Everything ships on GitHub
                </h3>
                <p className="pcard__short">
                  Source, experiments and small utilities — published openly for anyone to read, fork and learn from.
                </p>
                <a
                  className="btn btn-ghost btn-sm"
                  href="https://github.com/codewithsayak"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ justifySelf: 'start', marginTop: 8 }}
                >
                  Browse repositories <ArrowUpRight size={15} />
                </a>
              </div>
            </article>
          </div>
        </div>

        <div className="container">
          <div className="work__bar" aria-hidden="true">
            <span className="mono">{projects.length} projects · 2024—2026</span>
            <div className="work__bar-track">
              <i />
            </div>
            <span className="mono work__hint">Scroll →</span>
          </div>
        </div>
      </div>
    </section>
  );
}
