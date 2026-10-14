# UI guidelines

Only the rules that shipped code depends on. Breaking one of these breaks a live
template, so treat them as code, not taste.

## SSO buttons

- **There is exactly ONE brand-compliant SSO button set:** `SocialAuthButtons`
  (`src/components/base/social-auth-buttons.tsx`). Render it on the auth surface
  (`/auth`). Never hand-roll "Continue with Google" from a Tabler glyph in an
  outline `Button`, and never restyle the component with the theme colour — the
  fixed neutral surfaces and the official 4-colour Google "G" are the point.
- **Only pass providers the project has configured.** This project is Google only:
  `providers={["google"]}`. A button for an unconfigured provider can only ever
  error.
- **Never call `supabase.auth.signInWithOAuth`.** OAuth goes through the Lovable
  managed broker inside `SocialAuthButtons`. A direct GoTrue call fails with
  `missing OAuth secret`.
- **Never edit `src/integrations/lovable/`.** It is Lovable-generated. It
  legitimately contains `signInWithOAuth`. Rewriting it breaks auth.
- **Every redirect is `${window.location.origin}/auth/callback`** — never a bare
  origin. The one deliberate exception is the password-reset `redirectTo`, which
  points at `/auth`; see `docs/design/auth.md`.

## The leave affordance

- **Which one shows is decided by `useIsDemo()` (`src/lib/demo.ts`) and nothing
  else.** Never re-derive demo-ness from `pathname` inside a component.
  - authenticated `/*` → "Log out", calls `signOut()` from the AuthProvider;
  - public `/demo/*` → "Exit demo" with a close icon, a plain navigation to
    `EXIT_DEMO_ROUTE` (`/`). The demo has no session, so "Log out" is meaningless.
- **Order is fixed:** the leave affordance sits ABOVE settings and the
  account/profile row, and the account row is always last.
- This app uses a **top-bar layout**, not a shadcn `Sidebar`, so it wires these
  primitives directly rather than mounting a shared sidebar footer (which would
  need `SidebarProvider`). Keep it that way; don't hand-roll a logout in a demo
  shell.
- It lives in two places and both must stay in step: the avatar dropdown in each
  top bar (`links`, `links-detail`, `settings`) and the Account section of
  Settings → General.

## Routing

- `/auth/callback` must exist. `SocialAuthButtons` hardcodes that path, so
  without the route SSO 404s.
- The short-link resolver is `/s/:slug`, not a bare `/:slug`. Keep it that way —
  a bare catch-all would swallow every new top-level route.
