"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckSquare, Trophy, Clock } from "lucide-react";
import type { Progress } from "@/types";

function useCountUp(target: number, duration = 1800, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      setCount(Math.round(ease(prog) * target));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);
  return count;
}

interface CounterCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  delay: number;
  color: string;
}

function CounterCard({ icon, label, value, suffix = "", delay, color }: CounterCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, 1800, started);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl border border-border bg-card hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 group"
    >
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform`}>
        {icon}
      </div>
      <p className="text-3xl font-heading font-black gold-gradient-text mb-1">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-sm text-muted-foreground">{label}</p>

      {/* Mini progress bar */}
      <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full gold-gradient rounded-full"
          initial={{ width: 0 }}
          animate={started ? { width: `${Math.min((value / 100) * 100, 100)}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: delay + 0.3 }}
        />
      </div>
    </motion.div>
  );
}

export function ProgressCounters({ progress }: { progress: Progress }) {
  return (
    <section aria-label="Your learning progress">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="font-heading text-2xl font-bold">Your Progress</h2>
        <p className="text-muted-foreground text-sm mt-1">Keep up the great work — every lesson counts!</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <CounterCard
          icon={<BookOpen size={22} className="text-white" aria-hidden="true" />}
          label="Lessons Attended"
          value={progress.lessonsAttended}
          color="gold-gradient"
          delay={0}
        />
        <CounterCard
          icon={<CheckSquare size={22} className="text-white" aria-hidden="true" />}
          label="Assignments Completed"
          value={progress.assignmentsCompleted}
          color="bg-gradient-to-br from-emerald-600 to-emerald-400"
          delay={0.1}
        />
        <CounterCard
          icon={<Trophy size={22} className="text-white" aria-hidden="true" />}
          label="Quizzes Passed"
          value={progress.quizzesPassed}
          color="bg-gradient-to-br from-blue-600 to-blue-400"
          delay={0.2}
        />
        <CounterCard
          icon={<Clock size={22} className="text-white" aria-hidden="true" />}
          label="Minutes Studied"
          value={progress.studyTimeMinutes}
          suffix="m"
          color="bg-gradient-to-br from-purple-600 to-purple-400"
          delay={0.3}
        />
      </div>
    </section>
  );
}
