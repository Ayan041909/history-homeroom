"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, GraduationCap } from "lucide-react";

const MOCK_STUDENTS = [
  { id: "s1", name: "Alice Johnson", email: "alice@example.com", lessons: 14, quizzes: 8, assignments: 6, progress: 72 },
  { id: "s2", name: "Marcus Chen", email: "marcus@example.com", lessons: 22, quizzes: 15, assignments: 12, progress: 88 },
  { id: "s3", name: "Sofia Rodriguez", email: "sofia@example.com", lessons: 7, quizzes: 3, assignments: 4, progress: 41 },
  { id: "s4", name: "James Williams", email: "james@example.com", lessons: 18, quizzes: 11, assignments: 9, progress: 65 },
  { id: "s5", name: "Emma Davis", email: "emma@example.com", lessons: 30, quizzes: 20, assignments: 18, progress: 95 },
  { id: "s6", name: "Noah Brown", email: "noah@example.com", lessons: 5, quizzes: 2, assignments: 3, progress: 28 },
  { id: "s7", name: "Olivia Martinez", email: "olivia@example.com", lessons: 25, quizzes: 18, assignments: 14, progress: 82 },
];

export function StudentRoster() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_STUDENTS.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section aria-label="Student roster">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-heading text-2xl font-bold flex items-center gap-2">
            <Users size={22} className="text-gold" aria-hidden="true" />
            Student Roster
          </h2>
          <p className="text-muted-foreground text-sm mt-1">{MOCK_STUDENTS.length} total students</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 rounded-xl bg-muted border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors w-full sm:w-56"
            aria-label="Search students by name or email"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border overflow-hidden" role="table" aria-label="Student progress table">
        {/* Table Header */}
        <div className="bg-muted/50 px-4 py-3 grid grid-cols-12 gap-2 text-xs font-semibold text-muted-foreground" role="row">
          <span className="col-span-4" role="columnheader">Student</span>
          <span className="col-span-2 text-center" role="columnheader">Lessons</span>
          <span className="col-span-2 text-center" role="columnheader">Quizzes</span>
          <span className="col-span-2 text-center" role="columnheader">Tasks</span>
          <span className="col-span-2 text-center" role="columnheader">Progress</span>
        </div>

        <div role="rowgroup">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm" role="row">
              No students found matching &ldquo;{search}&rdquo;
            </div>
          ) : (
            filtered.map((student, i) => (
              <motion.div
                key={student.id}
                role="row"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="px-4 py-3 grid grid-cols-12 gap-2 items-center border-t border-border/50 hover:bg-muted/30 transition-colors"
                aria-label={`${student.name}: ${student.lessons} lessons, ${student.quizzes} quizzes, ${student.assignments} assignments, ${student.progress}% progress`}
              >
                <div className="col-span-4 flex items-center gap-3" role="cell">
                  <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center flex-shrink-0 shadow-sm">
                    <GraduationCap size={14} className="text-white" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{student.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{student.email}</p>
                  </div>
                </div>
                <div className="col-span-2 text-center text-sm font-medium" role="cell">{student.lessons}</div>
                <div className="col-span-2 text-center text-sm font-medium" role="cell">{student.quizzes}</div>
                <div className="col-span-2 text-center text-sm font-medium" role="cell">{student.assignments}</div>
                <div className="col-span-2" role="cell">
                  <div className="flex flex-col items-center gap-1">
                    <span className={`text-sm font-bold ${
                      student.progress >= 80 ? "text-green-500" :
                      student.progress >= 50 ? "text-gold" : "text-muted-foreground"
                    }`}>
                      {student.progress}%
                    </span>
                    <div className="w-full h-1 bg-muted rounded-full overflow-hidden" aria-label={`${student.progress}% complete`}>
                      <div
                        className={`h-full rounded-full transition-all ${
                          student.progress >= 80 ? "bg-green-500" :
                          student.progress >= 50 ? "gold-gradient" : "bg-muted-foreground"
                        }`}
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
