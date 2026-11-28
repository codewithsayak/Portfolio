/**
 * Tiny motion helpers — the whole site used to ship GSAP + framer-motion just
 * to fade text in and count numbers up. These helpers do the same job with
 * ~0 kB: CSS handles the animation, JS only decides *when* to start it.
 */

export function prefersReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function supportsObserver() {
  return typeof window !== "undefined" && typeof IntersectionObserver !== "undefined";
}

/**
 * Runs `onVisible` once the element scrolls into view (or immediately when the
 * browser cannot observe). Returns a cleanup function.
 */
export function onFirstVisible(el, onVisible, { rootMargin = "0px 0px -12% 0px" } = {}) {
  if (!el) return () => {};

  if (!supportsObserver()) {
    onVisible();
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      onVisible();
    },
    { rootMargin, threshold: 0.01 },
  );

  observer.observe(el);
  return () => observer.disconnect();
}

/**
 * Mirrors an element's visibility onto a data attribute so CSS can pause
 * animations (`animation-play-state`) while it is offscreen.
 */
export function mirrorVisibility(el, { rootMargin = "120px" } = {}) {
  if (!el) return () => {};

  if (!supportsObserver()) {
    el.dataset.paused = "false";
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      el.dataset.paused = entries.some((entry) => entry.isIntersecting) ? "false" : "true";
    },
    { rootMargin },
  );

  observer.observe(el);
  return () => observer.disconnect();
}

export const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
