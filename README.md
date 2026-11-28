# Sayak Karmakar — Portfolio v2

A completely rebuilt, motion-first developer portfolio: dark canvas, electric cyan/violet accents, glow-border project cards, a morphing hero, gooey text reveals and animated navigation.

## Stack

- **React 19 + Vite 8** — fast component-driven build, statically prerendered at
  build time and hydrated on the client
- **Tailwind CSS v4** — `@tailwindcss/vite`, dark theme tokens in `src/index.css`
- **VengeanceUI** — registry components installed with `shadcn add`
- **CSS animations + `IntersectionObserver`** — every animation on the page
  (text reveals, hero lights, glow cards, marquee, counters) runs on the
  compositor or on a tiny helper from `src/lib/motion.js`; there is no
  animation runtime in the bundle
- **lucide-react** — icons

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output: dist/
npm run preview
```

## VengeanceUI components in use

| Component | Where |
| --- | --- |
| `spotlight-navbar` | Sticky glass navigation |
| `light-lines` | Animated hero backdrop |
| `morph-text` | Rotating role titles |
| `gooey-text-reveal` | Hero, section headings and timeline reveals |
| `animated-button` | All CTAs |
| `glow-border-card` | Featured projects and services |
| `highlight-grid` | Interactive skills grid |
| `stats-counter` | Hero statistics |
| `cursor-card` | Project archive hover previews |
| `logo-slider` | Tech-stack marquee |

The registry ships JSX only, so the small amount of supporting CSS those
components expect (reveal keyframes, drift animations, glow border, navbar
glass, marquee track) lives at the bottom of `src/index.css`.

## Performance notes

The build prerenders the app into `dist/index.html`, so the first paint needs
only the HTML and the stylesheet — the JS bundle hydrates in the background.

The animation layer was rewritten for a Lighthouse pass that flagged ~9 s of
main-thread work:

- GSAP (`SplitText`, `ScrollTrigger`) and `framer-motion` were removed in favour
  of CSS keyframes plus `IntersectionObserver`; the JS bundle dropped from
  ~189 kB to ~93 kB gzipped.
- The reveal used to measure layout per instance (and again after the web font
  swapped) and animate an SVG `feColorMatrix` + `blur()` filter — now words are
  split at render time and animate `opacity`/`transform` only.
- The hero backdrop no longer runs a `requestAnimationFrame` loop writing inline
  transforms on 17 SVG paths; the drift is a CSS animation that pauses when the
  hero is offscreen.
- Glow cards no longer re-rasterise a rotating conic gradient every frame; the
  gradient is static and its layer opacity breathes (composited), paused
  offscreen.
- The counter and the nav spotlight no longer re-render React per frame, and
  buttons lost their infinite mask/background-position animations.

## Content

Everything text-level lives in `src/data/site.js` — profile, social links, stats, projects, skills, services and journey. Section layouts live in `src/sections/`, and shared headings in `src/components/SectionHeading.jsx`.

## Accessibility

Reduced-motion preferences disable the marquee and glow animations, pin the first morph word and remove smooth scrolling. Interactive elements keep visible focus rings and real link/button semantics.
