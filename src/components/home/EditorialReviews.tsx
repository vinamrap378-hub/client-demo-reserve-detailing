'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { REVIEWS_DATA } from '@/data/reviewsData';

export default function EditorialReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS_DATA.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = REVIEWS_DATA[currentIndex];

  return (
    <section className="relative w-full bg-black py-32 px-6 sm:px-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-12">
        {/* Top Header: 4.9 ★★★★★ & 2,900+ CLIENT REVIEWS */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-white text-2xl font-bold font-mono tracking-wider">
            <span>4.9</span>
            <div className="flex items-center gap-1 text-white">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-white text-white" />
              ))}
            </div>
          </div>
          <span className="text-[12px] font-mono tracking-[0.35em] uppercase text-titanium-400 font-medium">
            2,900+ CLIENT REVIEWS
          </span>
        </div>

        {/* ONE Large Editorial Review */}
        <div className="min-h-[220px] flex items-center justify-center w-full max-w-4xl relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-6"
            >
              {/* Large Quotation */}
              <blockquote className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-light text-white leading-relaxed tracking-wide">
                &ldquo;{current.comment}&rdquo;
              </blockquote>

              {/* Author & Vehicle Label */}
              <div className="flex flex-col items-center gap-1 mt-2">
                <span className="text-base sm:text-lg font-medium text-white tracking-widest uppercase">
                  {current.author}
                </span>
                <span className="text-xs font-mono tracking-widest text-titanium-400 uppercase">
                  {current.vehicle} • {current.service}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Left / Right Navigation Arrows */}
        <div className="flex items-center gap-4 pt-4">
          <button
            onClick={prevReview}
            className="p-3.5 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black text-white transition-all"
            aria-label="Previous Review"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono tracking-widest text-titanium-400">
            0{currentIndex + 1} / 0{REVIEWS_DATA.length}
          </span>
          <button
            onClick={nextReview}
            className="p-3.5 rounded-full border border-white/20 hover:border-white hover:bg-white hover:text-black text-white transition-all"
            aria-label="Next Review"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}