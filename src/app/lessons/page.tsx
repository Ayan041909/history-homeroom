"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Play, Clock, Users, Star, Lock, Search, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { ExternalImage } from "@/components/shared/ExternalImage";
import { useToast } from "@/components/shared/Toast";
import { useAuth } from "@/hooks/useAuth";
import {
  canAccessLesson,
  hasPlusLessonAccess,
  hasPremiumLessonAccess,
} from "@/lib/subscriptionAccess";
import {
  LESSON_CATALOG,
  LESSON_SUBJECTS,
  LESSON_LEVELS,
  FREE_LESSON_COUNT,
  PLUS_ACCESSIBLE_COUNT,
  PREMIUM_EXCLUSIVE_COUNT,
  TOTAL_LESSON_TARGET,
  type LessonCard,
} from "@/lib/lessonCatalog";
import { IMAGES } from "@/lib/images";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import type { SubscriptionTier } from "@/types";

/**
 * Portrait-oriented Wikimedia images that render poorly centered inside the
 * 160 px-tall card container. Shift their object-position to the top so the
 * subject (face / figure) stays visible.
 */
const PORTRAIT_THUMBNAILS = new Set<string>([
  IMAGES.lessons.daVinci,        // Mona Lisa — tall portrait
  IMAGES.lessons.decolonization, // Gandhi studio portrait
  IMAGES.figures.napoleon,       // full-body Napoleonic portrait
  IMAGES.figures.cleopatra,      // Cleopatra bust (tall)
  IMAGES.figures.leonardo,       // Leonardo portrait
  IMAGES.figures.lincoln,        // Lincoln portrait
]);

const PAGE_SIZE = 24;

function countAccessible(subscription: SubscriptionTier | undefined): number {
  return LESSON_CATALOG.filter((l) => canAccessLesson(subscription, l)).length;
}

// ─── Progress-aware card ──────────────────────────────────────────────────────

function LessonCardItem({
  lesson,
  unlocked,
  onUnlock,
  i,
}: {
  lesson: LessonCard;
  unlocked: boolean;
  onUnlock: (lesson: LessonCard) => void;
  i: number;
}) {
  const { user } = useAuth();
  const prog = useLessonProgress(lesson.id);
  const [hoveringBar, setHoveringBar] = useState(false);

  const TIER_BADGES: Record<LessonCard["tier"], { label: string; className: string }> = {
    free: { label: "FREE", className: "bg-green-500 text-white" },
    plus: { label: "PLUS", className: "bg-gold/90 text-white" },
    premium: { label: "PREMIUM", className: "bg-amber-700 text-white" },
  };
  const LEVEL_COLORS: Record<string, string> = {
    Beginner: "text-green-500 bg-green-500/10",
    Intermediate: "text-blue-500 bg-blue-500/10",
    Advanced: "text-purple-500 bg-purple-500/10",
  };

  const badge = TIER_BADGES[lesson.tier];
  const unlockLabel = lesson.tier === "premium" ? "Unlock with Premium" : "Unlock with Plus";

  const inProgress = prog.started && !prog.completed && prog.progress > 0;
  const completed = prog.completed;

  return (
    <motion.div
      key={lesson.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3) }}
      className="rounded-2xl border border-border bg-card hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 transition-all duration-300 group overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden bg-muted">
        <ExternalImage
          src={lesson.thumbnail}
          alt={`Thumbnail for ${lesson.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          style={{ objectPosition: PORTRAIT_THUMBNAILS.has(lesson.thumbnail) ? "center 12%" : "center 40%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Lock icon */}
        {!unlocked && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm">
            <Lock size={14} className="text-gold" />
          </div>
        )}

        {/* Completed badge overlay */}
        {completed && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-bold">
            <CheckCircle2 size={10} /> Completed
          </div>
        )}

        {/* Tier badge */}
        {(unlocked || !hasPlusLessonAccess(undefined)) && (
          <div className={`absolute top-3 ${unlocked && !completed ? "right-3" : "right-12"} px-2 py-0.5 rounded-full text-[10px] font-bold ${badge.className}`}>
            {badge.label}
          </div>
        )}

        {/* Level */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${LEVEL_COLORS[lesson.level]}`}>
            {lesson.level}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gold font-medium mb-1">{lesson.subject}</p>
        <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-gold transition-colors">{lesson.title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-3 line-clamp-2">{lesson.description}</p>

        {/* Meta row */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1"><Clock size={11} /> {lesson.duration}</span>
          <span className="flex items-center gap-1"><Users size={11} /> {lesson.students.toLocaleString()}</span>
          <span className="flex items-center gap-1"><Star size={11} className="text-gold" /> {lesson.rating}</span>
        </div>

        {/* Action area */}
        {!unlocked ? (
          <button
            type="button"
            onClick={() => onUnlock(lesson)}
            className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-gold/40 text-gold hover:bg-gold/8 focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Lock size={12} /> {unlockLabel}
          </button>
        ) : completed ? (
          <Link
            href={`/lessons/${lesson.id}`}
            className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all glass border-green-500/30 text-green-500 hover:border-green-500/60"
          >
            <CheckCircle2 size={12} /> Review Lesson
          </Link>
        ) : inProgress ? (
          /* ─── Progress bar + hover-continue ─── */
          <div
            className="relative h-9 rounded-xl overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveringBar(true)}
            onMouseLeave={() => setHoveringBar(false)}
            onTouchStart={() => setHoveringBar(true)}
            onTouchEnd={() => setHoveringBar(false)}
          >
            {/* Track */}
            <div className="absolute inset-0 bg-black/10 dark:bg-white/10 rounded-xl" />
            {/* Fill */}
            <motion.div
              className="absolute inset-y-0 left-0 rounded-xl"
              style={{ background: "linear-gradient(90deg, #8E5908, #B8760A, #D98A0E)" }}
              initial={{ width: 0 }}
              animate={{ width: `${prog.progress}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            {/* Percentage label / Continue button */}
            <AnimatePresence mode="wait">
              {hoveringBar ? (
                <Link
                  key="continue"
                  href={`/lessons/${lesson.id}`}
                  className="absolute inset-0 flex items-center justify-center gap-1.5 text-xs font-bold text-white z-10"
                >
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-1.5"
                  >
                    <Play size={11} /> Continue
                  </motion.span>
                </Link>
              ) : (
                <motion.div
                  key="pct"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                >
                  <span
                    className={`text-xs font-bold ${prog.progress > 50 ? "text-white" : "text-foreground"}`}
                  >
                    {prog.progress}%
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Not started — Start Lesson */
          <Link
            href={`/lessons/${lesson.id}`}
            className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all gold-gradient text-white hover:opacity-90 shadow-md focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Play size={12} /> Start Lesson
          </Link>
        )}
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LessonsPage() {
  const [subject, setSubject] = useState("All");
  const [level, setLevel] = useState("All Levels");
  // Pre-populate search from URL query param so the Events page can deep-link
  // into a filtered view (e.g. /lessons?search=renaissance).
  const [search, setSearch] = useState("");
  useEffect(() => {
    const urlSearch = new URLSearchParams(window.location.search).get("search") ?? "";
    if (urlSearch) {
      setSearch(urlSearch);
      setPage(1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [freeOnly, setFreeOnly] = useState(false);
  const [page, setPage] = useState(1);
  const toast = useToast();
  const { profile } = useAuth();
  const subscription = profile?.subscription ?? "free";
  const plusAccess = hasPlusLessonAccess(subscription);
  const premiumAccess = hasPremiumLessonAccess(subscription);

  const handleUnlock = (lesson: LessonCard) => {
    if (lesson.tier === "premium") {
      toast.info("Premium required", `"${lesson.title}" is exclusive to Premium — ${PREMIUM_EXCLUSIVE_COUNT} advanced lessons total.`);
      return;
    }
    toast.info("Plus required", `Unlock "${lesson.title}" and ${PLUS_ACCESSIBLE_COUNT - FREE_LESSON_COUNT}+ more lessons with Plus.`);
  };

  const lessonAccessible = (lesson: LessonCard) => canAccessLesson(subscription, lesson);

  const filtered = useMemo(() => {
    return LESSON_CATALOG.filter((l) => {
      if (subject !== "All" && l.subject !== subject) return false;
      if (level !== "All Levels" && l.level !== level) return false;
      if (freeOnly && l.tier !== "free") return false;
      if (search) {
        const q = search.toLowerCase();
        const hay = `${l.title} ${l.subject} ${l.description ?? ""}`.toLowerCase();
        // Support multi-word event searches: match if the full phrase OR any
        // individual token appears in the lesson title/subject/description.
        const tokens = q.split(/\s+/).filter((t) => t.length > 1);
        const matches = hay.includes(q) || tokens.some((t) => hay.includes(t));
        if (!matches) return false;
      }
      return true;
    });
  }, [subject, level, freeOnly, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageLessons = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const accessibleCount = countAccessible(subscription);

  const resetFilters = (next: Partial<{ subject: string; level: string; freeOnly: boolean; search: string }>) => {
    if (next.subject !== undefined) setSubject(next.subject);
    if (next.level !== undefined) setLevel(next.level);
    if (next.freeOnly !== undefined) setFreeOnly(next.freeOnly);
    if (next.search !== undefined) setSearch(next.search);
    setPage(1);
  };

  const heroSubtitle = premiumAccess
    ? `You have full access to all ${TOTAL_LESSON_TARGET}+ lessons, including ${PREMIUM_EXCLUSIVE_COUNT} Premium exclusives.`
    : plusAccess
      ? `${accessibleCount} lessons unlocked on Plus — upgrade to Premium for ${PREMIUM_EXCLUSIVE_COUNT} exclusive advanced lessons.`
      : `${FREE_LESSON_COUNT} lessons are free on your plan — upgrade to Plus for ${PLUS_ACCESSIBLE_COUNT}+ lessons.`;

  const heroDetail = premiumAccess
    ? `Showing ${filtered.length} lessons · all unlocked`
    : plusAccess
      ? `${accessibleCount} unlocked · ${PREMIUM_EXCLUSIVE_COUNT} Premium exclusives still locked`
      : `${accessibleCount} unlocked · ${PLUS_ACCESSIBLE_COUNT - FREE_LESSON_COUNT}+ more with Plus · ${PREMIUM_EXCLUSIVE_COUNT} Premium exclusives`;

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="relative py-16 px-4 sm:px-6 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(201,168,76,0.08),transparent)]" aria-hidden="true" />
        <div className="max-w-3xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium mb-5">
              <BookOpen size={14} /> {TOTAL_LESSON_TARGET}+ Lessons in the Library
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl mb-3">
              The <span className="gold-gradient-text">Full Lesson</span> Library
            </h1>
            <p className="text-muted-foreground text-lg mb-2">{heroSubtitle}</p>
            <p className="text-sm text-muted-foreground mb-8">{heroDetail}</p>
            <div className="relative max-w-lg mx-auto">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search lessons..."
                value={search}
                onChange={(e) => resetFilters({ search: e.target.value })}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-card border border-border focus:border-gold/60 focus:outline-none text-sm shadow-sm transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {LESSON_SUBJECTS.map((s) => (
              <button
                key={s}
                onClick={() => resetFilters({ subject: s })}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  subject === s ? "gold-gradient text-white shadow" : "border border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="h-6 w-px bg-border hidden sm:block" />
          <select
            value={level}
            onChange={(e) => resetFilters({ level: e.target.value })}
            className="px-3 py-1.5 rounded-xl text-sm border border-border bg-background focus:border-gold/60 focus:outline-none"
          >
            {LESSON_LEVELS.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <button
            onClick={() => resetFilters({ freeOnly: !freeOnly })}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all border ${
              freeOnly ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground hover:border-gold/40"
            }`}
          >
            Free Only
          </button>
          <span className="text-xs text-muted-foreground ml-auto">
            {filtered.length} lesson{filtered.length !== 1 ? "s" : ""}
            {filtered.length > PAGE_SIZE && ` · page ${safePage} of ${totalPages}`}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <BookOpen size={40} className="mx-auto mb-4 opacity-40" />
            <p className="font-semibold">No lessons match your filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pageLessons.map((lesson, i) => (
                <LessonCardItem
                  key={lesson.id}
                  lesson={lesson}
                  unlocked={lessonAccessible(lesson)}
                  onUnlock={handleUnlock}
                  i={i}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-10">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage <= 1}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-border text-sm font-medium disabled:opacity-40 hover:border-gold/40 transition-colors"
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <span className="text-sm text-muted-foreground">
                  Page {safePage} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage >= totalPages}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-border text-sm font-medium disabled:opacity-40 hover:border-gold/40 transition-colors"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}

        {subscription === "free" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            className="mt-16 p-8 rounded-3xl border border-gold/20 bg-gold/3 text-center"
          >
            <h2 className="font-heading font-bold text-2xl mb-2">Unlock {PLUS_ACCESSIBLE_COUNT - FREE_LESSON_COUNT}+ More Lessons</h2>
            <p className="text-muted-foreground mb-6">
              Your free plan includes {FREE_LESSON_COUNT} lessons. Upgrade to Plus for {PLUS_ACCESSIBLE_COUNT}+ lessons, or Premium for {PREMIUM_EXCLUSIVE_COUNT} exclusive advanced lessons on top.
            </p>
            <Link
              href="/payment"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white gold-gradient shadow-xl shadow-gold/25 hover:opacity-90 transition-opacity"
            >
              Start Free Trial <ChevronRight size={16} />
            </Link>
          </motion.div>
        )}

        {subscription === "plus" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            className="mt-16 p-8 rounded-3xl border border-amber-700/25 bg-amber-700/5 text-center"
          >
            <h2 className="font-heading font-bold text-2xl mb-2">Unlock {PREMIUM_EXCLUSIVE_COUNT} Premium-Exclusive Lessons</h2>
            <p className="text-muted-foreground mb-6">
              You have {PLUS_ACCESSIBLE_COUNT}+ lessons on Plus. Upgrade to Premium for exclusive advanced content, unlimited 1-on-1 tutoring, and more.
            </p>
            <Link
              href="/payment?plan=premium"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-amber-700 to-amber-500 shadow-xl hover:opacity-90 transition-opacity"
            >
              Upgrade to Premium <ChevronRight size={16} />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
