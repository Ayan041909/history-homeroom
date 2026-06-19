"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalImage } from "@/components/shared/ExternalImage";
import { useTouchDevice } from "@/hooks/useTouchDevice";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { MapPin, User, X, Calendar, BookOpen } from "lucide-react";
import { HISTORICAL_FIGURES } from "@/lib/mockData";

/**
 * Custom object-position for figures whose default center-crop cuts off the face.
 * Napoleon's painting is full-body — shift up to keep his face visible.
 */
const FIGURE_IMAGE_POSITIONS: Record<string, string> = {
  "2": "50% 8%", // Napoleon Bonaparte — full-body portrait by Jacques-Louis David
};

const FIGURE_DETAILS: Record<string, { highlights: string[]; quote?: string; quoteAuthor?: string }> = {
  "1": {
    highlights: [
      "Spoke at least nine languages, including Egyptian, Greek, and Aramaic",
      "Co-ruled with — and outlived — three of her brothers",
      "Famously courted Caesar and Mark Antony to preserve Egyptian sovereignty",
      "Died in 30 BC; Egypt was annexed by Rome shortly after",
    ],
    quote: "I will not be triumphed over.",
    quoteAuthor: "— Cleopatra VII",
  },
  "2": {
    highlights: [
      "Crowned Emperor of the French in 1804 at age 35",
      "Authored the Napoleonic Code, still the basis of many legal systems",
      "Lost the Battle of Waterloo in 1815 to Wellington's coalition",
      "Exiled to Saint Helena, where he died in 1821",
    ],
    quote: "Glory is fleeting, but obscurity is forever.",
    quoteAuthor: "— Napoleon Bonaparte",
  },
  "3": {
    highlights: [
      "Could hold up to 80,000 spectators at peak capacity",
      "Construction completed in just 8 years under three emperors",
      "Hosted gladiator games, mock naval battles, and animal hunts",
      "Designated a UNESCO World Heritage Site in 1980",
    ],
  },
  "4": {
    highlights: [
      "Stretches approximately 13,170 miles across northern China",
      "Built and rebuilt over 2,000 years across many dynasties",
      "Constructed primarily to defend against Xiongnu and Mongol raids",
      "The most extensive man-made structure on Earth",
    ],
  },
};

function ParallaxCard({
  figure,
  index,
  onOpen,
  isTouch,
}: {
  figure: (typeof HISTORICAL_FIGURES)[0];
  index: number;
  onOpen: () => void;
  isTouch: boolean;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const shouldReduce = useReducedMotion();

  const springX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25 });
  const rotateX = useTransform(springY, [-50, 50], [8, -8]);
  const rotateY = useTransform(springX, [-50, 50], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduce) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={onOpen}
      initial={isTouch ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      style={shouldReduce ? {} : { rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="text-left group relative rounded-2xl overflow-hidden border border-border/50 hover:border-gold/40 shadow-lg hover:shadow-xl hover:shadow-gold/10 transition-all duration-300 cursor-pointer bg-card focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      aria-label={`Open details for ${figure.name} — ${figure.era}`}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <ExternalImage
          src={figure.imageUrl}
          alt={figure.type === "person" ? `Portrait of ${figure.name}` : `Image of ${figure.name}`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          style={{ objectPosition: FIGURE_IMAGE_POSITIONS[figure.id] ?? "50% 50%" }}
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* Type badge */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full gold-gradient flex items-center justify-center shadow-md">
          {figure.type === "person" ? (
            <User size={14} className="text-white" aria-hidden="true" />
          ) : (
            <MapPin size={14} className="text-white" aria-hidden="true" />
          )}
        </div>

        {/* Overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white/70 text-xs font-medium mb-0.5 uppercase tracking-wider">
            {figure.type === "person" ? "Historical Figure" : "Historical Place"}
          </p>
          <h3 className="font-heading font-bold text-white text-xl leading-tight">{figure.name}</h3>
          <p className="text-gold text-sm font-medium">{figure.era}</p>
        </div>
      </div>

      {/* Description */}
      <div className="p-4">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{figure.description}</p>
        <div className="mt-3 flex items-center gap-1 text-gold text-xs font-semibold group-hover:gap-2 transition-all">
          <span>Read full profile</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>

      {/* Hover gold shimmer */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-2xl"
        aria-hidden="true"
      />
    </motion.button>
  );
}

function FigureModal({
  figure,
  onClose,
}: {
  figure: (typeof HISTORICAL_FIGURES)[0] | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!figure) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [figure, onClose]);

  if (!figure) return null;
  const details = FIGURE_DETAILS[figure.id];

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${figure.name} profile`}
      >
        <motion.div
          key="content"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-3xl my-8 rounded-3xl overflow-hidden bg-card border border-gold/30 shadow-2xl shadow-gold/20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur text-white hover:bg-black/70 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Close profile"
          >
            <X size={18} />
          </button>

          {/* Hero image */}
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <ExternalImage
              src={figure.imageUrl}
              alt={figure.type === "person" ? `Portrait of ${figure.name}` : `Image of ${figure.name}`}
              fill
              className="object-cover"
              style={{ objectPosition: FIGURE_IMAGE_POSITIONS[figure.id] ?? "50% 50%" }}
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full gold-gradient text-white text-[11px] font-bold uppercase tracking-wider mb-2 shadow">
                {figure.type === "person" ? <User size={11} /> : <MapPin size={11} />}
                {figure.type === "person" ? "Historical Figure" : "Historical Place"}
              </div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground leading-tight">
                {figure.name}
              </h2>
              <p className="flex items-center gap-1.5 text-gold text-sm font-medium mt-1">
                <Calendar size={13} aria-hidden="true" /> {figure.era}
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-5">
            <p className="text-foreground/90 leading-relaxed">{figure.description}</p>

            {details && details.highlights.length > 0 && (
              <div>
                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-gold mb-3">
                  Key Highlights
                </h3>
                <ul className="space-y-2.5" role="list">
                  {details.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" aria-hidden="true" />
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {details?.quote && (
              <blockquote className="rounded-2xl border-l-4 border-gold bg-gold/5 px-5 py-4 italic font-heading text-base sm:text-lg">
                &ldquo;{details.quote}&rdquo;
                {details.quoteAuthor && (
                  <footer className="mt-2 text-xs text-muted-foreground not-italic">
                    {details.quoteAuthor}
                  </footer>
                )}
              </blockquote>
            )}

            <a
              href={`/lessons?search=${encodeURIComponent(figure.name)}`}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl gold-gradient text-white font-bold text-sm shadow-lg shadow-gold/20 hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              <BookOpen size={15} aria-hidden="true" />
              Explore lessons featuring {figure.name}
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function HistoricalPreviews() {
  const isTouch = useTouchDevice();
  const [openId, setOpenId] = useState<string | null>(null);
  const openFigure = HISTORICAL_FIGURES.find((f) => f.id === openId) ?? null;

  return (
    <section className="py-24 px-4 sm:px-6" aria-label="Historical figures and places">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={isTouch ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
            Figures &amp; Places That{" "}
            <span className="gold-gradient-text">Defined History</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From legendary rulers to iconic landmarks — tap any card to dive deeper.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HISTORICAL_FIGURES.map((figure, i) => (
            <ParallaxCard
              key={figure.id}
              figure={figure}
              index={i}
              onOpen={() => setOpenId(figure.id)}
              isTouch={isTouch}
            />
          ))}
        </div>
      </div>

      <FigureModal figure={openFigure} onClose={() => setOpenId(null)} />
    </section>
  );
}
