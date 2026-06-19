"use client";

import { useEffect } from "react";
import { useTouchDevice } from "@/hooks/useTouchDevice";

/**
 * On touch devices, Framer Motion's whileInView often never fires on iOS
 * Safari, leaving elements permanently at opacity:0 in their inline style.
 * CSS !important rules in a stylesheet CAN override inline styles, but only
 * if the browser resolves the cascade after the inline style is set.
 * This component provides a belt-and-suspenders JS fix: it scans the DOM
 * and forcibly removes framer-motion's opacity:0 inline styles.
 *
 * We only zero out translateY (framer's typical "slide-in" offset) — we
 * intentionally leave translateX, scale, etc. alone so Tailwind layout
 * utilities like -translate-x-1/2 continue to work.
 */
export function MobileMotionFix() {
  const isTouch = useTouchDevice();

  useEffect(() => {
    if (!isTouch) return;

    const fix = () => {
      document.querySelectorAll<HTMLElement>("[style]").forEach((el) => {
        // Force opacity visible
        if (el.style.opacity === "0") {
          el.style.setProperty("opacity", "1", "important");
        }

        // Zero out translateY offsets set by framer-motion initial states
        // e.g. "translateX(0px) translateY(40px) translateZ(0)"
        // but leave translateX and scale untouched (used by layout utilities)
        const t = el.style.transform;
        if (t && /translateY\(-?[1-9]/.test(t) && !el.classList.contains("embla-container")) {
          el.style.transform = t.replace(/translateY\([^)]*\)/g, "translateY(0px)");
        }
      });
    };

    // Run immediately, then again at increasing intervals to catch
    // elements that mount after the initial render
    fix();
    const t1 = setTimeout(fix, 50);
    const t2 = setTimeout(fix, 200);
    const t3 = setTimeout(fix, 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isTouch]);

  return null;
}
