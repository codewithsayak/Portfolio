import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { gsap } from '../lib/gsap';
import { navLinks, profile, social } from '../data/site';
import LocalClock from './LocalClock';
import { onScrollLock, lockScroll, unlockScroll } from '../lib/scrollLock';

export default function Header({ activeId, lenisRef }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const sheetRef = useRef(null);
  const lastY = useRef(0);

  /* Condense on scroll, hide when scrolling down mid-page. */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 420 && y > lastY.current + 4 && !open);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  useEffect(() => {
    if (open) lockScroll();
    else unlockScroll();
    return () => unlockScroll();
  }, [open]);

  useEffect(() => onScrollLock((locked) => !locked && setOpen(false)), []);

  const go = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(el, { offset: -8, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleClick = (event, href) => {
    event.preventDefault();
    go(href);
  };

  /* Stagger the mobile sheet links each time it opens. */
  useEffect(() => {
    if (!open || !sheetRef.current) return;
    const links = sheetRef.current.querySelectorAll('nav a');
    gsap.fromTo(
      links,
      { y: 26, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, delay: 0.18, ease: 'house' }
    );
  }, [open]);

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''} ${hidden ? 'is-hidden' : ''}`}>
        <a
          className="brand"
          href="#top"
          onClick={(e) => handleClick(e, '#top')}
          aria-label={`${profile.name} — back to top`}
        >
          <span className="brand__mark" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </span>
          <span className="brand__name">
            <b>{profile.name}</b>
            <small>{profile.role}</small>
          </span>
        </a>

        <nav className="nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={activeId === link.href.slice(1) ? 'is-active' : ''}
              aria-current={activeId === link.href.slice(1) ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <LocalClock className="header__clock" />
          <a
            className="icon-btn"
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <GithubIcon />
          </a>
          <a
            className="btn btn-primary btn-sm header__cta"
            href="#contact"
            onClick={(e) => handleClick(e, '#contact')}
          >
            <span className="short-hide">Hire me</span>
            <span className="short-only" aria-hidden="true">
              Say hi
            </span>
            <span className="sr-only short-only-text">Hire me</span>
            <ArrowUpRight size={15} strokeWidth={2.2} />
          </a>
          <button
            className={`menu-btn ${open ? 'is-open' : ''}`}
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={17} /> : (<><i /><i /></>)}
          </button>
        </div>
      </header>

      <div className={`sheet ${open ? 'is-open' : ''}`} ref={sheetRef} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                go(link.href);
              }}
              tabIndex={open ? 0 : -1}
            >
              <span>{String(i + 1).padStart(2, '0')}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="sheet__foot">
          <a href={`mailto:${social.email}`}>{social.email}</a>
          <a href={social.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={social.telegram} target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
          <span>{profile.location}</span>
        </div>
      </div>
    </>
  );
}

function GithubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}
