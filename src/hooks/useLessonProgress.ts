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
  const { user, profile } = useAuth();
  const userId = user?.id ?? profile?.uid ?? null;

  const [state, setState] = useState<LessonProgress | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setState(getProgress(userId, lessonId));
  }, [userId, lessonId]);

  const update = useCallback(
    (patch: Partial<LessonProgress>) => {
      const next = saveProgress(userId, lessonId, patch);
      setState(next);
      return next;
    },
    [userId, lessonId],
  );

  const reset = useCallback(() => {
    clearProgress(userId, lessonId);
    setState(null);
  }, [userId, lessonId]);

  return {
    progress: mounted ? (state?.progress ?? 0) : 0,
    activeSection: state?.activeSection ?? "lesson",
    lessonRead: state?.lessonRead ?? false,
    quizAnswers: state?.quizAnswers ?? {},
    quizScore: state?.quizScore ?? null,
    quizSubmitted: state?.quizSubmitted ?? false,
    assignmentText: state?.assignmentText ?? "",
    assignmentSubmitted: state?.assignmentSubmitted ?? false,
    started: mounted && state !== null,
    completed: state?.progress === 100,
    startedAt: state?.startedAt ?? null,
    completedAt: state?.completedAt ?? null,
    update,
    reset,
  };
}
