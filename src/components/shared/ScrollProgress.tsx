"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useTouchDevice } from "@/hooks/useTouchDevice";

/**
 * Top-of-viewport gold scroll-progress indicator.
 * Sits above the navbar and shows reading progress on every page.
 */
export function ScrollProgress() {
  const isTouch = useTouchDevice();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (isTouch) return null;

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left gold-gradient shadow-md shadow-gold/30 pointer-events-none"
      aria-hidden="true"
    />
  );
}
