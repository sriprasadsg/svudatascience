/**
 * The single source of truth for post-auth navigation.
 *
 * After sign-in, an email confirmation, or an OAuth callback the user lands HERE — the
 * app's first authenticated screen — never `/` (the marketing landing).
 * See docs/design/auth.md.
 */
export const DEFAULT_AUTHED_ROUTE = "/links";

/** Where a failed callback sends the user back to — the auth screen, never a protected route. */
export const SIGNED_OUT_ROUTE = "/auth";
