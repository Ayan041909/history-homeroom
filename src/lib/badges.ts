import type { BadgeDefinition, Progress } from "@/types";

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: "history_rookie",
    name: "History Rookie",
    description: "Attend your first lesson",
    icon: "🎓",
    requirement: "1 lesson attended",
  },
  {
    id: "history_buff",
    name: "History Buff",
    description: "Attend 5 lessons",
    icon: "📚",
    requirement: "5 lessons attended",
  },
  {
    id: "history_scholar",
    name: "History Scholar",
    description: "Attend 10 lessons",
    icon: "🏛️",
    requirement: "10 lessons attended",
  },
  {
    id: "quiz_novice",
    name: "Quiz Novice",
    description: "Pass your first quiz",
    icon: "✏️",
    requirement: "1 quiz passed",
  },
  {
    id: "quiz_expert",
    name: "Quiz Expert",
    description: "Pass 5 quizzes",
    icon: "🎯",
    requirement: "5 quizzes passed",
  },
  {
    id: "quiz_master",
    name: "Quiz Master",
    description: "Pass 10 quizzes",
    icon: "👑",
    requirement: "10 quizzes passed",
  },
  {
    id: "assignment_ace",
    name: "Assignment Ace",
    description: "Complete 5 assignments",
    icon: "⭐",
    requirement: "5 assignments completed",
  },
  {
    id: "study_streak",
    name: "Study Streak",
    description: "Study for 60 minutes total",
    icon: "🔥",
    requirement: "60 minutes of study",
  },
  {
    id: "dedicated_learner",
    name: "Dedicated Learner",
    description: "Complete 20 assignments",
    icon: "💎",
    requirement: "20 assignments completed",
  },
  {
    id: "century_scholar",
    name: "Century Scholar",
    description: "Attend 100 lessons",
    icon: "🏆",
    requirement: "100 lessons attended",
  },
];

export function checkEarnedBadges(progress: Progress, currentBadges: string[]): string[] {
  const newBadges: string[] = [];

  if (progress.lessonsAttended >= 1 && !currentBadges.includes("history_rookie")) newBadges.push("history_rookie");
  if (progress.lessonsAttended >= 5 && !currentBadges.includes("history_buff")) newBadges.push("history_buff");
  if (progress.lessonsAttended >= 10 && !currentBadges.includes("history_scholar")) newBadges.push("history_scholar");
  if (progress.lessonsAttended >= 100 && !currentBadges.includes("century_scholar")) newBadges.push("century_scholar");
  if (progress.quizzesPassed >= 1 && !currentBadges.includes("quiz_novice")) newBadges.push("quiz_novice");
  if (progress.quizzesPassed >= 5 && !currentBadges.includes("quiz_expert")) newBadges.push("quiz_expert");
  if (progress.quizzesPassed >= 10 && !currentBadges.includes("quiz_master")) newBadges.push("quiz_master");
  if (progress.assignmentsCompleted >= 5 && !currentBadges.includes("assignment_ace")) newBadges.push("assignment_ace");
  if (progress.assignmentsCompleted >= 20 && !currentBadges.includes("dedicated_learner")) newBadges.push("dedicated_learner");
  if (progress.studyTimeMinutes >= 60 && !currentBadges.includes("study_streak")) newBadges.push("study_streak");

  return newBadges;
}
