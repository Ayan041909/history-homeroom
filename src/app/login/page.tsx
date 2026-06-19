import { Suspense } from "react";
import { LoginClient } from "./LoginClient";
import { SiteLogo } from "@/components/shared/SiteLogo";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-4">
            <SiteLogo size={48} showText={false} href={null} className="animate-pulse" />
            <p className="text-neutral-400 text-sm">Loading...</p>
          </div>
        </div>
      }
    >
      <LoginClient />
    </Suspense>
  );
}
