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

    const code = params.get("code");
    const next = getSafeRedirectTarget(params.get("next")) ?? STUDENT_DASHBOARD;

    if (!code) {
      router.replace("/login?error=auth_callback_failed");
      return;
    }

    const supabase = createClient();
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
