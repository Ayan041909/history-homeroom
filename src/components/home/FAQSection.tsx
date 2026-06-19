"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/mockData";

export function FAQSection() {
  return (
    <section aria-label="Frequently asked questions">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-6"
      >
        <h2 className="font-heading text-2xl font-bold flex items-center gap-2">
          <HelpCircle size={22} className="text-gold" aria-hidden="true" />
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-sm mt-1">Everything you need to know about History Homeroom</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Accordion multiple={false} className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={i}
              value={String(i)}
              className="rounded-xl border border-border bg-card px-4 data-[open]:border-gold/30 transition-all"
            >
              <AccordionTrigger className="text-sm font-semibold text-left py-4 hover:text-gold transition-colors">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
