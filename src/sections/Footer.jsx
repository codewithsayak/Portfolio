import { useEffect, useRef } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import { navLinks, profile, social } from '../data/site';

export default function Footer({ lenisRef }) {
  const root = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer__giant',
        { yPercent: 18, opacity: 0.15 },
        {
          yPercent: -6,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const toTop = (event) => {
    event.preventDefault();
    if (lenisRef?.current) lenisRef.current.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" ref={root}>
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a className="brand" href="#top" onClick={toTop} aria-label="Back to top">
              <span className="brand__mark" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </span>
              <span className="brand__name">
                <b>{profile.name}</b>
                <small>
                  {profile.role} · India
                </small>
              </span>
            </a>
            <p className="footer__tag">
              Building fast, accessible interfaces — one commit at a time. Open to junior roles, internships and
              freelance projects.
            </p>
          </div>

          <div className="footer__col">
            <h5>Navigate</h5>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h5>Elsewhere</h5>
            <ul>
              <li>
                <a href={social.github} target="_blank" rel="noopener noreferrer">
                  GitHub <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href={social.telegram} target="_blank" rel="noopener noreferrer">
                  Telegram <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href={`mailto:${social.email}`}>Email</a>
              </li>
              <li>
                <a href={profile.resumeUrl} download>
                  Résumé (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </span>
          <span className="live">
            <span className="pulse" aria-hidden="true" /> Built with React, GSAP &amp; Lenis
          </span>
          <button type="button" onClick={toTop} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Back to top <ArrowUp size={12} />
          </button>
        </div>

        <div className="footer__giant" aria-hidden="true">
          SAYAK
        </div>
      </div>
    </footer>
  );
}
