"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  getProgress,
  saveProgress,
  clearProgress,
  type LessonProgress,
} from "@/lib/lessonProgress";

export function useLessonProgress(lessonId: string) {
  const { user, profile, loading } = useAuth();
  // Only use a real authenticated user ID — never fall back to "anon" so
  // progress is always isolated to the account that created it.
  const userId: string | null = user?.id ?? profile?.uid ?? null;

  const [state, setState] = useState<LessonProgress | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Wait until auth has settled before reading so we never read or write
    // under the wrong key while the session is still being resolved.
    if (loading) return;
    if (!userId) {
      setState(null);
      return;
    }
    setState(getProgress(userId, lessonId));
  }, [userId, lessonId, loading]);

  const update = useCallback(
    (patch: Partial<LessonProgress>) => {
      // Refuse to save if auth is still loading or no real user is signed in.
      if (loading || !userId) return (state ?? {}) as LessonProgress;
      const next = saveProgress(userId, lessonId, patch);
      setState(next);
      return next;
    },
    [userId, lessonId, loading, state],
  );

  const reset = useCallback(() => {
    if (loading || !userId) return;
    clearProgress(userId, lessonId);
    setState(null);
  }, [userId, lessonId, loading]);

  const ready = mounted && !loading;

  return {
    progress: ready ? (state?.progress ?? 0) : 0,
    activeSection: state?.activeSection ?? "lesson",
    lessonRead: state?.lessonRead ?? false,
    quizAnswers: state?.quizAnswers ?? {},
    quizScore: state?.quizScore ?? null,
    quizSubmitted: state?.quizSubmitted ?? false,
    quizPassed: state?.quizPassed ?? false,
    assignmentText: state?.assignmentText ?? "",
    assignmentSubmitted: state?.assignmentSubmitted ?? false,
    started: ready && state !== null,
    completed: state?.progress === 100,
    startedAt: state?.startedAt ?? null,
    completedAt: state?.completedAt ?? null,
    update,
    reset,
  };
}
