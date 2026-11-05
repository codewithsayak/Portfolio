# Secrets and sensitive data

Scope and limitations: current tracked files and available shallow Git metadata were inspected; deployment dashboards, CI variables, local developer machines, and complete Git history were not available. No secret values are reproduced here. See [threat model](threat-model.md) for severity definitions and scenarios.

## Where secrets are expected

The current application has no observed API keys, backend credentials, authentication tokens, database connection strings or environment-variable reads in its source/configuration. It is a static client. Repository, npm publishing (if ever used), hosting and domain administration may require external credentials, but their existence, location and settings were not verified. Keep any such credentials in the provider's secret store or a local untracked secret manager, not application source, `public/`, generated browser bundles or logs. `package.json:33` marks the package private, but this is not a credential-management control.

## Environment and configuration handling

- **Finding S1 / T2 — Missing control; Medium.** **Evidence →** `.gitignore:1-22` has no `.env` ignore patterns; no current tracked environment file was found. **Risk →** a future local environment file can be committed accidentally. **Affected location →** repository root and local developer workflow. **Why it matters →** credentials may then persist in clones and history. **Recommended fix →** ignore appropriate secret-bearing local environment files, supply a non-sensitive example when needed, and scan staged changes and history. This is a preventive gap, not proof a secret was exposed.
- Vite supports environment files and client-exposed `VITE_` variables, but this project does not currently reference them. Any future client-exposed variable is public in the compiled bundle and must not be treated as secret. Build-only values also need careful handling so they are not embedded into output.

## Hardcoded-secret risks and actual findings

- A targeted pattern scan of current tracked text searched for private-key headers, common GitHub/AWS token shapes and credential assignments; it returned no matches. The scan did not cover every secret format, binary metadata, dependencies, external systems or inaccessible history. It is not proof of absence.
- The email address and social URLs in `src/data/site.js:23,37-42` and `src/data/meta.js:6-10` are intentionally public contact information, not credentials. Review personal-data publication separately; do not classify a public address as an API secret.
- **Recommendation / Low:** Before introducing any integration, keep credentials server-side in a properly scoped service; never hardcode them into source or use a browser bundle as secret storage.

## Client-side exposure and logging

- **Finding S2 / T6 — Potential risk requiring verification; Low.** **Evidence →** `src/sections/Contact.jsx:39-42` places the visitor's message, name and email into a URL-encoded `mailto:` body and navigates to it. **Risk →** the configured mail handler, provider, browser/OS or recipient may access or retain the information. **Affected location →** contact form and external mail handoff. **Why it matters →** encoding is not encryption; the repository cannot establish provider retention, delivery or transport security. **Recommended fix →** discourage sending secrets through the form and review privacy/retention with the selected handler and provider. No application server submission was observed.
- No application console logging or remote error-reporting integration was found in `src/`; the animation helper has local catch blocks (`src/lib/useReveal.js:36-40,175-181`). Server/CDN/access logs, browser diagnostics, hosting build logs, and third-party email logs are outside this review. **Recommendation / Low:** avoid logging sensitive data or environment values and verify redaction and retention on external platforms.
- Everything placed in `public/` and client-side source/bundles is intended to be visible to visitors; no observed backend exists to hide a secret. Local React state is not an encrypted secret store.

## Git and history exposure

- **Finding S3 / T7 — Potential risk requiring verification; Low based on current evidence.** **Evidence →** `git rev-parse --is-shallow-repository` reports a shallow checkout with one accessible commit, whose subject refers to deleting `public/assets/resume.pdf`; the current tracked tree lacks that PDF. **Risk →** earlier revisions, clones or deployment artifacts may still contain removed data. **Affected location →** complete Git history and historical artifacts, not verified here. **Why it matters →** a deletion in the current tree does not erase earlier copies. **Recommended fix →** review full history and deployments privately, without displaying sensitive contents; use a dedicated secret scanner. Do not assume the PDF contains secrets or that it is publicly accessible.

## Rotation and incident response

No actual leaked credential was established, so no specific rotation is asserted to be required. If a real credential is discovered in source, history, logs or artifacts, revoke/rotate it promptly with the issuer, invalidate related sessions where relevant, review access logs and scope, assess downstream exposure, then clean history/artifacts as appropriate. History rewriting alone does not revoke a credential or remove others' copies. Rotate externally held deployment/repository credentials according to the responsible provider's policy and after suspected compromise; current external practices are unverified.
