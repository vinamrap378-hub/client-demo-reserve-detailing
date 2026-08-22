'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function BrandStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const line1Opacity = useTransform(smoothProgress, [0.15, 0.38], [0.15, 1]);
  const line1Y = useTransform(smoothProgress, [0.15, 0.38], [30, 0]);
  const line1Scale = useTransform(smoothProgress, [0.15, 0.38], [0.97, 1]);

  const line2Opacity = useTransform(smoothProgress, [0.35, 0.58], [0.15, 1]);
  const line2Y = useTransform(smoothProgress, [0.35, 0.58], [30, 0]);
  const line2Scale = useTransform(smoothProgress, [0.35, 0.58], [0.97, 1]);

  const line3Opacity = useTransform(smoothProgress, [0.55, 0.78], [0, 1]);
  const line3Y = useTransform(smoothProgress, [0.55, 0.78], [20, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] bg-graphite-950 flex items-center justify-center py-36 px-6 md:px-12 overflow-hidden border-t border-b border-white/[0.06]"
    >
      {/* Subtle ambient spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-champagne-500/[0.035] blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full text-center flex flex-col items-center gap-12 relative z-10">
        <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-champagne-400">
          // Brand Philosophy
        </span>

        <div className="flex flex-col gap-6 sm:gap-10">
          <motion.h2
            style={{ opacity: line1Opacity, y: line1Y, scale: line1Scale }}
            className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tight text-white uppercase text-glow"
          >
            Not Just Clean.
          </motion.h2>

          <motion.h2
            style={{ opacity: line2Opacity, y: line2Y, scale: line2Scale }}
            className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-metallic-gold uppercase text-gold-glow"
          >
            Redefined.
          </motion.h2>
        </div>

        <motion.div
          style={{ opacity: line3Opacity, y: line3Y }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 mt-6 text-titanium-300 text-base sm:text-xl font-light tracking-widest"
        >
          <span className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 animate-pulse" />
            Every surface.
          </span>
          <span className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 animate-pulse" />
            Every reflection.
          </span>
          <span className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne-400 animate-pulse" />
            Every detail.
          </span>
        </motion.div>
      </div>
    </section>
  );
}