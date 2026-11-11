# Architecture rules

- Keep the official university footer in a dedicated landing-page component, with scoped semantic tokens in the global stylesheet, so its source-site styling does not change other pages.
- Store downloaded official footer media as Lovable Assets pointers, not external hotlinks, so the page serves stable copies of the approved source artwork.
- Colour marketing-page titles through the `--color-heading` token (defined in the style pack, applied to `.landing` headings in `src/base.css`) with inverse rules for headings on dark bands, so a title can be retoned from one place and never turns navy-on-navy.
- Override a section's title styling with a `.landing`-prefixed selector (e.g. `.landing .brochure-card__body h3`), because `src/base.css` loads after `src/index.css` and its `.landing :is(h1..h6)` rule beats a plain class selector of equal specificity.
- Keep the official university header in a shared component backed by the source navigation hierarchy; separate category links from submenu toggles and portal nested menus so every destination remains clickable without clipping. Resolve university-relative links against the university domain and disable source placeholders rather than sending visitors to unrelated pages.
- Serve admissions and international student information on separate public routes with a shared source-attributed page template, so eligibility and application information can be reviewed without disturbing the homepage.
- Validate registrations with a dedicated client schema and a database insert trigger, so direct submissions cannot bypass required fields while historical records remain intact.
- Keep programme-to-brochure assets in a shared registry for registration confirmations and contact downloads, so both select the same approved file.
- Use the shared horizontal technology display beneath the homepage learning content, so the logo registry stays consistent with other pages.
