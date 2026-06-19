"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Phone, MapPin, Send, Check, Clock, Headphones } from "lucide-react";

const TOPICS = ["General Question", "Billing & Payments", "Technical Support", "Tutoring Inquiry", "Partnership / Press", "Report an Issue", "Other"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: TOPICS[0], message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSending(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="relative py-16 px-4 sm:px-6 border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(201,168,76,0.08),transparent)]" aria-hidden="true" />
        <div className="max-w-2xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium mb-5">
              <MessageSquare size={14} /> Get in Touch
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl mb-3">
              We&apos;d Love to <span className="gold-gradient-text">Hear from You</span>
            </h1>
            <p className="text-muted-foreground text-lg">Our team typically responds within a few hours.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 space-y-5">
            {[
              { icon: <Mail size={20} className="text-white" />, label: "Email Us", value: "support@historyhomeroom.org", sub: "We reply within 4 hours" },
              { icon: <Phone size={20} className="text-white" />, label: "Call Us", value: "+1 (602) 775-7017", sub: "Mon–Fri, 9am–6pm EST" },
              { icon: <MapPin size={20} className="text-white" />, label: "Our Office", value: "Phoenix, AZ", sub: "Remote-first team worldwide" },
              { icon: <Clock size={20} className="text-white" />, label: "Support Hours", value: "24/7 Chat Support", sub: "Use the chat bot anytime" },
            ].map((item) => (
              <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover:border-gold/30 transition-all">
                <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center shadow-md flex-shrink-0">{item.icon}</div>
                <div>
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-sm mt-0.5">{item.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                </div>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="p-5 rounded-2xl border border-gold/20 bg-gold/5">
              <div className="flex items-center gap-2 mb-2">
                <Headphones size={18} className="text-gold" />
                <span className="font-semibold text-sm">Need immediate help?</span>
              </div>
              <p className="text-xs text-muted-foreground">Use the gold chat button at the bottom right corner of any page for instant answers.</p>
            </motion.div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gold/30">
                    <Check size={36} className="text-white" />
                  </div>
                  <h2 className="font-heading font-bold text-2xl mb-2">Message Sent!</h2>
                  <p className="text-muted-foreground mb-2">Thanks for reaching out, <strong>{form.name}</strong>.</p>
                  <p className="text-muted-foreground text-sm">We&apos;ll reply to <strong>{form.email}</strong> within a few hours.</p>
                  <button onClick={() => { setSent(false); setForm({ name: "", email: "", topic: TOPICS[0], message: "" }); }}
                    className="mt-8 px-6 py-2.5 rounded-xl border border-gold/40 text-gold hover:bg-gold/10 transition-colors text-sm font-medium">
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <h2 className="font-heading font-bold text-2xl mb-2">Send a Message</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1.5">Your Name *</label>
                      <input type="text" required placeholder="Full name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5">Email Address *</label>
                      <input type="email" required placeholder="you@email.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5">Topic</label>
                    <select value={form.topic} onChange={(e) => setForm((f) => ({ ...f, topic: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors">
                      {TOPICS.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5">Message *</label>
                    <textarea required rows={6} placeholder="Tell us what's on your mind..." value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors resize-none" />
                  </div>

                  <button type="submit" disabled={sending || !form.name || !form.email || !form.message}
                    className="w-full py-4 rounded-2xl font-bold text-white gold-gradient shadow-lg shadow-gold/20 hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2">
                    {sending
                      ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                      : <><Send size={16} /> Send Message</>
                    }
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
