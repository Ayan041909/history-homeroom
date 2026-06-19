"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/shared/Toast";
import { mergeSubscriptionIntoProfile } from "@/lib/subscriptionCache";
import { updateUserSubscription } from "@/lib/firestore";
import { updateMockSubscriptionFields } from "@/lib/mockAuth";
import { isSupabaseConfigured } from "@/lib/supabase/env";

/** Keeps subscription state in sync and downgrades expired trials while the app is open. */
export function SubscriptionWatcher() {
  const { profile, setMockProfile, user } = useAuth();
  const toast = useToast();
  const prevTierRef = useRef<"free" | "plus" | "premium" | null>(null);

  useEffect(() => {
    if (!profile) {
      prevTierRef.current = null;
      return;
    }

    const sync = () => {
      const merged = mergeSubscriptionIntoProfile(profile);
      const changed =
        merged.subscription !== profile.subscription ||
        merged.trialEndsAt !== profile.trialEndsAt ||
        merged.subscriptionIsPaid !== profile.subscriptionIsPaid;

      if (prevTierRef.current === null) {
        prevTierRef.current = merged.subscription;
        if (changed) {
          if (!isSupabaseConfigured()) {
            try {
              updateMockSubscriptionFields({
                subscription: merged.subscription,
                trialEndsAt: merged.trialEndsAt,
                subscriptionIsPaid: merged.subscriptionIsPaid,
                trialUsed: merged.trialUsed,
              });
            } catch {
              // mock session may be unavailable
            }
          }
          setMockProfile(merged);
          if (isSupabaseConfigured() && user) {
            void updateUserSubscription(user.id, {
              subscription: merged.subscription,
              trialEndsAt: merged.trialEndsAt ?? null,
              subscriptionIsPaid: merged.subscriptionIsPaid ?? false,
              trialUsed: merged.trialUsed ?? false,
            });
          }
        }
        return;
      }

      if (!changed) return;

      const prevTier = prevTierRef.current;
      prevTierRef.current = merged.subscription;

      if (!isSupabaseConfigured()) {
        try {
          updateMockSubscriptionFields({
            subscription: merged.subscription,
            trialEndsAt: merged.trialEndsAt,
            subscriptionIsPaid: merged.subscriptionIsPaid,
            trialUsed: merged.trialUsed,
          });
        } catch {
          // mock session may be unavailable
        }
      } else if (user) {
        void updateUserSubscription(user.id, {
          subscription: merged.subscription,
          trialEndsAt: merged.trialEndsAt ?? null,
          subscriptionIsPaid: merged.subscriptionIsPaid ?? false,
          trialUsed: merged.trialUsed ?? true,
        });
      }

      setMockProfile(merged);

      if (
        (prevTier === "plus" || prevTier === "premium") &&
        merged.subscription === "free" &&
        !merged.subscriptionIsPaid
      ) {
        toast.info(
          "Free trial ended",
          "Your trial has expired. You're on the Free plan — upgrade anytime to unlock Plus or Premium again.",
        );
      }
    };

    sync();
    const id = window.setInterval(sync, 60_000);
    return () => window.clearInterval(id);
  }, [profile, setMockProfile, toast, user]);

  return null;
}
