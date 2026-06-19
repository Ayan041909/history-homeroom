import type { SubscriptionTier } from "@/types";
import type { LessonCard } from "@/lib/lessonCatalog";

/** Plus unlocks the main library; Premium adds exclusive lessons on top. */
export function canAccessLesson(
  subscription: SubscriptionTier | undefined | null,
  lesson: LessonCard,
): boolean {
  const plan = subscription ?? "free";
  if (lesson.tier === "free") return true;
  if (lesson.tier === "plus") return plan === "plus" || plan === "premium";
  if (lesson.tier === "premium") return plan === "premium";
  return false;
}

export function hasPlusLessonAccess(subscription: SubscriptionTier | undefined | null): boolean {
  return subscription === "plus" || subscription === "premium";
}

export function hasPremiumLessonAccess(subscription: SubscriptionTier | undefined | null): boolean {
  return subscription === "premium";
}

/** @deprecated Use canAccessLesson instead */
export function hasFullLessonAccess(subscription: SubscriptionTier | undefined | null): boolean {
  return hasPlusLessonAccess(subscription);
}
