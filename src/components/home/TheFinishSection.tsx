'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function TheFinishSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001
  });

  // 4-Phase Surface Transitions:
  // Phase 1 (0-30%): Muted & slightly hazy
  // Phase 2 (30-60%): Sharper reflection
  // Phase 3 (60-80%): Water droplets visible
  // Phase 4 (80-100%): Extremely glossy liquid mirror

  const hazyOpacity = useTransform(smoothProgress, [0, 0.28, 0.38], [1, 1, 0]);
  const sharpOpacity = useTransform(smoothProgress, [0.28, 0.38, 0.58, 0.65], [0, 1, 1, 0]);
  const dropletsOpacity = useTransform(smoothProgress, [0.58, 0.65, 0.78, 0.84], [0, 1, 1, 0]);
  const liquidGlossOpacity = useTransform(smoothProgress, [0.78, 0.85, 1], [0, 1, 1]);

  // Phase Title text
  const phaseLabel = useTransform(smoothProgress, (val) => {
    if (val < 0.3) return 'PHASE 01 // UNCORRECTED HAZE (53.8 GU)';
    if (val < 0.6) return 'PHASE 02 // MULTI-STAGE LEVELING (88.4 GU)';
    if (val < 0.8) return 'PHASE 03 // 9H CERAMIC MATRIX BEADING';
    return 'PHASE 04 // 99.4 GU LIQUID MIRROR REVEAL';
  });

  // Text reveals
  const textOpacity = useTransform(smoothProgress, [0.15, 0.45], [0, 1]);
  const textY = useTransform(smoothProgress, [0.15, 0.45], [35, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-[280vh] bg-black">
      {/* Sticky Fullscreen 100vh viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        {/* Layer 1: Hazy Muted Paint */}
        <motion.div style={{ opacity: hazyOpacity }} className="absolute inset-0 w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=2200&q=85"
            alt="Hazy uncorrected automotive surface"
            fill
            className="object-cover filter contrast-[0.8] brightness-[0.7] blur-[1px]"
          />
        </motion.div>

        {/* Layer 2: Sharper Reflection */}
        <motion.div style={{ opacity: sharpOpacity }} className="absolute inset-0 w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=2200&q=85"
            alt="Sharpened paint correction reflection"
            fill
            className="object-cover filter brightness-[0.8] contrast-[1.1]"
          />
        </motion.div>

        {/* Layer 3: Water Droplets Hydrophobic Beading */}
        <motion.div style={{ opacity: dropletsOpacity }} className="absolute inset-0 w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=2200&q=85"
            alt="Ceramic coating water beading"
            fill
            className="object-cover filter brightness-[0.85] contrast-[1.15]"
          />
        </motion.div>

        {/* Layer 4: Extremely Glossy Liquid Mirror */}
        <motion.div style={{ opacity: liquidGlossOpacity }} className="absolute inset-0 w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2200&q=90"
            alt="Liquid mirror gloss final finish"
            fill
            className="object-cover filter brightness-[0.9] contrast-[1.2]"
          />
        </motion.div>

        {/* Dark Editorial Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/50 pointer-events-none" />

        {/* Text Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full flex flex-col justify-between h-full py-20 pointer-events-none">
          {/* Top Label */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono tracking-[0.4em] uppercase text-titanium-400">
              02 / SURFACE
            </span>
            <div className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-champagne-300">
              THE FINISH LAB
            </div>
          </div>

          {/* Center Main Headline */}
          <motion.div style={{ opacity: textOpacity, y: textY }} className="max-w-3xl flex flex-col gap-4">
            <h2 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase leading-[0.95]">
              The Difference <br />
              Is In What <br />
              <span className="font-light text-titanium-300">You Can&apos;t See.</span>
            </h2>
            <p className="text-titanium-300 text-sm sm:text-base font-light tracking-wide max-w-xl">
              Microscopic clear coat pores sealed. Covalent molecular bonds formed. Optical reflections sharpened down to sub-micron accuracy.
            </p>
          </motion.div>

          {/* Bottom Protocol Progression */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/15 text-xs font-mono tracking-[0.25em] text-titanium-300 uppercase">
            <span>CORRECTION → PROTECTION → FINISH</span>
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}