import { Suspense } from "react";
import { AuthCallbackClient } from "./AuthCallbackClient";
import { SiteLogo } from "@/components/shared/SiteLogo";

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh flex flex-col items-center justify-center gap-4 bg-black text-white">
          <SiteLogo size={40} showText={false} href={null} className="animate-pulse" />
          <p className="text-sm text-neutral-400">Signing you in…</p>
        </div>
      }
    >
      <AuthCallbackClient />
    </Suspense>
  );
}
