import React from 'react';
import HeroScrollSequence from '@/components/home/HeroScrollSequence';
import BrandStatement from '@/components/home/BrandStatement';
import FeaturedExperience from '@/components/home/FeaturedExperience';
import ServicesPillars from '@/components/home/ServicesPillars';
import WhyReserve from '@/components/home/WhyReserve';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import ReviewsSection from '@/components/home/ReviewsSection';
import FinalCTA from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-graphite-950">
      {/* 1. Hero with Apple-Style Scroll Frames */}
      <HeroScrollSequence />

      {/* 2. Brand Statement: NOT JUST CLEAN. REDEFINED. */}
      <BrandStatement />

      {/* 3. Featured Experience: PRECISION AT EVERY SURFACE */}
      <FeaturedExperience />

      {/* 4. Three Core Pillars: EXTERIOR, INTERIOR, PROTECTION */}
      <ServicesPillars />

      {/* 5. Why Reserve: DETAILING WITHOUT COMPROMISE & 3 Pillars */}
      <WhyReserve />

      {/* 6. Interactive Before / After Paint Inspection Showcase */}
      <section className="bg-graphite-900 py-32 px-6 md:px-12 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85"
            afterImage="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=85"
            beforeLabel="Uncorrected Swirls & Track Micro-Marring"
            afterLabel="RESERVE Multi-Stage Mirror Jeweling"
            title="Surgical Paint Leveling & Gloss Restoration"
            vehicle="Porsche 911 GT3 RS (992) • Arctic Grey PTS"
            beforeGloss="53.8 GU"
            afterGloss="99.4 GU"
          />
        </div>
      </section>

      {/* 7. Reviews: 4.9 ★★★★★ & 2,900+ Reviews Horizontal Carousel */}
      <ReviewsSection />

      {/* 8. Final CTA: READY FOR THE FINISH? */}
      <FinalCTA />
    </div>
  );
}
