"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, ChevronDown, User, Phone, Mail, Paperclip, CheckCircle2, Loader2 } from "lucide-react";

const OPEN_ROLES = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
    description: "Help build and scale our Next.js + Firebase platform. You'll own key features end-to-end, from API design to polished UI.",
  },
  {
    title: "History Content Writer",
    department: "Content",
    location: "Remote",
    type: "Full-time",
    description: "Craft engaging, rigorously researched lesson content covering world history. AP/IB curriculum experience preferred.",
  },
  {
    title: "Curriculum Designer",
    department: "Education",
    location: "Remote",
    type: "Full-time",
    description: "Design structured learning paths, quizzes, and assessments that align with US and international history standards.",
  },
  {
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote (US)",
    type: "Full-time",
    description: "Lead growth initiatives across SEO, paid channels, and social media. Experience in ed-tech or consumer SaaS is a plus.",
  },
  {
    title: "Freelance History Tutor",
    department: "Tutoring",
    location: "Remote",
    type: "Contract",
    description: "Deliver live 1-on-1 and group tutoring sessions. We're looking for passionate educators with subject-matter expertise.",
  },
];

const PERKS = [
  { emoji: "🌍", label: "100% Remote", desc: "Work from anywhere in the world." },
  { emoji: "📚", label: "Learning Budget", desc: "$1,000/year for courses, books, and conferences." },
  { emoji: "🏥", label: "Health Benefits", desc: "Full medical, dental, and vision for US employees." },
  { emoji: "🕐", label: "Flexible Hours", desc: "Async-first culture — you set your schedule." },
  { emoji: "📈", label: "Equity", desc: "Early-stage options for all full-time hires." },
  { emoji: "🎓", label: "Free Access", desc: "Unlimited History Homeroom access for you and family." },
];

type FormState = { name: string; phone: string; email: string; fileName: string; status: "idle" | "loading" | "success" };

function RoleCard({ role }: { role: typeof OPEN_ROLES[number] }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", phone: "", email: "", fileName: "", status: "idle" });
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setForm((f) => ({ ...f, fileName: file.name }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setForm((f) => ({ ...f, status: "loading" }));
    // Simulate submission — replace with real API call
    setTimeout(() => setForm((f) => ({ ...f, status: "success" })), 1400);
  }

  const inputBase =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 transition-colors";

  return (
    <div className={`rounded-2xl border transition-colors ${open ? "border-gold/40 bg-card" : "border-border bg-card hover:border-gold/30"}`}>
      {/* Header row — click to toggle */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left p-6 flex flex-wrap items-start justify-between gap-3"
        aria-expanded={open}
      >
        <div>
          <h3 className="font-bold text-foreground">{role.title}</h3>
          <span className="text-xs text-gold font-medium">{role.department}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground border border-border rounded-full px-2.5 py-1">
            <MapPin size={10} /> {role.location}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground border border-border rounded-full px-2.5 py-1">
            <Clock size={10} /> {role.type}
          </span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={16} className="text-muted-foreground" />
          </motion.div>
        </div>
      </button>

      {/* Description + form */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-border/60 pt-4 space-y-5">
              <p className="text-muted-foreground text-sm leading-relaxed">{role.description}</p>

              {form.status === "success" ? (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-500 text-sm font-medium">
                  <CheckCircle2 size={18} />
                  Application submitted! We&rsquo;ll be in touch soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" aria-label={`Apply for ${role.title}`}>
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Quick Apply</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="relative">
                      <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      <input
                        type="text"
                        required
                        placeholder="Full name"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className={`${inputBase} pl-9`}
                      />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      <input
                        type="tel"
                        required
                        placeholder="Phone number"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        className={`${inputBase} pl-9`}
                      />
                    </div>

                    {/* Email — full width */}
                    <div className="relative sm:col-span-2">
                      <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      <input
                        type="email"
                        required
                        placeholder="Email address"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className={`${inputBase} pl-9`}
                      />
                    </div>
                  </div>

                  {/* Resume upload */}
                  <div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFile}
                      className="sr-only"
                      aria-label="Upload resume"
                    />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-dashed border-border hover:border-gold/50 bg-background transition-colors text-sm"
                    >
                      <Paperclip size={15} className="text-muted-foreground shrink-0" />
                      <span className={form.fileName ? "text-foreground" : "text-muted-foreground"}>
                        {form.fileName || "Attach resume (PDF, DOC, DOCX)"}
                      </span>
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={form.status === "loading"}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white disabled:opacity-70 transition-opacity"
                    style={{ background: "linear-gradient(135deg, #B8760A 0%, #D98A0E 100%)" }}
                  >
                    {form.status === "loading" ? (
                      <><Loader2 size={15} className="animate-spin" /> Submitting…</>
                    ) : (
                      <>Submit Application <ArrowRight size={14} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/8 text-gold text-xs font-semibold mb-6">
            <Briefcase size={13} />
            We&rsquo;re Hiring
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black mb-4">
            Join History Homeroom
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            We&rsquo;re a small, passionate team on a mission to make history education the most engaging subject in school. Come build with us.
          </p>
        </div>

        {/* Perks */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl font-bold mb-6">Why work here?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PERKS.map(({ emoji, label, desc }) => (
              <div key={label} className="p-5 rounded-2xl border border-border bg-card">
                <div className="text-2xl mb-2">{emoji}</div>
                <div className="font-semibold text-foreground text-sm mb-1">{label}</div>
                <div className="text-muted-foreground text-xs leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Open roles */}
        <section>
          <h2 className="font-heading text-2xl font-bold mb-6">Open Roles</h2>
          <p className="text-muted-foreground text-sm mb-6">Click any role to read more and apply directly.</p>
          <div className="space-y-4">
            {OPEN_ROLES.map((role) => (
              <RoleCard key={role.title} role={role} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-14 p-8 rounded-2xl border border-gold/30 bg-gold/5 text-center">
          <h3 className="font-bold text-foreground mb-2">Don&rsquo;t see a fit?</h3>
          <p className="text-muted-foreground text-sm mb-5">We&rsquo;re always happy to hear from talented people. Send us your resume and tell us how you&rsquo;d contribute.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white"
            style={{ background: "linear-gradient(135deg, #B8760A 0%, #D98A0E 100%)" }}
          >
            Get in touch <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-10 pt-8 border-t border-border text-sm text-muted-foreground">
          <Link href="/" className="hover:text-gold transition-colors">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
