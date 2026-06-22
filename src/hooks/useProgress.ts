"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { getProgress, getEarnedBadges } from "@/lib/firestore";
import type { Progress } from "@/types";

const EMPTY_PROGRESS: Progress = {
  lessonsAttended: 0,
  assignmentsCompleted: 0,
  quizzesPassed: 0,
  studyTimeMinutes: 0,
};

export function useProgress() {
  const { user, profile } = useAuth();
  const userId = user?.id ?? profile?.uid ?? null;
  const [progress, setProgress] = useState<Progress>(EMPTY_PROGRESS);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) {
      setProgress(EMPTY_PROGRESS);
      setEarnedBadges([]);
      return;
    }
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    Promise.all([getProgress(userId), getEarnedBadges(userId)])
      .then(([p, b]) => {
        if (cancelled) return;
        setProgress(p ?? EMPTY_PROGRESS);
        setEarnedBadges(b);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [userId]);

  return { progress, earnedBadges, loading };
}
