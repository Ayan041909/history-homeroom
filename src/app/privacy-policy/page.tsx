import Link from "next/link";
import { Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy – History Homeroom",
  description: "Learn how History Homeroom collects, uses, and protects your personal information.",
};

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: [
      "**Account information:** When you register, we collect your name, email address, and password (stored as a secure hash). If you sign in with Google, we receive your name and email from Google.",
      "**Usage data:** We log which lessons you view, quiz scores, session duration, and in-app interactions to personalise your learning experience and improve our platform.",
      "**Payment information:** Payments are processed by Stripe. We never store full card numbers on our servers; we only retain a payment token and transaction ID.",
      "**Communications:** If you contact our support team or sign up for our newsletter, we store the content of those communications.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    body: [
      "To create and maintain your account.",
      "To deliver and personalise lessons, quizzes, and tutoring sessions.",
      "To process subscription payments and send receipts.",
      "To send product updates, educational content, and promotional offers — you may opt out at any time.",
      "To monitor and improve platform performance, security, and reliability.",
      "To comply with legal obligations.",
    ],
  },
  {
    title: "3. Sharing Your Information",
    body: [
      "We do **not** sell your personal data to third parties.",
      "We share data only with trusted service providers (e.g. Stripe for payments, Firebase for authentication and hosting) solely to operate the platform, under strict confidentiality agreements.",
      "We may disclose information if required by law, court order, or to protect the rights and safety of our users.",
    ],
  },
  {
    title: "4. Cookies & Tracking",
    body: [
      "We use essential cookies to keep you logged in and remember your preferences.",
      "We use analytics cookies (e.g. Google Analytics) to understand how visitors use our site. You can opt out via your browser settings or a cookie consent tool.",
      "We do not use third-party advertising trackers.",
    ],
  },
  {
    title: "5. Data Retention",
    body: [
      "We keep your account data for as long as your account is active.",
      "You may request deletion of your account and associated data at any time by emailing privacy@historyhomeroom.com. We will action your request within 30 days, subject to any legal obligations to retain certain records.",
    ],
  },
  {
    title: "6. Your Rights",
    body: [
      "Depending on your jurisdiction (e.g. GDPR in the EU, CCPA in California), you may have the right to access, correct, or delete the personal data we hold about you.",
      "To exercise any of these rights, contact us at privacy@historyhomeroom.com.",
    ],
  },
  {
    title: "7. Children's Privacy",
    body: [
      "History Homeroom is intended for users aged 13 and older. We do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently collected such data, we will delete it promptly.",
    ],
  },
  {
    title: "8. Security",
    body: [
      "We use industry-standard measures including TLS encryption in transit, hashed passwords, and regular security audits to protect your data. No method of transmission over the Internet is 100% secure, however, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "9. Changes to This Policy",
    body: [
      "We may update this Privacy Policy periodically. When we do, we will update the 'Last updated' date at the top of this page and, for material changes, notify you by email.",
    ],
  },
  {
    title: "10. Contact Us",
    body: [
      "Questions about this policy? Reach us at privacy@historyhomeroom.com or through our Contact page.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/8 text-gold text-xs font-semibold mb-6">
            <Shield size={13} />
            Legal
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: <time dateTime="2026-01-01">January 1, 2026</time>
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            History Homeroom (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This policy explains what information we collect, why we collect it, and how we use it.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {SECTIONS.map(({ title, body }) => (
            <section key={title}>
              <h2 className="text-lg font-bold text-foreground mb-3">{title}</h2>
              <ul className="space-y-2">
                {body.map((item, i) => (
                  <li key={i} className="text-muted-foreground leading-relaxed text-sm pl-4 border-l border-border">
                    {item.replace(/\*\*(.*?)\*\*/g, "$1")}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
          <Link href="/contact" className="hover:text-gold transition-colors">Contact Us</Link>
          <Link href="/" className="hover:text-gold transition-colors">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
