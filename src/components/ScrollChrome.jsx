import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { sections } from '../data/meta';

/**
 * Top progress bar + right-hand section rail. Both are driven by one
 * ScrollTrigger on the document so they stay in sync with the eased scroll.
 */
export function ScrollChrome({ activeId, lenisRef }) {
  const bar = useRef(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        gsap.set(bar.current, { scaleX: self.progress });
      },
    });
    return () => st.kill();
  }, []);

  const jump = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef?.current) lenisRef.current.scrollTo(el, { offset: -6, duration: 1.3 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="progress" aria-hidden="true">
        <i ref={bar} />
      </div>
      <nav className="rail" aria-label="Section navigation">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={activeId === section.id ? 'is-active' : ''}
            onClick={() => jump(section.id)}
            aria-current={activeId === section.id ? 'true' : undefined}
          >
            <span>{section.label}</span>
            <i aria-hidden="true" />
          </button>
        ))}
      </nav>
    </>
  );
}

/** Tracks which section owns the viewport, for nav + rail highlighting. */
export function useActiveSection() {
  const [active, setActive] = useState('top');

  useEffect(() => {
    const triggers = sections.map((section) => {
      const el = document.getElementById(section.id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => {
          if (self.isActive) setActive(section.id);
        },
      });
    });

    return () => triggers.forEach((trigger) => trigger?.kill());
  }, []);

  return active;
}
