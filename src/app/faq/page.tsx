"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Search, MessageCircle } from "lucide-react";
import Link from "next/link";

const FAQ_CATEGORIES = [
  {
    label: "All",
    id: "all",
  },
  { label: "Getting Started", id: "start" },
  { label: "Billing & Plans", id: "billing" },
  { label: "Tutoring", id: "tutoring" },
  { label: "Account", id: "account" },
  { label: "Security", id: "security" },
];

const FAQ_ITEMS = [
  {
    category: "start",
    question: "What is History Homeroom?",
    answer: "History Homeroom is an elite online educational platform that brings history to life through expert-led live tutoring sessions, 200+ interactive lessons, quizzes, and a vibrant community of history enthusiasts. Whether you're a student or a lifelong learner, we have something for you.",
  },
  {
    category: "start",
    question: "How do I create an account?",
    answer: "Click 'Get Started' in the top navigation, then sign up with your email and password or use Google Sign-In for instant access. Your account is created immediately and you can start exploring right away.",
  },
  {
    category: "start",
    question: "How do I book a tutoring session?",
    answer: "Navigate to your Home Dashboard after logging in and scroll to the Tutoring section. Choose between Group Tutoring, 1-on-1 Tutoring, or Peer Workshops. Click on your preferred format to see all 5 available daily sessions. Select a time slot, choose the number of seats, and confirm your booking.",
  },
  {
    category: "start",
    question: "Is there a free trial?",
    answer: "Yes! Every paid plan includes a full 1-week free trial — no credit card required. You can explore all features of your chosen plan and cancel anytime before the trial ends without being charged.",
  },
  {
    category: "billing",
    question: "What are the subscription plans?",
    answer: "We offer three plans:\n\n• Free ($0/month) — 10 free lessons, community forums, basic quizzes\n• Plus ($9.99/month) — Full lesson library (200+), group tutoring, priority booking, badges\n• Premium ($19.99/month) — Everything in Plus + unlimited 1-on-1 tutoring, custom study plans, certificates",
  },
  {
    category: "billing",
    question: "Can I switch plans at any time?",
    answer: "Absolutely. You can upgrade or downgrade your plan at any time from your Profile settings. Upgrades take effect immediately. Downgrades take effect at the start of your next billing cycle.",
  },
  {
    category: "billing",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) as well as PayPal and Apple Pay. All payments are processed securely through Stripe.",
  },
  {
    category: "billing",
    question: "How do I cancel my subscription?",
    answer: "You can cancel anytime from Profile → Subscription. After cancellation, you retain access to your paid features until the end of the current billing period. Your progress, badges, and data are always saved.",
  },
  {
    category: "tutoring",
    question: "What is the difference between tutoring types?",
    answer: "Group Tutoring (up to 20 students) is instructor-led, great for learning alongside peers. 1-on-1 Tutoring gives you private, dedicated time with an expert tutor. Peer Workshops (up to 8 students) are collaborative student-led sessions focused on projects and discussions.",
  },
  {
    category: "tutoring",
    question: "How many sessions are available per week?",
    answer: "Each tutoring type has 5 session slots available every week — one for each weekday (Monday through Friday). Sessions typically run 60–90 minutes depending on the format.",
  },
  {
    category: "tutoring",
    question: "Can I reschedule or cancel a booked session?",
    answer: "You can cancel a booked session up to 2 hours before the start time. Cancellations release your seat back to the pool. Rescheduling can be done by cancelling and rebooking another slot.",
  },
  {
    category: "account",
    question: "How do I reset my password?",
    answer: "On the Login page, click 'Forgot Password' and enter the email address associated with your account. We'll send you a secure reset link. If you signed up with Google, you can continue signing in with Google — no password reset is needed.",
  },
  {
    category: "account",
    question: "How do I update my profile information?",
    answer: "Visit your Profile page by clicking your name in the top navigation or the Settings icon on your dashboard. You can update your display name, profile photo, email preferences, and notification settings.",
  },
  {
    category: "account",
    question: "What are badges and how do I earn them?",
    answer: "Badges are achievement rewards that automatically unlock as you reach milestones — attending lessons, passing quizzes, completing assignments, and accumulating study time. They appear on your dashboard and profile as visible proof of your progress.",
  },
  {
    category: "security",
    question: "Is my personal data secure?",
    answer: "Yes. We use Firebase Authentication with enterprise-grade security, all data is transmitted over HTTPS/TLS encryption, and strict Firestore Security Rules ensure each user can only access their own data. We never sell or share your personal information with third parties.",
  },
  {
    category: "security",
    question: "What data does History Homeroom collect?",
    answer: "We collect only what's necessary to provide the service: your email, name, and learning progress. We do not collect payment card details directly — all billing is handled by Stripe. You can request a full data export or deletion at any time.",
  },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={`rounded-2xl border transition-all duration-300 ${open ? "border-gold/40 bg-gold/3" : "border-border bg-card"}`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus-visible:ring-2 focus-visible:ring-gold rounded-2xl"
        aria-expanded={open}
      >
        <span className="font-semibold text-sm sm:text-base">{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
          <ChevronDown size={18} className={open ? "text-gold" : "text-muted-foreground"} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = FAQ_ITEMS.filter((item) => {
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    const matchSearch = !search || item.question.toLowerCase().includes(search.toLowerCase()) || item.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(201,168,76,0.1),transparent)]" aria-hidden="true" />
        <div className="max-w-3xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium mb-6">
              <HelpCircle size={14} /> Frequently Asked Questions
            </div>
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl mb-4">
              Got <span className="gold-gradient-text">Questions?</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">We have answers. Browse by category or search below.</p>

            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-card border border-border focus:border-gold/60 focus:outline-none transition-colors shadow-sm"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-gold ${
                activeCategory === cat.id
                  ? "gold-gradient text-white shadow-md"
                  : "border border-border hover:border-gold/40 text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        {search && (
          <p className="text-sm text-muted-foreground mb-4">{filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;</p>
        )}

        {/* FAQ List */}
        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((item, i) => (
              <FAQItem key={`${item.category}-${i}`} question={item.question} answer={item.answer} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <HelpCircle size={40} className="text-muted-foreground mx-auto mb-4" />
            <p className="font-semibold mb-2">No results found</p>
            <p className="text-muted-foreground text-sm">Try a different search term or browse all categories.</p>
          </div>
        )}

        {/* Still need help? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          className="mt-16 p-8 rounded-3xl border border-gold/20 bg-gold/3 text-center"
        >
          <MessageCircle size={32} className="text-gold mx-auto mb-3" />
          <h2 className="font-heading font-bold text-2xl mb-2">Still need help?</h2>
          <p className="text-muted-foreground mb-6">Our support team typically responds within a few hours.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white gold-gradient hover:opacity-90 transition-opacity shadow-md"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
