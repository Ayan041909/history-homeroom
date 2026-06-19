import { Hero } from "@/components/landing/Hero";
import { LiveSessionsBanner } from "@/components/landing/LiveSessionsBanner";
import { MetricsCounter } from "@/components/landing/MetricsCounter";
import { PricingSection } from "@/components/landing/PricingSection";
import { EventsCarousel } from "@/components/landing/EventsCarousel";
import { HistoricalPreviews } from "@/components/landing/HistoricalPreviews";
import { FeaturedTutors } from "@/components/landing/FeaturedTutors";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { HowToGuide } from "@/components/landing/HowToGuide";
import { LandingFAQ } from "@/components/landing/LandingFAQ";
import { NewsletterCTA } from "@/components/landing/NewsletterCTA";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <LiveSessionsBanner />
      <MetricsCounter />
      <EventsCarousel />
      <HistoricalPreviews />
      <FeaturedTutors />
      <TestimonialsSection />
      <PricingSection />
      <HowToGuide />
      <LandingFAQ />
      <NewsletterCTA />
    </>
  );
}
