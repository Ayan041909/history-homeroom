"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ExternalImage } from "@/components/shared/ExternalImage";
import { useTheme } from "next-themes";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, Sparkles, ScrollText } from "lucide-react";
import { IMAGES } from "@/lib/images";
import { useAuth } from "@/hooks/useAuth";
import { useTouchDevice } from "@/hooks/useTouchDevice";
import { getStartLearningHref } from "@/lib/redirect";

const SLOGAN_WORDS = ["History", "Repeats", "Itself", "—", "Until", "You", "Learn", "From", "It."];
const TAGLINE = "Immersive lessons · Expert tutors · Live sessions";

function ParticleCanvas({ isDark, enabled }: { isDark: boolean; enabled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!enabled || shouldReduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; color: string;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Dark: vivid amber + gold. Light: softer warm gold dots
    const colors = isDark
      ? ["#FBBF24", "#F59E0B", "#FCD34D", "#E8A000", "#FFD060"]
      : ["#B8760A", "#D98A0E", "#C47A07", "#8E5908", "#E09010"];

    for (let i = 0; i < (isDark ? 70 : 50); i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.15,
        size: Math.random() * 2 + 0.5,
        alpha: isDark ? Math.random() * 0.5 + 0.1 : Math.random() * 0.25 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += (Math.random() - 0.5) * 0.006;
        p.alpha = Math.max(0.02, Math.min(isDark ? 0.65 : 0.3, p.alpha));

        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [shouldReduce, isDark, enabled]);

  if (!enabled || shouldReduce) return null;
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
}

export function Hero() {
  const [wordIndex, setWordIndex] = useState(SLOGAN_WORDS.length);
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const shouldReduce = useReducedMotion();
  const isTouch = useTouchDevice();
  const { resolvedTheme } = useTheme();
  const { user, profile } = useAuth();
  const authenticated = !!profile;
  const startLearningHref = getStartLearningHref(authenticated);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const enableMotion = mounted && !shouldReduce && !isTouch;
  const enableTilt = enableMotion;

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!enableMotion) {
      setWordIndex(SLOGAN_WORDS.length);
      return;
    }
    setWordIndex(0);
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setWordIndex(i);
      if (i >= SLOGAN_WORDS.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, [enableMotion]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      className="relative min-h-[100dvh] flex items-center justify-center pt-16 pb-24 sm:pb-28"
      onMouseMove={handleMouseMove}
      aria-label="Hero section"
    >
      {/* Background layers — decorative only, never intercept touches */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {isDark ? (
          <>
            <ExternalImage
              src={IMAGES.hero.libraryShowcase}
              alt="Historic library background"
              fill
              priority
              className="object-cover opacity-[0.07] animate-ken-burns"
              sizes="100vw"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,9,15,0.65) 0%, rgba(6,9,15,0.40) 50%, rgba(6,9,15,0.96) 100%)" }} />
            {/* Ambient glow orbs */}
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 50% at 50% -5%, rgba(251,191,36,0.18) 0%, transparent 70%)" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 45% 40% at 80% 85%, rgba(59,130,246,0.10) 0%, transparent 60%)" }} />
          </>
        ) : (
          <>
            {/* Light: inherited from body::before — just add subtle orbs */}
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(184,118,10,0.12) 0%, transparent 65%)" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 45% 40% at 85% 90%, rgba(30,58,138,0.06) 0%, transparent 60%)" }} />
          </>
        )}
        <ParticleCanvas isDark={isDark} enabled={!isTouch} />
      </div>

      {/* Content — glass panel floats above background */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center pointer-events-auto">

        {/* Badge */}
        <motion.div
          initial={enableMotion ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-8"
          style={isDark
            ? { background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.30)", color: "#FCD34D", backdropFilter: "blur(20px)" }
            : { background: "rgba(255,255,255,0.65)", border: "1px solid rgba(184,118,10,0.25)", color: "#8E5908", backdropFilter: "blur(20px)", boxShadow: "0 1px 0 rgba(255,255,255,0.8) inset" }
          }
          aria-label="Platform highlight"
        >
          <Sparkles size={13} aria-hidden="true" />
          Elite Historical Education Platform
        </motion.div>

        {/* Headline */}
        <motion.div
          style={enableTilt ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
          className="mb-6"
        >
          <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight">
            {SLOGAN_WORDS.map((word, i) => (
              <motion.span
                key={i}
                initial={enableMotion ? { opacity: 0, y: 30, filter: "blur(10px)" } : false}
                animate={i < wordIndex ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`inline-block mr-[0.22em] ${
                  word === "—"
                    ? (isDark ? "text-amber-400" : "text-gold")
                    : i >= 6
                    ? "gold-shimmer-text"
                    : (isDark ? "text-white" : "text-foreground")
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={enableMotion ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: enableMotion ? 1.4 : 0 }}
          className="text-lg sm:text-xl max-w-lg mx-auto mb-10 font-medium"
          style={{ color: isDark ? "rgba(226,232,240,0.70)" : "rgba(29,29,31,0.55)" }}
        >
          {TAGLINE}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={enableMotion ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: enableMotion ? 1.7 : 0 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"
        >
          {/* Primary — gold glass pill */}
          <Link
            href={startLearningHref}
            className="group relative px-8 py-3.5 rounded-full font-semibold text-base text-white flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 transition-all duration-200 touch-manipulation min-h-[48px]"
            style={{ background: "linear-gradient(135deg, #8E5908, #B8760A, #D98A0E)", boxShadow: "0 4px 24px rgba(184,118,10,0.35), 0 1px 0 rgba(255,255,255,0.25) inset" }}
            aria-label={authenticated ? "Start learning — open the lesson library" : "Start learning — create your free account"}
          >
            <Sparkles size={15} aria-hidden="true" />
            Start Learning
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>

          {/* Secondary — liquid glass pill */}
          <a
            href="#pricing"
            className="px-8 py-3.5 rounded-full font-semibold text-base flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 transition-all duration-200 hover:opacity-85 touch-manipulation min-h-[48px]"
            style={isDark
              ? { background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.90)", backdropFilter: "blur(20px)", boxShadow: "0 1px 0 rgba(255,255,255,0.10) inset" }
              : { background: "rgba(255,255,255,0.72)", border: "1px solid rgba(255,255,255,0.60)", color: "rgba(29,29,31,0.85)", backdropFilter: "blur(20px)", boxShadow: "0 2px 0 rgba(255,255,255,0.85) inset, 0 1px 12px rgba(0,0,0,0.06)" }
            }
            aria-label="View subscription plans"
          >
            <Play size={14} aria-hidden="true" />
            View Plans
          </a>

          <Link
            href="/lessons"
            className="px-6 py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 transition-colors hover:opacity-80 touch-manipulation min-h-[48px]"
            style={{ color: isDark ? "rgba(226,232,240,0.55)" : "rgba(29,29,31,0.45)" }}
            aria-label="Browse the lesson library"
          >
            <ScrollText size={14} aria-hidden="true" />
            Browse Lessons
          </Link>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={enableMotion ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: enableMotion ? 2.2 : 0 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
          aria-label="Trust indicators"
        >
          {[
            { icon: "🔒", text: "End-to-End Encrypted" },
            { icon: "✨", text: "1-Week Free Trial" },
            { icon: "🎓", text: "Certified Tutors" },
            { icon: "⚡", text: "Live Sessions Daily" },
          ].map((item) => (
            <span
              key={item.text}
              className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full"
              style={isDark
                ? { background: "rgba(255,255,255,0.07)", color: "rgba(203,213,225,0.75)", border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(12px)" }
                : { background: "rgba(255,255,255,0.65)", color: "rgba(29,29,31,0.65)", border: "1px solid rgba(255,255,255,0.55)", backdropFilter: "blur(12px)", boxShadow: "0 1px 0 rgba(255,255,255,0.90) inset" }
              }
            >
              {item.icon} {item.text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={enableMotion ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ delay: enableMotion ? 2.5 : 0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-xs font-medium" style={{ color: isDark ? "rgba(203,213,225,0.40)" : "rgba(29,29,31,0.35)" }}>
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={isDark
            ? { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }
            : { background: "rgba(255,255,255,0.60)", border: "1px solid rgba(255,255,255,0.50)", backdropFilter: "blur(12px)" }
          }
        >
          <div className="w-1 h-2 rounded-full" style={{ background: isDark ? "rgba(251,191,36,0.7)" : "rgba(184,118,10,0.6)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
