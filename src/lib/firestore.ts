import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { UserProfile, Progress, SubscriptionTier } from "@/types";

type ProfileRow = {
  id: string;
  email: string;
  name: string;
  role: UserProfile["role"];
  avatar: string | null;
  subscription: SubscriptionTier;
  trial_ends_at: string | null;
  subscription_is_paid: boolean;
  trial_used: boolean;
  created_at: string;
};

type ProgressRow = {
  user_id: string;
  lessons_attended: number;
  assignments_completed: number;
  quizzes_passed: number;
  study_time_minutes: number;
};

type BadgesRow = {
  user_id: string;
  earned: string[];
};

function mapProfile(row: ProfileRow): UserProfile {
  return {
    uid: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    avatar: row.avatar ?? undefined,
    subscription: row.subscription,
    trialEndsAt: row.trial_ends_at,
    subscriptionIsPaid: row.subscription_is_paid,
    trialUsed: row.trial_used,
    createdAt: row.created_at,
  };
}

function mapProgress(row: ProgressRow): Progress {
  return {
    lessonsAttended: row.lessons_attended,
    assignmentsCompleted: row.assignments_completed,
    quizzesPassed: row.quizzes_passed,
    studyTimeMinutes: row.study_time_minutes,
  };
}

/** Minimal profile from Supabase Auth when the profiles row is unavailable or still syncing. */
export function profileFromAuthUser(authUser: User): UserProfile {
  const meta = authUser.user_metadata ?? {};
  const fullName =
    (typeof meta.full_name === "string" && meta.full_name) ||
    (typeof meta.name === "string" && meta.name) ||
    authUser.email?.split("@")[0] ||
    "Learner";
  const avatar =
    (typeof meta.avatar_url === "string" && meta.avatar_url) ||
    (typeof meta.picture === "string" && meta.picture) ||
    undefined;

  return {
    uid: authUser.id,
    email: authUser.email ?? "",
    name: fullName,
    role: "student",
    avatar,
    subscription: "free",
    createdAt: authUser.created_at ?? new Date().toISOString(),
  };
}

export async function createUserProfile(uid: string, data: Omit<UserProfile, "uid">) {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    await supabase.from("profiles").upsert({
      id: uid,
      email: data.email,
      name: data.name,
      role: data.role,
      avatar: data.avatar ?? null,
      subscription: data.subscription,
    });
    await supabase.from("progress").upsert({
      user_id: uid,
      lessons_attended: 0,
      assignments_completed: 0,
      quizzes_passed: 0,
      study_time_minutes: 0,
    });
    await supabase.from("badges").upsert({ user_id: uid, earned: [] });
  } catch {
    // Database unavailable — auth + local cache still work for demo mode.
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("profiles").select("*").eq("id", uid).maybeSingle();
    if (error || !data) return null;
    return mapProfile(data as ProfileRow);
  } catch {
    return null;
  }
}

/** Ensures profiles/progress/badges rows exist. Never blocks sign-in if the database fails. */
export async function ensureUserProfileFromAuthUser(authUser: User): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    const existing = await getUserProfile(authUser.id);
    if (existing) return;

    const base = profileFromAuthUser(authUser);
    await createUserProfile(authUser.id, {
      email: base.email,
      name: base.name,
      role: base.role,
      avatar: base.avatar,
      subscription: base.subscription,
      createdAt: base.createdAt,
    });
  } catch {
    // Database unavailable — app uses auth + local subscription cache.
  }
}

export interface SubscriptionUpdate {
  subscription: SubscriptionTier;
  trialEndsAt?: string | null;
  subscriptionIsPaid?: boolean;
  trialUsed?: boolean;
}

export async function updateUserProfile(
  uid: string,
  data: Partial<Pick<UserProfile, "name" | "avatar">>,
): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    await supabase
      .from("profiles")
      .update({
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.avatar !== undefined ? { avatar: data.avatar ?? null } : {}),
      })
      .eq("id", uid);
  } catch {
    // Local profile state is the fallback for demo mode.
  }
}

export async function updateUserSubscription(uid: string, data: SubscriptionUpdate): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    await supabase
      .from("profiles")
      .update({
        subscription: data.subscription,
        ...(data.trialEndsAt !== undefined ? { trial_ends_at: data.trialEndsAt } : {}),
        ...(data.subscriptionIsPaid !== undefined
          ? { subscription_is_paid: data.subscriptionIsPaid }
          : {}),
        ...(data.trialUsed !== undefined ? { trial_used: data.trialUsed } : {}),
      })
      .eq("id", uid);
  } catch {
    // Local subscription cache is the fallback for demo mode.
  }
}

export async function getProgress(uid: string): Promise<Progress | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("progress").select("*").eq("user_id", uid).maybeSingle();
    if (error || !data) return null;
    return mapProgress(data as ProgressRow);
  } catch {
    return null;
  }
}

export async function updateProgress(uid: string, data: Partial<Progress>) {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    await supabase
      .from("progress")
      .update({
        ...(data.lessonsAttended !== undefined ? { lessons_attended: data.lessonsAttended } : {}),
        ...(data.assignmentsCompleted !== undefined
          ? { assignments_completed: data.assignmentsCompleted }
          : {}),
        ...(data.quizzesPassed !== undefined ? { quizzes_passed: data.quizzesPassed } : {}),
        ...(data.studyTimeMinutes !== undefined ? { study_time_minutes: data.studyTimeMinutes } : {}),
      })
      .eq("user_id", uid);
  } catch {
    // Ignore when database is unavailable.
  }
}

export async function getEarnedBadges(uid: string): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("badges").select("earned").eq("user_id", uid).maybeSingle();
    if (error || !data) return [];
    return (data as BadgesRow).earned ?? [];
  } catch {
    return [];
  }
}

export async function awardBadge(uid: string, badgeId: string) {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    const { data } = await supabase.from("badges").select("earned").eq("user_id", uid).maybeSingle();
    const earned = ((data as BadgesRow | null)?.earned ?? []) as string[];
    if (earned.includes(badgeId)) return;
    // Use upsert so this works even if the badges row is missing (edge case on first login).
    await supabase.from("badges").upsert({ user_id: uid, earned: [...earned, badgeId] });
  } catch {
    // Ignore when database is unavailable.
  }
}
