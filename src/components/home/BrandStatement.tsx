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

  // Transform "NOT JUST CLEAN." into "REDEFINED."
  const cleanOpacity = useTransform(smoothProgress, [0.2, 0.45, 0.55], [0.2, 1, 0]);
  const cleanY = useTransform(smoothProgress, [0.2, 0.45, 0.55], [30, 0, -30]);

  const redefinedOpacity = useTransform(smoothProgress, [0.5, 0.65], [0, 1]);
  const redefinedY = useTransform(smoothProgress, [0.5, 0.65], [30, 0]);
  const redefinedScale = useTransform(smoothProgress, [0.5, 0.7], [0.95, 1]);

  // Words reveal individually: "Every surface." "Every reflection." "Every detail."
  const word1Opacity = useTransform(smoothProgress, [0.62, 0.72], [0, 1]);
  const word1Y = useTransform(smoothProgress, [0.62, 0.72], [40, 0]);

  const word2Opacity = useTransform(smoothProgress, [0.68, 0.78], [0, 1]);
  const word2Y = useTransform(smoothProgress, [0.68, 0.78], [40, 0]);

  const word3Opacity = useTransform(smoothProgress, [0.74, 0.84], [0, 1]);
  const word3Y = useTransform(smoothProgress, [0.74, 0.84], [40, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-black flex items-center justify-center py-32 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full text-center flex flex-col items-center justify-center gap-8">
        {/* Small Label */}
        <span className="text-[11px] font-mono tracking-[0.4em] uppercase text-titanium-400">
          THE RESERVE STANDARD
        </span>

        {/* Large Text Container */}
        <div className="relative min-h-[16vw] flex items-center justify-center w-full">
          {/* Phase 1: NOT JUST CLEAN. */}
          <motion.h2
            style={{ opacity: cleanOpacity, y: cleanY }}
            className="absolute font-cinzel text-[10vw] sm:text-[9vw] md:text-[8vw] font-light tracking-tight text-white uppercase leading-none whitespace-nowrap"
          >
            Not Just Clean.
          </motion.h2>

          {/* Phase 2: REDEFINED. (Approx 13vw) */}
          <motion.h2
            style={{ opacity: redefinedOpacity, y: redefinedY, scale: redefinedScale }}
            className="font-cinzel text-[15vw] sm:text-[13vw] font-bold tracking-tight text-white uppercase leading-none whitespace-nowrap"
          >
            Redefined.
          </motion.h2>
        </div>

        {/* Words individually animated from opacity 0 + Y 40px to opacity 1 + Y 0 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 mt-6 text-titanium-300 text-base sm:text-lg md:text-xl font-light tracking-[0.2em] uppercase">
          <motion.span style={{ opacity: word1Opacity, y: word1Y }}>
            Every surface.
          </motion.span>
          <motion.span style={{ opacity: word2Opacity, y: word2Y }}>
            Every reflection.
          </motion.span>
          <motion.span style={{ opacity: word3Opacity, y: word3Y }}>
            Every detail.
          </motion.span>
        </div>
      </div>
    </section>
  );
}