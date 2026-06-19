"use client";

import { motion } from "framer-motion";
import { Lock, Award } from "lucide-react";
import { BADGE_DEFINITIONS } from "@/lib/badges";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function BadgesSection({ earnedBadges }: { earnedBadges: string[] }) {
  const earned = BADGE_DEFINITIONS.filter((b) => earnedBadges.includes(b.id));
  const locked = BADGE_DEFINITIONS.filter((b) => !earnedBadges.includes(b.id));

  return (
    <section aria-label="Your badges and achievements">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold flex items-center gap-2">
              <Award size={22} className="text-gold" aria-hidden="true" />
              Badges
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {earned.length} of {BADGE_DEFINITIONS.length} badges earned
            </p>
          </div>
          {/* Progress ring */}
          <div className="relative w-14 h-14" aria-label={`Badge progress: ${earned.length} of ${BADGE_DEFINITIONS.length}`}>
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="22" fill="none" stroke="var(--border)" strokeWidth="4" />
              <circle
                cx="28" cy="28" r="22" fill="none"
                stroke="var(--gold)" strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 22}`}
                strokeDashoffset={`${2 * Math.PI * 22 * (1 - earned.length / BADGE_DEFINITIONS.length)}`}
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gold">
              {Math.round((earned.length / BADGE_DEFINITIONS.length) * 100)}%
            </span>
          </div>
        </div>
      </motion.div>

      {/* Earned Badges */}
      {earned.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Earned</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-5 gap-3" role="list" aria-label="Earned badges">
            {earned.map((badge, i) => (
              <Tooltip key={badge.id}>
                <TooltipTrigger>
                  <motion.div
                    role="listitem"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-gold/30 bg-gold/5 hover:bg-gold/10 hover:border-gold/60 transition-all cursor-pointer group"
                    aria-label={`${badge.name}: ${badge.description}`}
                  >
                    <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center text-2xl shadow-md group-hover:shadow-gold/30 group-hover:scale-105 transition-all">
                      {badge.icon}
                    </div>
                    <p className="text-xs font-semibold text-center leading-tight">{badge.name}</p>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <div>
                    <p className="font-semibold">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                    <p className="text-xs text-gold mt-1">Req: {badge.requirement}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      )}

      {/* Locked Badges */}
      {locked.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Locked</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-5 gap-3" role="list" aria-label="Locked badges">
            {locked.map((badge) => (
              <Tooltip key={badge.id}>
                <TooltipTrigger>
                  <div
                    role="listitem"
                    className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-border bg-muted/30 opacity-50 cursor-pointer hover:opacity-70 transition-opacity"
                    aria-label={`Locked badge: ${badge.name}. Requirement: ${badge.requirement}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center relative">
                      <span className="text-2xl grayscale">{badge.icon}</span>
                      <Lock size={10} className="absolute bottom-0.5 right-0.5 text-muted-foreground" aria-hidden="true" />
                    </div>
                    <p className="text-xs font-medium text-center leading-tight text-muted-foreground">{badge.name}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div>
                    <p className="font-semibold">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                    <p className="text-xs text-gold mt-1">Unlock: {badge.requirement}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
