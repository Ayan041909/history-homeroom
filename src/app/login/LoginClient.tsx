"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getSiteOrigin, isSupabaseConfigured } from "@/lib/supabase/env";
import { createUserProfile } from "@/lib/firestore";
import { getPostLoginPath } from "@/lib/redirect";
import { mockSignUp, mockSignIn, mockGoogleSignIn } from "@/lib/mockAuth";
import { useAuthContext } from "@/contexts/AuthContext";
import { useToast } from "@/components/shared/Toast";
import { ExternalImage } from "@/components/shared/ExternalImage";
import { SiteLogo } from "@/components/shared/SiteLogo";
import { IMAGES } from "@/lib/images";

type Mode = "login" | "signup";

const inputClass =
  "w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-neutral-600 transition-colors";

function formatAuthError(err: unknown): string {
  const msg = err instanceof Error ? err.message : "Authentication failed.";
  if (msg.includes("Email not confirmed")) {
    return "Please confirm your email before signing in. Check your inbox for the confirmation link.";
  }
  return msg.trim();
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export function LoginClient() {
  const router = useRouter();
  const params = useSearchParams();
  const isSignup = params.get("signup") === "true";
  const { setMockProfile } = useAuthContext();
  const toast = useToast();
  const supabaseReady = isSupabaseConfigured();

  const [mode, setMode] = useState<Mode>(isSignup ? "signup" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    setMode(isSignup ? "signup" : "login");
  }, [isSignup]);

  useEffect(() => {
    const err = params.get("error");
    if (!err) return;
    if (err === "auth_callback_failed") {
      setError(
        "Google sign-in could not be completed. Check that your Supabase redirect URL matches this site's /auth/callback path exactly, then try again in incognito.",
      );
    } else {
      try {
        setError(decodeURIComponent(err));
      } catch {
        setError(err);
      }
    }
  }, [params]);

  const useSupabaseAuth = supabaseReady;

  const [blockAutofill, setBlockAutofill] = useState(true);
  useEffect(() => {
    const id = window.setTimeout(() => setBlockAutofill(false), 100);
    return () => window.clearTimeout(id);
  }, [mode]);

  const destination = () => getPostLoginPath(params.get("redirect"));
  const busy = formLoading || googleLoading;

  const switchMode = (next: Mode) => {
    setMode(next);
    setError("");
    setResetSent(false);
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    const redirect = params.get("redirect");
    if (next === "signup") {
      router.replace(redirect ? `/login?signup=true&redirect=${encodeURIComponent(redirect)}` : "/login?signup=true");
    } else {
      router.replace(redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : "/login");
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter your email above first, then click 'Forgot password?' again.");
      return;
    }
    try {
      if (useSupabaseAuth) {
        const supabase = createClient();
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${getSiteOrigin()}/auth/callback?next=/profile`,
        });
        if (resetError) throw resetError;
      } else {
        await new Promise((r) => setTimeout(r, 600));
      }
      setResetSent(true);
      toast.success("Reset link sent", `Check ${email} for password reset instructions.`);
    } catch (err: unknown) {
      setError(formatAuthError(err));
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFormLoading(true);

    const fullName = `${firstName} ${lastName}`.trim();

    try {
      if (useSupabaseAuth) {
        const supabase = createClient();
        if (mode === "signup") {
          const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { full_name: fullName || email.split("@")[0] },
              emailRedirectTo: `${getSiteOrigin()}/auth/callback?next=${encodeURIComponent(destination())}`,
            },
          });
          if (signUpError) throw signUpError;
          if (data.user) {
            void createUserProfile(data.user.id, {
              email,
              name: fullName || email.split("@")[0],
              role: "student",
              subscription: "free",
              createdAt: new Date().toISOString(),
            });
          }
          if (data.user && !data.session) {
            toast.success("Check your email", "We sent a confirmation link to finish creating your account.");
            return;
          }
        } else {
          const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
          if (signInError) throw signInError;
        }
        router.replace(destination());
      } else if (process.env.NODE_ENV === "development") {
        const profile =
          mode === "signup" ? mockSignUp(email, password, fullName) : mockSignIn(email, password);
        setMockProfile(profile);
        router.replace(destination());
      } else {
        setError(
          "Email sign-in is unavailable: Supabase environment variables are missing on this server.",
        );
      }
    } catch (err: unknown) {
      const msg = formatAuthError(err);
      if (msg) setError(msg);
    } finally {
      setFormLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      if (useSupabaseAuth) {
        const supabase = createClient();
        const { error: oauthError } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${getSiteOrigin()}/auth/callback?next=${encodeURIComponent(destination())}`,
          },
        });
        if (oauthError) throw oauthError;
      } else if (process.env.NODE_ENV === "development") {
        const profile = await mockGoogleSignIn();
        setMockProfile(profile);
        router.replace(destination());
      } else {
        setError(
          "Google sign-in is unavailable: Supabase environment variables are missing on this server. Add them in Netlify → Environment variables, then redeploy.",
        );
      }
    } catch (err: unknown) {
      const msg = formatAuthError(err);
      if (msg) setError(msg);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex bg-black text-white">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 xl:px-20">
        <div className="mx-auto w-full max-w-md">
          <SiteLogo
            size={36}
            textClassName="font-heading font-bold text-lg text-white"
            className="mb-10"
          />

          <h1 className="text-2xl font-semibold tracking-tight mb-8">
            {mode === "signup" ? "Create your free account" : "Welcome back"}
          </h1>

          {error && (
            <div
              className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-5"
              role="alert"
            >
              <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
              {error}
            </div>
          )}

          {resetSent && !error && (
            <div
              className="flex items-start gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm mb-5"
              role="status"
            >
              <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" />
              Password reset link sent to <strong>{email}</strong>.
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={busy}
            className="w-full py-3 rounded-lg border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 transition-colors flex items-center justify-center gap-3 text-sm font-medium disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {googleLoading ? (
              <div className="w-4 h-4 border-2 border-neutral-500 border-t-white rounded-full animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            {googleLoading ? "Signing in with Google…" : "Continue with Google"}
          </button>

          <div className="flex items-center gap-4 my-6" aria-hidden="true">
            <div className="flex-1 h-px bg-neutral-800" />
            <span className="text-xs text-neutral-500">or</span>
            <div className="flex-1 h-px bg-neutral-800" />
          </div>

          <form onSubmit={handleAuth} className="space-y-4" noValidate autoComplete="off">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className="block text-sm text-neutral-300 mb-1.5">
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className={inputClass}
                    autoComplete="given-name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm text-neutral-300 mb-1.5">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className={inputClass}
                    autoComplete="family-name"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm text-neutral-300 mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="hh-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                readOnly={blockAutofill}
                onFocus={() => setBlockAutofill(false)}
                className={inputClass}
                autoComplete="off"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm text-neutral-300">
                  Password
                </label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs text-neutral-400 hover:text-white transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="hh-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === "signup" ? "Choose a password" : "Your password"}
                  required
                  minLength={1}
                  readOnly={blockAutofill}
                  onFocus={() => setBlockAutofill(false)}
                  className={`${inputClass} pr-10`}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={busy || !email || !password}
              className="w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-neutral-100 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {formLoading ? (
                <div className="w-4 h-4 border-2 border-neutral-400 border-t-black rounded-full animate-spin" />
              ) : mode === "signup" ? (
                "Continue with email"
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="text-sm text-neutral-400 text-center mt-8">
            {mode === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="text-white font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className="text-white font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                >
                  Create account
                </button>
              </>
            )}
          </p>

          <p className="text-xs text-neutral-600 text-center mt-6">
            By continuing, you agree to our{" "}
            <button
              type="button"
              onClick={() =>
                toast.info(
                  "Terms of Service",
                  "Full terms documentation is coming soon. Reach us at hello@historyhomeroom.com for the current draft.",
                )
              }
              className="text-neutral-400 hover:text-neutral-300 underline-offset-2 hover:underline"
            >
              Terms
            </button>{" "}
            and{" "}
            <button
              type="button"
              onClick={() =>
                toast.info(
                  "Privacy Policy",
                  "We never sell your data. Full policy documentation is coming soon.",
                )
              }
              className="text-neutral-400 hover:text-neutral-300 underline-offset-2 hover:underline"
            >
              Privacy Policy
            </button>
            .
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center p-10 xl:p-14">
        <div className="relative w-full max-w-lg aspect-[4/5] rounded-[2rem] overflow-hidden border border-neutral-800 shadow-2xl">
          <ExternalImage
            src={IMAGES.hero.libraryShowcase}
            alt="Historic library with ancient manuscripts and bookshelves"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 0px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <p className="font-heading text-2xl font-bold text-white mb-2">
              Learn history like never before
            </p>
            <p className="text-sm text-white/75 leading-relaxed">
              Live tutoring, interactive lessons, and deep dives into the most pivotal moments in human history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
