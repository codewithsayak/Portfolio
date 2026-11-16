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

## Performance notes

The site is tuned for Lighthouse's performance audits:

- **Responsive images** — every raster asset ships as a small AVIF + WebP ladder sized from the CSS it is painted at, not its source dimensions. A gallery card fetches ~12 kB instead of a 44 kB screenshot; the hero badge ~10 kB instead of 63 kB. `ResponsiveImage` upgrades a plain `<img>` to `<picture>` with `srcset`/`sizes` and always forwards `width`/`height` so nothing shifts while decoding.
- **Fonts** — self-hosted latin-subset woff2, declared in `src/index.css` and preloaded from `index.html`. Metric-matched `@font-face` fallbacks keep CLS at 0 when the swap happens.
- **Critical path** — the hero font and its AVIF are preloaded; the dark canvas is painted from an inline `<style>` so there is no white flash before the CSS bundle lands.
- **One layout read** — every `ScrollTrigger.refresh()` goes through `scheduleRefresh()`, so the document is measured once per settle instead of a dozen times per load (this is the "Forced reflow" audit).
- **Vendor chunking** — React, GSAP, Lenis and icons are separate files; editing a section only invalidates the ~63 kB app chunk, so returning visitors re-download very little. `vercel.json` pins immutable cache headers for `/assets` and `/fonts`.

> Editing an image? Replace the original in `public/assets/images/` and run `./scripts/build-images.sh` (needs ImageMagick with AVIF support) to rebuild the ladders.

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
├── public/assets/             # Images + icon (copied verbatim)
│   ├── images/hero/           #   hero orb badge ladder  (320 · 560)
│   ├── images/portrait/       #   about portrait ladder   (400 · 720)
│   └── images/projects/       #   work card ladders       (640 · 1200)
├── public/fonts/              # Latin-subset woff2, preloaded from index.html
├── scripts/build-images.sh    # Regenerates the ladders + copies the fonts
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
    │   ├── refresh.js         # Coalesced ScrollTrigger.refresh() (one layout read)
    │   ├── images.js          # srcset/sizes helpers + derivative detection
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
