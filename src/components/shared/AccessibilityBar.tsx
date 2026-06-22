"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accessibility, ZoomIn, ZoomOut, Contrast, RotateCcw, ChevronDown, Volume2 } from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";

export function AccessibilityBar() {
  const [open, setOpen] = useState(false);
  const {
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    reduceMotion,
    setReduceMotion,
    textToSpeech,
    setTextToSpeech,
    reset,
    hasHydrated,
  } = useAccessibility();

  if (!hasHydrated) {
    return null;
  }

  return (
    <div
      className="fixed left-4 bottom-24 z-50"
      role="region"
      aria-label="Accessibility controls"
    >
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        whileHover={reduceMotion ? undefined : { scale: 1.05 }}
        whileTap={reduceMotion ? undefined : { scale: 0.95 }}
        className="w-11 h-11 rounded-full gold-gradient flex items-center justify-center shadow-lg shadow-gold/30 focus-visible:ring-2 focus-visible:ring-gold touch-manipulation"
        aria-expanded={open}
        aria-controls="accessibility-panel"
        aria-label="Accessibility options"
      >
        <Accessibility size={18} className="text-white" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="accessibility-panel"
            initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.95 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
            className="absolute bottom-14 left-0 w-60 rounded-xl border border-border bg-card text-card-foreground p-4 shadow-xl"
            role="dialog"
            aria-label="Accessibility settings"
          >
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
              <Accessibility size={14} className="text-gold" />
              Accessibility
            </h2>

            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-2">Font Size: {fontSize}%</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFontSize((s) => Math.max(80, s - 10))}
                  className="w-8 h-8 rounded-lg border border-border text-foreground hover:border-gold/50 flex items-center justify-center hover:bg-gold/10 transition-colors"
                  aria-label="Decrease font size"
                  disabled={fontSize <= 80}
                  suppressHydrationWarning
                >
                  <ZoomOut size={14} />
                </button>
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full gold-gradient rounded-full transition-all"
                    style={{ width: `${((fontSize - 80) / 60) * 100}%` }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setFontSize((s) => Math.min(140, s + 10))}
                  className="w-8 h-8 rounded-lg border border-border text-foreground hover:border-gold/50 flex items-center justify-center hover:bg-gold/10 transition-colors"
                  aria-label="Increase font size"
                  disabled={fontSize >= 140}
                  suppressHydrationWarning
                >
                  <ZoomIn size={14} />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setHighContrast((c) => !c)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all mb-2 ${
                highContrast
                  ? "border-gold bg-gold/15 text-foreground"
                  : "border-border text-foreground hover:border-gold/50 hover:bg-gold/5"
              }`}
              aria-pressed={highContrast}
              suppressHydrationWarning
            >
              <span className="flex items-center gap-2">
                <Contrast size={14} />
                High Contrast
              </span>
              <div className={`w-8 h-4 rounded-full transition-colors ${highContrast ? "bg-gold" : "bg-muted"}`}>
                <div className={`w-3 h-3 rounded-full bg-white m-0.5 transition-transform ${highContrast ? "translate-x-4" : ""}`} />
              </div>
            </button>

            <button
              type="button"
              onClick={() => setReduceMotion((m) => !m)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all mb-2 ${
                reduceMotion
                  ? "border-gold bg-gold/15 text-foreground"
                  : "border-border text-foreground hover:border-gold/50 hover:bg-gold/5"
              }`}
              aria-pressed={reduceMotion}
              suppressHydrationWarning
            >
              <span className="flex items-center gap-2">
                <ChevronDown size={14} />
                Reduce Motion
              </span>
              <div className={`w-8 h-4 rounded-full transition-colors ${reduceMotion ? "bg-gold" : "bg-muted"}`}>
                <div className={`w-3 h-3 rounded-full bg-white m-0.5 transition-transform ${reduceMotion ? "translate-x-4" : ""}`} />
              </div>
            </button>

            <button
              type="button"
              onClick={() => setTextToSpeech((t) => !t)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all mb-2 ${
                textToSpeech
                  ? "border-gold bg-gold/15 text-foreground"
                  : "border-border text-foreground hover:border-gold/50 hover:bg-gold/5"
              }`}
              aria-pressed={textToSpeech}
              suppressHydrationWarning
            >
              <span className="flex items-center gap-2">
                <Volume2 size={14} />
                Text to Speech
              </span>
              <div className={`w-8 h-4 rounded-full transition-colors ${textToSpeech ? "bg-gold" : "bg-muted"}`}>
                <div className={`w-3 h-3 rounded-full bg-white m-0.5 transition-transform ${textToSpeech ? "translate-x-4" : ""}`} />
              </div>
            </button>

            {textToSpeech && (
              <p className="text-[11px] text-muted-foreground mb-3 leading-relaxed">
                Highlight any text on the page to hear it read aloud.
              </p>
            )}

            <button
              type="button"
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border hover:border-gold/50 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Reset accessibility settings"
              suppressHydrationWarning
            >
              <RotateCcw size={13} />
              Reset All
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
