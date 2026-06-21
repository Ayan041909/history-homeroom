"use client";

import { ExternalImage } from "@/components/shared/ExternalImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, GraduationCap, Users, ArrowRight } from "lucide-react";
import { FEATURED_TUTORS } from "@/lib/mockData";
import { getTutorImagePosition } from "@/lib/images";
import { useTouchDevice } from "@/hooks/useTouchDevice";
import { useAuth } from "@/hooks/useAuth";

export function FeaturedTutors() {
  const isTouch = useTouchDevice();
  const { profile } = useAuth();
  const bookHref = profile ? "/home" : "/login?signup=true";
  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden" aria-label="Featured tutors">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(184,118,10,0.07),transparent)]" aria-hidden="true" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={isTouch ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-gold/30 bg-gold/8 text-gold">
              <GraduationCap size={12} aria-hidden="true" /> Meet the Faculty
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black mb-2">
              Tutors Who Truly{" "}
              <span className="gold-gradient-text">Live & Breathe</span> History
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Every tutor is vetted, credentialed, and obsessed with their subject. Pick a class — pick a person.
            </p>
          </div>
          <Link
            href="/about"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gold/40 hover:border-gold/70 hover:bg-gold/8 text-sm font-semibold transition-colors"
          >
            See full team <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_TUTORS.map((tutor, i) => (
            <motion.article
              key={tutor.id}
              initial={isTouch ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-tilt group relative rounded-2xl overflow-hidden border border-border/60 bg-card hover:border-gold/40 hover:shadow-xl hover:shadow-gold/10 transition-all"
            >
              {/* Portrait */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gold/10 via-card to-card">
                <ExternalImage
                  src={tutor.image}
                  alt={`Portrait of ${tutor.name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ objectPosition: getTutorImagePosition(tutor.name) }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full gold-gradient text-white text-[10px] font-bold uppercase tracking-wider shadow">
                  Verified Tutor
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-heading font-bold text-white text-lg leading-tight">{tutor.name}</h3>
                  <p className="text-gold text-xs font-medium">{tutor.specialty}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <p className="text-xs text-muted-foreground leading-relaxed mb-4 min-h-[3rem]">{tutor.bio}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-gold fill-gold" aria-hidden="true" /> {tutor.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} aria-hidden="true" /> {tutor.students.toLocaleString()} students
                  </span>
                </div>
                <Link
                  href={bookHref}
                  className="w-full block text-center py-3 min-h-[44px] rounded-xl text-xs font-bold border border-gold/40 hover:border-gold/70 hover:bg-gold/8 transition-colors focus-visible:ring-2 focus-visible:ring-gold touch-manipulation"
                >
                  Book a Session
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <Link
          href="/about"
          className="mt-8 inline-flex sm:hidden items-center gap-2 px-5 py-2.5 rounded-xl border border-gold/40 hover:border-gold/70 hover:bg-gold/8 text-sm font-semibold transition-colors"
        >
          See full team <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
