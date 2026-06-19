"use client";

import { motion } from "framer-motion";
import { BookOpen, Settings, Bell } from "lucide-react";
import { ProgressCounters } from "@/components/home/ProgressCounters";
import { BadgesSection } from "@/components/home/BadgesSection";
import { TutoringBooking } from "@/components/home/TutoringBooking";
import { FAQSection } from "@/components/home/FAQSection";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/shared/Toast";
import Link from "next/link";

export default function HomePage() {
  return (
    <RequireAuth>
      <HomePageInner />
    </RequireAuth>
  );
}

function HomePageInner() {
  const { progress, earnedBadges } = useProgress();
  const { profile } = useAuth();
  const toast = useToast();

  const handleNotifications = () => {
    toast.info(
      "No new notifications",
      "We'll alert you here when a tutor confirms a session, a badge unlocks, or a new lesson drops."
    );
  };

  const displayName = profile?.name ?? "Learner";
  const timeOfDay = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start justify-between gap-3"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center shadow-md flex-shrink-0">
                  <BookOpen size={18} className="text-white" aria-hidden="true" />
                </div>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Dashboard</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-4xl font-black mt-2 break-words">
                {timeOfDay()},{" "}
                <span className="gold-gradient-text">{displayName}</span> 👋
              </h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                You have {progress.lessonsAttended} lessons under your belt. Keep it up!
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={handleNotifications}
                className="w-9 h-9 rounded-xl border border-border hover:border-gold/40 flex items-center justify-center hover:bg-gold/5 transition-colors focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="View notifications"
              >
                <Bell size={16} />
              </button>
              <Link
                href="/profile"
                className="w-9 h-9 rounded-xl border border-border hover:border-gold/40 flex items-center justify-center hover:bg-gold/5 transition-colors focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Open account settings"
              >
                <Settings size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-14">
        <ProgressCounters progress={progress} />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden="true" />

        <BadgesSection earnedBadges={earnedBadges} />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden="true" />

        <TutoringBooking />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden="true" />

        <FAQSection />
      </div>
    </div>
  );
}
