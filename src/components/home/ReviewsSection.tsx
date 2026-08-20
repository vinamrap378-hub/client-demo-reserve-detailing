'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { REVIEWS_DATA } from '@/data/reviewsData';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % REVIEWS_DATA.length);
  };

  const activeReview = REVIEWS_DATA[currentIndex];

  return (
    <section className="relative bg-graphite-900 py-32 px-6 md:px-12 overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Section Header with Overall Rating */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-500/10 border border-champagne-500/30 text-champagne-300 text-[11px] font-mono tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-champagne-400" />
              <span>VERIFIED GOOGLE & CARFAX REVIEWS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extralight tracking-tight text-white uppercase">
              4.9 <span className="text-champagne-400">★★★★★</span> <br />
              <span className="font-semibold text-metallic-silver">2,900+ Client Reviews.</span>
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-3.5 rounded-full bg-graphite-950/80 hover:bg-white text-white hover:text-black border border-white/15 transition-all"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-titanium-400">
              0{currentIndex + 1} / 0{REVIEWS_DATA.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3.5 rounded-full bg-graphite-950/80 hover:bg-white text-white hover:text-black border border-white/15 transition-all"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Large Review Carousel Card */}
        <div className="relative min-h-[380px] sm:min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/15 relative overflow-hidden"
            >
              <Quote className="absolute top-8 right-8 w-20 h-20 text-white/[0.03] pointer-events-none" />

              <div className="flex flex-col gap-6 relative z-10">
                {/* Rating & Service */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-1 text-champagne-400">
                    {[...Array(activeReview.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-champagne-400 text-champagne-400" />
                    ))}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono text-champagne-300">
                    {activeReview.service}
                  </span>
                </div>

                {/* Title & Comment */}
                <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                  &ldquo;{activeReview.title}&rdquo;
                </h3>

                <p className="text-sm sm:text-base text-titanium-300 font-light leading-relaxed max-w-4xl">
                  {activeReview.comment}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-2">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20">
                    <Image
                      src={activeReview.avatar}
                      alt={activeReview.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-white">{activeReview.author}</h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-champagne-400" />
                    </div>
                    <p className="text-xs text-titanium-400 font-light">
                      {activeReview.vehicle} • <span className="text-titanium-500">{activeReview.location}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Client Logos / Micro Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-graphite-950/60 border border-white/[0.06]">
            <span className="text-2xl font-mono font-extralight text-champagne-400">99.2%</span>
            <p className="text-[11px] text-titanium-400 uppercase tracking-wider mt-1">5-Star Ratio</p>
          </div>
          <div className="p-4 rounded-2xl bg-graphite-950/60 border border-white/[0.06]">
            <span className="text-2xl font-mono font-extralight text-champagne-400">1,200+</span>
            <p className="text-[11px] text-titanium-400 uppercase tracking-wider mt-1">Porsches Detailed</p>
          </div>
          <div className="p-4 rounded-2xl bg-graphite-950/60 border border-white/[0.06]">
            <span className="text-2xl font-mono font-extralight text-champagne-400">10-Yr</span>
            <p className="text-[11px] text-titanium-400 uppercase tracking-wider mt-1">Warranty Backing</p>
          </div>
          <div className="p-4 rounded-2xl bg-graphite-950/60 border border-white/[0.06]">
            <span className="text-2xl font-mono font-extralight text-champagne-400">000 PPM</span>
            <p className="text-[11px] text-titanium-400 uppercase tracking-wider mt-1">Deionized Standard</p>
          </div>
        </div>
      </div>
    </section>
  );
}
