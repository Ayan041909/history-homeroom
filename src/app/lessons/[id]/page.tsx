"use client";

import { use, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ExternalImage } from "@/components/shared/ExternalImage";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, BookOpen, CheckCircle2, Clock, Lock,
  ChevronRight, ChevronLeft, Trophy, RotateCcw,
  FileText, HelpCircle, Star, Users,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { LESSON_CATALOG } from "@/lib/lessonCatalog";
import { canAccessLesson } from "@/lib/subscriptionAccess";
import { getLessonContent } from "@/lib/lessonContent";
import type { LessonContent, QuizQuestion } from "@/lib/lessonContent";
import { shuffleQuiz } from "@/lib/quizShuffle";
import { getProgress, updateProgress, getEarnedBadges, awardBadge } from "@/lib/firestore";
import { checkEarnedBadges, BADGE_DEFINITIONS } from "@/lib/badges";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { useToast } from "@/components/shared/Toast";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const SECTION_LABELS = ["Lesson", "Assignment", "Quiz"] as const;
type Section = (typeof SECTION_LABELS)[number];

const SECTION_ICONS = {
  Lesson: BookOpen,
  Quiz: HelpCircle,
  Assignment: FileText,
} as const;

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "text-green-500 bg-green-500/15",
  Intermediate: "text-blue-500 bg-blue-500/15",
  Advanced: "text-purple-500 bg-purple-500/15",
};

function ProgressBar({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`relative h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: "linear-gradient(90deg, #8E5908, #B8760A, #D98A0E)" }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, profile } = useAuth();
  const userId: string | null = user?.id ?? profile?.uid ?? null;
  const subscription = profile?.subscription ?? "free";

  // Find lesson
  const lesson = LESSON_CATALOG.find((l) => l.id === id);
  const content: LessonContent | null = lesson ? getLessonContent(lesson) : null;
  const unlocked = lesson ? canAccessLesson(subscription, lesson) : false;

  // Progress
  const prog = useLessonProgress(id);
  const toast = useToast();

  // Local UI state
  const [activeSection, setActiveSection] = useState<Section>("Lesson");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [displayQuiz, setDisplayQuiz] = useState<QuizQuestion[]>([]);
  const [assignmentText, setAssignmentText] = useState("");
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Initialize quiz order (canonical order on first load)
  useEffect(() => {
    if (!content) return;
    setDisplayQuiz(content.quiz);
  }, [content]);

  // Restore state from saved progress
  useEffect(() => {
    if (!prog.started) return;
    const section = prog.activeSection;
    if (section === "quiz") setActiveSection("Quiz");
    else if (section === "assignment") setActiveSection("Assignment");
    else setActiveSection("Lesson");

    if (Object.keys(prog.quizAnswers).length > 0) setQuizAnswers(prog.quizAnswers);
    if (prog.quizSubmitted) setQuizSubmitted(true);
    if (prog.assignmentText) setAssignmentText(prog.assignmentText);
    if (prog.assignmentSubmitted) setAssignmentSubmitted(true);
  }, [prog.started]); // eslint-disable-line react-hooks/exhaustive-deps

  // Mark started when landing on lesson
  useEffect(() => {
    if (!unlocked || !lesson) return;
    if (!prog.started) {
      prog.update({ activeSection: "lesson" });
    }
  }, [unlocked, lesson]); // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll to top when changing sections
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  /**
   * Records a lesson milestone (lesson read / assignment submitted / quiz passed) in the
   * user's global progress stats and checks whether any new badges were earned.
   * Only runs when Supabase is configured; silently no-ops in demo/mock mode.
   * Called ONLY from explicit user actions — never on login or page load.
   */
  const recordMilestone = useCallback(
    async (type: "lesson" | "assignment" | "quiz") => {
      if (!userId || !isSupabaseConfigured()) return;
      try {
        const current = await getProgress(userId);
        const base = current ?? {
          lessonsAttended: 0,
          assignmentsCompleted: 0,
          quizzesPassed: 0,
          studyTimeMinutes: 0,
        };
        const updated = { ...base };
        if (type === "lesson") updated.lessonsAttended += 1;
        if (type === "assignment") updated.assignmentsCompleted += 1;
        if (type === "quiz") updated.quizzesPassed += 1;
        await updateProgress(userId, updated);
        const currentBadges = await getEarnedBadges(userId);
        const newBadges = checkEarnedBadges(updated, currentBadges);
        for (const bid of newBadges) await awardBadge(userId, bid);
        if (newBadges.length > 0) {
          const names = BADGE_DEFINITIONS.filter((b) => newBadges.includes(b.id))
            .map((b) => `${b.icon} ${b.name}`)
            .join(", ");
          toast.success("Badge earned!", names);
        }
      } catch {
        // Silently ignore if DB is unavailable.
      }
    },
    [userId, toast],
  );

  const switchSection = (s: Section) => {
    setActiveSection(s);
    const sKey = s.toLowerCase() as "lesson" | "quiz" | "assignment";
    prog.update({ activeSection: sKey });
  };

  const handleMarkRead = () => {
    // Record milestone only the first time the student marks the lesson as read.
    if (!prog.lessonRead) void recordMilestone("lesson");
    prog.update({ lessonRead: true, activeSection: "assignment" });
    switchSection("Assignment");
  };

  const handleAnswerSelect = (qIdx: number, aIdx: number) => {
    if (quizSubmitted) return;
    const updated = { ...quizAnswers, [qIdx]: aIdx };
    setQuizAnswers(updated);
    prog.update({ quizAnswers: updated });
  };

  const handleSubmitQuiz = () => {
    if (!displayQuiz.length) return;
    const score = displayQuiz.reduce(
      (acc, q, i) => acc + (quizAnswers[i] === q.correctIndex ? 1 : 0),
      0,
    );
    const passed = score / displayQuiz.length >= 0.6;
    // Record milestone only once per lesson — guarded by prog.quizPassed so retakes
    // don't double-count the stat even after the component resets quizSubmitted.
    if (!prog.quizPassed && passed) {
      void recordMilestone("quiz");
      prog.update({ quizSubmitted: true, quizScore: score, quizPassed: true, activeSection: "quiz" });
    } else {
      prog.update({ quizSubmitted: true, quizScore: score, activeSection: "quiz" });
    }
    setQuizSubmitted(true);
  };

  const handleSubmitAssignment = () => {
    if (!assignmentText.trim()) return;
    // Record milestone only the first time the student submits an assignment.
    if (!prog.assignmentSubmitted) void recordMilestone("assignment");
    setAssignmentSubmitted(true);
    prog.update({ assignmentSubmitted: true, assignmentText, activeSection: "quiz" });
    setTimeout(() => switchSection("Quiz"), 800);
  };

  const handleRetakeQuiz = () => {
    if (!content) return;
    setDisplayQuiz(shuffleQuiz(content.quiz));
    setQuizAnswers({});
    setQuizSubmitted(false);
    // Reset the visual quiz state but preserve quizPassed so the milestone
    // is never double-counted if the student retakes and passes again.
    prog.update({ quizAnswers: {}, quizSubmitted: false, quizScore: null });
  };

  // ─── Loading / not found ────────────────────────────────────────────────
  if (!lesson || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 px-4">
        <BookOpen size={48} className="text-muted-foreground opacity-40" />
        <h1 className="font-heading text-2xl font-bold">Lesson not found</h1>
        <Link href="/lessons" className="text-gold hover:underline flex items-center gap-1">
          <ArrowLeft size={16} /> Back to Library
        </Link>
      </div>
    );
  }

  // ─── Locked gate ────────────────────────────────────────────────────────
  if (!unlocked) {
    const tierLabel = lesson.tier === "premium" ? "Premium" : "Plus";
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full glass-gold rounded-3xl p-10 text-center"
        >
          <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-5 shadow-lg">
            <Lock size={28} className="text-white" />
          </div>
          <h2 className="font-heading text-2xl font-black mb-2">
            {tierLabel} Lesson
          </h2>
          <p className="text-muted-foreground mb-2 text-sm">
            <strong className="text-foreground">&ldquo;{lesson.title}&rdquo;</strong> requires a{" "}
            <strong className="text-gold">{tierLabel}</strong> subscription.
          </p>
          <p className="text-muted-foreground text-sm mb-7">
            {lesson.tier === "premium"
              ? "Upgrade to Premium for exclusive advanced lessons, unlimited 1-on-1 tutoring, and more."
              : `Upgrade to Plus to unlock 200+ lessons, group tutoring, and progress tracking.`}
          </p>
          <Link
            href={`/payment${lesson.tier === "premium" ? "?plan=premium" : ""}`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white gold-gradient shadow-lg hover:opacity-90 transition-opacity"
          >
            Upgrade to {tierLabel} <ChevronRight size={16} />
          </Link>
          <div className="mt-5">
            <Link href="/lessons" className="text-sm text-muted-foreground hover:text-gold transition-colors flex items-center justify-center gap-1">
              <ArrowLeft size={14} /> Back to Library
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ─── Progress helpers ────────────────────────────────────────────────────
  const quizScore = quizSubmitted && displayQuiz.length
    ? displayQuiz.reduce((acc, q, i) => acc + (quizAnswers[i] === q.correctIndex ? 1 : 0), 0)
    : null;
  const answeredCount = Object.keys(quizAnswers).length;
  const allAnswered = displayQuiz.length > 0 && answeredCount === displayQuiz.length;

  const sectionProgress = {
    Lesson: prog.lessonRead ? 100 : Math.min(90, prog.progress * 2),
    Quiz: quizSubmitted ? 100 : displayQuiz.length ? Math.round((answeredCount / displayQuiz.length) * 100) : 0,
    Assignment: assignmentSubmitted ? 100 : Math.min(90, Math.round((assignmentText.length / 300) * 100)),
  };

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background pt-16 flex flex-col">

      {/* ── Top header ── */}
      <div className="glass-heavy sticky top-16 z-40 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link href="/lessons" className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
            <ArrowLeft size={18} />
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground truncate">{lesson.subject}</p>
            <p className="text-sm font-semibold truncate">{lesson.title}</p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{prog.progress}%</span>
              <span>complete</span>
            </div>
            <div className="w-24 hidden sm:block">
              <ProgressBar value={prog.progress} />
            </div>
            {prog.completed && (
              <span className="flex items-center gap-1 text-xs font-semibold text-green-500">
                <CheckCircle2 size={14} /> Done
              </span>
            )}
          </div>
        </div>

        {/* Section tabs */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex border-t border-white/8">
          {SECTION_LABELS.map((section) => {
            const Icon = SECTION_ICONS[section];
            const done = sectionProgress[section] === 100;
            const active = activeSection === section;
            return (
              <button
                key={section}
                onClick={() => switchSection(section)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
                  active
                    ? "border-gold text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {done ? (
                  <CheckCircle2 size={14} className="text-green-500" />
                ) : (
                  <Icon size={14} />
                )}
                {section}
                {done && <span className="hidden sm:inline text-[10px] text-green-500 font-bold">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main content ── */}
      <div ref={contentRef} className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

          <AnimatePresence mode="wait">
            {/* ══════════ LESSON TAB ══════════ */}
            {activeSection === "Lesson" && (
              <motion.div
                key="lesson"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
              >
                {/* Hero image */}
                <div className="relative h-56 sm:h-72 rounded-3xl overflow-hidden mb-8 glass">
                  <ExternalImage
                    src={lesson.thumbnail}
                    alt={lesson.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 672px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-gold mb-1">{lesson.subject}</p>
                      <h1 className="font-heading font-black text-xl sm:text-2xl text-white leading-tight">
                        {lesson.title}
                      </h1>
                    </div>
                    <span className={`shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full ${LEVEL_COLORS[lesson.level]}`}>
                      {lesson.level}
                    </span>
                  </div>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border/50">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {lesson.duration}</span>
                  <span className="flex items-center gap-1.5"><Users size={14} /> {lesson.students.toLocaleString()} students</span>
                  <span className="flex items-center gap-1.5"><Star size={14} className="text-gold" /> {lesson.rating}</span>
                  <span className="flex items-center gap-1.5"><FileText size={14} /> 1 assignment</span>
                  <span className="flex items-center gap-1.5"><HelpCircle size={14} /> {content.quiz.length} quiz questions</span>
                </div>

                {/* Overview */}
                <p className="text-base leading-relaxed text-muted-foreground mb-8 italic border-l-4 border-gold/40 pl-4">
                  {content.overview}
                </p>

                {/* Sections */}
                {content.sections.map((section, i) => (
                  <div key={i} className="mb-8">
                    <h2 className="font-heading text-xl font-bold mb-3 text-foreground">
                      {section.title}
                    </h2>
                    {section.body.split("\n\n").map((para, j) => (
                      <p key={j} className="text-sm sm:text-base leading-relaxed text-muted-foreground mb-4">
                        {para}
                      </p>
                    ))}
                  </div>
                ))}

                {/* Key facts */}
                {content.keyFacts.length > 0 && (
                  <div className="glass rounded-2xl p-5 mb-8">
                    <h3 className="font-semibold text-sm mb-3 text-foreground">Key Facts</h3>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      {content.keyFacts.map(({ label, value }) => (
                        <div key={label} className="flex gap-2 text-sm">
                          <dt className="font-medium text-foreground shrink-0">{label}:</dt>
                          <dd className="text-muted-foreground">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* Primary source */}
                {content.primarySource && (
                  <blockquote className="glass-gold rounded-2xl p-6 mb-8 relative">
                    <div className="text-4xl text-gold/30 font-serif absolute top-3 left-5 leading-none select-none">&ldquo;</div>
                    <p className="text-base italic leading-relaxed text-foreground/90 pl-4 mb-3">
                      {content.primarySource.quote}
                    </p>
                    <cite className="text-xs text-muted-foreground not-italic pl-4 block">
                      — {content.primarySource.attribution}
                    </cite>
                  </blockquote>
                )}

                {/* Mark as read */}
                <div className="flex items-center justify-between gap-4 pt-6 border-t border-border/50">
                  {prog.lessonRead ? (
                    <span className="flex items-center gap-2 text-sm text-green-500 font-medium">
                      <CheckCircle2 size={16} /> Lesson completed
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">Finished reading?</span>
                  )}
                  <button
                    onClick={handleMarkRead}
                    className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white gold-gradient shadow hover:opacity-90 transition-opacity"
                  >
                    {prog.lessonRead ? "Go to Assignment" : "Mark as Read & Continue"}
                    <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ══════════ QUIZ TAB ══════════ */}
            {activeSection === "Quiz" && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-heading text-2xl font-black">Knowledge Check</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {content.quiz.length} questions · Select the best answer for each
                    </p>
                  </div>
                  {quizSubmitted && quizScore !== null && (
                    <div className={`text-center px-4 py-2 rounded-2xl ${quizScore >= 4 ? "bg-green-500/15 text-green-500" : quizScore >= 3 ? "bg-amber-500/15 text-amber-500" : "bg-red-500/15 text-red-500"}`}>
                      <p className="text-2xl font-black">{quizScore}/{displayQuiz.length}</p>
                      <p className="text-xs font-medium">{quizScore >= 4 ? "Excellent!" : quizScore >= 3 ? "Good work!" : "Keep studying"}</p>
                    </div>
                  )}
                </div>

                {/* Result banner */}
                {quizSubmitted && quizScore !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 rounded-2xl flex items-center gap-3 ${
                      quizScore >= 4 ? "bg-green-500/12 border border-green-500/25" : "bg-amber-500/12 border border-amber-500/25"
                    }`}
                  >
                    {quizScore >= 4 ? (
                      <Trophy size={20} className="text-green-500 shrink-0" />
                    ) : (
                      <HelpCircle size={20} className="text-amber-500 shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-sm">
                        {quizScore >= 4
                          ? `Great job! You scored ${quizScore}/${displayQuiz.length}.`
                          : `You scored ${quizScore}/${displayQuiz.length}. Review the explanations below.`}
                      </p>
                    </div>
                    {quizSubmitted && (
                      <button
                        onClick={handleRetakeQuiz}
                        className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <RotateCcw size={13} /> Retake
                      </button>
                    )}
                  </motion.div>
                )}

                {/* Questions */}
                <div className="space-y-6">
                  {displayQuiz.map((q, qIdx) => {
                    const chosen = quizAnswers[qIdx];
                    const isCorrect = quizSubmitted && chosen === q.correctIndex;
                    const isWrong = quizSubmitted && chosen !== undefined && chosen !== q.correctIndex;

                    return (
                      <motion.div
                        key={qIdx}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: qIdx * 0.05 }}
                        className={`glass rounded-2xl p-5 transition-all ${
                          isCorrect ? "border-green-500/35" : isWrong ? "border-red-500/25" : ""
                        }`}
                        style={isCorrect ? { borderColor: "rgba(34,197,94,0.35)" } : isWrong ? { borderColor: "rgba(239,68,68,0.25)" } : {}}
                      >
                        <p className="font-semibold text-sm mb-4">
                          <span className="text-gold font-bold mr-2">{qIdx + 1}.</span>
                          {q.question}
                        </p>
                        <div className="space-y-2">
                          {q.options.map((opt, aIdx) => {
                            const isChosen = chosen === aIdx;
                            const isRight = quizSubmitted && aIdx === q.correctIndex;
                            const isBad = quizSubmitted && isChosen && aIdx !== q.correctIndex;

                            return (
                              <button
                                key={aIdx}
                                type="button"
                                disabled={quizSubmitted}
                                onClick={() => handleAnswerSelect(qIdx, aIdx)}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all border ${
                                  isRight
                                    ? "bg-green-500/15 border-green-500/40 text-green-600 dark:text-green-400 font-medium"
                                    : isBad
                                    ? "bg-red-500/12 border-red-500/30 text-red-500"
                                    : isChosen
                                    ? "bg-gold/15 border-gold/40 text-foreground font-medium"
                                    : "border-border hover:border-gold/30 hover:bg-gold/5"
                                }`}
                              >
                                <span className="font-mono text-xs mr-2 opacity-60">
                                  {String.fromCharCode(65 + aIdx)}.
                                </span>
                                {opt}
                                {isRight && <CheckCircle2 size={14} className="inline ml-2 text-green-500" />}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation */}
                        {quizSubmitted && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3 pt-3 border-t border-border/50"
                          >
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              <span className="font-semibold text-foreground">Explanation: </span>
                              {q.explanation}
                            </p>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Submit / continue buttons */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-border/50">
                  <button
                    onClick={() => switchSection(assignmentSubmitted ? "Assignment" : "Lesson")}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronLeft size={16} /> Back to {assignmentSubmitted ? "Assignment" : "Lesson"}
                  </button>

                  {!quizSubmitted ? (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={!allAnswered}
                      className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white gold-gradient shadow hover:opacity-90 disabled:opacity-40 transition-opacity"
                    >
                      Submit Quiz
                      <span className="text-xs opacity-80">({answeredCount}/{displayQuiz.length})</span>
                    </button>
                  ) : (
                    <span className="flex items-center gap-2 text-sm text-green-500 font-medium">
                      <CheckCircle2 size={16} /> Quiz complete
                    </span>
                  )}
                </div>

                {/* Lesson complete — shown after quiz is submitted */}
                {quizSubmitted && quizScore !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 mt-8 border-t border-border/50"
                  >
                    <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mx-auto mb-5 shadow-xl">
                      <Trophy size={36} className="text-white" />
                    </div>
                    <h3 className="font-heading text-2xl font-black mb-2">Lesson Complete!</h3>
                    <p className="text-muted-foreground mb-2">
                      You&rsquo;ve completed all three sections of this lesson.
                    </p>
                    <p className="text-sm text-gold font-semibold mb-6">
                      Quiz score: {quizScore}/{displayQuiz.length} — {Math.round((quizScore / displayQuiz.length) * 100)}%
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <Link
                        href="/lessons"
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm glass hover:border-gold/40 transition-colors"
                      >
                        <ArrowLeft size={15} /> Back to Library
                      </Link>
                      <Link
                        href="/home"
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white gold-gradient shadow hover:opacity-90 transition-opacity"
                      >
                        View My Progress <ChevronRight size={15} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ══════════ ASSIGNMENT TAB ══════════ */}
            {activeSection === "Assignment" && (
              <motion.div
                key="assignment"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6">
                  <h2 className="font-heading text-2xl font-black">Written Assignment</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Apply what you have learned in a short analytical response.
                  </p>
                </div>

                {/* Prompt */}
                <div className="glass rounded-2xl p-6 mb-6">
                  <h3 className="font-semibold text-sm text-gold mb-3 uppercase tracking-wide">Assignment Prompt</h3>
                  <p className="text-sm leading-relaxed text-foreground mb-5">{content.assignment.prompt}</p>

                  <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-2">Tips for a strong response</h4>
                  <ul className="space-y-1.5">
                    {content.assignment.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="text-gold mt-0.5 shrink-0">→</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Text area or submitted view */}
                {!assignmentSubmitted ? (
                  <>
                    <div className="relative">
                      <textarea
                        value={assignmentText}
                        onChange={(e) => {
                          setAssignmentText(e.target.value);
                          prog.update({ assignmentText: e.target.value });
                        }}
                        placeholder="Write your response here... Aim for 2–3 well-developed paragraphs."
                        rows={12}
                        className="w-full glass rounded-2xl px-5 py-4 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-gold/50 placeholder:text-muted-foreground transition-all"
                      />
                      <div className="absolute bottom-3 right-4 text-xs text-muted-foreground">
                        {assignmentText.length} chars
                        {assignmentText.length > 0 && assignmentText.length < 100 && (
                          <span className="text-amber-500 ml-1">(aim for 200+)</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-5">
                      <button
                        onClick={() => switchSection("Lesson")}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ChevronLeft size={16} /> Back to Lesson
                      </button>
                      <button
                        onClick={handleSubmitAssignment}
                        disabled={assignmentText.trim().length < 50}
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white gold-gradient shadow hover:opacity-90 disabled:opacity-40 transition-opacity"
                      >
                        Submit Assignment <ChevronRight size={16} />
                      </button>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6"
                  >
                    <div className="flex items-center gap-2 text-sm text-green-500 font-medium mb-4">
                      <CheckCircle2 size={16} /> Assignment submitted
                    </div>

                    <div className="glass rounded-2xl p-5 text-left mb-6 max-h-48 overflow-y-auto">
                      <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">Your submitted response</p>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">{assignmentText}</p>
                    </div>

                    {!quizSubmitted ? (
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <button
                          onClick={() => switchSection("Lesson")}
                          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ChevronLeft size={16} /> Back to Lesson
                        </button>
                        <button
                          onClick={() => switchSection("Quiz")}
                          className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white gold-gradient shadow hover:opacity-90 transition-opacity"
                        >
                          Continue to Quiz <ChevronRight size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => switchSection("Quiz")}
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm glass hover:border-gold/40 transition-colors"
                      >
                        View Quiz Results <ChevronRight size={16} />
                      </button>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
