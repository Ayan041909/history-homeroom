"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { motion, useReducedMotion } from "framer-motion";
import { Users, BookOpen, Star, Calendar } from "lucide-react";
import { useTouchDevice } from "@/hooks/useTouchDevice";

interface MetricProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  isDark?: boolean;
  isTouch?: boolean;
}

/**
 * Animated count-up hook — drives a number from 0 to `target` once `started`
 * becomes true, using requestAnimationFrame for smooth easing. Snaps directly
 * to the target when the user prefers reduced motion.
 */
function useCountUp(target: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!started) return;

    if (shouldReduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(target);
      return;
    }

    let raf = 0;
    let startTime: number | null = null;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(easeOut(progress) * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, started, shouldReduce]);

  return count;
}

function MetricCard({ icon, label, value, suffix = "", prefix = "", delay = 0, isDark = true, isTouch = false }: MetricProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, 2200, started);

  useEffect(() => {
    let fired = false;
    const start = () => {
      if (fired) return;
      fired = true;
      setStarted(true);
      observer.disconnect();
    };

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) start(); },
      { threshold: 0 }
    );
    if (ref.current) observer.observe(ref.current);

    // iOS Safari sometimes skips IntersectionObserver for elements that are
    // already in the viewport at mount time. Do a fast viewport-position
    // check after a brief delay. We only trigger if the element is actually
    // visible — this avoids starting the animation while the section is
    // still far off-screen.
    const fallback = setTimeout(() => {
      if (fired || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) start();
    }, 300);

    return () => { observer.disconnect(); clearTimeout(fallback); fired = true; };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={isTouch ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center gap-3 p-6 rounded-3xl transition-all duration-300 group glass"
      style={isDark
        ? { border: "1px solid rgba(255,255,255,0.10)" }
        : {}
      }
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = isDark ? "rgba(251,191,36,0.30)" : "rgba(184,118,10,0.20)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = isDark ? "rgba(255,255,255,0.10)" : "";
      }}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #B45309, #D97706, #F59E0B)", boxShadow: "0 4px 16px rgba(217,119,6,0.35)" }}>
        {icon}
      </div>
      <div className="text-center">
        <p className="text-3xl sm:text-4xl font-heading font-black"
          style={{ color: isDark ? "#FBBF24" : "#B8760A" }}>
          {prefix}{count.toLocaleString()}{suffix}
        </p>
        <p className="text-sm mt-1" style={{ color: isDark ? "rgba(226,232,240,0.65)" : "#6B6358" }}>{label}</p>
      </div>
    </motion.div>
  );
}

export function MetricsCounter() {
  const isTouch = useTouchDevice();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <section
      className="pt-20 sm:pt-24 pb-16 px-4 sm:px-6 relative overflow-x-clip overflow-y-visible"
      aria-label="Platform metrics"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(184,118,10,0.06), transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={isTouch ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3 glass"
            style={isDark
              ? { color: "#FCD34D", border: "1px solid rgba(251,191,36,0.25)" }
              : { color: "#8E5908", border: "1px solid rgba(184,118,10,0.22)" }
            }
          >
            <Calendar size={12} aria-hidden="true" />
            Est. 2026
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold">
            Join a Growing{" "}
            <span className="gold-shimmer-text">Community</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard isDark={isDark} isTouch={isTouch} icon={<BookOpen size={22} className="text-white" aria-hidden="true" />} label="Curriculum lessons" value={200} suffix="+" delay={0} />
          <MetricCard isDark={isDark} isTouch={isTouch} icon={<Users size={22} className="text-white" aria-hidden="true" />} label="Tutoring formats" value={3} delay={0.1} />
          <MetricCard isDark={isDark} isTouch={isTouch} icon={<Star size={22} className="text-white" aria-hidden="true" />} label="Founding educators" value={3} delay={0.2} />
          <MetricCard isDark={isDark} isTouch={isTouch} icon={<Calendar size={22} className="text-white" aria-hidden="true" />} label="Weekday session slots / week" value={15} delay={0.3} />
        </div>
      </div>
    </section>
  );
}
