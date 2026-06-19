"use client";

/** All localStorage keys that store user-specific data for this app. */
export const USER_DATA_STORAGE_KEYS = [
  "hh_users",
  "hh_session",
  "hh_subscription",
  "history-homeroom:notifications",
  "history-homeroom:a11y",
] as const;

/** Removes every local user record, session, subscription cache, and prefs. */
export function clearAllLocalUserData(): void {
  if (typeof window === "undefined") return;
  for (const key of USER_DATA_STORAGE_KEYS) {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }
}
