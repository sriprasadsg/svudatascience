# Read-only audit — new SVU Data Science site (preview)

Latest commit: 0e746e8 (13 Nov 2026 14:17 UTC) "Improve mobile page layouts, programme tabs, and registration controls". No code changed, nothing submitted or deployed.

## Rendered checks (Playwright, local preview, 1366x768, 390x844, 360x780)
Pages: /, /admissions, /international-students, /registration.
- Overflow: no horizontal scroll on any page at any size (scrollWidth = viewport). At 360 one decorative hero glow extends past the edge but is clipped — not visible.
- Images: no broken images on any page.
- Headings/fonts: one h1 per page; h1/h2 all Poppins, weight 400.
- Footer: present on /, /admissions, /international-students; correctly absent on /registration.
- Registration: phone input present and required.
- Console: repeated React warning "Function components cannot be given refs" on every page (dev-only, not user-visible; likely a component passed to an `asChild` trigger). Minor.

## Source-only findings (not rendered/clicked)
1. Brochures are PowerPoint (.pptx), not PDF — visitors on phones may not open them. Download links appear only after a successful registration, so they were not exercised.
2. Phone rule (server schema) accepts 7–15 digits with + ( ) - spaces; it does not enforce a 10-digit Indian mobile number.
3. Footer "Privacy Policy" points to `privacy-ploicy/` — matches the official SVU URL spelling, so it is intentional, but worth confirming it resolves.
4. No `public/_redirects` file: direct visits/reloads of /admissions, /registration on Cloudflare Pages will 404 unless the Workers config (`wrangler.workers.jsonc`, SPA fallback) is used.

## Untested (by request)
Form submission, saving to database, enquiry/admission emails, brochure download after submit, external SVU links.

## Hosting blockers
- Live Worker (svu-infra-handover-v2.exafluence.workers.dev) still runs the old build; needs redeploy: `npm ci && npm run build:cloudflare && npx wrangler deploy --config wrangler.workers.jsonc`.
- Add `_redirects` if Pages (not Workers) is used.
- Sender domain notify.svudatascience.in awaiting DNS verification; admissions notification emails not yet connected.
- Cloudflare build needs the three public VITE_SUPABASE_* values.

## Proposed fixes if approved
Add `public/_redirects`; tighten phone to 10-digit Indian mobile (optional +91); offer PDF brochures; silence the ref warning.
