/** Default destination after sign-in / sign-up. */
export const STUDENT_DASHBOARD = "/home";

/** Lesson library — primary CTA when already signed in. */
export const LESSONS_PAGE = "/lessons";

/** Sign-up / login entry for guests. */
export const SIGNUP_LOGIN_PATH = "/login?signup=true";

/** Where "Start Learning" should go based on auth state. */
export function getStartLearningHref(authenticated: boolean): string {
  return authenticated ? LESSONS_PAGE : SIGNUP_LOGIN_PATH;
}

/** Relative path safe for browser navigation after sign-in/up. Returns null when invalid or disallowed. */
export function getSafeRedirectTarget(raw: string | null): string | null {
  if (!raw || typeof raw !== "string") return null;
  let decoded = raw.trim();
  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    return null;
  }
  if (!decoded.startsWith("/") || decoded.startsWith("//")) return null;
  if (decoded.includes("://")) return null;
  const lower = decoded.toLowerCase();
  if (lower.startsWith("/login")) return null;
  if (lower.startsWith("/api")) return null;
  if (lower.startsWith("/tutor")) return null;
  return decoded;
}

/** Where to send the user after a successful login or registration. */
export function getPostLoginPath(redirect: string | null): string {
  return getSafeRedirectTarget(redirect) ?? STUDENT_DASHBOARD;
}
