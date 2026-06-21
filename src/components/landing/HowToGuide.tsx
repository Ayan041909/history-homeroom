"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { UserPlus, BookOpen, Calendar, Trophy, ArrowRight } from "lucide-react";
import { useTouchDevice } from "@/hooks/useTouchDevice";
import { useAuth } from "@/hooks/useAuth";

const STEPS = [
  {
    step: "01",
    icon: <UserPlus size={24} className="text-white" aria-hidden="true" />,
    title: "Create Your Account",
    description: "Sign up in under 60 seconds with your email or Google — no setup required.",
    color: "from-blue-600 to-blue-400",
  },
  {
    step: "02",
    icon: <BookOpen size={24} className="text-white" aria-hidden="true" />,
    title: "Explore Lessons",
    description: "Browse our library of 200+ lessons across Ancient, Modern, and World History. Start with free content or upgrade for full access.",
    color: "from-gold-dark to-gold",
  },
  {
    step: "03",
    icon: <Calendar size={24} className="text-white" aria-hidden="true" />,
    title: "Book Live Sessions",
    description: "Reserve seats in Group Tutoring, 1-on-1 sessions, or Peer Workshops. Five session slots available every day of the week.",
    color: "from-emerald-600 to-emerald-400",
  },
  {
    step: "04",
    icon: <Trophy size={24} className="text-white" aria-hidden="true" />,
    title: "Track & Earn Badges",
    description: "Monitor your progress on your dashboard. Complete lessons, pass quizzes, and earn badges to showcase your historical expertise.",
    color: "from-purple-600 to-purple-400",
  },
];

export function HowToGuide() {
  const isTouch = useTouchDevice();
  const { profile } = useAuth();
  const journeyHref = profile ? "/home" : "/login?signup=true";
  return (
    <section id="guide" className="py-24 px-4 sm:px-6  relative overflow-hidden" aria-label="How to use History Homeroom">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(184,118,10,0.04),transparent)]" aria-hidden="true" />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={isTouch ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Up and Running in{" "}
            <span className="gold-gradient-text">4 Simple Steps</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            History Homeroom is designed to be intuitive. Here is everything you need to know to get started today.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold/30 via-gold/20 to-transparent -translate-x-1/2" aria-hidden="true" />

          <div className="space-y-10 lg:space-y-12">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={isTouch ? false : { opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-6 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Content */}
                <div className="flex-1 w-full">
                  <div className={`p-6 rounded-2xl glass hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 ${i % 2 === 1 ? "lg:text-right" : ""}`}>
                    <div className={`flex items-center gap-3 mb-3 ${i % 2 === 1 ? "lg:justify-end" : ""}`}>
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                        {step.icon}
                      </div>
                      <span className="font-heading text-4xl font-black gold-gradient-text opacity-80">{step.step}</span>
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-2 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed font-medium">{step.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden lg:flex flex-shrink-0 w-12 h-12 rounded-full gold-gradient items-center justify-center shadow-lg shadow-gold/30 z-10" aria-hidden="true">
                  <span className="font-heading font-black text-white text-sm">{step.step}</span>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={isTouch ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href={journeyHref}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white gold-gradient shadow-xl shadow-gold/30 hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            aria-label="Begin your history learning journey"
          >
            {profile ? "Go to Dashboard" : "Begin Your Journey"}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
