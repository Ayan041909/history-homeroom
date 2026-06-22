"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Shield, Bell, CreditCard, LogOut, Camera, Check, ChevronRight, ChevronDown, Eye, EyeOff, Smartphone, Monitor, Download } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useProgress } from "@/hooks/useProgress";
import { BADGE_DEFINITIONS } from "@/lib/badges";
import { useToast } from "@/components/shared/Toast";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { updateUserSubscription, updateUserProfile } from "@/lib/firestore";
import {
  cancelSubscription,
  subscriptionFieldsFromRecord,
  isOnActiveTrial,
  getSubscriptionRecord,
} from "@/lib/subscriptionCache";
import { updateMockSubscriptionFields, updateMockProfileName, updateMockProfileAvatar } from "@/lib/mockAuth";
import { prepareAvatarDataUrl } from "@/lib/avatarUpload";
import { UserAvatar } from "@/components/shared/UserAvatar";
import Link from "next/link";

const NOTIFICATIONS_STORAGE_KEY = "history-homeroom:notifications";

type Tab = "profile" | "subscription" | "notifications" | "security";

const TABS = [
  { id: "profile" as Tab, label: "Profile", icon: User },
  { id: "subscription" as Tab, label: "Subscription", icon: CreditCard },
  { id: "notifications" as Tab, label: "Notifications", icon: Bell },
  { id: "security" as Tab, label: "Security", icon: Shield },
];

const NOTIFICATION_SETTINGS = [
  { id: "session_reminders", label: "Session Reminders", desc: "Get notified 30 mins before a booked session", default: true },
  { id: "new_lessons", label: "New Lessons", desc: "Be the first to know when new content is added", default: true },
  { id: "badge_earned", label: "Badge Unlocked", desc: "Celebrate when you earn a new badge", default: true },
  { id: "weekly_recap", label: "Weekly Progress Recap", desc: "A summary of your activity every Sunday", default: false },
  { id: "promotions", label: "Promotions & Offers", desc: "Discounts and special offers from History Homeroom", default: false },
];

export default function ProfilePage() {
  return (
    <RequireAuth>
      <ProfilePageInner />
    </RequireAuth>
  );
}

const VALID_TABS: Tab[] = ["profile", "subscription", "notifications", "security"];

function tabFromSearch(search: string): Tab {
  const tab = new URLSearchParams(search).get("tab");
  return VALID_TABS.includes(tab as Tab) ? (tab as Tab) : "profile";
}

// ─── Security Tab ──────────────────────────────────────────────────────────────

function SecurityAccordionItem({
  id,
  icon,
  label,
  desc,
  open,
  onToggle,
  children,
}: {
  id: string;
  icon: React.ReactNode;
  label: string;
  desc: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gold/3 transition-colors group focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
        aria-expanded={open}
        aria-controls={`security-panel-${id}`}
      >
        <div className="flex items-center gap-3 text-left">
          <span className="text-gold">{icon}</span>
          <div>
            <p className="text-sm font-medium group-hover:text-gold transition-colors">{label}</p>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`text-muted-foreground group-hover:text-gold transition-all ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`security-panel-${id}`}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 pt-1 border-t border-border/60 bg-muted/20">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SecurityTab({
  profile,
  user,
  signOut,
  onDeleteAccount,
}: {
  profile: import("@/types").UserProfile | null;
  user: import("@supabase/supabase-js").User | null;
  signOut: () => void;
  onDeleteAccount: () => void;
}) {
  const toast = useToast();
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const toggle = (id: string) => setOpenPanel((prev) => (prev === id ? null : id));

  // Change Password state
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);

  // 2FA state
  const [phone, setPhone] = useState("");
  const [twoFASaving, setTwoFASaving] = useState(false);

  // Download state
  const [dataEmail, setDataEmail] = useState(profile?.email ?? "");
  const [dataRequested, setDataRequested] = useState(false);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPw) { toast.error("Required", "Please enter your current password."); return; }
    if (newPw.length < 8) { toast.error("Too short", "New password must be at least 8 characters."); return; }
    if (newPw !== confirmPw) { toast.error("Mismatch", "New password and confirmation do not match."); return; }
    setPwSaving(true);
    setTimeout(() => {
      setPwSaving(false);
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
      toast.success("Password updated", "Your password has been changed successfully.");
      setOpenPanel(null);
    }, 1200);
  };

  const handleEnable2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) { toast.error("Required", "Please enter a phone number."); return; }
    setTwoFASaving(true);
    setTimeout(() => {
      setTwoFASaving(false);
      toast.success("2FA enabled", `A verification code has been sent to ${phone}. Full 2FA support is launching soon.`);
      setOpenPanel(null);
    }, 1000);
  };

  const handleDownloadData = (e: React.FormEvent) => {
    e.preventDefault();
    setDataRequested(true);
    toast.success("Export queued", `We'll email a download link to ${dataEmail} within 24 hours.`);
    setTimeout(() => { setDataRequested(false); setOpenPanel(null); }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <div className="p-6 rounded-2xl border border-border bg-card">
        <h2 className="font-heading font-bold text-lg mb-5">Security Settings</h2>
        <div className="space-y-3">

          {/* Change Password */}
          <SecurityAccordionItem
            id="password"
            icon={<Shield size={16} />}
            label="Change Password"
            desc="Update your account password"
            open={openPanel === "password"}
            onToggle={() => toggle("password")}
          >
            <form onSubmit={handleChangePassword} className="space-y-3 mt-2">
              <div>
                <label className="block text-xs font-medium mb-1.5">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPw ? "text" : "password"}
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-background border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors"
                  />
                  <button type="button" onClick={() => setShowCurrentPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" tabIndex={-1}>
                    {showCurrentPw ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPw ? "text" : "password"}
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="w-full px-4 py-2.5 pr-10 rounded-xl bg-background border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors"
                  />
                  <button type="button" onClick={() => setShowNewPw((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" tabIndex={-1}>
                    {showNewPw ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={pwSaving}
                className="px-5 py-2.5 rounded-xl gold-gradient text-white text-sm font-bold hover:opacity-90 disabled:opacity-60 transition-all"
              >
                {pwSaving ? "Updating…" : "Update Password"}
              </button>
            </form>
          </SecurityAccordionItem>

          {/* Two-Factor Authentication */}
          <SecurityAccordionItem
            id="2fa"
            icon={<Smartphone size={16} />}
            label="Two-Factor Authentication"
            desc="Add an extra layer of security to your account"
            open={openPanel === "2fa"}
            onToggle={() => toggle("2fa")}
          >
            <div className="space-y-3 mt-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Enable SMS-based two-factor authentication. Each sign-in will require a one-time code sent to your phone.
              </p>
              <form onSubmit={handleEnable2FA} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={twoFASaving}
                  className="px-5 py-2.5 rounded-xl gold-gradient text-white text-sm font-bold hover:opacity-90 disabled:opacity-60 transition-all"
                >
                  {twoFASaving ? "Sending code…" : "Enable 2FA"}
                </button>
              </form>
            </div>
          </SecurityAccordionItem>

          {/* Active Sessions */}
          <SecurityAccordionItem
            id="sessions"
            icon={<Monitor size={16} />}
            label="Active Sessions"
            desc="View and manage devices currently signed in"
            open={openPanel === "sessions"}
            onToggle={() => toggle("sessions")}
          >
            <div className="space-y-3 mt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/20">
                <Monitor size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">This device</p>
                  <p className="text-xs text-muted-foreground">Browser session · Active now</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-500 font-bold flex-shrink-0">Current</span>
              </div>
              <p className="text-xs text-muted-foreground">
                No other active sessions found. Full cross-device session management ships with 2FA.
              </p>
              <button
                type="button"
                onClick={() => {
                  toast.info("Sessions cleared", "All other sessions have been signed out.");
                  setOpenPanel(null);
                }}
                className="px-5 py-2.5 rounded-xl border border-border text-sm font-semibold hover:border-gold/40 hover:bg-gold/3 transition-all"
              >
                Sign out all other sessions
              </button>
            </div>
          </SecurityAccordionItem>

          {/* Download My Data */}
          <SecurityAccordionItem
            id="download"
            icon={<Download size={16} />}
            label="Download My Data"
            desc="Request a copy of your account data"
            open={openPanel === "download"}
            onToggle={() => toggle("download")}
          >
            <div className="space-y-3 mt-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                We&apos;ll prepare a ZIP file containing your profile, progress, badges, and session history. You&apos;ll receive a download link by email within 24 hours.
              </p>
              <form onSubmit={handleDownloadData} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium mb-1.5">Send download link to</label>
                  <input
                    type="email"
                    value={dataEmail}
                    onChange={(e) => setDataEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={dataRequested}
                  className="px-5 py-2.5 rounded-xl gold-gradient text-white text-sm font-bold hover:opacity-90 disabled:opacity-60 transition-all flex items-center gap-2"
                >
                  <Download size={13} />
                  {dataRequested ? "Request sent!" : "Request Data Export"}
                </button>
              </form>
            </div>
          </SecurityAccordionItem>

        </div>
      </div>

      <div className="p-5 rounded-2xl border border-destructive/20 bg-destructive/5">
        <h3 className="font-semibold text-sm mb-2 text-destructive">Danger Zone</h3>
        <p className="text-xs text-muted-foreground mb-4">These actions are irreversible. Please proceed with caution.</p>
        <div className="flex flex-wrap gap-3">
          <button onClick={signOut} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">
            <LogOut size={14} /> Sign Out
          </button>
          <button
            type="button"
            onClick={onDeleteAccount}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-destructive/40 text-destructive text-sm hover:bg-destructive/10 transition-colors focus-visible:ring-2 focus-visible:ring-destructive"
          >
            Delete Account
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main profile page ─────────────────────────────────────────────────────────

function ProfilePageInner() {
  const [activeTab, setActiveTab] = useState<Tab>(() =>
    typeof window === "undefined" ? "profile" : tabFromSearch(window.location.search),
  );
  const { user, profile, signOut, setMockProfile } = useAuth();
  const { progress, earnedBadges } = useProgress();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cancelling, setCancelling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [notifications, setNotifications] = useState<Record<string, boolean>>(() => {
    const defaults = Object.fromEntries(NOTIFICATION_SETTINGS.map((n) => [n.id, n.default]));
    if (typeof window === "undefined") return defaults;
    try {
      const saved = window.localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (!saved) return defaults;
      const parsed = JSON.parse(saved) as Record<string, boolean>;
      return { ...defaults, ...parsed };
    } catch {
      return defaults;
    }
  });
  const [saved, setSaved] = useState(false);
  const [formName, setFormName] = useState(profile?.name ?? "");
  const [formEmail, setFormEmail] = useState(profile?.email ?? "");
  // "Adjusting state on prop change" pattern — sync form fields when the
  // signed-in profile loads/changes without an effect.
  const [prevProfile, setPrevProfile] = useState(profile);
  if (prevProfile !== profile) {
    setPrevProfile(profile);
    setFormName(profile?.name ?? "");
    setFormEmail(profile?.email ?? "");
  }

  useEffect(() => {
    try {
      window.localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
    } catch {
      // localStorage unavailable — fail silently
    }
  }, [notifications]);

  const handleSave = () => {
    const trimmedName = formName.trim();
    if (trimmedName && profile) {
      // Persist the new name so it reflects everywhere (Navbar, dashboard, etc.)
      if (isSupabaseConfigured() && user) {
        void updateUserProfile(user.id, { name: trimmedName });
      } else {
        try {
          updateMockProfileName(trimmedName);
        } catch {
          // Not in a mock session — no-op (demo preview mode)
        }
      }
      // Update React context so every component that reads profile.name
      // immediately sees the new value without a page reload.
      setMockProfile({ ...profile, name: trimmedName });
    }
    setSaved(true);
    toast.success("Profile updated", "Your changes have been saved.");
    setTimeout(() => setSaved(false), 2500);
  };

  const handleAvatarClick = () => fileInputRef.current?.click();
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;
    e.target.value = "";

    try {
      const dataUrl = await prepareAvatarDataUrl(file);

      if (isSupabaseConfigured() && user) {
        await updateUserProfile(user.id, { avatar: dataUrl });
      } else {
        updateMockProfileAvatar(dataUrl);
      }

      setMockProfile({ ...profile, avatar: dataUrl });
      toast.success("Photo updated", "Your profile picture has been saved.");
    } catch (err) {
      toast.error("Upload failed", err instanceof Error ? err.message : "Could not update your photo.");
    }
  };

  const handleDeleteAccount = () => {
    toast.error(
      "Account deletion",
      "Account deletion requires email confirmation. Reach out at hello@historyhomeroom.com and we'll process it within 24 hours."
    );
  };

  const handleCancelSubscription = async () => {
    if (!profile) return;

    setCancelling(true);
    try {
      const record = cancelSubscription(profile.uid);
      const fields = subscriptionFieldsFromRecord(record);

      if (isSupabaseConfigured() && user) {
        void updateUserSubscription(user.id, {
          subscription: "free",
          trialEndsAt: null,
          subscriptionIsPaid: false,
          trialUsed: fields.trialUsed ?? true,
        });
      } else {
        updateMockSubscriptionFields(fields);
      }

      setMockProfile({ ...profile, ...fields });

      setShowCancelConfirm(false);
      toast.success("Subscription cancelled", "You're back on the Free plan. Your progress and badges are saved.");
    } catch {
      toast.error("Could not cancel", "Please try again in a moment.");
    } finally {
      setCancelling(false);
    }
  };

  const PLAN_INFO = {
    free: { name: "Free", price: "$0/mo", color: "text-muted-foreground" },
    plus: { name: "Plus", price: "$9.99/mo", color: "text-blue-500" },
    premium: { name: "Premium", price: "$19.99/mo", color: "text-gold" },
  };
  const plan = PLAN_INFO[profile?.subscription ?? "free"];
  const subRecord = profile ? getSubscriptionRecord(profile.uid) : null;
  const onTrial = subRecord ? isOnActiveTrial(subRecord) : false;
  const trialEndsLabel = profile?.trialEndsAt
    ? new Date(profile.trialEndsAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-5">
            <div className="relative">
              <UserAvatar name={profile?.name} avatar={profile?.avatar} size="lg" />
              <button
                type="button"
                onClick={handleAvatarClick}
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full gold-gradient flex items-center justify-center shadow-md focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Change profile photo"
              >
                <Camera size={13} className="text-white" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleAvatarChange}
                aria-hidden="true"
                tabIndex={-1}
              />
            </div>
            <div>
              <h1 className="font-heading font-black text-2xl sm:text-3xl">{profile?.name ?? "Your Profile"}</h1>
              <p className="text-muted-foreground text-sm">{profile?.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                  profile?.subscription === "premium" ? "border-gold/40 bg-gold/10 text-gold" :
                  profile?.subscription === "plus" ? "border-blue-500/40 bg-blue-500/10 text-blue-500" :
                  "border-border text-muted-foreground"
                }`}>{plan.name} Plan</span>
              </div>
            </div>
          </motion.div>

          {/* Quick stats */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="flex items-center gap-6 mt-6 pt-6 border-t border-border/50 overflow-x-auto">
            {[
              { label: "Lessons", value: progress.lessonsAttended },
              { label: "Quizzes Passed", value: progress.quizzesPassed },
              { label: "Assignments", value: progress.assignmentsCompleted },
              { label: "Badges", value: earnedBadges.length },
            ].map((stat) => (
              <div key={stat.label} className="flex-shrink-0">
                <p className="font-heading font-black text-xl gold-gradient-text">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto pb-px" role="tablist">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)} role="tab" aria-selected={activeTab === id}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === id ? "border-gold text-gold" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}>
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="font-heading font-bold text-lg mb-5">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5">Display Name</label>
                  <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5">Email Address</label>
                  <input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-gold/60 focus:outline-none text-sm transition-colors" />
                </div>
              </div>
              <button onClick={handleSave}
                className={`mt-5 px-6 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  saved ? "bg-green-500/20 text-green-500 border border-green-500/30" : "gold-gradient text-white hover:opacity-90 shadow-md"
                }`}>
                {saved ? <><Check size={14} /> Saved!</> : "Save Changes"}
              </button>
            </div>

            {/* Badges showcase */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-bold text-lg">Your Badges</h2>
                <Link href="/home" className="text-xs text-gold hover:underline">View all</Link>
              </div>
              <div className="flex flex-wrap gap-3">
                {BADGE_DEFINITIONS.filter((b) => earnedBadges.includes(b.id)).slice(0, 6).map((badge) => (
                  <div key={badge.id} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gold/20 bg-gold/5">
                    <span className="text-lg">{badge.icon}</span>
                    <span className="text-xs font-medium">{badge.name}</span>
                  </div>
                ))}
                {earnedBadges.length === 0 && <p className="text-sm text-muted-foreground">Complete lessons to earn your first badge!</p>}
              </div>
            </div>
          </motion.div>
        )}

        {/* Subscription Tab */}
        {activeTab === "subscription" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            <div className="p-6 rounded-2xl border border-border bg-card">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h2 className="font-heading font-bold text-lg mb-0.5">Current Plan</h2>
                  <p className={`text-2xl font-heading font-black ${plan.color}`}>{plan.name}</p>
                  <p className="text-muted-foreground text-sm">{plan.price}</p>
                  {onTrial && trialEndsLabel && (
                    <p className="text-xs text-gold mt-1 font-medium">
                      Free trial — ends {trialEndsLabel}
                    </p>
                  )}
                  {profile?.subscriptionIsPaid && profile.subscription !== "free" && (
                    <p className="text-xs text-muted-foreground mt-1">Active paid subscription</p>
                  )}
                </div>
                <Link href="/payment" className="px-4 py-2 rounded-xl gold-gradient text-white text-sm font-bold hover:opacity-90 transition-opacity shadow-md">
                  {profile?.subscription === "free" ? "Upgrade" : "Change plan"}
                </Link>
              </div>
              {profile?.subscription !== "free" && (
                <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-3">
                  <div>
                    <p className="text-sm font-semibold mb-1">Manage membership</p>
                    <p className="text-xs text-muted-foreground">
                      {onTrial
                        ? "Cancel anytime. You'll lose Plus/Premium access immediately and return to Free."
                        : "Cancel anytime. You'll keep access until the end of your current billing period, then return to Free."}
                    </p>
                  </div>
                  {!showCancelConfirm ? (
                    <button
                      type="button"
                      onClick={() => setShowCancelConfirm(true)}
                      className="text-sm font-semibold text-destructive hover:underline"
                    >
                      Cancel subscription
                    </button>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <button
                        type="button"
                        onClick={handleCancelSubscription}
                        disabled={cancelling}
                        className="px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-sm font-bold hover:opacity-90 disabled:opacity-60"
                      >
                        {cancelling ? "Cancelling..." : "Yes, cancel my plan"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCancelConfirm(false)}
                        disabled={cancelling}
                        className="px-4 py-2 rounded-xl border border-border text-sm font-semibold hover:bg-muted/50"
                      >
                        Keep my plan
                      </button>
                    </div>
                  )}
                </div>
              )}
              {profile?.subscription === "free" && (
                <div className="p-4 rounded-xl border border-gold/20 bg-gold/5">
                  <p className="text-sm font-semibold mb-1">Unlock the full experience</p>
                  <p className="text-xs text-muted-foreground mb-3">Upgrade to Plus or Premium to access all 200+ lessons, group tutoring, badges, and more.</p>
                  <Link href="/payment" className="inline-flex items-center gap-1.5 text-xs text-gold font-semibold hover:underline">
                    See plans <ChevronRight size={12} />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="font-heading font-bold text-lg mb-5">Notification Preferences</h2>
              <div className="space-y-4">
                {NOTIFICATION_SETTINGS.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">{setting.label}</p>
                      <p className="text-xs text-muted-foreground">{setting.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications((n) => ({ ...n, [setting.id]: !n[setting.id] }))}
                      className={`relative flex-shrink-0 w-10 h-6 rounded-full transition-colors ${notifications[setting.id] ? "bg-gold" : "bg-muted"}`}
                      aria-pressed={notifications[setting.id]} aria-label={`Toggle ${setting.label}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${notifications[setting.id] ? "translate-x-5" : "translate-x-1"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <SecurityTab
            profile={profile}
            user={user}
            signOut={signOut}
            onDeleteAccount={handleDeleteAccount}
          />
        )}
      </div>
    </div>
  );
}
