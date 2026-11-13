# Cloudflare Pages deployment

## Hosting settings

Connect this repository to a Cloudflare **Pages** project (not Workers).

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Root directory | Repository root |
| Build command | `npm run build:cloudflare` |
| Output directory | `dist` |
| Node version | `22` (`NODE_VERSION=22`) |

Cloudflare installs the packages from `package.json` and the committed lockfile; keep development dependencies enabled because Vite is needed to build. For a manual install, use `npm ci`.

## Build variables

Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` using the existing public client connection values supplied privately with the project. They are embedded at build time, not runtime. `VITE_SUPABASE_PROJECT_ID` can also be carried over from the existing project configuration. Never supply a service-role key, database password, or email credentials to the frontend build.

Optional: `LOVABLE_ASSET_ORIGIN` defaults to the current published public site, `https://svudatascience.lovable.app`. Keep that deployment available during builds, or point this setting to another public HTTPS origin serving the same approved asset paths.

## Approved images and documents

After Vite builds, the Cloudflare build downloads every `src/**/*.asset.json` pointer directly into `dist/__l5e/assets-v1/`, retaining the URLs already used by the pages. Visitors receive logos, images, brochures, and the PDF from Cloudflare itself, without requests to the old hosting site. Downloads fail the build on an HTTP error, HTML response, or size mismatch rather than deploying broken media. Keep pointers in source control; generated copies remain inside the excluded build directory.

## Page navigation

Cloudflare Pages provides its default single-page-app fallback when there is no top-level `404.html`. Do not add one. Direct requests and reloads for `/registration`, `/admissions`, and `/international-students` should load the application. No Pages Functions or Cloudflare Worker is required.

## Registration and email

Cloudflare hosts the frontend only. The existing Lovable Cloud submission function, private registration storage, validation, and email functions remain in their current service; they are not converted into Workers. Do not deploy the existing Deno email/submission function files as Cloudflare Workers. Existing cross-origin form requests use the submission function's CORS response.

Moving the frontend does not complete email setup: admissions notifications still require verified sender-domain setup and connection to the submission flow. Do not claim email delivery is enabled by this deployment.

If account sign-in routes are used, add the new site's exact HTTPS `/auth/callback` address to the allowed authentication redirects before testing those routes.

## Release checks

1. Run `npm run build:cloudflare` in the infrastructure environment.
2. Deploy the resulting `dist` through the connected Pages project. For direct upload, use `npx wrangler pages deploy dist --project-name svu-data-science` with your team's Cloudflare login; substitute the actual Pages project name if different.
3. Open and refresh the homepage, admissions, international-student, and registration URLs.
4. Verify university logos, footer artwork, brochure downloads, and the registration year picker.
5. Submit one authorised test registration, confirm its reference and saved entry in Lovable Cloud, then remove the test entry.
6. Verify sender-domain status and notification delivery separately before announcing email availability.

Cloudflare account access, creation of the Pages project, domain/DNS changes, and actual deployment must be completed by the infrastructure team. This repository configuration alone does not move the live site.