/**
 * Tiny event bridge so any component can freeze page scrolling (modals,
 * mobile menu, preloader) without prop-drilling the Lenis instance.
 * Falls back to overflow locking when Lenis is disabled.
 */
const EVENT = 'portfolio:scroll-lock';

let locked = false;

export const isScrollLocked = () => locked;

export function lockScroll() {
  if (locked) return;
  locked = true;
  document.documentElement.style.overflow = 'hidden';
  window.dispatchEvent(new CustomEvent(EVENT, { detail: true }));
}

export function unlockScroll() {
  if (!locked) return;
  locked = false;
  document.documentElement.style.overflow = '';
  window.dispatchEvent(new CustomEvent(EVENT, { detail: false }));
}

export function onScrollLock(handler) {
  const listener = (event) => handler(event.detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
