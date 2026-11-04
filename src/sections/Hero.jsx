import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, MapPin, Download, Sparkles, MonitorSmartphone } from 'lucide-react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';
import { profile, social } from '../data/site';
import LocalClock from '../components/LocalClock';

const BADGE_TEXT = 'FRONTEND DEVELOPER · LEARN CODE GROW · ';

export default function Hero({ lenisRef, ready }) {
  const root = useRef(null);
  const titleRef = useRef(null);
  const stageRef = useRef(null);
  const [role, setRole] = useState(0);

  /* Rotating role lines */
  useEffect(() => {
    const id = setInterval(() => setRole((r) => (r + 1) % profile.rotating.length), 3200);
    return () => clearInterval(id);
  }, []);

  /* Entrance + scroll choreography */
  useEffect(() => {
    if (!ready) return undefined;
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) return;

      /* --- entrance --- */
      const tl = gsap.timeline({ defaults: { ease: 'house' }, delay: 0.12 });
      tl.from('.hero__topline > *', { y: 16, opacity: 0, duration: 0.8, stagger: 0.08 })
        .from('.hero__title .word', { yPercent: 118, duration: 1.15, stagger: 0.08 }, '-=0.45')
        .from('.hero__role', { y: 18, opacity: 0, duration: 0.7 }, '-=0.75')
        .from('.hero__lede', { y: 18, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero__cta > *', { y: 18, opacity: 0, duration: 0.7, stagger: 0.07, clearProps: 'transform' }, '-=0.55')
        .from('.hero__facts > div', { y: 14, opacity: 0, duration: 0.6, stagger: 0.06 }, '-=0.5')
        .from('.hero__stage', { scale: 0.9, opacity: 0, duration: 1.4, ease: 'expo.out' }, '-=1.5')
        .from('.float-card', { y: 16, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.9');

      /* --- scroll: whole block recedes & blurs while it leaves --- */
      gsap.to('.hero__content', {
        yPercent: -14,
        opacity: 0.15,
        filter: 'blur(6px)',
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      /* --- stage drifts up slightly faster + ring rotation --- */
      gsap.to(stageRef.current, {
        yPercent: -26,
        rotate: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      gsap.to('.hero__rings', {
        rotate: 55,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      gsap.to('.hero__halo', {
        scale: 1.35,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      /* --- mouse-follow depth on the stage --- */
      const onMove = (event) => {
        const { innerWidth, innerHeight } = window;
        const x = (event.clientX / innerWidth - 0.5) * 2;
        const y = (event.clientY / innerHeight - 0.5) * 2;
        gsap.to('.orb', { x: x * 12, y: y * 12, duration: 1.2, ease: 'power3.out' });
        gsap.to('.hero__halo', { x: x * -30, y: y * -20, duration: 1.6, ease: 'power3.out' });
        gsap.to('.float-card--a', { x: x * 26, y: y * 18, duration: 1.3, ease: 'power3.out' });
        gsap.to('.float-card--b', { x: x * -22, y: y * -16, duration: 1.3, ease: 'power3.out' });
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      return () => window.removeEventListener('mousemove', onMove);
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [ready]);

  const scrollTo = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return;
    if (lenisRef?.current) lenisRef.current.scrollTo(el, { offset: -6, duration: 1.5 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="top" ref={root} aria-label="Introduction">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__halo" />
        <div className="hero__grid-lines" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__topline">
            <span className="place">
              <MapPin size={13} strokeWidth={2} /> {profile.location}
            </span>
            <span className="place">
              <LocalClock /> <span aria-hidden="true">·</span> 01 — Intro
            </span>
          </div>

          <h1 className="hero__title" ref={titleRef}>
            <span className="line-mask">
              <span className="word l1">
                <span className="dot" aria-hidden="true" />
                Sayak
              </span>
            </span>
            <span className="line-mask">
              <span className="word l2">
                <span className="outline">Karmakar</span>
                <span className="amp">&amp;</span>
              </span>
            </span>
          </h1>

          <div className="hero__role" aria-live="off">
            <span className="bar" aria-hidden="true" />
            <span className="mono" style={{ color: 'var(--text-3)' }}>
              I am a
            </span>
            <span className="rotator">
              {profile.rotating.map((text, i) => {
                // Only the item leaving (prev) and the item arriving (active)
                // are rendered during a swap, so nothing ever peeks through the
                // clip while the others are parked.
                const offset = i - role;
                const visible = offset === 0 || offset === 1;
                return (
                  <span
                    key={text}
                    className={`rotator__item ${offset === 0 ? 'is-current' : ''}`}
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: `translateY(${offset === 0 ? 0 : -100}%)`,
                      transition:
                        'transform .7s var(--ease), opacity .4s var(--ease)',
                    }}
                    aria-hidden={i !== role}
                  >
                    {text}
                  </span>
                );
              })}
            </span>
          </div>

          <p className="hero__lede">{profile.lede}</p>

          <div className="hero__cta">
            <a
              className="btn btn-primary"
              data-magnetic="0.18"
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#work');
              }}
            >
              See the work <ArrowDownRight size={16} strokeWidth={2.2} />
            </a>
            <a className="btn btn-ghost" href={profile.resumeUrl} download>
              <Download size={15} strokeWidth={2.1} /> Résumé
            </a>
            <span className="hero__status">
              <span className="pulse" aria-hidden="true" />
              {profile.availability}
            </span>
          </div>

          <dl className="hero__facts">
            {profile.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---------------- visual stage ---------------- */}
        <div className="hero__stage" ref={stageRef} aria-hidden="true">
          <div className="hero__rings">
            <svg viewBox="0 0 400 400" fill="none">
              <circle cx="200" cy="200" r="196" stroke="currentColor" strokeDasharray="2 8" />
              <circle cx="200" cy="200" r="160" stroke="currentColor" />
              <circle cx="200" cy="200" r="124" stroke="currentColor" strokeDasharray="34 12" opacity="0.7" />
              <circle cx="200" cy="200" r="96" stroke="currentColor" strokeDasharray="1 6" />
              <circle cx="200" cy="4" r="3.5" fill="var(--accent)" />
              <circle cx="200" cy="396" r="2.5" fill="var(--accent-2)" />
              <circle cx="4" cy="200" r="2.5" fill="var(--accent-3)" />
            </svg>
          </div>

          <div className="hero__badge hero__badge--tl">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <path id="badgePath" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
              </defs>
              <text>
                <textPath href="#badgePath" startOffset="0">
                  {BADGE_TEXT.repeat(2)}
                </textPath>
              </text>
            </svg>
            <span className="core">
              <Sparkles size={14} />
            </span>
          </div>

          <div className="orb">
            <img src={profile.badge} alt="" width="640" height="640" loading="eager" fetchPriority="high" />
          </div>

          <div className="float-card float-card--a">
            <span className="k">Currently</span>
            <span className="v">
              <MonitorSmartphone size={14} /> Building interfaces
            </span>
          </div>

          <div className="float-card float-card--b">
            <span className="k">Stack</span>
            <span className="v">React · JS · CSS</span>
          </div>

          <div className="float-card float-card--c">
            <span className="k">Open source</span>
            <span className="v">
              <ArrowUpRight size={14} /> {social.github.replace('https://', '')}
            </span>
          </div>
        </div>
      </div>

      <button className="hero__scroll" type="button" onClick={() => scrollTo('#work')}>
        <span className="track" aria-hidden="true" />
        Scroll to explore
      </button>
    </section>
  );
}
