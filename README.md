# Sayak Karmakar — Developer Portfolio v2

A **React + Vite** portfolio rebuilt from the ground up with a scroll-driven, editorial interface. Every section is animated with intent: a cinematic preloader, a pinned horizontal project gallery, word-by-word statement reveals, a self-drawing timeline, and a smooth-scrolled page powered by Lenis + GSAP.

> Previous version: hand-written HTML/CSS/JS (still available in git history).

## Stack

| Concern | Choice | Why |
| --- | --- | --- |
| UI | **React 19** | Component-driven sections, single source of content |
| Build | **Vite 8** | Instant HMR, tiny production output |
| Animation | **GSAP 3** (+ ScrollTrigger, SplitText) | Scroll-linked timelines, pinning, text splitting |
| Scrolling | **Lenis** | Buttery eased scroll, wired into GSAP's ticker |
| Icons | **lucide-react** | Tree-shaken, consistent stroke icons |
| Type | **Instrument Sans / Instrument Serif / JetBrains Mono** (self-hosted) | No external font requests |

## The motion system

- **Preloader** — a counter and progress line, then the screen wipes upward while the hero title lines rise into place.
- **Hero** — masked word reveal, rotating role lines, mouse-parallax orb and floating cards, plus a scrubbed recede + blur as you leave.
- **Marquee bands** — seamless CSS-free loops whose speed reacts to your scroll velocity.
- **Work gallery** — desktop pins the section and translates the cards horizontally on scroll, with a progress bar. Below 900 px (or with reduced motion) it becomes a clean vertical stack.
- **Statement** — words illuminate progressively, driven by one ScrollTrigger progress value.
- **Skills** — editorial accordion; proficiency meters fill as each row opens.
- **Services** — hovering a row floats a preview image that eases after the pointer.
- **Journey** —  the timeline line draws itself and entries light up as they pass.
- **Chrome** — top scroll-progress bar, right-hand section rail, blend-mode cursor with labels, and a sticky header that condenses then hides.
- **Accessibility** — every effect is disabled under `prefers-reduced-motion`; content stays visible and the page remains fully navigable by keyboard.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the build locally
```

## Project structure

```text
├── index.html                 # Meta, social cards (Vite entry)
├── vite.config.js             # Dev server on 0.0.0.0 (preview-friendly)
├── public/assets/             # Résumé, favicon, images (copied verbatim)
└── src/
    ├── main.jsx               # React entry
    ├── App.jsx                # Page composition + scroll velocity bus
    ├── index.css              # Design tokens, reset, chrome (preloader/nav/cursor)
    ├── styles/sections.css    # Section layouts & components
    ├── data/
    │   ├── site.js            # ← ALL CONTENT: profile, projects, skills, services, journey
    │   └── meta.js            # Section registry (nav + rail)
    ├── lib/
    │   ├── gsap.js            # Plugin registration + house easing
    │   ├── useSmoothScroll.js # Lenis ⇄ GSAP ticker ⇄ ScrollTrigger
    │   ├── useReveal.js       # Declarative reveal primitives
    │   ├── useCounters.js     # Count-up stats
    │   └── scrollLock.js      # Scroll freeze bridge for overlays
    ├── components/            # Preloader, Header, Cursor, Marquee, ScrollChrome, ProjectModal
    └── sections/              # Hero, Work, About, Statement, Skills, Services, Journey, Contact, Footer
```

## Editing content

Everything text-level lives in **`src/data/site.js`** — profile, availability line, rotating roles, projects (with `demoUrl` / `repoUrl` set to `null` to hide the button), skills, services, journey and principles.

Design tokens — colour, type, radius, spacing, easing — are CSS custom properties at the top of **`src/index.css`**.

## Deploying

Any static host that can run `npm run build` and serve `dist/`:

- **Vercel** — framework preset “Vite”, build `npm run build`, output `dist`
- **Netlify** — build `npm run build`, publish `dist`
- **GitHub Pages** — build, then publish `dist` (set `base` in `vite.config.js` if deploying to a subpath)

## Browser support

Modern evergreen browsers. Uses `clip-path`, `mask-image`, CSS grid and `oklch`-free colour tokens; gracefully degrades to static content when JavaScript motion is unavailable.

## Licence

MIT — see [LICENSE](LICENSE).
