# Threat model

Assessment: 2026-11-05, current checkout at `6b926e4`. This is a React/Vite static portfolio, not a backend service. The review covers the tracked application, styles, assets, package manifest and lockfile, Vite configuration, README and available Git metadata. The checkout is shallow (one accessible commit); hosting settings, account permissions, deployed response headers, external email providers, and full history were not available. No live penetration test was performed. See [attack surface](attack-surface.md), [secrets](secrets.md) and [checklist](security-checklist.md).

## Architecture and data flows

1. A maintainer edits source and content (`src/data/site.js`, `src/data/meta.js`); npm installs locked dependencies and Vite builds static files (`package.json`, `vite.config.js`, `README.md`). A static host may serve `dist/`; the actual production host/configuration is not established by the repository.
2. A visitor loads the HTML, bundled JavaScript, CSS, fonts and public images. React renders local content, while GSAP and Lenis handle motion. Navigation and project dialogs operate in browser memory.
3. The contact form holds name, email, subject and message in React state, validates them locally, URL-encodes subject and body, then opens a `mailto:` URL in the visitor's configured handler (`src/sections/Contact.jsx:11-42`). The project does not submit these fields to an application server. The handler/provider may retain or transmit them after handoff; the page cannot confirm sending.
4. Links navigate to GitHub, Instagram or Telegram; external pages are outside this project's control. Project descriptions in `site.js` are content about other projects, not proof that their features are implemented here.

## Assets, actors and trust boundaries

| Assets | Actors | Trust boundary |
| --- | --- | --- |
| Site integrity, availability, published content and visitor browsers | Anonymous visitors; malicious visitors; maintainer | Browser ↔ static host; public inputs and public static files |
| Source, local development environment and unpublished local files | Developer; other network users; attacker-controlled website if a browser can reach the dev server | Developer machine ↔ network/Vite server; browser origin ↔ development server |
| Contact details and visitor-supplied messages | Visitor; local mail handler and mail providers | React state ↔ operating-system/browser mail handler ↔ email provider/recipient |
| Repository, release and deployment access; installed packages | Maintainer, GitHub/host administrators, npm package maintainers | Source and build pipeline ↔ third-party registries, accounts and hosting |

**Entry points:** served HTML/assets, Vite dev/preview ports when running, contact fields, navigation/project actions, external links, and maintainer-controlled source/dependencies. No application authentication, privileged API, database or upload entry point was found.

## Risk assessment

Severity and likelihood are estimates, not proof of exploitation; host-specific conditions are explicitly stated. Confirmed vulnerability means a demonstrated exploitable defect in this implementation. None was demonstrated. Confirmed configuration weaknesses and missing repository controls are not evidence that a deployment is currently compromised.

### T1 — Unrestricted Vite hosts and network binding
- **Classification / Severity:** Security weakness / Medium, conditional on exposure of the development server.
- **Evidence → Affected location:** `vite.config.js:6-17` binds development and preview to `0.0.0.0` and uses `allowedHosts: true`; `package.json:4-7` exposes both commands. Preview is intended for a sandbox, not demonstrated production hosting.
- **Threat / scenario → Likelihood:** A malicious site or network user may reach an exposed dev instance; permissive host handling can enable DNS-rebinding attacks against Vite's source-serving development server. Likelihood is environment-dependent; no reachable instance or exploit was tested. Preview exposure is also broad, but the same source-disclosure outcome is not assumed for preview.
- **Impact / Risk → Why it matters:** Development source and files accessible through Vite may be exposed; local application integrity or availability could also be affected depending on environment and version. This is not a finding that the static production site exposes local files.
- **Existing mitigations → Missing mitigations:** The config explains the sandbox preview need; no host allowlist or access restriction is specified in the repository. Network/firewall and platform access controls are unknown.
- **Recommended fix:** Restrict development/preview network access and use specific trusted hostnames, or localhost outside a controlled preview; do not use Vite dev/preview as the public production server.

### T2 — Local environment files not ignored
- **Classification / Severity:** Missing control / Medium, conditional on secrets being added.
- **Evidence → Affected location:** `.gitignore:1-22` ignores dependencies, deployment cache and build output but has no `.env` patterns; current tracked files contain no environment file and no application environment-variable reads were found.
- **Threat / scenario → Likelihood:** A maintainer creates a local environment file with credentials and accidentally commits it. Likelihood depends on future workflow; no credential leak is established.
- **Impact / Risk → Why it matters:** A committed credential may persist in Git history and allow account or deployment compromise.
- **Existing mitigations → Missing mitigations:** No runtime secret requirement or hardcoded secret was identified in the targeted scan. There is no repository ignore rule for environment files and no tracked secret-scanning automation.
- **Recommended fix:** Adopt appropriate local secret-file ignore rules and secret scanning, document non-sensitive examples, and use a deployment secret manager for any future private values.

### T3 — HTML re-parsing of text
- **Classification / Severity:** Security weakness / Low in the current implementation.
- **Evidence → Affected location:** `src/sections/About.jsx:40-46,102-105` reads `textContent`, interpolates words into markup and assigns `innerHTML`; the present source is a fixed JSX sentence, not contact input or remote content.
- **Threat / scenario → Likelihood:** If this text later becomes attacker-controlled, HTML-looking text can be reinterpreted as markup, potentially enabling XSS. Current likelihood is low; no attacker-controlled path to the sink was identified and current XSS is not demonstrated.
- **Impact / Risk → Why it matters:** Script execution in the site origin could alter content or access data available in that browser context.
- **Existing mitigations → Missing mitigations:** Ordinary JSX text rendering is escaped by React; this separate `innerHTML` operation bypasses that safety for interpolated words. No sanitization is applied at this sink.
- **Recommended fix:** Use DOM text nodes or React-rendered spans for the animation; if content ever becomes untrusted, enforce contextual encoding and avoid HTML sinks.

### T4 — Production transport and browser policy not established
- **Classification / Severity:** Potential risk requiring verification / Medium, conditional on deployed configuration.
- **Evidence → Affected location:** `README.md:70-76` suggests static hosts; `index.html` and `vite.config.js` do not configure production response headers. Actual hosting configuration was not available.
- **Threat / scenario → Likelihood:** If deployed without HTTPS or appropriate browser policies, an on-path attacker may alter content, or framing and injected content may have fewer browser restrictions. Likelihood cannot be determined from the repository.
- **Impact / Risk → Why it matters:** Visitors could receive tampered content or be exposed to avoidable browser-side abuse.
- **Existing mitigations → Missing mitigations:** Canonical metadata uses an HTTPS URL (`index.html:14`), but that does not enforce HTTPS. Repository contains no evidence of HSTS, CSP, `frame-ancestors`, `X-Content-Type-Options`, or a referrer policy at the production host; host-provided controls remain unknown.
- **Recommended fix:** Verify deployed responses and configure HTTPS/redirects, HSTS when appropriate, a tested CSP including framing restrictions, `nosniff`, and a suitable referrer policy. Test CSP against React/GSAP inline styles and the inline `noscript` style before enforcement.

### T5 — Build/deployment supply chain
- **Classification / Severity:** Potential risk requiring verification / Medium, conditional on package or account compromise.
- **Evidence → Affected location:** `package.json:17-31` declares runtime and build dependencies; `package-lock.json` locks a transitive tree and resolves packages from npm. No CI, dependency-update policy or deployment access policy is present in the tracked checkout. `npm audit --package-lock-only` on 2026-11-05 reported zero known advisories; this is not a supply-chain guarantee.
- **Threat / scenario → Likelihood:** A malicious dependency/update or compromised maintainer/host account changes delivered JS. Likelihood is unknown; no compromised dependency was identified.
- **Impact / Risk → Why it matters:** All visitors could receive attacker-controlled code and the site could be defaced.
- **Existing mitigations → Missing mitigations:** A lockfile is present. No tracked automated dependency review, release provenance, or account-access controls were found; external settings are unknown.
- **Recommended fix:** Use reviewed lockfile changes and reproducible installs, monitor advisories, protect repository and deployment accounts with MFA and least privilege, and verify release/build provenance.

### T6 — Contact handoff and published contact details
- **Classification / Severity:** Potential risk requiring verification / Low, dependent on visitor and mail provider.
- **Evidence → Affected location:** `src/sections/Contact.jsx:21-42,154-159` forms a `mailto:` URI from visitor fields; `src/data/site.js:21-23,37-42` publishes contact/profile information.
- **Threat / scenario → Likelihood:** A visitor enters sensitive information and the configured mail handler/provider handles or retains it; published contact information can be harvested for unsolicited messages. Likelihood varies by usage and provider.
- **Impact / Risk → Why it matters:** Message privacy and inbox availability depend on systems outside the site; encoding the URI does not encrypt it or prove delivery.
- **Existing mitigations → Missing mitigations:** Input stays in React state until handoff, subject/body are URL-encoded, and the UI describes the handoff. No application-side persistence or submission was found. External mail confidentiality, retention and spam filtering are unknown.
- **Recommended fix:** Avoid asking for sensitive content, review contact-address exposure and mail-provider protections, and document the external handoff/retention expectations.

### T7 — Incomplete historical exposure assessment
- **Classification / Severity:** Potential risk requiring verification / Low for current evidence; impact can be higher if sensitive historical material is found.
- **Evidence → Affected location:** Git reports a shallow checkout with one accessible commit; its subject indicates removal of `public/assets/resume.pdf`, and `src/data/site.js:18` still points at that absent file. The removed file and earlier history were not available for inspection.
- **Threat / scenario → Likelihood:** A removed file or secret might remain accessible in full Git history, clones or published artifacts. Contents and actual exposure are unverified.
- **Impact / Risk → Why it matters:** Deleting a tracked file does not necessarily remove it from existing history or copies.
- **Existing mitigations → Missing mitigations:** The file is not in the current tracked tree; no full-history scan or retention review could be established.
- **Recommended fix:** Privately review complete history and published artifacts for sensitive material; if credentials are found, revoke/rotate first, then follow an appropriate history and incident-response process.
