"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Radio, Users, Clock, ArrowRight } from "lucide-react";
import { ExternalImage } from "@/components/shared/ExternalImage";
import { getTutorPhoto, getTutorImagePosition } from "@/lib/images";
import { useAuth } from "@/hooks/useAuth";

/**
 * Animated rotating "Live now" banner — cycles through current/upcoming
 * sessions to convey activity without needing real-time backend data.
 */
const LIVE_SESSIONS = [
  { title: "Causes of WWI — Open Discussion", tutor: "Ayan Gupta", spots: 3, type: "Group" },
  { title: "Renaissance Art Workshop", tutor: "Lakshay Rastogi", spots: 1, type: "Peer" },
  { title: "Ancient Egypt 1-on-1", tutor: "Ashton Andrade", spots: 1, type: "1-on-1" },
  { title: "Cold War Crisis Lab", tutor: "Lakshay Rastogi", spots: 5, type: "Group" },
];

export function LiveSessionsBanner() {
  const [idx, setIdx] = useState(0);
  const { user, profile } = useAuth();
  const signedIn = !!profile;
  const sessionHref = signedIn ? "/home" : "/login?signup=true&redirect=%2Fhome";

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % LIVE_SESSIONS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const session = LIVE_SESSIONS[idx];

  return (
    <section className="px-4 sm:px-6 -mt-1" aria-label="Live sessions banner">
      <div className="max-w-6xl mx-auto">
        <Link
          href={sessionHref}
          className="group flex flex-wrap items-center gap-3 sm:gap-4 px-5 py-3 rounded-2xl transition-all glass-gold border border-gold/25 hover:border-gold/45"
          aria-label={signedIn ? "Join live session — open your dashboard" : "Join live session — sign up or sign in to open your dashboard"}
        >
          <span
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 text-[11px] font-bold uppercase tracking-wider relative"
          >
            <Radio size={11} aria-hidden="true" />
            <span className="absolute -left-1 -top-1 w-2 h-2 rounded-full bg-red-500 animate-ping" aria-hidden="true" />
            Live now
          </span>

          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-4 text-sm min-w-0"
              >
                <span className="font-semibold text-foreground truncate max-w-full sm:max-w-none">{session.title}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-[11px] font-bold shrink-0">
                  <Users size={10} aria-hidden="true" /> {session.spots} spot{session.spots > 1 ? "s" : ""} left
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground font-medium shrink-0">
                  <Clock size={11} aria-hidden="true" />
                  {getTutorPhoto(session.tutor) && (
                    <span className="relative w-5 h-5 rounded-full overflow-hidden border border-gold/30 flex-shrink-0">
                      <ExternalImage
                        src={getTutorPhoto(session.tutor)!}
                        alt=""
                        fill
                        sizes="20px"
                        className="object-cover"
                        style={{ objectPosition: getTutorImagePosition(session.tutor) }}
                      />
                    </span>
                  )}
                  with {session.tutor}
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/10 text-gold text-[11px] font-bold shrink-0">
                  {session.type}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <span className="flex items-center gap-1 text-xs font-bold text-gold whitespace-nowrap">
            Join <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
}
