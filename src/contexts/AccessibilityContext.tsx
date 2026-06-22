"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MotionConfig } from "framer-motion";

const STORAGE_KEY = "history-homeroom:a11y";

type StoredA11y = {
  fontSize: number;
  highContrast: boolean;
  reduceMotion: boolean;
  textToSpeech: boolean;
};

type AccessibilityContextValue = {
  fontSize: number;
  setFontSize: (value: number | ((prev: number) => number)) => void;
  highContrast: boolean;
  setHighContrast: (value: boolean | ((prev: boolean) => boolean)) => void;
  reduceMotion: boolean;
  setReduceMotion: (value: boolean | ((prev: boolean) => boolean)) => void;
  textToSpeech: boolean;
  setTextToSpeech: (value: boolean | ((prev: boolean) => boolean)) => void;
  speakSelection: () => void;
  reset: () => void;
  hasHydrated: boolean;
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

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

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState(false);

  useEffect(() => {
    const stored = loadStored();
    if (stored.fontSize != null) setFontSize(stored.fontSize);
    if (stored.highContrast != null) setHighContrast(stored.highContrast);
    if (stored.reduceMotion != null) setReduceMotion(stored.reduceMotion);
    if (stored.textToSpeech != null) setTextToSpeech(stored.textToSpeech);
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast);
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduceMotion);
    if (reduceMotion) {
      document.documentElement.style.setProperty("--motion-scale", "0");
    } else {
      document.documentElement.style.removeProperty("--motion-scale");
    }
  }, [reduceMotion]);

  const speakSelection = useCallback(() => {
    const text = window.getSelection()?.toString().trim();
    if (!text || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }, []);

  useEffect(() => {
    if (!textToSpeech) {
      document.documentElement.classList.remove("tts-enabled");
      return;
    }

    document.documentElement.classList.add("tts-enabled");

    const handleMouseUp = () => {
      const text = window.getSelection()?.toString().trim();
      if (text && text.length > 1) speakSelection();
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [textToSpeech, speakSelection]);

  useEffect(() => {
    if (!hasHydrated) return;
    try {
      const payload: StoredA11y = { fontSize, highContrast, reduceMotion, textToSpeech };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // localStorage unavailable
    }
  }, [hasHydrated, fontSize, highContrast, reduceMotion, textToSpeech]);

  const reset = useCallback(() => {
    setFontSize(100);
    setHighContrast(false);
    setReduceMotion(false);
    setTextToSpeech(false);
    window.speechSynthesis?.cancel();
  }, []);

  const value = useMemo(
    () => ({
      fontSize,
      setFontSize,
      highContrast,
      setHighContrast,
      reduceMotion,
      setReduceMotion,
      textToSpeech,
      setTextToSpeech,
      speakSelection,
      reset,
      hasHydrated,
    }),
    [
      fontSize,
      highContrast,
      reduceMotion,
      textToSpeech,
      speakSelection,
      reset,
      hasHydrated,
    ],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      <MotionConfig reducedMotion={reduceMotion ? "always" : "user"}>
        {children}
      </MotionConfig>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
}
