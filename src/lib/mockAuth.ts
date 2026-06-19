"use client";

import type { UserProfile, SubscriptionTier } from "@/types";
import { clearAllLocalUserData } from "@/lib/userDataStorage";

const USERS_KEY = "hh_users";
const SESSION_KEY = "hh_session";

function getUsers(): Record<string, UserProfile & { password: string }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, UserProfile & { password: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function mockSignUp(email: string, password: string, name: string): UserProfile {
  const users = getUsers();
  const existing = Object.values(users).find((u) => u.email === email);
  if (existing) throw new Error("An account with this email already exists.");

  const uid = `user_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const profile: UserProfile = {
    uid,
    email,
    name: name || email.split("@")[0],
    role: "student",
    subscription: "free",
    createdAt: new Date().toISOString(),
  };
  users[uid] = { ...profile, password };
  saveUsers(users);
  localStorage.setItem(SESSION_KEY, uid);
  return profile;
}

function stripPassword(user: UserProfile & { password: string }): UserProfile {
  return {
    uid: user.uid,
    email: user.email,
    name: user.name,
    role: "student",
    avatar: user.avatar,
    subscription: user.subscription,
    trialEndsAt: user.trialEndsAt,
    subscriptionIsPaid: user.subscriptionIsPaid,
    trialUsed: user.trialUsed,
    createdAt: user.createdAt,
  };
}

export function mockSignIn(email: string, password: string): UserProfile {
  const users = getUsers();
  const user = Object.values(users).find((u) => u.email === email);
  if (!user) throw new Error("No account found with this email address.");
  if (user.password !== password) throw new Error("Incorrect password. Please try again.");
  localStorage.setItem(SESSION_KEY, user.uid);
  return stripPassword(user);
}

export function clearMockAuthData(): void {
  clearAllLocalUserData();
}

export function mockSignOut() {
  localStorage.removeItem(SESSION_KEY);
}

export function mockGetSession(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const uid = localStorage.getItem(SESSION_KEY);
  if (!uid) return null;
  const users = getUsers();
  const user = users[uid];
  if (!user) return null;
  return stripPassword(user);
}

export async function mockGoogleSignIn(): Promise<UserProfile> {
  const email = `google_user_${Date.now()}@gmail.com`;
  const name = "Google User";
  return mockSignUp(email, "google_oauth", name);
}

export function updateMockSubscriptionFields(
  fields: Pick<UserProfile, "subscription" | "trialEndsAt" | "subscriptionIsPaid" | "trialUsed">,
): UserProfile {
  const uid = localStorage.getItem(SESSION_KEY);
  if (!uid) throw new Error("You must be signed in to upgrade your plan.");

  const users = getUsers();
  const user = users[uid];
  if (!user) throw new Error("You must be signed in to upgrade your plan.");

  users[uid] = { ...user, ...fields };
  saveUsers(users);
  return stripPassword(users[uid]);
}

export function updateMockSubscription(subscription: SubscriptionTier): UserProfile {
  return updateMockSubscriptionFields({ subscription });
}

/** Updates the display name for the currently signed-in mock user. */
export function updateMockProfileName(name: string): UserProfile {
  const uid = localStorage.getItem(SESSION_KEY);
  if (!uid) throw new Error("You must be signed in to update your profile.");

  const users = getUsers();
  const user = users[uid];
  if (!user) throw new Error("You must be signed in to update your profile.");

  users[uid] = { ...user, name };
  saveUsers(users);
  return stripPassword(users[uid]);
}
