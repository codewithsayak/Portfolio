# Sayak Karmakar — Portfolio v2

A completely rebuilt, motion-first developer portfolio: dark canvas, electric cyan/violet accents, glow-border project cards, a morphing hero, gooey text reveals and animated navigation.

## Stack

- **React 19 + Vite 8** — fast component-driven build
- **Tailwind CSS v4** — `@tailwindcss/vite`, dark theme tokens in `src/index.css`
- **VengeanceUI** — registry components installed with `shadcn add`
- **Framer Motion / GSAP** — animation engines used by the registry components
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

The registry ships JSX only, so the small amount of supporting CSS those components expect (glow border, navbar glass, marquee track) lives at the bottom of `src/index.css`.

## Content

Everything text-level lives in `src/data/site.js` — profile, social links, stats, projects, skills, services and journey. Section layouts live in `src/sections/`, and shared headings in `src/components/SectionHeading.jsx`.

## Accessibility

Reduced-motion preferences disable the marquee and glow animations, pin the first morph word and remove smooth scrolling. Interactive elements keep visible focus rings and real link/button semantics.
