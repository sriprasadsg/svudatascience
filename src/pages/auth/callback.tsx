import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_AUTHED_ROUTE, SIGNED_OUT_ROUTE } from "@/lib/auth/constants";
import { clearPendingAnonymousClaim, getPendingAnonymousClaim } from "@/lib/anonymous-claim";

/**
 * /auth/callback — where every OAuth (Google) and email-confirmation link lands.
 *
 * This is the fix for the recurring "signed in but bounced back to the marketing
 * homepage" bug. The Lovable OAuth broker can return the session two ways:
 *   1. fragment tokens  — `#access_token=…&refresh_token=…` (implicit / web_message)
 *   2. a PKCE `code`     — `?code=…` (when the supabase client uses flowType: 'pkce')
 * A callback that only handles ONE of these strands the user whenever the client is
 * configured for the other. So we establish the session from WHICHEVER arrived, then
 * land the user INSIDE the app — never `/`. Only after a genuine "no session either
 * way" do we fall back to the auth screen.
 *
 * It also redeems a pending anonymous link claim, exactly as the email sign-in and
 * sign-up forms do, so a visitor who shortened a link on the landing page and then
 * signed in with Google keeps that link.
 *
 * See docs/design/auth.md.
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const ran = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (ran.current) return; // StrictMode double-invoke / re-render guard
    ran.current = true;

    (async () => {
      const url = new URL(window.location.href);
      const hash = new URLSearchParams(url.hash.replace(/^#/, ""));
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");
      const code = url.searchParams.get("code");

      try {
        if (accessToken && refreshToken) {
          // Broker returned tokens directly (implicit / web_message flow).
          await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
        } else if (code) {
          // Broker returned a PKCE authorization code — exchange it for a session.
          await supabase.auth.exchangeCodeForSession(url.href);
        }
        // If neither is present, the client's detectSessionInUrl may already have
        // consumed the URL — getSession() below is the source of truth either way.
      } catch {
        // Swallow and let the session check decide; a thrown exchange still often
        // leaves a valid session behind, and if not we surface a retry below.
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setFailed(true);
        return;
      }

      // Same claim redemption the email forms do. A failure here must never block
      // the user from reaching the app, so it is best-effort.
      const pendingClaim = getPendingAnonymousClaim();
      if (pendingClaim) {
        try {
          await supabase.functions.invoke("claim-anonymous-link", {
            body: { link_id: pendingClaim.linkId, claim_token: pendingClaim.claimToken },
          });
        } finally {
          clearPendingAnonymousClaim();
        }
      }

      navigate(DEFAULT_AUTHED_ROUTE, { replace: true });
    })();
  }, [navigate]);

  if (failed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-sm text-muted-foreground">
          We couldn&apos;t finish signing you in. Please try again.
        </p>
        <button
          onClick={() => navigate(SIGNED_OUT_ROUTE, { replace: true })}
          className="text-sm font-medium underline underline-offset-4"
        >
          Back to sign in
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent opacity-40" />
    </div>
  );
}
