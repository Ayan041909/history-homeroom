"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, UserCheck, Handshake, Calendar, Clock, ChevronDown, Check, X } from "lucide-react";
import { MOCK_SESSIONS } from "@/lib/mockData";
import { getTutorPhoto, getTutorImagePosition } from "@/lib/images";
import { ExternalImage } from "@/components/shared/ExternalImage";
import { useAuth } from "@/hooks/useAuth";
import type { TutoringType, Session } from "@/types";
const TUTORING_OPTIONS = [
  {
    type: "group" as TutoringType,
    label: "Group Tutoring",
    icon: <Users size={22} className="text-white" aria-hidden="true" />,
    description: "Join an instructor-led session with up to 20 students. Perfect for collaborative learning.",
    color: "from-blue-600 to-blue-400",
    maxSeats: 20,
  },
  {
    type: "1on1" as TutoringType,
    label: "1-on-1 Tutoring",
    icon: <UserCheck size={22} className="text-white" aria-hidden="true" />,
    description: "Get dedicated, personalized attention from an expert tutor in a private session.",
    color: "from-gold-dark to-gold",
    maxSeats: 1,
  },
  {
    type: "peer" as TutoringType,
    label: "Peer Workshop",
    icon: <Handshake size={22} className="text-white" aria-hidden="true" />,
    description: "Collaborate with fellow students on projects and discussions. Up to 8 participants.",
    color: "from-emerald-600 to-emerald-400",
    maxSeats: 8,
  },
];

function SessionCard({
  session,
  onBook,
  onCancel,
  currentUserId = "demo-user",
  userHasExistingBooking = false,
}: {
  session: Session;
  onBook: (sessionId: string) => void;
  onCancel: (sessionId: string) => void;
  currentUserId?: string;
  userHasExistingBooking?: boolean;
}) {
  const available = session.maxSeats - session.bookedSeats.length;
  const isBooked = session.bookedSeats.includes(currentUserId);
  const isFull = available <= 0;
  // True when the user has a booking in a *different* session
  const blockedByOtherBooking = userHasExistingBooking && !isBooked;

  return (
    <div
      className={`p-4 rounded-xl border transition-all ${
        isFull ? "border-border opacity-60" :
        isBooked ? "border-gold bg-gold/5" :
        "border-border hover:border-gold/40"
      }`}
      aria-label={`${session.day} session from ${session.startTime} to ${session.endTime}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar size={13} className="text-gold" aria-hidden="true" />
            <span className="font-semibold text-sm">{session.day}</span>
            {isBooked && (
              <span className="px-1.5 py-0.5 rounded-full bg-gold/15 text-gold text-[10px] font-bold flex items-center gap-0.5">
                <Check size={9} aria-hidden="true" /> Booked
              </span>
            )}
            {isFull && !isBooked && (
              <span className="px-1.5 py-0.5 rounded-full bg-destructive/10 text-destructive text-[10px] font-bold">Full</span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock size={12} aria-hidden="true" />
            {session.startTime} — {session.endTime}
          </div>
          {session.tutorName && (
            <div className="flex items-center gap-2 mt-1.5">
              {getTutorPhoto(session.tutorName) && (
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-gold/30 flex-shrink-0">
                  <ExternalImage
                    src={getTutorPhoto(session.tutorName)!}
                    alt=""
                    fill
                    sizes="24px"
                    className="object-cover"
                    style={{ objectPosition: getTutorImagePosition(session.tutorName) }}
                  />
                </div>
              )}
              <p className="text-xs text-muted-foreground">With {session.tutorName}</p>
            </div>
          )}
        </div>

        {!isBooked && (
          <div className="text-right flex-shrink-0">
            <p className={`text-lg font-heading font-black ${isFull ? "text-destructive" : "gold-gradient-text"}`}>
              {available}
            </p>
            <p className="text-[10px] text-muted-foreground">seats left</p>
          </div>
        )}
      </div>

      {/* Seat progress — hidden once you've booked */}
      {!isBooked && (
        <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-3" aria-label={`${available} of ${session.maxSeats} seats available`}>
          <div
            className={`h-full rounded-full transition-all ${isFull ? "bg-destructive" : "gold-gradient"}`}
            style={{ width: `${(session.bookedSeats.length / session.maxSeats) * 100}%` }}
          />
        </div>
      )}

      {/* Booking Controls */}
      {!isBooked && !isFull && !blockedByOtherBooking && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onBook(session.id)}
            className="flex-1 py-2 px-3 rounded-lg text-xs font-bold text-white gold-gradient hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={`Book 1 seat for ${session.day} session`}
          >
            Book 1 Seat
          </button>
        </div>
      )}

      {/* Blocked — user already has an active booking */}
      {!isBooked && blockedByOtherBooking && (
        <p className="text-[11px] text-muted-foreground italic">
          Cancel your existing booking before reserving another session.
        </p>
      )}

      {isBooked && (
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <p className="text-xs text-gold font-medium flex items-center gap-1 min-w-0">
            <Check size={12} className="flex-shrink-0" aria-hidden="true" />
            <span className="truncate">You have a booking for this session</span>
          </p>
          <button
            type="button"
            onClick={() => onCancel(session.id)}
            className="flex-shrink-0 px-2.5 py-1 rounded-md border border-border text-[10px] font-semibold text-muted-foreground hover:text-destructive hover:border-destructive/40 hover:bg-destructive/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={`Cancel booking for ${session.day} session`}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export function TutoringBooking() {
  const { user, profile } = useAuth();
  const currentUserId = user?.id ?? profile?.uid ?? "demo-user";
  const [activeType, setActiveType] = useState<TutoringType | null>(null);
  const [sessions, setSessions] = useState(MOCK_SESSIONS);
  const [bookedConfirm, setBookedConfirm] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);

  // True when the student already holds any active booking across all sessions
  const userHasExistingBooking = sessions.some((s) =>
    s.bookedSeats.includes(currentUserId)
  );

  const handleBook = (sessionId: string) => {
    if (userHasExistingBooking) {
      setConfirmError("You already have an active booking. Cancel it before reserving another session.");
      setTimeout(() => setConfirmError(null), 4000);
      return;
    }
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? { ...s, bookedSeats: [...s.bookedSeats, currentUserId] }
          : s
      )
    );
    setBookedConfirm("Successfully booked 1 seat!");
    setTimeout(() => setBookedConfirm(null), 3000);
  };

  const handleCancel = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? { ...s, bookedSeats: s.bookedSeats.filter((id) => id !== currentUserId) }
          : s
      )
    );
    setBookedConfirm("Booking cancelled.");
    setTimeout(() => setBookedConfirm(null), 3000);
  };

  const filteredSessions = sessions.filter((s) => s.type === activeType);

  return (
    <section id="tutoring" aria-label="Book a tutoring session">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-6"
      >
        <h2 className="font-heading text-2xl font-bold">Book a Session</h2>
        <p className="text-muted-foreground text-sm mt-1">Choose a tutoring format and reserve your spot</p>
      </motion.div>

      {/* Confirmation / error toasts */}
      <AnimatePresence>
        {bookedConfirm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm mb-4"
            role="alert"
            aria-live="polite"
          >
            <Check size={15} aria-hidden="true" />
            {bookedConfirm}
          </motion.div>
        )}
        {confirmError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-4"
            role="alert"
            aria-live="polite"
          >
            <X size={15} aria-hidden="true" />
            {confirmError}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Option Cards — mobile: each card expands its own sessions inline */}
      {/*                 desktop (sm+): 3-col grid, shared panel below */}
      <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 mb-6">
        {TUTORING_OPTIONS.map((opt, i) => {
          const isActive = activeType === opt.type;
          const optSessions = sessions.filter((s) => s.type === opt.type);
          return (
            <div key={opt.type} className="flex flex-col">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => setActiveType(isActive ? null : opt.type)}
                className={`p-5 rounded-2xl border-2 text-left transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-gold ${
                  isActive
                    ? "border-gold bg-gold/8 shadow-lg shadow-gold/10"
                    : "border-border hover:border-gold/40 bg-card"
                }`}
                aria-expanded={isActive}
                aria-controls={`sessions-mobile-${opt.type}`}
                aria-label={`${opt.label}: ${opt.description}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${opt.color} flex items-center justify-center shadow-md`}>
                    {opt.icon}
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground transition-transform duration-300 ${isActive ? "rotate-180 text-gold" : ""}`}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-bold text-sm mb-1">{opt.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{opt.description}</p>
              </motion.button>

              {/* Mobile-only inline sessions panel, appears right below the tapped card */}
              <div className="sm:hidden">
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      id={`sessions-mobile-${opt.type}`}
                      key={opt.type}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 p-4 rounded-2xl border border-gold/20 bg-gold/3">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-bold text-sm">{opt.label} — Sessions</p>
                            <p className="text-xs text-muted-foreground">{optSessions.length} sessions this week</p>
                          </div>
                          <button
                            onClick={() => setActiveType(null)}
                            className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Close sessions"
                          >
                            <X size={15} />
                          </button>
                        </div>
                        <div className="flex flex-col gap-3" role="list" aria-label={`${opt.label} sessions`}>
                          {optSessions.map((session) => (
                            <div key={session.id} role="listitem">
                              <SessionCard
                                session={session}
                                onBook={handleBook}
                                onCancel={handleCancel}
                                currentUserId={currentUserId}
                                userHasExistingBooking={userHasExistingBooking}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop-only shared sessions panel below all three cards */}
      <div className="hidden sm:block">
        <AnimatePresence>
          {activeType && (
            <motion.div
              key={activeType}
              id={`sessions-${activeType}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden mb-6"
            >
              <div className="p-5 rounded-2xl border border-gold/20 bg-gold/3">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-heading font-bold text-lg">
                      {TUTORING_OPTIONS.find((o) => o.type === activeType)?.label} — Available Sessions
                    </h3>
                    <p className="text-xs text-muted-foreground">{filteredSessions.length} sessions available this week</p>
                  </div>
                  <button
                    onClick={() => setActiveType(null)}
                    className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close sessions panel"
                  >
                    <X size={15} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3" role="list" aria-label={`${activeType} sessions`}>
                  {filteredSessions.map((session) => (
                    <div key={session.id} role="listitem">
                      <SessionCard
                        session={session}
                        onBook={handleBook}
                        onCancel={handleCancel}
                        currentUserId={currentUserId}
                        userHasExistingBooking={userHasExistingBooking}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
