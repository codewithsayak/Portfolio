import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from './lib/gsap';
import { useSmoothScroll } from './lib/useSmoothScroll';
import { useReveal } from './lib/useReveal';
import { useMagnetic } from './lib/useMagnetic';

import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Header from './components/Header';
import { ScrollChrome, useActiveSection } from './components/ScrollChrome';
import Marquee from './components/Marquee';
import ProjectModal from './components/ProjectModal';

import Hero from './sections/Hero';
import Work from './sections/Work';
import About from './sections/About';
import Statement from './sections/Statement';
import Skills from './sections/Skills';
import Services from './sections/Services';
import Journey from './sections/Journey';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  const [ready, setReady] = useState(false);
  const [project, setProject] = useState(null);
  const lenisRef = useSmoothScroll();
  const activeId = useActiveSection();
  const lastScroll = useRef(0);

  useReveal();
  useMagnetic();

  const handleLoaded = useCallback(() => setReady(true), []);

  /* Broadcast scroll velocity so the marquees can react to it. */
  useEffect(() => {
    let idle;
    const onScroll = () => {
      const y = window.scrollY;
      const velocity = y - lastScroll.current;
      lastScroll.current = y;
      if (Math.abs(velocity) > 1) window.__scrollVelocity = velocity;
      clearTimeout(idle);
      idle = setTimeout(() => {
        window.__scrollVelocity = 0;
      }, 140);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(idle);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* Refresh measurements once fonts/media settle, and on resize. */
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const timer = setTimeout(refresh, 600);
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', refresh);
    };
  }, []);

  /* Lock background interaction while the project dialog is open. */
  useEffect(() => {
    document.body.classList.toggle('modal-open', Boolean(project));
  }, [project]);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <div className="noise" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <Preloader onDone={handleLoaded} />
      <Cursor />
      <ScrollChrome activeId={activeId} lenisRef={lenisRef} />
      <Header activeId={activeId} lenisRef={lenisRef} />

      <main id="main" tabIndex={-1}>
        <Hero ready={ready} lenisRef={lenisRef} />

        <Marquee
          items={['React', 'JavaScript', 'CSS Architecture', 'Motion Design', 'Accessibility', 'Performance']}
          speed={34}
          className="band--top"
        />

        <Work onOpenProject={setProject} />

        <Marquee
          items={['Available for work', 'Let’s build something', 'Open to junior roles']}
          speed={30}
          reverse
          outline
        />

        <About />
        <Statement />


        <Marquee items={['Design', 'Code', 'Ship', 'Repeat']} speed={24} />

        <Skills />
        <Services />
        <Journey />
        <Contact />
      </main>

      <Footer lenisRef={lenisRef} />

      <ProjectModal project={project} onClose={() => setProject(null)} />
    </>
  );
}
