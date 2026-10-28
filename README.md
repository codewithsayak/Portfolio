# Sayak Karmakar — Developer Portfolio

A fast, accessible personal portfolio built with **HTML5, CSS3 and vanilla JavaScript**. No frameworks, no build step — just open `index.html`.

Designed as a hiring-ready site: the first screen answers *who, what, and are you available*, and every section reinforces it with real projects, a downloadable résumé and a one-click contact path.

## Highlights

- **Config-driven content** — every project, skill, service and timeline entry lives in one `CONFIG` object at the top of `js/script.js`.
- **Dark + light themes** — respects `prefers-color-scheme`, remembers the visitor's choice in `localStorage`, and updates `<meta name="theme-color">`.
- **Project filtering & instant search** — custom vanilla JS, with an empty state and a reset action.
- **Accessible details dialog** — native `<dialog>` with a focus-trapped modal, Esc and backdrop dismissal.
- **Contact form** — inline validation that falls back to a prefilled `mailto:` (works on any static host).
- **Performance-minded** — WebP screenshots, SVG thumbnails, lazy-loaded images, no third-party JS, no icon fonts.
- **Accessible by default** — skip link, visible focus states, semantic landmarks, labelled controls, `aria-pressed` filters, reduced-motion support, print stylesheet.

## File structure

```text
portfolio/
├── index.html                      # Semantic markup
├── css/
│   └── style.css                   # Design tokens, components, responsive rules
├── js/
│   └── script.js                   # CONFIG + all interactions
├── assets/
│   ├── resume.pdf                  # Downloadable résumé
│   ├── og-image.png                # Social share card (1200×630)
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   └── images/
│       ├── profile.webp            # Portrait / brand image
│       ├── portfolio.webp          # Project screenshots
│       ├── gradient.webp
│       └── project-*.svg           # Hand-built project thumbnails
├── LICENSE
└── README.md
```

## Getting started

No install required:

```bash
# open directly
open index.html

# or serve locally (recommended so relative paths and PDF download behave normally)
python3 -m http.server 8080
```

Then visit <http://localhost:8080>.

## Customising

1. **Content** — edit the `CONFIG` object at the top of `js/script.js`:
   - `profile` — name, availability line, rotating headlines, about copy, résumé path, quick facts
   - `social` — GitHub, Instagram, Telegram, email
   - `projects` — title, description, 1200×675 image, tags, category, year, features, links
   - `skills`, `services`, `journey`
2. **Project links** — set `demoUrl` / `repoUrl` to a real URL, or `null` to hide that button.
3. **Colours & type** — all design tokens are CSS custom properties at the top of `css/style.css` (surfaces, text, accent gradient, radii, shadows), with a full light-theme override block below.
4. **Résumé** — replace `assets/resume.pdf` with your own (keep the filename, or update `profile.resumeUrl`).
5. **Social preview** — replace `assets/og-image.png` and update the `og:title` / `og:description` / canonical URL in `index.html`.

## Deploying

Any static host works — the site is three files plus assets:

- **GitHub Pages** — push to `main`, enable Pages from the repository root.
- **Netlify / Vercel / Cloudflare Pages** — no build command, publish directory `/`.

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Uses `:has`-free, progressively enhanced CSS — the layout degrades gracefully without JS, and all motion respects `prefers-reduced-motion`.

## Licence

MIT — see [LICENSE](LICENSE).
