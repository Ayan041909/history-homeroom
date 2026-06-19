"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { clearAllLocalUserData } from "@/lib/userDataStorage";
import { SiteLogo } from "@/components/shared/SiteLogo";

export default function ResetDataPage() {
  const { signOut } = useAuth();
  const router = useRouter();
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      clearAllLocalUserData();
      await signOut();
      if (!cancelled) setDone(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [signOut]);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-black px-6">
      <div className="max-w-md w-full text-center">
        <SiteLogo size={48} showText href={null} className="justify-center mb-8" />
        {done ? (
          <>
            <h1 className="text-xl font-semibold text-white mb-3">Local data cleared</h1>
            <p className="text-sm text-neutral-400 mb-2 leading-relaxed">
              All accounts, sessions, subscriptions, and preferences stored in this browser have been removed.
              You have been signed out.
            </p>
            <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
              If login still shows an old email, that is your browser&apos;s saved password — not data from this site.
              Remove it in Chrome/Edge settings under Passwords, or use a private window.
            </p>
            <button
              type="button"
              onClick={() => router.replace("/login")}
              className="px-6 py-2.5 rounded-lg bg-white text-black font-semibold hover:bg-neutral-100 transition-colors"
            >
              Go to login
            </button>
          </>
        ) : (
          <p className="text-sm text-neutral-400">Clearing local user data…</p>
        )}
      </div>
    </div>
  );
}
