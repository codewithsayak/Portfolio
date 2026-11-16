import { ScrollTrigger } from './gsap';

/**
 * ScrollTrigger.refresh() measures the whole document. Several components used
 * to call it independently (on mount, on `load`, on `fonts.ready`, on a timer
 * and again in a cleanup), so a single page load forced layout a dozen times —
 * this is what Lighthouse reports as "Forced reflow".
 *
 * Everything now goes through one coalesced refresh: writes settle, then layout
 * is read exactly once on the next frame.
 */
let queued = false;
let frame = 0;

export function scheduleRefresh() {
  if (queued) return;
  queued = true;
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    frame = requestAnimationFrame(() => {
      queued = false;
      ScrollTrigger.refresh();
    });
  });
}
