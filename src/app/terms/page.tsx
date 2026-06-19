import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service – History Homeroom",
  description: "Read the terms and conditions governing your use of History Homeroom.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: [
      "By accessing or using History Homeroom (the 'Service'), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the Service.",
      "We may update these terms from time to time. Continued use of the Service after changes are posted constitutes your acceptance of the updated terms.",
    ],
  },
  {
    title: "2. Eligibility",
    body: [
      "You must be at least 13 years old to use History Homeroom. Users under 18 must have the consent of a parent or legal guardian.",
      "By creating an account, you represent that all information you provide is accurate and that you meet the eligibility requirements above.",
    ],
  },
  {
    title: "3. Accounts",
    body: [
      "You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.",
      "You must notify us immediately at support@historyhomeroom.com if you suspect unauthorised access to your account.",
      "We reserve the right to suspend or terminate accounts that violate these terms.",
    ],
  },
  {
    title: "4. Subscriptions & Payments",
    body: [
      "Certain features of History Homeroom require a paid subscription. Subscription fees are billed in advance on a monthly or annual basis as selected at checkout.",
      "All payments are processed securely by Stripe. By providing payment information, you authorise us to charge the applicable fees.",
      "Subscriptions automatically renew unless cancelled before the renewal date. You can cancel at any time from your account settings.",
      "Refunds are offered within 7 days of initial purchase for new subscribers who have not accessed premium content. Contact support@historyhomeroom.com to request a refund.",
    ],
  },
  {
    title: "5. Acceptable Use",
    body: [
      "You agree not to use the Service to: upload or share content that is unlawful, abusive, or infringing; attempt to gain unauthorised access to any part of the platform; scrape, copy, or redistribute our content without written permission; or interfere with the operation of the Service.",
      "We reserve the right to remove any content and suspend any user that violates these guidelines.",
    ],
  },
  {
    title: "6. Intellectual Property",
    body: [
      "All content on History Homeroom — including lessons, videos, quizzes, graphics, and text — is owned by or licensed to History Homeroom and is protected by copyright law.",
      "You are granted a limited, non-exclusive, non-transferable licence to access and use the content for your personal, non-commercial educational purposes only.",
      "You may not reproduce, distribute, or create derivative works from our content without our prior written consent.",
    ],
  },
  {
    title: "7. User-Generated Content",
    body: [
      "If you submit content (e.g. forum posts, reviews, or feedback), you grant us a worldwide, royalty-free licence to use, display, and distribute that content in connection with the Service.",
      "You retain ownership of your content and are solely responsible for it. Do not submit content you do not have the right to share.",
    ],
  },
  {
    title: "8. Disclaimers",
    body: [
      "The Service is provided 'as is' and 'as available' without warranties of any kind, express or implied.",
      "We do not guarantee that the Service will be uninterrupted, error-free, or that the content is always current or accurate.",
    ],
  },
  {
    title: "9. Limitation of Liability",
    body: [
      "To the maximum extent permitted by law, History Homeroom shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use, the Service.",
      "Our total liability to you for any claim shall not exceed the amount you paid us in the 12 months preceding the claim.",
    ],
  },
  {
    title: "10. Governing Law",
    body: [
      "These terms are governed by and construed in accordance with the laws of the State of California, United States, without regard to conflict-of-law principles.",
    ],
  },
  {
    title: "11. Contact",
    body: [
      "Questions about these terms? Contact us at legal@historyhomeroom.com or through our Contact page.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/8 text-gold text-xs font-semibold mb-6">
            <FileText size={13} />
            Legal
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Last updated: <time dateTime="2026-01-01">January 1, 2026</time>
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Please read these Terms of Service carefully before using History Homeroom. They govern your access to and use of our platform, content, and services.
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
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link href="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-gold transition-colors">Contact Us</Link>
          <Link href="/" className="hover:text-gold transition-colors">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
