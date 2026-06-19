import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { UserProfile, Progress, Session, HistoricalClass, SubscriptionTier } from "@/types";

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

type SessionRow = {
  id: string;
  type: Session["type"];
  day: string;
  date: string;
  tutor_name: string | null;
  max_seats: number;
  booked_seats: string[];
  start_time: string;
  end_time: string;
};

type ClassRow = {
  id: string;
  tutor_id: string;
  title: string;
  description: string;
  schedule: string;
  max_students: number;
  enrolled_students: string[];
  subject: string;
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

function mapSession(row: SessionRow): Session {
  return {
    id: row.id,
    type: row.type,
    day: row.day,
    date: row.date,
    tutorName: row.tutor_name ?? undefined,
    maxSeats: row.max_seats,
    bookedSeats: row.booked_seats ?? [],
    startTime: row.start_time,
    endTime: row.end_time,
  };
}

function mapClass(row: ClassRow): HistoricalClass {
  return {
    id: row.id,
    tutorId: row.tutor_id,
    title: row.title,
    description: row.description,
    schedule: row.schedule,
    maxStudents: row.max_students,
    enrolledStudents: row.enrolled_students ?? [],
    subject: row.subject,
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

/** @deprecated Use profileFromAuthUser */
export const profileFromFirebaseUser = profileFromAuthUser;

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

/** @deprecated Use ensureUserProfileFromAuthUser */
export const ensureUserProfileFromFirebaseUser = ensureUserProfileFromAuthUser;

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
    await supabase.from("badges").update({ earned: [...earned, badgeId] }).eq("user_id", uid);
  } catch {
    // Ignore when database is unavailable.
  }
}

export async function getSessions(type?: string): Promise<Session[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    let query = supabase.from("sessions").select("*");
    if (type) query = query.eq("type", type);
    const { data, error } = await query;
    if (error || !data) return [];
    return (data as SessionRow[]).map(mapSession);
  } catch {
    return [];
  }
}

export async function bookSession(sessionId: string, uid: string) {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("sessions").select("*").eq("id", sessionId).maybeSingle();
    if (error || !data) throw new Error("Session not found");

    const row = data as SessionRow;
    const booked = row.booked_seats ?? [];
    if (booked.includes(uid)) throw new Error("You are already booked for this session");
    if (booked.length >= (row.max_seats || 0)) throw new Error("This session is at full capacity");

    const { error: updateError } = await supabase
      .from("sessions")
      .update({ booked_seats: [...booked, uid] })
      .eq("id", sessionId);
    if (updateError) throw new Error("Could not book session");
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Could not book session");
  }
}

export async function createClass(data: Omit<HistoricalClass, "id">) {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    await supabase.from("classes").insert({
      tutor_id: data.tutorId,
      title: data.title,
      description: data.description,
      schedule: data.schedule,
      max_students: data.maxStudents,
      enrolled_students: data.enrolledStudents,
      subject: data.subject,
    });
  } catch {
    // Ignore when database is unavailable.
  }
}

export async function getClassesByTutor(tutorId: string): Promise<HistoricalClass[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("classes").select("*").eq("tutor_id", tutorId);
    if (error || !data) return [];
    return (data as ClassRow[]).map(mapClass);
  } catch {
    return [];
  }
}
