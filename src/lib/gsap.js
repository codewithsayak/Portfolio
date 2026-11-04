/**
 * Single place to register GSAP plugins. Importing from here guarantees the
 * plugins are registered exactly once, before any hook uses them.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

// A house easing curve used across the site.
CustomEase.create('house', '0.22, 1, 0.36, 1');

export { gsap, ScrollTrigger, SplitText, CustomEase };
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
