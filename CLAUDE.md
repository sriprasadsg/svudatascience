# CLAUDE.md

LinkShort — a URL shortener template. Vite + React + TypeScript + shadcn/ui +
Supabase.

Full rules: [`.claude/rules/ui-guidelines.md`](.claude/rules/ui-guidelines.md) and
[`docs/design/auth.md`](docs/design/auth.md). Read those before touching auth or a
demo shell.

## Don'ts

1. Don't hand-roll a "Continue with Google" button. The ONE brand-compliant set is
   `SocialAuthButtons` (`src/components/base/social-auth-buttons.tsx`). Never
   restyle it with the theme colour. This project is Google only —
   `providers={["google"]}`.
2. Don't send an OAuth or email-confirmation redirect to a bare origin. It is
   always `${window.location.origin}/auth/callback`, and that route must exist.
3. Don't edit `src/integrations/lovable/` — it is Lovable-generated and rewriting
   it breaks auth.
4. Don't hand-roll a logout in a demo shell. On `/demo/*` the leave affordance is
   "Exit demo" → `EXIT_DEMO_ROUTE`, decided by `useIsDemo()` (`src/lib/demo.ts`).
   It sits above the account row, which stays last.
5. Don't re-derive demo-ness from `pathname` in a component. Call `useIsDemo()`.
6. Don't turn the short-link resolver into a bare `/:slug` catch-all — it is
   `/s/:slug`, and a catch-all would swallow every other top-level route.
7. Don't skip `npm run build` between changes.
