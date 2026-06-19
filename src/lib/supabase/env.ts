export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
  );
}

/** Origin used for OAuth/email redirect URLs (must match Supabase allow list). */
export function getSiteOrigin(): string {
  // Always use the live browser origin when available — avoids wrong NEXT_PUBLIC_SITE_URL on Netlify.
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  let url = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (!url) return "";
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }
  return url;
}
