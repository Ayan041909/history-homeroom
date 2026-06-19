"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Share2, Video, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { SiteLogo } from "./SiteLogo";

const FOOTER_LINKS = {
  Learn: [
    { label: "All Lessons", href: "/lessons" },
    { label: "Historical Events", href: "/events" },
    { label: "Resources", href: "/resources" },
    { label: "Pricing", href: "/payment" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Help Center", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: Share2, href: "#", label: "Twitter / X" },
  { icon: Video, href: "#", label: "YouTube" },
  { icon: Mail, href: "#", label: "Email" },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/reset-data") return null;

  return (
    <footer className="border-t border-white/10 glass-tint" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <SiteLogo
              size={36}
              textClassName="font-heading font-bold text-xl gold-gradient-text"
              className="mb-4 group"
            />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              An elite educational platform bringing history to life through expert tutoring, immersive content, and a passionate community of learners.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl glass hover:border-gold/40 flex items-center justify-center text-muted-foreground hover:text-gold transition-colors"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm mb-4 text-foreground">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} History Homeroom. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
