"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "./env";

function parseDocumentCookies() {
  return document.cookie.split("; ").reduce<Array<{ name: string; value: string }>>((acc, part) => {
    if (!part) return acc;
    const eq = part.indexOf("=");
    const name = eq >= 0 ? part.slice(0, eq) : part;
    const value = eq >= 0 ? part.slice(eq + 1) : "";
    acc.push({ name, value: decodeURIComponent(value) });
    return acc;
  }, []);
}

function writeDocumentCookie(
  name: string,
  value: string,
  options?: { path?: string; maxAge?: number; sameSite?: string; secure?: boolean },
) {
  const parts = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    `path=${options?.path ?? "/"}`,
  ];
  if (options?.maxAge !== undefined) parts.push(`max-age=${options.maxAge}`);
  parts.push(`samesite=${options?.sameSite ?? "lax"}`);
  if (options?.secure) parts.push("secure");
  document.cookie = parts.join("; ");
}

export function createClient(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return parseDocumentCookies();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            writeDocumentCookie(name, value, {
              path: options?.path,
              maxAge: options?.maxAge,
              sameSite: typeof options?.sameSite === "string" ? options.sameSite : undefined,
              secure: options?.secure,
            });
          });
        },
      },
    },
  );
}
