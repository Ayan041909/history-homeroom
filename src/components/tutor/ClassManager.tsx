"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, BookOpen, Users, Clock } from "lucide-react";
import { MOCK_CLASSES } from "@/lib/mockData";
import type { HistoricalClass } from "@/types";

const SUBJECTS = ["Ancient History", "Medieval History", "Modern History", "Cultural History", "World History", "Scientific History"];

export function ClassManager() {
  const [classes, setClasses] = useState<HistoricalClass[]>(MOCK_CLASSES);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subject: SUBJECTS[0],
    description: "",
    schedule: "",
    maxStudents: 20,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newClass: HistoricalClass = {
      id: `c${Date.now()}`,
      tutorId: "tutor1",
      ...form,
      enrolledStudents: [],
    };
    setClasses((c) => [newClass, ...c]);
    setForm({ title: "", subject: SUBJECTS[0], description: "", schedule: "", maxStudents: 20 });
    setShowForm(false);
  };

  return (
    <section aria-label="Class management">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-2xl font-bold">My Classes</h2>
          <p className="text-muted-foreground text-sm mt-1">{classes.length} active classes</p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl gold-gradient text-white text-sm font-bold hover:opacity-90 transition-opacity shadow-md shadow-gold/20 focus-visible:ring-2 focus-visible:ring-gold"
          aria-label="Create a new class"
          aria-expanded={showForm}
        >
          <Plus size={15} aria-hidden="true" />
          New Class
        </button>
      </div>

      {/* Create Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <form
              onSubmit={handleCreate}
              className="p-5 rounded-2xl border border-gold/20 bg-gold/3 space-y-4"
              aria-label="Create new class form"
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold">Create New Class</h3>
                <button type="button" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground" aria-label="Cancel class creation">
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="class-title" className="block text-xs font-medium mb-1.5">Class Title *</label>
                  <input
                    id="class-title"
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    required
                    placeholder="e.g., Ancient Rome Deep Dive"
                    className="w-full px-3 py-2.5 rounded-xl bg-background border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="class-subject" className="block text-xs font-medium mb-1.5">Subject *</label>
                  <select
                    id="class-subject"
                    value={form.subject}
                    onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-background border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors"
                  >
                    {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="class-desc" className="block text-xs font-medium mb-1.5">Description</label>
                  <textarea
                    id="class-desc"
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    placeholder="What will students learn in this class?"
                    rows={2}
                    className="w-full px-3 py-2.5 rounded-xl bg-background border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors resize-none"
                  />
                </div>
                <div>
                  <label htmlFor="class-schedule" className="block text-xs font-medium mb-1.5">Schedule *</label>
                  <input
                    id="class-schedule"
                    type="text"
                    value={form.schedule}
                    onChange={(e) => setForm((f) => ({ ...f, schedule: e.target.value }))}
                    required
                    placeholder="e.g., Mon/Wed 10am"
                    className="w-full px-3 py-2.5 rounded-xl bg-background border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="class-max" className="block text-xs font-medium mb-1.5">Max Students</label>
                  <input
                    id="class-max"
                    type="number"
                    min={1} max={50}
                    value={form.maxStudents}
                    onChange={(e) => setForm((f) => ({ ...f, maxStudents: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-background border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-white font-bold text-sm gold-gradient hover:opacity-90 transition-opacity shadow-md focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Create the class"
              >
                Create Class
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Classes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="list" aria-label="Your classes">
        {classes.map((cls, i) => (
          <motion.div
            key={cls.id}
            role="listitem"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="p-5 rounded-2xl border border-border bg-card hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300 group"
            aria-label={`${cls.title} class`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center shadow-md group-hover:shadow-gold/30 transition-shadow">
                <BookOpen size={18} className="text-white" aria-hidden="true" />
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-gold/10 text-gold text-[11px] font-semibold border border-gold/20">
                {cls.subject}
              </span>
            </div>

            <h3 className="font-heading font-bold text-base mb-1 group-hover:text-gold transition-colors line-clamp-1">{cls.title}</h3>
            {cls.description && (
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{cls.description}</p>
            )}

            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock size={12} aria-hidden="true" /> {cls.schedule}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users size={12} aria-hidden="true" />
                {cls.enrolledStudents.length} / {cls.maxStudents} enrolled
              </div>
            </div>

            {/* Enrollment bar */}
            <div className="h-1.5 bg-muted rounded-full overflow-hidden" aria-label={`${cls.enrolledStudents.length} of ${cls.maxStudents} students enrolled`}>
              <div
                className="h-full gold-gradient rounded-full transition-all"
                style={{ width: `${(cls.enrolledStudents.length / cls.maxStudents) * 100}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
