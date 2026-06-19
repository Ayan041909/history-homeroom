import Link from "next/link";
import { Newspaper, Download, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Press – History Homeroom",
  description: "Press resources, media kit, and news about History Homeroom.",
};

const PRESS_MENTIONS = [
  {
    outlet: "EdSurge",
    date: "March 2026",
    headline: "History Homeroom Is Making the Past Feel Urgent Again",
    excerpt: "The platform's blend of live tutoring and cinematic storytelling is winning over a generation of students who grew up on YouTube.",
    href: "#",
  },
  {
    outlet: "TechCrunch",
    date: "January 2026",
    headline: "History Homeroom Raises Seed Round to Expand AP History Curriculum",
    excerpt: "The ed-tech startup closed a seed round to hire curriculum designers and grow its roster of expert tutors across US and World History.",
    href: "#",
  },
  {
    outlet: "The New York Times — Education",
    date: "November 2025",
    headline: "When History Class Goes Online, Can It Still Inspire?",
    excerpt: "History Homeroom was highlighted as one of a handful of platforms successfully recreating the magic of a great classroom lecture.",
    href: "#",
  },
  {
    outlet: "Product Hunt",
    date: "September 2025",
    headline: "#1 Product of the Day — History Homeroom",
    excerpt: "Launched to the Product Hunt community and earned the top spot for the day, with over 800 upvotes and hundreds of enthusiastic reviews.",
    href: "#",
  },
];

const FAST_FACTS = [
  { stat: "50,000+", label: "Active learners" },
  { stat: "200+", label: "Lessons published" },
  { stat: "95%", label: "Student satisfaction rate" },
  { stat: "2026", label: "Year founded" },
];

export default function PressPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/8 text-gold text-xs font-semibold mb-6">
            <Newspaper size={13} />
            Press Room
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-black mb-4">
            History Homeroom in the News
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            For press enquiries, interview requests, or to obtain our media kit, please email{" "}
            <a href="mailto:press@historyhomeroom.com" className="text-gold hover:underline">
              press@historyhomeroom.com
            </a>
            .
          </p>
        </div>

        {/* Fast facts */}
        <section className="mb-14">
          <h2 className="font-heading text-2xl font-bold mb-6">History Homeroom at a Glance</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {FAST_FACTS.map(({ stat, label }) => (
              <div key={label} className="p-5 rounded-2xl border border-border bg-card text-center">
                <div className="font-heading text-3xl font-black text-gold mb-1">{stat}</div>
                <div className="text-muted-foreground text-xs">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Press mentions */}
        <section className="mb-14">
          <h2 className="font-heading text-2xl font-bold mb-6">Press Coverage</h2>
          <div className="space-y-5">
            {PRESS_MENTIONS.map((item) => (
              <a
                key={item.headline}
                href={item.href}
                className="group block p-6 rounded-2xl border border-border bg-card hover:border-gold/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gold">{item.outlet}</span>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <h3 className="font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                  {item.headline}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.excerpt}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Media kit */}
        <section className="p-8 rounded-2xl border border-gold/30 bg-gold/5">
          <h2 className="font-bold text-foreground mb-2 flex items-center gap-2">
            <Download size={18} className="text-gold" /> Media Kit
          </h2>
          <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
            Download our media kit for logos (SVG, PNG, light/dark variants), brand guidelines, founder headshots, and approved product screenshots.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white"
              style={{ background: "linear-gradient(135deg, #B8760A 0%, #D98A0E 100%)" }}
            >
              Request Media Kit <ArrowRight size={14} />
            </Link>
            <a
              href="mailto:press@historyhomeroom.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border border-gold/40 text-gold hover:bg-gold/10 transition-colors"
            >
              Email Press Team
            </a>
          </div>
        </section>

        <div className="mt-10 pt-8 border-t border-border text-sm text-muted-foreground">
          <Link href="/" className="hover:text-gold transition-colors">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
