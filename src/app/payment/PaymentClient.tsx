"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Lock, Check, Zap, Crown, Shield, ArrowRight, Gift } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { updateUserSubscription, profileFromAuthUser } from "@/lib/firestore";
import { updateMockSubscriptionFields } from "@/lib/mockAuth";
import {
  canStartTrial,
  startTrial,
  upgradeToPaid,
  subscriptionFieldsFromRecord,
  TRIAL_DURATION_MS,
} from "@/lib/subscriptionCache";
import type { SubscriptionTier } from "@/types";

const PLANS = [
  {
    id: "plus",
    name: "Plus",
    price: 9.99,
    annualPrice: 7.99,
    icon: <Zap size={20} className="text-white" />,
    color: "gold-gradient",
    features: ["Full lesson library (200+)", "Group Tutoring sessions", "Priority booking", "Progress tracking & badges", "Peer Workshop access", "Download study guides"],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 19.99,
    annualPrice: 15.99,
    icon: <Crown size={20} className="text-white" />,
    color: "bg-gradient-to-br from-amber-700 to-amber-500",
    features: ["Everything in Plus", "Unlimited 1-on-1 Tutoring", "Exclusive premium content", "Direct tutor messaging", "Custom study plans", "Certificate of completion", "Early access to new content"],
  },
];

export function PaymentClient() {
  const router = useRouter();
  const params = useSearchParams();
  const { user, profile, setMockProfile } = useAuth();

  const initialPlan = params.get("plan");
  const [selectedPlan, setSelectedPlan] = useState(
    initialPlan === "plus" || initialPlan === "premium" ? initialPlan : "plus",
  );
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [step, setStep] = useState<"plan" | "checkout">("plan");
  const [form, setForm] = useState({ name: "", email: "", card: "", expiry: "", cvv: "" });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [completedTrialEnd, setCompletedTrialEnd] = useState<string | null>(null);
  const [completedAsPaid, setCompletedAsPaid] = useState(false);

  const authenticated = !!profile;

  useEffect(() => {
    if (profile?.email && !form.email) {
      setForm((f) => ({ ...f, email: profile.email, name: profile.name ?? f.name }));
    }
  }, [profile, form.email]);

  useEffect(() => {
    const plan = params.get("plan");
    if (plan === "plus" || plan === "premium") setSelectedPlan(plan);
  }, [params]);

  const plan = PLANS.find((p) => p.id === selectedPlan)!;
  const price = billing === "annual" ? plan.annualPrice : plan.price;

  const trialEligible = profile ? canStartTrial(profile.uid) : true;

  const trialEndDate = useMemo(() => {
    if (profile?.trialEndsAt) return new Date(profile.trialEndsAt);
    // eslint-disable-next-line react-hooks/purity
    return new Date(Date.now() + TRIAL_DURATION_MS);
  }, [profile?.trialEndsAt]);
  const trialEndLong = trialEndDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const trialEndShort = trialEndDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  const formatCard = (val: string) => val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!authenticated) {
      router.push(`/login?redirect=${encodeURIComponent(`/payment?plan=${selectedPlan}`)}`);
      return;
    }

    setProcessing(true);
    try {
      const tier = selectedPlan as SubscriptionTier;
      const baseProfile = profile ?? (user ? profileFromAuthUser(user) : null);

      if (!baseProfile) {
        throw new Error("You must be signed in to upgrade your plan.");
      }

      const record = trialEligible
        ? startTrial(baseProfile.uid, tier)
        : upgradeToPaid(baseProfile.uid, tier);
      const subFields = subscriptionFieldsFromRecord(record);
      const updatedProfile = { ...baseProfile, ...subFields };

      setMockProfile(updatedProfile);
      setCompletedTrialEnd(record.trialEndsAt);
      setCompletedAsPaid(record.isPaid);

      if (isSupabaseConfigured() && user) {
        void updateUserSubscription(user.id, {
          subscription: subFields.subscription,
          trialEndsAt: subFields.trialEndsAt ?? null,
          subscriptionIsPaid: subFields.subscriptionIsPaid ?? false,
          trialUsed: subFields.trialUsed ?? true,
        });
      } else {
        updateMockSubscriptionFields(subFields);
      }

      await new Promise((r) => setTimeout(r, 800));
      setDone(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not update your subscription.";
      setError(msg);
    } finally {
      setProcessing(false);
    }
  };

  const handleContinueToCheckout = () => {
    if (!authenticated) {
      router.push(`/login?redirect=${encodeURIComponent(`/payment?plan=${selectedPlan}`)}`);
      return;
    }
    setStep("checkout");
  };

  if (done) {
    return (
      <div className="min-h-screen bg-background pt-16 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full text-center p-10 rounded-3xl border border-gold/30 bg-card shadow-2xl">
          <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gold/30">
            <Check size={36} className="text-white" />
          </div>
          <h1 className="font-heading font-black text-3xl mb-3">You&apos;re all set!</h1>
          <p className="text-muted-foreground mb-2">Welcome to <span className="text-gold font-semibold">{plan.name}</span>.</p>
          <p className="text-muted-foreground text-sm mb-8">
            {completedAsPaid
              ? "Your subscription is active. Enjoy full access to everything in your plan."
              : `Your 1-week free trial has started. You won't be charged until ${completedTrialEnd ? new Date(completedTrialEnd).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : trialEndLong}.`}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/home" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white gold-gradient hover:opacity-90 transition-opacity shadow-lg shadow-gold/25">
              Start Learning <ArrowRight size={16} />
            </Link>
            <Link href="/profile?tab=subscription" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold border border-gold/40 text-gold hover:bg-gold/10 transition-colors">
              View Subscription
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="relative py-14 px-4 sm:px-6 overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(201,168,76,0.08),transparent)]" aria-hidden="true" />
        <div className="max-w-2xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium mb-5">
              <Gift size={14} /> 1-Week Free Trial on Every Plan
            </div>
            <h1 className="font-heading font-black text-4xl sm:text-5xl mb-3">
              Upgrade Your <span className="gold-gradient-text">Learning</span>
            </h1>
            <p className="text-muted-foreground">No credit card required during trial. Cancel anytime.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <AnimatePresence mode="wait">
          {step === "plan" && (
            <motion.div key="plan" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <div className="flex items-center justify-center gap-3 mb-10">
                <div className="flex p-1 rounded-xl bg-muted border border-border">
                  {(["monthly", "annual"] as const).map((b) => (
                    <button key={b} onClick={() => setBilling(b)}
                      className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${billing === b ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                      {b === "monthly" ? "Monthly" : "Annual"}
                      {b === "annual" && <span className="ml-1.5 px-1.5 py-0.5 rounded bg-gold/20 text-gold text-xs font-bold">-20%</span>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {PLANS.map((p) => (
                  <motion.button
                    key={p.id}
                    onClick={() => setSelectedPlan(p.id)}
                    whileHover={{ y: -3 }}
                    className={`relative p-7 rounded-2xl border-2 text-left transition-all focus-visible:ring-2 focus-visible:ring-gold ${
                      selectedPlan === p.id ? "border-gold shadow-xl shadow-gold/15 bg-gold/3" : "border-border bg-card hover:border-gold/40"
                    }`}
                  >
                    {p.popular && (
                      <div className="absolute -top-3 left-6 px-3 py-1 rounded-full gold-gradient text-white text-xs font-bold shadow">Most Popular</div>
                    )}
                    {selectedPlan === p.id && (
                      <div className="absolute top-5 right-5 w-6 h-6 rounded-full gold-gradient flex items-center justify-center">
                        <Check size={13} className="text-white" />
                      </div>
                    )}
                    <div className={`w-12 h-12 rounded-xl ${p.color} flex items-center justify-center shadow-md mb-4`}>{p.icon}</div>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-4xl font-heading font-black gold-gradient-text">${billing === "annual" ? p.annualPrice : p.price}</span>
                      <span className="text-muted-foreground text-sm">/mo</span>
                    </div>
                    <p className="font-heading font-bold text-xl mb-4">{p.name}</p>
                    <ul className="space-y-2">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check size={14} className="text-gold mt-0.5 flex-shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </motion.button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-muted/50 border border-border mb-8">
                <div className="flex items-center gap-3 text-sm">
                  <Shield size={18} className="text-gold flex-shrink-0" />
                  <span>Secured by Stripe · 256-bit SSL encryption · Cancel anytime</span>
                </div>
                <span className="text-gold font-semibold text-sm">7-day free trial</span>
              </div>

              <button
                onClick={handleContinueToCheckout}
                className="w-full py-4 rounded-2xl font-bold text-lg text-white gold-gradient shadow-xl shadow-gold/25 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-gold"
              >
                Continue to Checkout <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

          {step === "checkout" && (
            <motion.div key="checkout" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                  <button onClick={() => setStep("plan")} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-6 transition-colors">
                    ← Back to plans
                  </button>
                  <h2 className="font-heading font-bold text-2xl mb-6">Payment Details</h2>

                  {error && (
                    <div className="mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                      {error}
                    </div>
                  )}

                  <p className="mb-4 text-xs text-muted-foreground rounded-xl border border-border/60 bg-muted/40 px-3 py-2">
                    Demo checkout — no real charge. Your account will be upgraded to{" "}
                    <span className="font-semibold text-foreground">{plan.name}</span> after you submit.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium mb-1.5">Full Name</label>
                      <input type="text" placeholder="Name on card" required value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5">Email</label>
                      <input type="email" placeholder="your@email.com" required value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5 flex items-center gap-1.5">
                        <CreditCard size={13} /> Card Number
                      </label>
                      <input type="text" placeholder="1234 5678 9012 3456" required value={form.card}
                        onChange={(e) => setForm((f) => ({ ...f, card: formatCard(e.target.value) }))}
                        className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors font-mono tracking-wider" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1.5">Expiry</label>
                        <input type="text" placeholder="MM/YY" required value={form.expiry}
                          onChange={(e) => setForm((f) => ({ ...f, expiry: formatExpiry(e.target.value) }))}
                          className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors font-mono" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5">CVV</label>
                        <input type="text" placeholder="123" required value={form.cvv} maxLength={4}
                          onChange={(e) => setForm((f) => ({ ...f, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                          className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors font-mono" />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 text-xs text-muted-foreground">
                      <Lock size={13} className="text-gold flex-shrink-0" />
                      Your payment is encrypted and secured by Stripe. We never store your card details.
                    </div>

                    <button type="submit" disabled={processing}
                      className="w-full py-4 rounded-2xl font-bold text-lg text-white gold-gradient shadow-xl shadow-gold/25 hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
                      {processing
                        ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                        : <><Lock size={16} /> {trialEligible ? "Start Free Trial" : "Subscribe Now"}</>
                      }
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-2">
                  <div className="sticky top-24 p-6 rounded-2xl border border-border bg-card shadow-lg">
                    <h3 className="font-heading font-bold text-lg mb-4">Order Summary</h3>
                    <div className={`w-10 h-10 rounded-xl ${plan.color} flex items-center justify-center shadow-md mb-4`}>{plan.icon}</div>
                    <p className="font-heading font-bold text-xl mb-1">{plan.name} Plan</p>
                    <p className="text-muted-foreground text-sm mb-6">{billing === "annual" ? "Billed annually" : "Billed monthly"}</p>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{plan.name} ({billing})</span>
                        <span>${price}/mo</span>
                      </div>
                      <div className="flex justify-between text-green-500">
                        <span>7-day free trial</span>
                        <span>-${price}</span>
                      </div>
                      <div className="h-px bg-border my-3" />
                      <div className="flex justify-between font-bold">
                        <span>Due today</span>
                        <span className="text-gold">$0.00</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Then ${price}/mo starting {trialEndShort}</p>
                    </div>

                    <div className="space-y-2">
                      {["Cancel anytime, no fees", "Full access during trial", "Secure Stripe checkout"].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Check size={12} className="text-gold" /> {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
