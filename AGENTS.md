# Architecture rules

- Keep the official university footer in a dedicated landing-page component, with scoped semantic tokens in the global stylesheet, so its source-site styling does not change other pages.
- Store downloaded official footer media as Lovable Assets pointers, not external hotlinks, so the page serves stable copies of the approved source artwork.
- Colour marketing-page titles through the `--color-heading` token (defined in the style pack, applied to `.landing` headings in `src/base.css`) with inverse rules for headings on dark bands, so a title can be retoned from one place and never turns navy-on-navy.
