"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ExternalImage } from "@/components/shared/ExternalImage";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HISTORICAL_EVENTS } from "@/lib/mockData";
import { useTouchDevice } from "@/hooks/useTouchDevice";

export function EventsCarousel() {
  const isTouch = useTouchDevice();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback((api: typeof emblaApi) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
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

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section id="events" className="py-24 px-4 sm:px-6 relative overflow-hidden " aria-label="Major historical events">
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
            Pivotal <span className="gold-gradient-text">Moments in History</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Explore the events that shaped our world — beautifully presented and deeply analyzed.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden rounded-2xl" aria-roledescription="carousel" aria-label="Historical events">
            <div className="embla-container flex">
              {HISTORICAL_EVENTS.map((event, i) => (
                <div
                  key={event.id}
                  className="flex-none w-full sm:w-[80%] lg:w-[65%] px-3"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${HISTORICAL_EVENTS.length}: ${event.title}`}
                >
                  <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl group cursor-grab active:cursor-grabbing">
                    {/* Image */}
                    <div className="relative h-48 sm:h-72 lg:h-80 overflow-hidden bg-muted">
                      <ExternalImage
                        src={event.imageUrl}
                        alt={`Historical image for ${event.title}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 65vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      {/* Category badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full gold-gradient text-white text-xs font-bold shadow-lg">
                        {event.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6 bg-card">
                      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-3">
                        <h3 className="font-heading font-bold text-lg sm:text-2xl leading-tight flex-1 min-w-0">
                          {event.title}
                        </h3>
                        <span className="flex-shrink-0 px-3 py-1 rounded-lg bg-gold/10 text-gold text-sm font-bold border border-gold/20 whitespace-nowrap">
                          {event.year}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base line-clamp-3 sm:line-clamp-none">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons — stay inside bounds on mobile */}
          <button
            onClick={scrollPrev}
            className="absolute left-1 sm:left-0 top-[45%] -translate-y-1/2 sm:-translate-x-5 w-11 h-11 sm:w-10 sm:h-10 rounded-full glass border border-gold/20 flex items-center justify-center hover:border-gold/60 hover:bg-gold/10 transition-all shadow-lg focus-visible:ring-2 focus-visible:ring-gold z-10 touch-manipulation"
            aria-label="Previous historical event"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-1 sm:right-0 top-[45%] -translate-y-1/2 sm:translate-x-5 w-11 h-11 sm:w-10 sm:h-10 rounded-full glass border border-gold/20 flex items-center justify-center hover:border-gold/60 hover:bg-gold/10 transition-all shadow-lg focus-visible:ring-2 focus-visible:ring-gold z-10 touch-manipulation"
            aria-label="Next historical event"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-6" role="tablist" aria-label="Carousel navigation">
          {HISTORICAL_EVENTS.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`transition-all duration-300 rounded-full focus-visible:ring-2 focus-visible:ring-gold ${
                i === selectedIndex
                  ? "w-8 h-2.5 gold-gradient"
                  : "w-2.5 h-2.5 bg-muted hover:bg-gold/40"
              }`}
              role="tab"
              aria-selected={i === selectedIndex}
              aria-label={`Go to slide ${i + 1}: ${HISTORICAL_EVENTS[i].title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
