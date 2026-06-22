"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Star, Globe, Heart, ArrowRight, Sparkles, Rocket, Library, Telescope } from "lucide-react";
import Link from "next/link";
import { ExternalImage } from "@/components/shared/ExternalImage";
import { IMAGES, getTutorImagePosition } from "@/lib/images";

const TEAM = [
  {
    name: "Ayan Gupta",
    role: "Founder & Lead Tutor",
    subject: "Modern & World History",
    image: IMAGES.team.ayan,
  },
  {
    name: "Lakshay Rastogi",
    role: "Co-Founder & Curriculum Lead",
    subject: "Ancient & Classical History",
    image: IMAGES.team.lakshay,
  },
  {
    name: "Ashton Andrade",
    role: "Co-Founder & Operations Lead",
    subject: "Cultural & Political History",
    image: IMAGES.team.ashton,
  },
];

const VALUES = [
  { icon: <BookOpen size={22} className="text-white" />, title: "Depth Over Breadth", desc: "We believe in truly understanding history — not just memorizing dates, but grasping the human stories behind them." },
  { icon: <Users size={22} className="text-white" />, title: "Community-Driven", desc: "Learning is richer together. Our platform fosters collaboration between students, tutors, and history enthusiasts worldwide." },
  { icon: <Star size={22} className="text-white" />, title: "Excellence in Teaching", desc: "Every tutor on History Homeroom is a verified expert — with credentials, passion, and a gift for making history come alive." },
  { icon: <Globe size={22} className="text-white" />, title: "Inclusive Perspectives", desc: "History is told from many angles. We make sure our curriculum represents diverse voices, cultures, and experiences." },
];

const MILESTONES = [
  {
    year: "2026",
    label: "The Beginning",
    icon: <Rocket size={26} className="text-white" />,
    color: "from-amber-600 to-yellow-500",
    glow: "rgba(251,191,36,0.25)",
    event: "History Homeroom launches — founded by Ayan Gupta, Lakshay Rastogi, and Ashton Andrade with a mission to make rigorous, engaging history education accessible to every learner.",
  },
  {
    year: "2026",
    label: "Platform Live",
    icon: <Library size={26} className="text-white" />,
    color: "from-orange-600 to-amber-500",
    glow: "rgba(234,88,12,0.20)",
    event: "200+ lessons, live group sessions, 1-on-1 tutoring, and peer workshops go live — with progress tracking, quizzes, badges, and a full curriculum from day one.",
  },
  {
    year: "Ahead",
    label: "The Horizon",
    icon: <Telescope size={26} className="text-white" />,
    color: "from-yellow-500 to-gold",
    glow: "rgba(184,118,10,0.20)",
    event: "Expanding our global community of students, tutors, and history enthusiasts across every continent. The greatest chapters of History Homeroom are still to come.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,168,76,0.12),transparent)]" aria-hidden="true" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium mb-6">
              <Heart size={14} /> Our Story
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-7xl mb-6">
              We Believe History<br /><span className="gold-gradient-text">Changes Lives</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
              History Homeroom was born from a simple conviction: the most important lessons for navigating the future are found in understanding the past.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 sm:px-6 border-y border-border/50 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0 }}>
              <h2 className="font-heading font-black text-3xl sm:text-4xl mb-4">Our <span className="gold-gradient-text">Mission</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We set out to build the most engaging, accessible, and rigorous history education platform in the world. Not textbooks — living, breathing lessons taught by people who genuinely love this subject.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every lesson, every session, and every badge is designed to build critical thinking, empathy, and a deeper understanding of the human experience across time.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0 }}
              className="grid grid-cols-2 gap-4">
              {[["2026", "Launch year"], ["200+", "Lessons"], ["Live", "Tutoring & workshops"], ["Global", "Community"]].map(([val, label]) => (
                <div key={label} className="p-5 rounded-2xl border border-border bg-card text-center">
                  <p className="font-heading font-black text-3xl gold-gradient-text">{val}</p>
                  <p className="text-xs text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0 }} className="text-center mb-12">
            <h2 className="font-heading font-black text-3xl sm:text-4xl mb-3">What We <span className="gold-gradient-text">Stand For</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((val, i) => (
              <motion.div key={val.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0 }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card hover:border-gold/30 transition-all">
                <div className="w-11 h-11 rounded-xl gold-gradient flex items-center justify-center shadow-md mb-4">{val.icon}</div>
                <h3 className="font-heading font-bold text-lg mb-2">{val.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4 sm:px-6 bg-card/30 border-y border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(184,118,10,0.05),transparent)]" aria-hidden="true" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0 }} className="text-center mb-16">
            <h2 className="font-heading font-black text-3xl sm:text-4xl mb-3">Our <span className="gold-gradient-text">Journey</span></h2>
            <p className="text-muted-foreground max-w-md mx-auto text-sm">From a bold idea to a growing educational platform — here&apos;s how we got here.</p>
          </motion.div>

          {/* Desktop: horizontal stepper */}
          <div className="hidden md:flex items-start gap-0">
            {MILESTONES.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center relative">
                {/* Connector line between cards */}
                {i < MILESTONES.length - 1 && (
                  <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-gold/40 to-gold/20 z-0" aria-hidden="true" />
                )}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex flex-col items-center w-full px-4"
                >
                  {/* Icon circle */}
                  <div
                    className={`relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center shadow-xl mb-5`}
                    style={{ boxShadow: `0 8px 32px ${m.glow}` }}
                  >
                    {m.icon}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-background border border-gold/30 text-gold text-[11px] font-black whitespace-nowrap">
                      {m.year}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="w-full rounded-2xl border border-border/60 bg-background/80 backdrop-blur-sm p-5 text-center hover:border-gold/35 hover:shadow-lg hover:shadow-gold/8 transition-all duration-300 mt-2">
                    <p className="font-heading font-bold text-sm text-gold mb-2 uppercase tracking-wide">{m.label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.event}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Mobile: vertical cards */}
          <div className="flex md:hidden flex-col gap-4">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                {/* Left: icon + line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                    style={{ boxShadow: `0 4px 20px ${m.glow}` }}
                  >
                    {m.icon}
                  </div>
                  {i < MILESTONES.length - 1 && (
                    <div className="w-0.5 flex-1 min-h-6 mt-2 bg-gradient-to-b from-gold/30 to-transparent" aria-hidden="true" />
                  )}
                </div>

                {/* Right: content */}
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-heading font-black text-gold text-base">{m.year}</span>
                    <span className="text-xs text-muted-foreground font-medium">· {m.label}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0 }} className="text-center mb-12">
            <h2 className="font-heading font-black text-3xl sm:text-4xl mb-3">Meet the <span className="gold-gradient-text">Team</span></h2>
            <p className="text-muted-foreground">Historians, educators, and technologists united by a love of the past.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-tilt p-7 rounded-3xl border border-border bg-card hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10 transition-all group text-center"
              >
                <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-5 border-4 border-gold/20 group-hover:border-gold/60 transition-colors shadow-lg">
                  <ExternalImage
                    src={member.image}
                    alt={`Portrait of ${member.name}`}
                    fill
                    sizes="112px"
                    className="object-cover"
                    style={{ objectPosition: getTutorImagePosition(member.name) }}
                  />
                </div>
                <h3 className="font-heading font-bold text-lg">{member.name}</h3>
                <p className="text-sm text-gold mt-1 font-semibold">{member.role}</p>
                <p className="text-xs text-muted-foreground mt-2">{member.subject}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 bg-card/30 border-t border-border/50">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0 }} className="max-w-2xl mx-auto text-center">
          <Sparkles size={32} className="text-gold mx-auto mb-4" />
          <h2 className="font-heading font-black text-3xl sm:text-4xl mb-3">Join the History Homeroom Community</h2>
          <p className="text-muted-foreground mb-8">Start learning today — your first lessons are completely free.</p>
          <Link href="/login?signup=true" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white gold-gradient shadow-xl shadow-gold/25 hover:opacity-90 transition-opacity">
            Get Started Free <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
