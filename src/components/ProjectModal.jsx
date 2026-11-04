import { useEffect, useRef } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { lockScroll, unlockScroll } from '../lib/scrollLock';

/**
 * Accessible project dialog: focus trap, Esc to close, scroll lock, and a
 * full-case-study layout (media, meta tags, feature list, links).
 */
export default function ProjectModal({ project, onClose }) {
  const panel = useRef(null);
  const closeBtn = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    lockScroll();
    const previouslyFocused = document.activeElement;
    closeBtn.current?.focus();

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panel.current) return;
      const focusables = panel.current.querySelectorAll(
        'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      unlockScroll();
      if (previouslyFocused && previouslyFocused.isConnected) previouslyFocused.focus?.();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal__panel" ref={panel}>
        <button className="modal__close" ref={closeBtn} type="button" onClick={onClose} aria-label="Close project details">
          <X size={18} />
        </button>

        <div className="modal__media">
          <img src={project.image} alt={`${project.title} preview`} width="1200" height="675" />
        </div>

        <div className="modal__body">
          <div className="modal__meta">
            <span className="chip is-active">{project.category}</span>
            <span className="tag">{project.year}</span>
            <span className="tag">{project.role}</span>
            {project.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <h3 id="modal-title">{project.title}</h3>
          <p>{project.description}</p>

          <ul className="modal__features">
            {project.features.map((feature) => (
              <li key={feature}>
                <Check size={15} strokeWidth={2.4} aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="modal__actions">
            {project.demoUrl && (
              <a className="btn btn-primary btn-sm" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                Live demo <ArrowUpRight size={15} />
              </a>
            )}
            {project.repoUrl && (
              <a className="btn btn-ghost btn-sm" href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                View source <ArrowUpRight size={15} />
              </a>
            )}
            {!project.demoUrl && !project.repoUrl && (
              <span className="tag">Private build · available on request</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
