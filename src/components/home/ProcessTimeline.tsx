'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROCESS_DATA } from '@/data/reviewsData';

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative w-full bg-black py-28 px-6 sm:px-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-[0.4em] uppercase text-titanium-400">
              // 6-Stage Protocol
            </span>
            <h2 className="font-cinzel text-4xl sm:text-6xl font-light text-white uppercase leading-[1.0] mt-2">
              The Architecture <br />
              <span className="font-bold">Of Perfection.</span>
            </h2>
          </div>
          <Link
            href="/process"
            className="text-xs font-mono tracking-[0.25em] uppercase text-titanium-400 hover:text-white transition-colors"
          >
            DETAILED TECHNICAL LAB →
          </Link>
        </div>

        {/* Large Visual Area Above Timeline */}
        <div className="relative w-full h-[450px] sm:h-[550px] rounded-3xl overflow-hidden border border-white/15 bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={PROCESS_DATA[activeStep].image}
                alt={PROCESS_DATA[activeStep].name}
                fill
                className="object-cover filter brightness-[0.8]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Active Stage Floating Information */}
          <div className="absolute bottom-8 left-8 right-8 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6 max-w-4xl">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-champagne-400">
                STAGE {PROCESS_DATA[activeStep].step} // {PROCESS_DATA[activeStep].subtitle}
              </span>
              <h3 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase">
                {PROCESS_DATA[activeStep].name}
              </h3>
              <p className="text-xs sm:text-sm text-titanium-300 font-light leading-relaxed max-w-xl">
                {PROCESS_DATA[activeStep].description}
              </p>
            </div>

            <Link
              href="/process"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-medium tracking-[0.2em] uppercase shrink-0 hover:bg-champagne-300 transition-colors"
            >
              <span>View Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Horizontal Desktop Timeline (Mobile: Stacked/Scrollable) */}
        <div className="relative w-full pt-6">
          {/* Progress Bar Background */}
          <div className="w-full h-[2px] bg-white/10 relative overflow-hidden mb-6">
            <motion.div
              animate={{ width: `${((activeStep + 1) / PROCESS_DATA.length) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-white"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {PROCESS_DATA.map((proc, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={proc.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-xl text-left border transition-all duration-600 flex flex-col gap-1.5 ${
                    isActive
                      ? 'bg-white/10 border-white text-white'
                      : 'bg-transparent border-white/10 text-titanium-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className="text-[11px] font-mono tracking-widest block font-light">
                    {proc.step}
                  </span>
                  <span className="font-cinzel text-sm sm:text-base font-semibold tracking-wider uppercase block">
                    {proc.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}