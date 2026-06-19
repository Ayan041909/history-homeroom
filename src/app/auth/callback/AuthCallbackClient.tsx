"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getSafeRedirectTarget, STUDENT_DASHBOARD } from "@/lib/redirect";
import { SiteLogo } from "@/components/shared/SiteLogo";

/**
 * OAuth must finish in the browser so the PKCE code-verifier cookie
 * (set when "Continue with Google" is clicked) is available for exchange.
 */
export function AuthCallbackClient() {
  const router = useRouter();
  const params = useSearchParams();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const search =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : params;

    const next = getSafeRedirectTarget(search.get("next")) ?? STUDENT_DASHBOARD;

    const oauthError = search.get("error");
    const oauthErrorDescription = search.get("error_description");
    if (oauthError) {
      const message = oauthErrorDescription ?? oauthError;
      router.replace(`/login?error=${encodeURIComponent(message)}`);
      return;
    }

    const code = search.get("code");
    const supabase = createClient();

    if (!code) {
      void supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          router.replace(next);
          return;
        }
        router.replace("/login?error=auth_callback_failed");
      });
      return;
    }

    void supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (error) {
        router.replace(`/login?error=${encodeURIComponent(error.message)}`);
        return;
      }
      router.replace(next);
    });
  }, [params, router]);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-4 bg-black text-white">
      <SiteLogo size={40} showText={false} href={null} className="animate-pulse" />
      <p className="text-sm text-neutral-400">Signing you in…</p>
    </div>
  );
}
