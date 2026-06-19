"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, Sparkles } from "lucide-react";
import { useTouchDevice } from "@/hooks/useTouchDevice";

export function NewsletterCTA() {
  const isTouch = useTouchDevice();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email address.");
      return;
    }
    if (!trimmed.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Could not connect. Please check your internet and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="px-4 sm:px-6 py-20 relative overflow-hidden" aria-label="Newsletter sign-up">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={isTouch ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-8 sm:p-12 text-center glass-gold"
        >
          {/* Specular top accent */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }}
            aria-hidden="true" />
          {/* Ambient orb */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full blur-3xl pointer-events-none opacity-40" style={{ background: "radial-gradient(ellipse, rgba(184,118,10,0.5), transparent)" }} aria-hidden="true" />

          <Sparkles size={26} className="text-gold mx-auto mb-3 animate-float" aria-hidden="true" />
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black mb-3">
            Get a New Lesson <span className="gold-shimmer-text">Every Sunday</span>
          </h2>
          <p className="max-w-xl mx-auto mb-6 text-muted-foreground">
            Be among the first to read our weekly digest — a hand-picked deep dive, an interactive quiz, and your week in history.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30 font-semibold"
              role="status"
            >
              <CheckCircle2 size={18} /> You&apos;re in! Check your inbox to confirm.
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-2"
              aria-label="Newsletter sign-up form"
            >
              <div className="relative flex-1">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
              <input
                type="email"
                id="newsletter-email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@school.edu"
                className="w-full pl-11 pr-4 py-3.5 rounded-full text-sm transition-colors focus:outline-none placeholder:text-muted-foreground glass"
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(184,118,10,0.50)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "")}
                aria-label="Your email address"
                aria-invalid={!!error}
                aria-describedby={error ? "newsletter-error" : undefined}
              />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3.5 rounded-full text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60 transition-opacity focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 whitespace-nowrap"
                style={{ background: "linear-gradient(135deg, #8E5908, #B8760A, #D98A0E)", boxShadow: "0 4px 20px rgba(184,118,10,0.35), 0 1px 0 rgba(255,255,255,0.25) inset" }}
              >
                {submitting ? "Subscribing…" : <>Subscribe <Send size={14} /></>}
              </button>
            </form>
          )}

          {error && (
            <p id="newsletter-error" className="mt-3 text-xs text-destructive" role="alert">
              {error}
            </p>
          )}

          <p className="mt-4 text-xs" style={{ color: "rgba(148,163,184,0.7)" }}>
            No spam, ever. Unsubscribe anytime in one click.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
