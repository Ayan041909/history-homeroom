"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SiteLogo } from "./SiteLogo";
import { useAuth } from "@/hooks/useAuth";
import { useTouchDevice } from "@/hooks/useTouchDevice";
type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string; desc?: string }[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Learn",
    children: [
      { label: "All Lessons", href: "/lessons", desc: "200+ history lessons" },
      { label: "Historical Events", href: "/events", desc: "Key moments in history" },
      { label: "Resources", href: "/resources", desc: "Guides, maps & more" },
    ],
  },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

function DropdownMenu({ items }: { items: { label: string; href: string; desc?: string }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 rounded-2xl overflow-hidden"
      style={{
        zIndex: 9999,
        backdropFilter: "blur(48px) saturate(200%)",
        WebkitBackdropFilter: "blur(48px) saturate(200%)",
        background: "rgba(18,18,22,0.88)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 2px 0 rgba(255,255,255,0.08) inset, 0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      {items.map((item, i) => (
        <Link key={item.href} href={item.href}
          className="flex flex-col px-4 py-3 transition-colors hover:bg-white/8"
          style={i > 0 ? { borderTop: "1px solid rgba(255,255,255,0.07)" } : {}}
        >
          <span className="text-sm font-medium text-white/90">{item.label}</span>
          {item.desc && <span className="text-xs text-white/45 mt-0.5">{item.desc}</span>}
        </Link>
      ))}
    </motion.div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const { profile, signOut } = useAuth();
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  const isTouch = useTouchDevice();

  const isDark = !mounted || resolvedTheme === "dark";

  const navLinkClass = isDark
    ? "px-4 py-2 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-amber-400"
    : "px-4 py-2 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-black/6 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-gold";

  const authLinkClass = isDark
    ? "flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400"
    : "flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium text-foreground/75 hover:text-foreground hover:bg-black/6 transition-colors focus-visible:ring-2 focus-visible:ring-gold";

  const authActionClass = isDark
    ? "flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400"
    : "flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-foreground/75 hover:text-foreground hover:bg-black/6 transition-colors focus-visible:ring-2 focus-visible:ring-gold";

  const signOutClass = isDark
    ? "flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-destructive/20 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400"
    : "flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-foreground/50 hover:text-foreground hover:bg-destructive/10 transition-colors focus-visible:ring-2 focus-visible:ring-gold";

  const menuIconClass = isDark ? "text-white/80" : "text-foreground/80";

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      setMenuOpen(false);
      setOpenDropdown(null);
    }
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/login" || pathname === "/reset-data") return null;

  // Always glass — heavier when scrolled
  const headerStyle = isDark
    ? scrolled
      ? {
          background: "rgba(6,9,15,0.72)",
          backdropFilter: "blur(60px) saturate(200%)",
          WebkitBackdropFilter: "blur(60px) saturate(200%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 4px 32px rgba(0,0,0,0.55)",
        }
      : {
          background: "rgba(6,9,15,0.45)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }
    : scrolled
      ? {
          background: "rgba(255,255,255,0.80)",
          backdropFilter: "blur(60px) saturate(200%) brightness(1.04)",
          WebkitBackdropFilter: "blur(60px) saturate(200%) brightness(1.04)",
          borderBottom: "1px solid rgba(255,255,255,0.60)",
          boxShadow: "0 1px 0 0 rgba(255,255,255,0.90) inset, 0 4px 24px rgba(0,0,0,0.06)",
        }
      : {
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          borderBottom: "1px solid rgba(255,255,255,0.45)",
          boxShadow: "0 1px 0 0 rgba(255,255,255,0.80) inset",
        };

  return (
    <header
      className="fixed top-0 left-0 right-0 transition-all duration-300"
      style={{ ...headerStyle, zIndex: 9998 }}
      role="banner"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <SiteLogo
          size={32}
          textClassName="font-heading font-bold text-lg gold-gradient-text hidden sm:inline"
          className="p-1 group-hover:opacity-80 transition-opacity"
        />

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.label} className="relative">
              {item.href ? (
                <Link href={item.href} className={navLinkClass}>
                  {item.label}
                </Link>
              ) : (
                <button
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  className={`${navLinkClass} flex items-center gap-1`}
                >
                  {item.label}
                  <ChevronDown size={13} className={`transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                </button>
              )}
              {item.children && (
                <div
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <AnimatePresence>
                    {openDropdown === item.label && <DropdownMenu items={item.children} />}
                  </AnimatePresence>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {profile ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/profile" className={authLinkClass}>
                <div className="w-6 h-6 rounded-full gold-gradient flex items-center justify-center text-white text-xs font-bold">
                  {(profile.name ?? "U")[0].toUpperCase()}
                </div>
                {profile.name?.split(" ")[0]}
              </Link>
              <Link href="/home" className={authActionClass}>
                <LayoutDashboard size={14} /> Dashboard
              </Link>
              <button onClick={signOut} className={signOutClass}>
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login" className={navLinkClass}>
                Sign In
              </Link>
              <Link href="/login?signup=true"
                className="px-5 py-2 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-amber-400"
                style={{ background: "linear-gradient(135deg, #8E5908, #B8760A, #D98A0E)", boxShadow: "0 2px 16px rgba(184,118,10,0.35), 0 1px 0 rgba(255,255,255,0.25) inset" }}>
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            className={`md:hidden w-11 h-11 flex items-center justify-center rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-gold touch-manipulation ${isDark ? "hover:bg-white/10" : "hover:bg-gold/10"} ${menuIconClass}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {isTouch ? (
              menuOpen ? <X size={20} /> : <Menu size={20} />
            ) : (
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={20} /></motion.span>
                : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={20} /></motion.span>
              }
            </AnimatePresence>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-heavy border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-2">Learn</p>
              {[{ label: "All Lessons", href: "/lessons" }, { label: "Historical Events", href: "/events" }, { label: "Resources", href: "/resources" }].map((l) => (
                <Link key={l.href} href={l.href} className="flex px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-gold/10 transition-colors">{l.label}</Link>
              ))}
              <div className="h-px bg-border/50 my-1" />
              {[{ label: "Pricing", href: "/#pricing" }, { label: "About", href: "/about" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" }].map((l) => (
                <Link key={l.href} href={l.href} className="flex px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-gold/10 transition-colors">{l.label}</Link>
              ))}
              <div className="h-px bg-border/50 my-1" />
              {profile ? (
                <>
                  <Link href="/profile" className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gold/10 transition-colors">
                    <div className="w-6 h-6 rounded-full gold-gradient flex items-center justify-center text-white text-xs font-bold">{(profile.name ?? "U")[0].toUpperCase()}</div>
                    {profile.name}
                  </Link>
                  <Link href="/home" className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gold/10 transition-colors">
                    <LayoutDashboard size={15} /> Dashboard
                  </Link>
                  <button onClick={signOut} className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 transition-colors">
                    <LogOut size={15} /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="flex px-4 py-3 rounded-lg text-sm font-medium hover:bg-gold/10 transition-colors">Sign In</Link>
                  <Link href="/login?signup=true" className="flex items-center justify-center mx-4 py-3 rounded-xl text-sm font-bold gold-gradient text-white">Get Started Free</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
