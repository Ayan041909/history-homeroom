"use client";

import { useEffect, useState } from "react";

/** Returns true synchronously on first render when running on a touch device. */
function detectTouch(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
    window.matchMedia("(max-width: 768px)").matches ||
    document.documentElement.classList.contains("touch-device")
  );
}

/**
 * True on phones/tablets and narrow viewports.
 * Initialises synchronously so the very first render already knows it's mobile —
 * avoids a hydration flash that would briefly apply desktop animations.
 */
export function useTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(detectTouch);

  useEffect(() => {
    const touchMq = window.matchMedia("(hover: none) and (pointer: coarse)");
    const narrowMq = window.matchMedia("(max-width: 768px)");

    const update = () =>
      setIsTouch(
        touchMq.matches ||
          narrowMq.matches ||
          document.documentElement.classList.contains("touch-device")
      );

    update();
    touchMq.addEventListener("change", update);
    narrowMq.addEventListener("change", update);
    return () => {
      touchMq.removeEventListener("change", update);
      narrowMq.removeEventListener("change", update);
    };
  }, []);

  return isTouch;
}
