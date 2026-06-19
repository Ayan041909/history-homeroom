"use client";

import type { SubscriptionTier, UserProfile } from "@/types";

const STORAGE_KEY = "hh_subscription";
export const TRIAL_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

export interface SubscriptionRecord {
  tier: SubscriptionTier;
  trialEndsAt: string | null;
  isPaid: boolean;
  trialUsed: boolean;
}

type StoredValue = SubscriptionRecord | SubscriptionTier;

const FREE_RECORD: SubscriptionRecord = {
  tier: "free",
  trialEndsAt: null,
  isPaid: false,
  trialUsed: false,
};

function readAll(): Record<string, StoredValue> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Record<string, StoredValue>;
  } catch {
    return {};
  }
}

function saveRecord(uid: string, record: SubscriptionRecord): void {
  if (typeof window === "undefined") return;
  try {
    const data = readAll();
    data[uid] = record;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable
  }
}

function normalizeStored(value: StoredValue | undefined): SubscriptionRecord {
  if (!value) return { ...FREE_RECORD };
  if (typeof value === "string") {
    // Legacy tier-only cache — treat as expired unpaid access.
    return { ...FREE_RECORD, trialUsed: value !== "free" };
  }
  return value;
}

/** Apply trial expiry and invalid unpaid tiers. Persists downgrades. */
export function resolveSubscriptionRecord(record: SubscriptionRecord): SubscriptionRecord {
  if (record.isPaid) return record;

  const now = Date.now();
  if (record.trialEndsAt) {
    if (new Date(record.trialEndsAt).getTime() <= now) {
      return { tier: "free", trialEndsAt: null, isPaid: false, trialUsed: true };
    }
    if (record.tier !== "free") return record;
  }

  if ((record.tier === "plus" || record.tier === "premium") && !record.isPaid && !record.trialEndsAt) {
    return { tier: "free", trialEndsAt: null, isPaid: false, trialUsed: record.trialUsed };
  }

  return record;
}

export function getSubscriptionRecord(uid: string): SubscriptionRecord {
  const raw = normalizeStored(readAll()[uid]);
  const resolved = resolveSubscriptionRecord(raw);
  if (
    resolved.tier !== raw.tier ||
    resolved.trialEndsAt !== raw.trialEndsAt ||
    resolved.isPaid !== raw.isPaid
  ) {
    saveRecord(uid, resolved);
  }
  return resolved;
}

export function subscriptionFieldsFromRecord(
  record: SubscriptionRecord,
): Pick<UserProfile, "subscription" | "trialEndsAt" | "subscriptionIsPaid" | "trialUsed"> {
  return {
    subscription: record.tier,
    trialEndsAt: record.trialEndsAt,
    subscriptionIsPaid: record.isPaid,
    trialUsed: record.trialUsed,
  };
}

export function canStartTrial(uid: string): boolean {
  const record = getSubscriptionRecord(uid);
  return !record.trialUsed && !record.isPaid;
}

export function startTrial(uid: string, tier: SubscriptionTier): SubscriptionRecord {
  const record: SubscriptionRecord = {
    tier,
    trialEndsAt: new Date(Date.now() + TRIAL_DURATION_MS).toISOString(),
    isPaid: false,
    trialUsed: true,
  };
  saveRecord(uid, record);
  return record;
}

export function upgradeToPaid(uid: string, tier: SubscriptionTier): SubscriptionRecord {
  const existing = getSubscriptionRecord(uid);
  const record: SubscriptionRecord = {
    tier,
    trialEndsAt: null,
    isPaid: true,
    trialUsed: existing.trialUsed,
  };
  saveRecord(uid, record);
  return record;
}

export function cancelSubscription(uid: string): SubscriptionRecord {
  const existing = getSubscriptionRecord(uid);
  const record: SubscriptionRecord = {
    tier: "free",
    trialEndsAt: null,
    isPaid: false,
    trialUsed: existing.trialUsed,
  };
  saveRecord(uid, record);
  return record;
}

/** @deprecated Use startTrial / upgradeToPaid / cancelSubscription instead. */
export function saveLocalSubscription(uid: string, tier: SubscriptionTier): void {
  if (tier === "free") {
    cancelSubscription(uid);
    return;
  }
  const record = getSubscriptionRecord(uid);
  if (record.trialUsed && !record.isPaid) {
    upgradeToPaid(uid, tier);
  } else if (!record.trialUsed) {
    startTrial(uid, tier);
  } else {
    upgradeToPaid(uid, tier);
  }
}

export function getLocalSubscription(uid: string): SubscriptionTier | null {
  const record = getSubscriptionRecord(uid);
  return record.tier === "free" && !record.isPaid ? null : record.tier;
}

export function isOnActiveTrial(record: SubscriptionRecord): boolean {
  if (record.isPaid || !record.trialEndsAt) return false;
  return new Date(record.trialEndsAt).getTime() > Date.now() && record.tier !== "free";
}

/** Prefer Firestore when paid; otherwise resolve local trial/paid state. */
export function mergeSubscriptionIntoProfile(profile: UserProfile): UserProfile {
  const remote = profile.subscription ?? "free";

  if (profile.subscriptionIsPaid && remote !== "free") {
    return profile;
  }

  const local = getSubscriptionRecord(profile.uid);
  const fields = subscriptionFieldsFromRecord(local);

  if (remote !== "free" && !profile.subscriptionIsPaid && !profile.trialEndsAt) {
    return { ...profile, ...fields };
  }

  if (local.tier !== "free" || local.isPaid || local.trialEndsAt) {
    return { ...profile, ...fields };
  }

  if (remote !== "free" && !profile.subscriptionIsPaid) {
    return { ...profile, subscription: "free", trialEndsAt: null };
  }

  return profile;
}
