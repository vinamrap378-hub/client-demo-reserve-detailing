'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BrandStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const line1Opacity = useTransform(scrollYProgress, [0.1, 0.35], [0.1, 1]);
  const line2Opacity = useTransform(scrollYProgress, [0.3, 0.55], [0.1, 1]);
  const line3Opacity = useTransform(scrollYProgress, [0.5, 0.75], [0.1, 1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] bg-graphite-950 flex items-center justify-center py-32 px-6 md:px-12 overflow-hidden border-t border-b border-white/[0.06]"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-champagne-500/[0.04] blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full text-center flex flex-col items-center gap-12">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-champagne-400">
          // Brand Philosophy
        </span>

        <div className="flex flex-col gap-6 sm:gap-10">
          <motion.h2
            style={{ opacity: line1Opacity }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tight text-white uppercase"
          >
            Not Just Clean.
          </motion.h2>

          <motion.h2
            style={{ opacity: line2Opacity }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-metallic-gold uppercase"
          >
            Redefined.
          </motion.h2>
        </div>

        <motion.div
          style={{ opacity: line3Opacity }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 mt-6 text-titanium-300 text-lg sm:text-2xl font-light tracking-wide"
        >
          <span className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
            Every surface.
          </span>
          <span className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
            Every reflection.
          </span>
          <span className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-400" />
            Every detail.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
