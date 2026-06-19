"use client";

import { motion } from "framer-motion";
import { HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/mockData";
import { useTouchDevice } from "@/hooks/useTouchDevice";

export function LandingFAQ() {
  const isTouch = useTouchDevice();
  return (
    <section
      id="faq"
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
      aria-label="Frequently asked questions"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_100%,rgba(184,118,10,0.07),transparent)]"
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={isTouch ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-medium mb-3">
            <HelpCircle size={12} aria-hidden="true" /> Frequently Asked
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-black mb-3">
            Got <span className="gold-gradient-text">Questions?</span> We&apos;ve got Answers.
          </h2>
          <p className="text-muted-foreground text-lg">
            Can&apos;t find what you&apos;re looking for? Our chatbot in the corner can help — or visit the full FAQ.
          </p>
        </motion.div>

        <motion.div
          initial={isTouch ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl glass/60 bg-card/80 backdrop-blur p-2 sm:p-4"
        >
          <Accordion multiple={false} className="divide-y divide-border/50">
            {FAQ_ITEMS.slice(0, 6).map((item, idx) => (
              <AccordionItem key={idx} value={String(idx)} className="border-none">
                <AccordionTrigger className="px-3 py-4 text-left text-sm sm:text-base font-semibold hover:text-gold transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-3 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={isTouch ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-8"
        >
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
          >
            View all questions <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
