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
      const cards = gsap.utils.toArray('.pcard', track.current);
      const barFill = root.current?.querySelector('.work__bar i');

      const getDistance = () => {
        const viewport = track.current.parentElement;
        const styles = window.getComputedStyle(viewport);
        const padLeft = parseFloat(styles.paddingLeft) || 0;
        const padRight = parseFloat(styles.paddingRight) || 0;
        const visible = viewport.clientWidth - padLeft - padRight;
        return Math.max(track.current.scrollWidth - visible, 0);
      };

      /* Subtle horizontal lean driven by actual scrubbed track motion so
         card top/bottom borders stay level and always settle back to 0. */
      const skewSetters = cards.map((card) =>
        gsap.quickTo(card, 'skewX', { duration: 0.35, ease: 'power3.out', overwrite: 'auto' })
      );

      let prevX = Number(gsap.getProperty(track.current, 'x')) || 0;
      let idleTimer;

      const resetSkew = () => {
        clearTimeout(idleTimer);
        skewSetters.forEach((set) => set(0));
      };

      const tween = gsap.to(track.current, {
        x: () => -getDistance(),
        ease: 'none',
        onUpdate() {
          if (barFill) gsap.set(barFill, { scaleX: this.progress() });
          if (!track.current) return;

          const currentX = Number(gsap.getProperty(track.current, 'x')) || 0;
          const dt = gsap.ticker.deltaRatio() || 1;
          const velocity = (currentX - prevX) / dt;
          prevX = currentX;

          const skew = Math.abs(velocity) < 0.12 ? 0 : gsap.utils.clamp(-1.8, 1.8, velocity * 0.06);
          skewSetters.forEach((set) => set(skew));

          clearTimeout(idleTimer);
          idleTimer = setTimeout(resetSkew, 90);
        },
        scrollTrigger: {
          trigger: pin.current,
          start: 'top top',
          end: () => `+=${getDistance() + window.innerHeight * 0.35}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            prevX = Number(gsap.getProperty(track.current, 'x')) || 0;
            if (barFill) gsap.set(barFill, { scaleX: self.progress });
            resetSkew();
          },
          onScrubComplete: resetSkew,
          onLeave: resetSkew,
          onLeaveBack: resetSkew,
        },
      });

      return () => {
        clearTimeout(idleTimer);
        tween.scrollTrigger?.kill();
        tween.kill();
        if (barFill) gsap.set(barFill, { clearProps: 'transform' });
        gsap.set(cards, { clearProps: 'transform' });
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
