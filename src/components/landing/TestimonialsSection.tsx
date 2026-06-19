"use client";

import { useEffect, useState, useCallback } from "react";
import { ExternalImage } from "@/components/shared/ExternalImage";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/mockData";
import { useTouchDevice } from "@/hooks/useTouchDevice";

export function TestimonialsSection() {
  const isTouch = useTouchDevice();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", containScroll: "trimSnaps" },
    [Autoplay({ delay: 6000, stopOnInteraction: true })],
  );
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback((api: typeof emblaApi) => {
    if (!api) return;
    setSelected(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const handler = () => onSelect(emblaApi);
    emblaApi.on("select", handler);
    emblaApi.on("reInit", handler);
    handler();
    return () => {
      emblaApi.off("select", handler);
      emblaApi.off("reInit", handler);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
      aria-label="Student testimonials"
    >
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(184,118,10,0.05), transparent)" }} aria-hidden="true" />
      <div className="ornament-meander absolute top-6 left-0 right-0 h-5 opacity-30" aria-hidden="true" />
      <div className="ornament-meander absolute bottom-6 left-0 right-0 h-5 opacity-30" aria-hidden="true" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={isTouch ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3 glass text-gold" style={{ border: "1px solid rgba(184,118,10,0.25)" }}>
            <Star size={12} aria-hidden="true" /> 9,700+ Five-star reviews
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black mb-3">
            Loved by <span className="gold-gradient-text">Curious Minds</span> Everywhere
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from students, parents, and educators who&apos;ve made History Homeroom part of their routine.
          </p>
        </motion.div>

        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden" aria-roledescription="carousel">
            <div className="embla-container flex">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.id}
                  className="flex-none w-full sm:w-[80%] lg:w-[65%] px-3 h-auto"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${TESTIMONIALS.length}: ${t.name}`}
                >
                  <motion.figure
                    initial={isTouch ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex h-full min-h-[320px] sm:min-h-[360px] flex-col rounded-3xl glass p-6 sm:p-8 md:p-10"
                  >
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <Quote
                        size={32}
                        className="shrink-0 text-gold/50 fill-gold/10"
                        aria-hidden="true"
                      />
                      <div className="flex items-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
                        {Array.from({ length: t.rating }).map((_, idx) => (
                          <Star key={idx} size={16} className="text-gold fill-gold" aria-hidden="true" />
                        ))}
                      </div>
                    </div>

                    <blockquote className="flex-1 font-heading text-lg sm:text-xl md:text-2xl italic leading-relaxed text-foreground">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>

                    <figcaption className="mt-6 flex items-center gap-4 border-t border-border/50 pt-6">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-gold/30 bg-muted">
                        <ExternalImage
                          src={t.avatarUrl}
                          alt={`Photo of ${t.name}`}
                          fill
                          className="object-cover"
                          sizes="48px"
                          fallbackSrc="https://api.dicebear.com/7.x/initials/svg?seed=HH&backgroundColor=c9a84c&textColor=ffffff"
                        />
                      </div>
                      <div className="min-w-0 text-left">
                        <p className="truncate text-sm font-semibold">{t.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </figcaption>
                  </motion.figure>
                </div>
              ))}
            </div>
          </div>

          {/* Nav buttons — stay inside bounds on mobile */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-1 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-5 w-11 h-11 sm:w-10 sm:h-10 rounded-full glass border border-gold/20 flex items-center justify-center hover:border-gold/60 hover:bg-gold/10 transition-all shadow-lg focus-visible:ring-2 focus-visible:ring-gold z-10 touch-manipulation"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-1 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-5 w-11 h-11 sm:w-10 sm:h-10 rounded-full glass border border-gold/20 flex items-center justify-center hover:border-gold/60 hover:bg-gold/10 transition-all shadow-lg focus-visible:ring-2 focus-visible:ring-gold z-10 touch-manipulation"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => emblaApi?.scrollTo(i)}
              role="tab"
              aria-selected={i === selected}
              aria-label={`Show testimonial from ${t.name}`}
              className={`transition-all duration-300 rounded-full focus-visible:ring-2 focus-visible:ring-gold ${
                i === selected ? "w-8 h-2.5 gold-gradient" : "w-2.5 h-2.5 bg-muted hover:bg-gold/40"
              }`}
            />
          ))}
        </div>

        {/* Press / brand strip — marquee */}
        <div className="mt-16">
          <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5">
            Featured by educators at
          </p>
          <div
            className="overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)",
            }}
          >
            <div className="flex animate-marquee gap-12 whitespace-nowrap">
              {[...Array(2)].map((_, dup) => (
                <div key={dup} className="flex items-center gap-12 shrink-0">
                  {[
                    "Harvard EDx",
                    "AP Classroom",
                    "Khan Academy",
                    "JSTOR Daily",
                    "Smithsonian",
                    "NPR Education",
                    "EdSurge",
                    "British Library",
                  ].map((brand) => (
                    <span
                      key={`${dup}-${brand}`}
                      className="font-heading text-lg sm:text-xl font-bold text-muted-foreground/50 hover:text-gold/70 transition-colors"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
