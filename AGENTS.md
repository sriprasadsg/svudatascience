# Architecture rules

- Keep the official university footer in a dedicated landing-page component, with scoped semantic tokens in the global stylesheet, so its source-site styling does not change other pages.
- Store downloaded official footer media as Lovable Assets pointers, not external hotlinks, so the page serves stable copies of the approved source artwork.
- Colour marketing-page titles through the `--color-heading` token (defined in the style pack, applied to `.landing` headings in `src/base.css`) with inverse rules for headings on dark bands, so a title can be retoned from one place and never turns navy-on-navy.
- Override a section's title styling with a `.landing`-prefixed selector (e.g. `.landing .brochure-card__body h3`), because `src/base.css` loads after `src/index.css` and its `.landing h1, .landing h2, .landing h3, .landing h4` rules beat a plain class selector of equal specificity.
- Keep the official university header in a shared component backed by the source navigation hierarchy; separate category links from submenu toggles and portal nested menus so every destination remains clickable without clipping. Resolve university-relative links against the university domain and disable source placeholders rather than sending visitors to unrelated pages.
- Serve admissions and international student information on separate public routes with a shared source-attributed page template, so eligibility and application information can be reviewed without disturbing the homepage.
- Validate registrations with a dedicated client schema and a database insert trigger, so direct submissions cannot bypass required fields while historical records remain intact.
- Keep programme-to-brochure assets in a shared registry for registration confirmations and contact downloads, so both select the same approved file.
- Use the shared horizontal technology display beneath the homepage learning content, so the logo registry stays consistent with other pages.
- Keep registration on a standalone page without the university header or footer, using fields from the approved PDF and a shared client/server schema; save through the submission function to a private submissions table so online entries reach the owner without exposing applicant data.
- Keep the registration year selector in a dedicated popover control with tested year pages, so navigation and selection cannot escape the approved range.
- Deploy independent hosting through the Cloudflare Pages build script, which materializes approved asset pointers at their existing local URLs; keep submission and email functions on Lovable Cloud so hosting changes do not bypass data protection.
- Use React Router links for in-app registration navigation and the separate Workers Static Assets configuration for Workers deployments, so card clicks avoid full reloads and direct page requests use the SPA fallback without invoking an unrelated handler.
