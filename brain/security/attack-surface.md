# Attack surface

Assessment applies to the current tracked checkout, not an independently verified production deployment. The app is built as a static React/Vite site (`src/main.jsx`, `src/App.jsx`, `package.json:4-7`, `README.md:70-76`). No backend service was found. See [threat model](threat-model.md) for evidence-linked risks.

## Public and internal endpoints

| Surface | Current implementation / exposure |
| --- | --- |
| Site entry | `index.html` bootstraps `src/main.jsx`; the production build serves static HTML and generated assets. Actual host URL, route fallback and response headers are unverified. |
| Public assets | `public/assets/` contains images, SVGs and icons copied into the build. CSS imports packaged font files (`src/index.css:6-9`); there is no observed remote font request. `/assets/resume.pdf` is referenced by `src/data/site.js:18` and download links in Hero/Footer, but absent from the current tree. Whether a host supplies it separately is unknown. |
| In-page navigation | `#top`, `#work`, `#about`, `#skills`, `#journey`, `#contact` and other section fragments are client-side anchors, not API endpoints (`src/data/site.js:338-344`, `src/data/meta.js:13-20`). |
| Development | Vite dev listens on `0.0.0.0:5173`, preview on `0.0.0.0:4173`, with unrestricted allowed hosts (`vite.config.js:6-17`); availability depends on whether commands are running and on network controls. HMR is configured for the preview environment. See T1. |
| Internal APIs | None found. There are no repository-defined API routes, internal service endpoints or backend calls. |

## Authentication, authorization and admin

No login, identity provider, user accounts, sessions, cookies, token handling, RBAC, application admin interface or protected resources were found. The public site is designed for anonymous access. External repository, host and domain consoles are administrative surfaces but their access policies cannot be inferred from source. Absence of app authentication is not itself a vulnerability for this static public portfolio.

## User input and browser surfaces

- Contact fields: name, email, subject, message (`src/sections/Contact.jsx:5-16,86-146`). Validation is client-side only and the form uses `noValidate`; it checks nonblank name/subject, a simple email pattern and a 12-character minimum message. There are no explicit length limits. It produces a URL-encoded `mailto:` handoff, not an API request (`:31-42`). The handler and recipient are separate trust domains; no server-side validation or rate limiting exists because no server-side submission exists.
- Project cards, dialogs, navigation, keyboard, pointer and scroll events operate locally; project content and links are imported from source (`src/sections/Work.jsx:129-167`, `src/components/ProjectModal.jsx:49-107`). No current search field or executable sandbox is implemented despite descriptive text about other projects in `src/data/site.js`.
- **Finding A1 / T3 — Security weakness; Low.** **Evidence →** `src/sections/About.jsx:40-46` builds `innerHTML` from `textContent`; the corresponding text is currently a fixed JSX literal at `:103-105`. **Risk →** if later connected to untrusted text, HTML-like content may be parsed as markup. **Affected location →** About animation. **Why it matters →** React's normal escaping does not protect an explicit HTML sink. **Recommended fix →** construct text nodes or React spans rather than interpolating HTML. No current attacker-controlled path or exploitable XSS was established.
- External links opened in new tabs use `rel="noopener noreferrer"` in the observed components, including `src/sections/Contact.jsx:68-75` and `src/components/ProjectModal.jsx:94-103`. Project URLs are maintainer-controlled, not user-provided; review scheme and destination if that changes.

## Uploads, database, storage and webhooks

No upload endpoint, file input, database driver/query, application object storage, webhook receiver, service worker, or runtime use of browser persistent storage was found. `localStorage` appears as descriptive text for showcased projects in `src/data/site.js:68,135`, not as a storage operation by this site. Images in `public/assets/` are repository-managed public files, not user uploads. React contact values are held in memory while the component is mounted; behavior of the external mail handler is not controlled here.

## Third parties and dependencies

GitHub, Instagram and Telegram are external destinations reached when a visitor follows links (`src/data/site.js:37-42`); email uses the visitor's mail handler. No analytics SDK or runtime third-party API integration was found in application source. The README mentions Vercel, Netlify and GitHub Pages as deployment options, not proof of an active deployment.

Runtime packages include React/React DOM, GSAP, Lenis, Lucide and locally packaged Fontsource fonts; Vite, its React plugin, PostCSS and jsdom are development dependencies (`package.json:17-31`). `package-lock.json` records transitive dependencies and npm registry tarballs. `npm audit --package-lock-only` returned zero known advisories on 2026-11-05, which does not rule out malicious packages or future advisories. See T5.

## Network and deployment exposure

- **Finding A2 / T1 — Security weakness; Medium when dev is reachable from untrusted networks.** **Evidence →** `vite.config.js:6-17` binds all interfaces and accepts any host for dev and preview. **Risk →** a reachable Vite dev server may be targeted by network access or DNS rebinding to expose development source. **Affected location →** local/sandbox Vite processes. **Why it matters →** a preview-friendly configuration expands the development trust boundary; no public production exposure was proven. **Recommended fix →** restrict network access and hostnames; serve production as built static files.
- **Finding A3 / T4 — Potential risk requiring verification; Medium if production lacks protections.** **Evidence →** no production hosting/header configuration appears in the checkout. **Risk →** missing HTTPS or security headers could expose visitors to tampering, framing or reduce XSS defense in depth. **Affected location →** actual static hosting/CDN, unknown. **Why it matters →** host policies cannot be deduced from canonical metadata or Vite dev configuration. **Recommended fix →** inspect deployed headers, TLS and CDN configuration; configure and test appropriate policies at the host.
- CORS is not explicitly configured in `vite.config.js`; Vite defaults and any external host behavior are separate and were not independently verified. There is no application cross-origin API to secure today. Availability, DDoS controls, access logs, backups and error pages depend on the actual host and are unknown.
