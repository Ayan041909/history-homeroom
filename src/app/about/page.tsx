"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Star, Globe, Heart, ArrowRight, Sparkles } from "lucide-react";
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
  { year: "2026", event: "History Homeroom launches — founded by Ayan Gupta, Lakshay Rastogi, and Ashton Andrade to make rigorous, engaging history education accessible to learners everywhere." },
  { year: "2026", event: "Opening the lesson library and live tutoring: group sessions, 1-on-1s, and peer workshops — with progress tracking and badges from day one." },
  { year: "Ahead", event: "Building our global community of students, tutors, and history enthusiasts — this is just the beginning of the journey." },
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
      <section className="py-20 px-4 sm:px-6 bg-card/30 border-y border-border/50">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0 }} className="text-center mb-12">
            <h2 className="font-heading font-black text-3xl sm:text-4xl mb-3">Our <span className="gold-gradient-text">Journey</span></h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold/40 to-transparent -translate-x-0.5" aria-hidden="true" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <motion.div key={`journey-${i}`} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0 }} transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 pl-10 sm:pl-0">
                  <div className="absolute left-2 sm:left-1/2 sm:-translate-x-1/2 w-4 h-4 rounded-full gold-gradient shadow-md mt-1 flex-shrink-0" aria-hidden="true" />
                  <div className={`flex-1 ${i % 2 === 0 ? "sm:pr-8 sm:text-right sm:pl-0" : "sm:pl-8"}`}>
                    <span className="font-heading font-black text-gold text-lg">{m.year}</span>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
