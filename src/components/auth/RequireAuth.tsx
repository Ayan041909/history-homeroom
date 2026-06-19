"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getSafeRedirectTarget } from "@/lib/redirect";
import { SiteLogo } from "@/components/shared/SiteLogo";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);

  const authenticated = !!profile;

  useEffect(() => {
    if (loading) return;
    if (authenticated) return;
    const safeTarget = getSafeRedirectTarget(pathname) || "/home";
    router.replace(`/login?redirect=${encodeURIComponent(safeTarget)}`);
  }, [loading, authenticated, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="flex flex-col items-center gap-4">
          <SiteLogo size={48} showText={false} href={null} className="animate-pulse" />
          <p className="text-muted-foreground text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <p className="text-muted-foreground text-sm">Redirecting to sign in…</p>
      </div>
    );
  }

  return <>{children}</>;
}
