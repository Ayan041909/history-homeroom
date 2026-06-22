"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTouchDevice } from "@/hooks/useTouchDevice";

interface Message {
  id: string;
  role: "bot" | "user";
  content: string;
  timestamp: Date;
}

const QUICK_SUGGESTIONS = [
  "How do I book a session?",
  "What's included in Premium?",
  "How do badges work?",
  "I need help navigating",
];

function getBotResponse(input: string, pathname: string): string {
  const q = input.toLowerCase();

  if (q.includes("book") || q.includes("session") || q.includes("tutoring")) {
    return "To book a tutoring session, go to your **Home Dashboard** and scroll to the Tutoring section. Choose from Group Tutoring, 1-on-1, or Peer Workshops — then pick any of the 5 available daily sessions and select your seats. Easy!";
  }
  if (q.includes("premium") || q.includes("plus") || q.includes("pricing") || q.includes("plan") || q.includes("subscription")) {
    return "We have 3 plans:\n\n• **Free** ($0/mo) — Basic lessons & community\n• **Plus** ($9.99/mo) — All lessons, group tutoring, priority booking\n• **Premium** ($19.99/mo) — Everything in Plus + unlimited 1-on-1 sessions\n\nAll plans include a **1-week free trial**!";
  }
  if (q.includes("badge") || q.includes("achievement") || q.includes("reward")) {
    return "Badges are earned automatically as you progress! Examples:\n\n🎓 **History Rookie** — First lesson\n📚 **History Buff** — 5 lessons\n👑 **Quiz Master** — 10 quizzes passed\n💎 **Dedicated Learner** — 20 assignments\n\nCheck your badge collection on the Home Dashboard!";
  }
  if (q.includes("sign up") || q.includes("signup") || q.includes("register") || q.includes("account")) {
    return "To create an account, click **Get Started** in the top navigation, then sign up with your email/password or use **Google Sign-In** for quick access!";
  }
  if (q.includes("tutor") || q.includes("teacher") || q.includes("instructor")) {
    return "History Homeroom offers **Group Tutoring**, **1-on-1 Tutoring**, and **Peer Workshops** led by expert historians. Book any session from your **Home Dashboard** under the Tutoring section!";
  }
  if (q.includes("password") || q.includes("login") || q.includes("sign in") || q.includes("forgot")) {
    return "Visit the **Login page** to sign in with your email/password or Google account. If you forgot your password, click 'Forgot Password' on the login page and we'll send a reset link to your email.";
  }
  if (q.includes("navigate") || q.includes("help") || q.includes("how") || q.includes("use") || q.includes("start")) {
    if (pathname === "/") return "You're on the **Landing Page**! Here you can explore pricing, view historical events, and learn how History Homeroom works. Click **Start Learning** to create your account or **View Plans** to see subscription options.";
    if (pathname === "/home") return "You're on your **Dashboard**! Here you can track progress, earn badges, book tutoring sessions, and browse the FAQ. Scroll down to explore each section.";
    return "I can help you navigate History Homeroom! Try asking me about booking sessions, pricing plans, badges, or how to use specific features.";
  }
  if (q.includes("peer") || q.includes("workshop") || q.includes("group")) {
    return "**Peer Workshops** are student-led collaborative sessions (up to 8 students) where you work together on historical projects. **Group Tutoring** is instructor-led with up to 20 students. Both can be booked from your Home Dashboard!";
  }
  if (q.includes("progress") || q.includes("lesson") || q.includes("quiz") || q.includes("assignment")) {
    return "Your progress is tracked in three categories on your dashboard:\n\n📖 **Lessons Attended**\n✅ **Assignments Completed**\n🎯 **Quizzes Passed**\n\nComplete activities to level up and earn new badges!";
  }
  if (q.includes("secure") || q.includes("privacy") || q.includes("encrypt") || q.includes("data") || q.includes("safe")) {
    return "Your security is our priority! We use **Firebase Authentication** with Google's enterprise-grade security, **HTTPS/TLS encryption** for all data in transit, and strict **Firestore Security Rules** ensuring you can only access your own data.";
  }
  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("good")) {
    return "Hello! 👋 I'm the History Homeroom assistant. I'm here to help you navigate the platform, answer questions about features, and make your learning journey smoother. What can I help you with today?";
  }
  if (q.includes("thank")) {
    return "You're very welcome! Is there anything else I can help you with? I'm always here if you have more questions. 📚";
  }

  return "I'm not quite sure about that, but I'm here to help! Try asking about:\n\n• Booking tutoring sessions\n• Subscription pricing\n• How badges work\n• Account setup\n• Site navigation\n\nOr click one of the quick suggestions below!";
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      content: "Hi there! 👋 I'm your History Homeroom guide. Ask me anything about the platform — booking sessions, pricing, badges, or how to get started!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageIdRef = useRef(0);
  const pathname = usePathname();
  const isTouch = useTouchDevice();

  // Hide on auth pages — login/signup should stay focused and uncluttered.
  if (pathname === "/login") return null;

  const nextId = () => {
    messageIdRef.current += 1;
    return `msg-${messageIdRef.current}`;
  };

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, open]);

  const sendMessage = async (text?: string) => {
    const content = text ?? input.trim();
    if (!content) return;

    const userMsg: Message = {
      id: nextId(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    await new Promise((r) => setTimeout(r, 700 + Math.random() * 500));

    const botMsg: Message = {
      id: nextId(),
      role: "bot",
      content: getBotResponse(content, pathname),
      timestamp: new Date(),
    };

    setMessages((m) => [...m, botMsg]);
    setTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <>
      {/* FAB — plain button on touch devices (framer-motion can block iOS taps) */}
      {isTouch ? (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="fixed right-4 bottom-4 z-[9000] w-14 h-14 rounded-2xl gold-gradient shadow-xl shadow-gold/30 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 touch-manipulation"
          aria-label={open ? "Close chat assistant" : "Open chat assistant"}
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          {open ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
          {!open && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background animate-pulse" aria-hidden="true" />
          )}
        </button>
      ) : (
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        style={{ touchAction: "manipulation" }}
        className="fixed right-4 bottom-4 z-[9000] w-14 h-14 rounded-2xl gold-gradient shadow-xl shadow-gold/30 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        aria-expanded={open}
        aria-haspopup="dialog"
        suppressHydrationWarning
      >
        {/* initial={false} prevents the icon from starting at opacity:0
             on the first render (fixes invisible icon on iOS Safari) */}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} className="text-white" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={22} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background animate-pulse" aria-hidden="true" />
        )}
      </motion.button>
      )}

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed right-4 left-4 sm:left-auto bottom-24 z-[9000] sm:w-96 max-h-[min(32rem,calc(100dvh-6rem))] rounded-2xl shadow-2xl shadow-black/30 overflow-hidden border border-gold/20 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Chat assistant"
          >
            {/* Header */}
            <div className="gold-gradient px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">HH Assistant</p>
                  <p className="text-white/70 text-xs">Online · here to help</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Close chat"
              >
                <X size={14} className="text-white" />
              </button>
            </div>

            {/* Messages */}
            <div
              className="bg-background flex-1 min-h-0 overflow-y-auto p-3 space-y-3"
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${
                    msg.role === "bot" ? "gold-gradient" : "bg-muted"
                  }`}>
                    {msg.role === "bot"
                      ? <Bot size={12} className="text-white" />
                      : <User size={12} className="text-muted-foreground" />
                    }
                  </div>
                  <div
                    className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "bot"
                        ? "bg-card border border-border/50"
                        : "gold-gradient text-white"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full gold-gradient flex items-center justify-center">
                    <Bot size={12} className="text-white" />
                  </div>
                  <div className="bg-card border border-border/50 rounded-2xl px-3 py-2">
                    <div className="flex gap-1 items-center h-4">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-gold"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="bg-background border-t border-border/50 px-3 py-2 flex gap-1.5 overflow-x-auto">
              {QUICK_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="flex-shrink-0 px-2.5 py-1 rounded-full border border-gold/30 text-xs text-gold hover:bg-gold/10 transition-colors whitespace-nowrap"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="bg-background border-t border-border/50 p-3 flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 bg-muted rounded-xl px-3 py-2 text-sm outline-none border border-transparent focus:border-gold/50 transition-colors placeholder:text-muted-foreground"
                aria-label="Chat message input"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || typing}
                className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Send message"
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
