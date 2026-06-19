export type UserRole = "student" | "tutor";
export type SubscriptionTier = "free" | "plus" | "premium";
export type TutoringType = "group" | "1on1" | "peer";
export type BadgeId =
  | "history_rookie"
  | "history_buff"
  | "history_scholar"
  | "quiz_novice"
  | "quiz_expert"
  | "quiz_master"
  | "assignment_ace"
  | "study_streak"
  | "dedicated_learner"
  | "century_scholar";

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  subscription: SubscriptionTier;
  /** ISO date when a free trial ends; null when not on trial. */
  trialEndsAt?: string | null;
  /** True after the user completes a paid subscription (not trial-only). */
  subscriptionIsPaid?: boolean;
  /** True once the user has ever started a free trial. */
  trialUsed?: boolean;
  createdAt: string;
}

export interface Progress {
  lessonsAttended: number;
  assignmentsCompleted: number;
  quizzesPassed: number;
  studyTimeMinutes: number;
}

export interface BadgeDefinition {
  id: BadgeId;
  name: string;
  description: string;
  icon: string;
  requirement: string;
}

export interface Session {
  id: string;
  type: TutoringType;
  day: string;
  date: string;
  tutorName?: string;
  maxSeats: number;
  bookedSeats: string[];
  startTime: string;
  endTime: string;
}

export interface HistoricalClass {
  id: string;
  tutorId: string;
  title: string;
  description: string;
  schedule: string;
  maxStudents: number;
  enrolledStudents: string[];
  subject: string;
}

export interface HistoricalEvent {
  id: string;
  title: string;
  year: string;
  description: string;
  imageUrl: string;
  category: string;
}

export interface HistoricalFigure {
  id: string;
  name: string;
  era: string;
  description: string;
  imageUrl: string;
  type: "person" | "place";
}

export interface FAQItem {
  question: string;
  answer: string;
}
