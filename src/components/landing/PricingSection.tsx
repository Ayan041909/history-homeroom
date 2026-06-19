"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Zap, Crown, BookOpen, Gift } from "lucide-react";
import { useTouchDevice } from "@/hooks/useTouchDevice";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    icon: <BookOpen size={20} className="text-white" />,
    color: "from-zinc-600 to-zinc-500",
    description: "Perfect to get started and explore History Homeroom.",
    features: [
      "Access to 10 free lessons",
      "Community forums",
      "Basic quizzes",
      "Historical event timeline",
      "Mobile-friendly access",
    ],
    cta: "Get Started Free",
    href: "/login?signup=true",
    highlighted: false,
  },
  {
    id: "plus",
    name: "Plus",
    price: 9.99,
    icon: <Zap size={20} className="text-white" />,
    color: "from-gold-dark to-gold",
    description: "Unlock the full library with group tutoring and priority access.",
    features: [
      "Everything in Free",
      "Full lesson library (200+)",
      "Group Tutoring sessions",
      "Priority session booking",
      "Progress tracking & badges",
      "Peer Workshop access",
      "Download study guides",
    ],
    cta: "Start Plus Trial",
    href: "/login?signup=true&plan=plus",
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 19.99,
    icon: <Crown size={20} className="text-white" />,
    color: "from-amber-700 to-amber-500",
    description: "The ultimate learning experience with unlimited 1-on-1 tutoring.",
    features: [
      "Everything in Plus",
      "Unlimited 1-on-1 Tutoring",
      "Exclusive premium content",
      "Direct tutor messaging",
      "Custom study plans",
      "Certificate of completion",
      "Early access to new content",
    ],
    cta: "Start Premium Trial",
    href: "/login?signup=true&plan=premium",
    highlighted: false,
  },
];

export function PricingSection() {
  const isTouch = useTouchDevice();
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 relative overflow-hidden" aria-label="Pricing plans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(184,118,10,0.04),transparent)]" aria-hidden="true" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={isTouch ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Choose Your <span className="gold-gradient-text">Learning Path</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Start free, upgrade when ready. Every plan includes a full 1-week free trial.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full glass">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!annual ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              aria-pressed={!annual}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${annual ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              aria-pressed={annual}
            >
              Annual
              <span className="px-1.5 py-0.5 rounded-full bg-gold/20 text-gold text-xs font-bold">-20%</span>
            </button>
          </div>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pt-6 md:pt-2">
          {PLANS.map((plan, i) => {
            const displayPrice = annual && plan.price > 0
              ? (plan.price * 0.8).toFixed(2)
              : plan.price.toFixed(2);

            return (
              <motion.div
                key={plan.id}
                initial={isTouch ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-3xl flex flex-col p-6 transition-all duration-300 glass ${
                  plan.highlighted ? "md:scale-[1.03] glass-gold" : "hover:shadow-lg"
                }`}
                style={plan.highlighted ? {
                  boxShadow: "0 2px 0 rgba(255,255,255,0.85) inset, 0 8px 36px rgba(184,118,10,0.14), 0 0 0 1px rgba(184,118,10,0.18) inset"
                } : {}}
                aria-label={`${plan.name} plan — $${displayPrice} per month`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-white text-xs font-bold tracking-wide uppercase whitespace-nowrap"
                    style={{ background: "linear-gradient(135deg, #B45309, #D97706, #F59E0B)", boxShadow: "0 2px 16px rgba(217,119,6,0.5)" }}>
                    Most Popular
                  </div>
                )}

                {/* Plan Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-md`}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground font-medium">{plan.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-heading font-black gold-gradient-text">
                      ${displayPrice === "0.00" ? "0" : displayPrice}
                    </span>
                    <span className="text-muted-foreground text-sm font-medium">/month</span>
                  </div>
                  {annual && plan.price > 0 && (
                    <p className="text-xs text-green-500 mt-0.5">
                      Save ${(plan.price * 0.2 * 12).toFixed(0)}/year
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 flex-1 mb-6" role="list" aria-label={`${plan.name} features`}>
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm font-medium text-foreground/90">
                      <Check size={15} className="text-gold mt-0.5 flex-shrink-0" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={plan.href}
                  className={`block text-center py-3 px-6 rounded-full font-semibold text-sm transition-all focus-visible:ring-2 focus-visible:ring-gold ${
                    plan.highlighted
                      ? "gold-gradient text-white shadow-lg shadow-gold/25 hover:opacity-90"
                      : "glass hover:border-gold/40"
                  }`}
                  aria-label={`${plan.cta} — ${plan.name} plan`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Free Trial Banner */}
        <motion.div
          initial={isTouch ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-3 p-4 rounded-3xl glass-gold"
          role="note"
          aria-label="Free trial information"
        >
          <Gift size={18} className="text-gold flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-center">
            <span className="font-bold text-gold">1-Week Free Trial</span> on all paid plans. No credit card required. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
