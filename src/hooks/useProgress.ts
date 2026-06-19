"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { getProgress, getEarnedBadges } from "@/lib/firestore";
import type { Progress } from "@/types";

const DEMO_PROGRESS: Progress = {
  lessonsAttended: 12,
  assignmentsCompleted: 8,
  quizzesPassed: 6,
  studyTimeMinutes: 240,
};

const DEMO_BADGES = ["history_rookie", "history_buff", "quiz_novice", "quiz_expert", "assignment_ace", "study_streak"];

export function useProgress() {
  const { user, profile } = useAuth();
  const userId = user?.id ?? profile?.uid ?? null;
  const [progress, setProgress] = useState<Progress>(DEMO_PROGRESS);
  const [earnedBadges, setEarnedBadges] = useState<string[]>(DEMO_BADGES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    Promise.all([getProgress(userId), getEarnedBadges(userId)])
      .then(([p, b]) => {
        if (cancelled) return;
        if (p) setProgress(p);
        if (b.length) setEarnedBadges(b);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [userId]);

  return { progress, earnedBadges, loading };
}
