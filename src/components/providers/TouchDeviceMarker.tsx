"use client";

import { useEffect } from "react";

const TOUCH_CLASS = "touch-device";

/** Marks the document for mobile/touch CSS overrides as early as possible. */
export function TouchDeviceMarker() {
  useEffect(() => {
    const touchMq = window.matchMedia("(hover: none) and (pointer: coarse)");
    const narrowMq = window.matchMedia("(max-width: 768px)");

    const apply = () => {
      const isTouch = touchMq.matches || narrowMq.matches;
      document.documentElement.classList.toggle(TOUCH_CLASS, isTouch);
    };

    apply();
    touchMq.addEventListener("change", apply);
    narrowMq.addEventListener("change", apply);
    return () => {
      touchMq.removeEventListener("change", apply);
      narrowMq.removeEventListener("change", apply);
    };
  }, []);

  return null;
}
