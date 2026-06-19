"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accessibility, ZoomIn, ZoomOut, Contrast, RotateCcw, ChevronDown } from "lucide-react";

const STORAGE_KEY = "history-homeroom:a11y";

type StoredA11y = { fontSize: number; highContrast: boolean; reduceMotion: boolean };

function loadStored(): Partial<StoredA11y> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<StoredA11y>;
  } catch {
    return {};
  }
}

export function AccessibilityBar() {
  const [open, setOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const s = loadStored();
    if (s.fontSize != null) setFontSize(s.fontSize);
    if (s.highContrast != null) setHighContrast(s.highContrast);
    if (s.reduceMotion != null) setReduceMotion(s.reduceMotion);
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [highContrast]);

  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.style.setProperty("--motion-scale", "0");
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.style.removeProperty("--motion-scale");
      document.documentElement.classList.remove("reduce-motion");
    }
  }, [reduceMotion]);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      const payload: StoredA11y = { fontSize, highContrast, reduceMotion };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // localStorage unavailable
    }
  }, [hasHydrated, fontSize, highContrast, reduceMotion]);

  const reset = () => {
    setFontSize(100);
    setHighContrast(false);
    setReduceMotion(false);
  };

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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-11 h-11 rounded-full gold-gradient flex items-center justify-center shadow-lg shadow-gold/30 focus-visible:ring-2 focus-visible:ring-gold touch-manipulation"
        aria-expanded={open}
        aria-controls="accessibility-panel"
        aria-label="Accessibility options"
      >
        <Accessibility size={18} className="text-white" />
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="accessibility-panel"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 left-0 w-60 glass rounded-xl border border-gold/20 p-4 shadow-xl"
            role="dialog"
            aria-label="Accessibility settings"
          >
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Accessibility size={14} className="text-gold" />
              Accessibility
            </h2>

            {/* Font Size */}
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-2">Font Size: {fontSize}%</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFontSize((s) => Math.max(80, s - 10))}
                  className="w-8 h-8 rounded-lg border border-border hover:border-gold/50 flex items-center justify-center hover:bg-gold/10 transition-colors"
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
                  className="w-8 h-8 rounded-lg border border-border hover:border-gold/50 flex items-center justify-center hover:bg-gold/10 transition-colors"
                  aria-label="Increase font size"
                  disabled={fontSize >= 140}
                  suppressHydrationWarning
                >
                  <ZoomIn size={14} />
                </button>
              </div>
            </div>

            {/* High Contrast */}
            <button
              type="button"
              onClick={() => setHighContrast((c) => !c)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all mb-2 ${
                highContrast
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-border hover:border-gold/50 hover:bg-gold/5"
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

            {/* Reduce Motion */}
            <button
              type="button"
              onClick={() => setReduceMotion((m) => !m)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all mb-3 ${
                reduceMotion
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-border hover:border-gold/50 hover:bg-gold/5"
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

            {/* Reset */}
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
