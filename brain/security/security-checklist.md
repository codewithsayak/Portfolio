# Project-specific security checklist

This is an assessment and future-work checklist, not a record of fixes. `[x]` means the stated observation was verified in the repository, not that an external service was tested; `[ ]` means verify or consider the action. Items marked N/A are not missing controls for the current static site. Finding IDs refer to the fully detailed evidence, risk, impact and recommended fixes in [threat-model.md](threat-model.md), [secrets.md](secrets.md), and [attack-surface.md](attack-surface.md).

## Authentication
- [x] No application login, identity provider or user accounts are implemented (`src/App.jsx`, `package.json`); anonymous access is the intended site model.
- [ ] **Recommendation:** Verify MFA and recovery for the external GitHub, hosting and domain accounts; those controls are not visible in this checkout (T5).

## Authorization / RBAC
- [x] No application roles, privileged routes or private data access were found; application RBAC is currently N/A.
- [ ] **Recommendation:** Verify least-privilege repository, deployment and domain permissions externally (T5). Add server-enforced authorization if privileged functionality is introduced.

## Session / token security
- [x] No application sessions, authentication tokens or cookie handling were found in `src/`; session controls are currently N/A.
- [ ] **Recommendation:** If authentication is added, use server-side session validation, short-lived credentials and appropriately scoped Secure, HttpOnly and SameSite cookies where applicable.

## Input validation
- [x] Contact validates required fields, a basic email pattern and a minimum message length in the browser (`src/sections/Contact.jsx:11-17`); `noValidate` disables native form validation (`:86`).
- [ ] **Recommendation:** Consider maximum lengths and clear mail-client limitations. If a submission service is added, validate and limit data on the server; current validation is not a server security boundary (T6).

## Injection
- [x] No application SQL, shell execution or server-side query surface was found. Contact subject and body are encoded for a `mailto:` URI (`src/sections/Contact.jsx:39-41`); this is not a substitute for validation in a future backend.
- [ ] **Recommendation:** Use parameterized queries and context-specific encoding for any future server/data integration; validate external URL schemes and destinations if project links become untrusted.

## XSS / CSRF
- [x] Normal JSX content is rendered through React; current About lede content is a fixed literal, not visitor data (`src/sections/About.jsx:102-105`). No authenticated state-changing endpoint was found, so server-side CSRF protection is currently N/A.
- [ ] **Security weakness — Low:** `innerHTML` reparses About text (`src/sections/About.jsx:40-46`); a future untrusted source could create an XSS path. Replace the sink with text nodes or React spans. No current exploit was established (T3/A1).
- [ ] **Potential risk requiring verification — Medium if absent in production:** Verify a tested CSP and framing restrictions on deployed responses; hosting headers are not in this checkout (T4/A3).

## API security
- [x] No application API routes, backend requests or webhook handlers were found. The contact action opens a mail handler rather than posting to an API (`src/sections/Contact.jsx:31-42`).
- [ ] **Recommendation:** If an API is added, enforce server-side authentication/authorization as needed, input limits and safe errors; do not treat browser checks as enforcement.

## Rate limiting / abuse
- [x] No application-side rate limiter is implemented; there is no server contact endpoint to rate limit. The contact address is publicly displayed (`src/data/site.js:23,37-42`).
- [ ] **Potential risk requiring verification — Low:** Check email-provider spam controls and host-level traffic/availability protections; unsolicited email and traffic capacity depend on external services (T6/T4).

## File uploads
- [x] No file input or upload endpoint exists in the tracked application. Repository-managed `public/assets/` files are static, public resources.
- [ ] **Recommendation:** If uploads are added, validate type and size on the server, isolate storage and control access rather than trusting file names or browser MIME types.

## Database security
- [x] No application database, credentials, query layer or database connection is implemented; database access controls are currently N/A.
- [ ] **Recommendation:** If one is introduced, use least-privilege accounts, parameterized queries, encrypted connections, patching and tested backups.

## Secrets
- [x] No application secret requirement or hardcoded credential was identified by the limited current-tree scan; the scan is not exhaustive (S1–S3).
- [ ] **Missing control — Medium if secrets are introduced:** `.gitignore` lacks environment-file rules. Adopt suitable ignore rules, secret scanning and provider-managed private values (T2/S1).
- [ ] **Potential risk requiring verification — Low on current evidence:** Inspect full Git history and historical deployments privately; the checkout is shallow and a previously removed résumé cannot be inspected here (T7/S3).
- [ ] **Recommendation:** Never put private values in Vite client variables, source, `public/`, bundles or logs. Revoke/rotate actual exposed credentials immediately if found.

## Encryption
- [x] An HTTPS canonical URL appears in `index.html:14`, but it does not enforce transport security.
- [ ] **Potential risk requiring verification — Medium if absent:** Verify production HTTPS, HTTP redirects and appropriate HSTS at the actual host (T4). Verify mail-provider transport separately; URL encoding is not encryption (T6/S2).

## CORS
- [x] No application API or explicit CORS configuration was found (`vite.config.js`). This does not establish the effective Vite defaults or production host policy.
- [ ] **Recommendation:** Inspect actual response headers if cross-origin access is needed; configure a narrow origin policy for any future API rather than assuming CORS is authentication.

## Dependency security
- [x] `package-lock.json` records the dependency graph. `npm audit --package-lock-only` returned zero known advisories on 2026-11-05; this is a point-in-time result, not proof of safety.
- [ ] **Potential risk requiring verification — Medium:** Review dependency updates and build provenance, monitor advisories and protect publishing/deployment accounts; no tracked automation or policy was found (T5).

## Logging / monitoring
- [x] No application telemetry, console logging or error-reporting integration was found in source; this does not describe host/CDN or email logs.
- [ ] **Recommendation:** Verify host access/security logs, availability alerts, privacy-aware retention and redaction; avoid logging contact content or secrets (S2, T5).

## Admin security
- [x] There is no application admin interface or server-side administration endpoint in the checkout.
- [ ] **Recommendation:** Verify external GitHub/hosting/domain account MFA, recovery, least privilege and audit logs (T5).

## Deployment / infrastructure
- [x] Vite dev and preview bind all interfaces and accept all hosts (`vite.config.js:6-17`). README describes potential static deployment targets, not the actual deployed configuration.
- [ ] **Security weakness — Medium when exposed:** Restrict Vite network access and hostnames, and use a static production host rather than the development/preview server (T1/A2).
- [ ] **Potential risk requiring verification — Medium if absent:** Check TLS, security headers, frame restrictions, CDN/host protections and access controls. Test CSP with inline styles and animation before enforcement (T4/A3).

## Data privacy
- [x] Contact fields are stored in component state and passed to an external mail handler using `mailto:`; the site does not itself send them to an application server (`src/sections/Contact.jsx:21-42,157-159`).
- [ ] **Potential risk requiring verification — Low:** Review public contact information and external mail-handler/provider retention and confidentiality; discourage sending sensitive information (T6/S2).

## Error handling
- [x] Contact validation displays local field errors and a handoff status (`src/sections/Contact.jsx:31-42,99-106,154-162`); that status is not a delivery confirmation. Animation catches appear in `src/lib/useReveal.js:36-40,175-181`.
- [ ] **Recommendation:** Verify static-host error responses and ensure future services and build logs do not disclose secrets, stack traces or sensitive inputs; production error behavior is unknown (S2).

## Backup / recovery
- [x] Git tracks source and a lockfile; this alone does not verify recoverability of full history, deployment settings, domain access or external mail.
- [ ] **Recommendation:** Verify protected backups and test restoration of source, deployment/domain configuration and relevant accounts. Review the shallow-history limitation and historical artifacts before drawing conclusions (T7/S3).
