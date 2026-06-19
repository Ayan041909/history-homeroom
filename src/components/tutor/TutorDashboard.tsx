"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, Star, Calendar, TrendingUp } from "lucide-react";

const STATS = [
  { label: "Total Students", value: "47", icon: <Users size={20} className="text-white" />, color: "gold-gradient", change: "+3 this week" },
  { label: "Classes Taught", value: "12", icon: <BookOpen size={20} className="text-white" />, color: "bg-gradient-to-br from-blue-600 to-blue-400", change: "+1 this month" },
  { label: "Avg. Rating", value: "4.9", icon: <Star size={20} className="text-white" />, color: "bg-gradient-to-br from-yellow-600 to-yellow-400", change: "⭐⭐⭐⭐⭐" },
  { label: "Sessions This Week", value: "15", icon: <Calendar size={20} className="text-white" />, color: "bg-gradient-to-br from-emerald-600 to-emerald-400", change: "5 remaining" },
];

const UPCOMING = [
  { day: "Monday", time: "10:00 AM", title: "Ancient Civilizations", students: 18, type: "Group" },
  { day: "Tuesday", time: "2:00 PM", title: "WW2 Deep Dive", students: 1, type: "1-on-1" },
  { day: "Wednesday", time: "10:00 AM", title: "Ancient Civilizations", students: 18, type: "Group" },
  { day: "Thursday", time: "2:00 PM", title: "WW2 Deep Dive", students: 8, type: "Peer" },
  { day: "Friday", time: "1:00 PM", title: "Renaissance Art & Culture", students: 12, type: "Group" },
];

export function TutorDashboard() {
  return (
    <>
      {/* Stats Grid */}
      <section className="mb-10" aria-label="Tutor statistics">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5"
        >
          <h2 className="font-heading text-2xl font-bold">Overview</h2>
          <p className="text-muted-foreground text-sm">Your teaching performance at a glance</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" role="list" aria-label="Performance statistics">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              role="listitem"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-5 rounded-2xl border border-border bg-card hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 group"
              aria-label={`${stat.label}: ${stat.value}`}
            >
              <div className={`w-11 h-11 rounded-xl ${stat.color} flex items-center justify-center mb-3 shadow-md group-hover:scale-105 transition-transform`} aria-hidden="true">
                {stat.icon}
              </div>
              <p className="text-3xl font-heading font-black gold-gradient-text">{stat.value}</p>
              <p className="text-sm font-medium">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                <TrendingUp size={10} aria-hidden="true" /> {stat.change}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upcoming Sessions */}
      <section className="mb-10" aria-label="Upcoming sessions this week">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-5"
        >
          <h2 className="font-heading text-2xl font-bold flex items-center gap-2">
            <Calendar size={22} className="text-gold" aria-hidden="true" />
            This Week&apos;s Sessions
          </h2>
          <p className="text-muted-foreground text-sm">Your upcoming scheduled sessions</p>
        </motion.div>

        <div className="space-y-3" role="list" aria-label="Upcoming teaching sessions">
          {UPCOMING.map((session, i) => (
            <motion.div
              key={i}
              role="listitem"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
              className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-gold/30 transition-all group"
              aria-label={`${session.day} at ${session.time}: ${session.title}, ${session.students} students, ${session.type}`}
            >
              <div className="w-14 h-14 rounded-xl gold-gradient flex flex-col items-center justify-center shadow-md flex-shrink-0">
                <span className="text-white font-bold text-xs leading-tight">{session.day.slice(0, 3).toUpperCase()}</span>
                <span className="text-white/80 text-[10px] leading-tight">{session.time.split(" ")[0]}</span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate group-hover:text-gold transition-colors">{session.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{session.time} · {session.students} student{session.students !== 1 ? "s" : ""}</p>
              </div>

              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold flex-shrink-0 ${
                session.type === "Group" ? "bg-blue-500/10 text-blue-500" :
                session.type === "1-on-1" ? "bg-gold/15 text-gold" :
                "bg-emerald-500/10 text-emerald-500"
              }`}>
                {session.type}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
