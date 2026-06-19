/** Lesson progress persistence — stored in localStorage per user + lesson. */

export interface LessonProgress {
  lessonId: string;
  /** Which tab the student is currently on */
  activeSection: "lesson" | "quiz" | "assignment";
  /** Has the student clicked "Mark as Read" on the lesson tab */
  lessonRead: boolean;
  /** Map of questionIndex -> chosen answer index */
  quizAnswers: Record<number, number>;
  /** null until the quiz is submitted */
  quizScore: number | null;
  quizSubmitted: boolean;
  assignmentText: string;
  assignmentSubmitted: boolean;
  /** 0‑100 */
  progress: number;
  startedAt: string;
  completedAt: string | null;
}

export function storageKey(userId: string | null | undefined, lessonId: string): string {
  const uid = userId ?? "anon";
  return `hh_lesson_${uid}_${lessonId}`;
}

export function getProgress(
  userId: string | null | undefined,
  lessonId: string,
): LessonProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(storageKey(userId, lessonId));
    if (!raw) return null;
    return JSON.parse(raw) as LessonProgress;
  } catch {
    return null;
  }
}

export function computeProgress(p: Omit<LessonProgress, "progress" | "startedAt" | "completedAt">): number {
  if (p.quizSubmitted && p.quizScore !== null) return 100;
  if (p.assignmentSubmitted) return 75;
  if (p.lessonRead) return 50;
  return 10; // started but not read yet
}

export function saveProgress(
  userId: string | null | undefined,
  lessonId: string,
  patch: Partial<LessonProgress>,
): LessonProgress {
  if (typeof window === "undefined") return patch as LessonProgress;
  const existing = getProgress(userId, lessonId);
  const now = new Date().toISOString();
  const merged: LessonProgress = {
    lessonId,
    activeSection: "lesson",
    lessonRead: false,
    quizAnswers: {},
    quizScore: null,
    quizSubmitted: false,
    assignmentText: "",
    assignmentSubmitted: false,
    progress: 10,
    startedAt: now,
    completedAt: null,
    ...existing,
    ...patch,
  };
  // recalculate progress
  merged.progress = computeProgress(merged);
  if (merged.progress === 100 && !merged.completedAt) {
    merged.completedAt = now;
  }
  try {
    localStorage.setItem(storageKey(userId, lessonId), JSON.stringify(merged));
  } catch {
    // storage full or unavailable — ignore
  }
  return merged;
}

export function clearProgress(userId: string | null | undefined, lessonId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(storageKey(userId, lessonId));
  } catch {
    // ignore
  }
}

/** Returns all lesson progress records for a user (for the dashboard). */
export function getAllProgress(userId: string | null | undefined): LessonProgress[] {
  if (typeof window === "undefined") return [];
  const prefix = `hh_lesson_${userId ?? "anon"}_`;
  const results: LessonProgress[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(prefix)) {
        const raw = localStorage.getItem(key);
        if (raw) results.push(JSON.parse(raw) as LessonProgress);
      }
    }
  } catch {
    // ignore
  }
  return results;
}
