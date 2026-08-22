'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function FinalCinematicCTA() {
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

  // Subtle image zoom while scrolling into section
  const imageScale = useTransform(smoothProgress, [0, 1], [1.0, 1.12]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[90vh] bg-black flex items-center justify-center overflow-hidden border-t border-white/10 px-6"
    >
      {/* Automotive Background Image with Zoom */}
      <motion.div style={{ scale: imageScale }} className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2200&q=90"
          alt="RESERVE Detailing Handover Stage"
          fill
          className="object-cover filter brightness-[0.45]"
        />
      </motion.div>

      {/* Heavy Black Overlays */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />

      {/* Centered Content */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center gap-6 py-20">
        <span className="text-[11px] font-mono tracking-[0.4em] uppercase text-titanium-400">
          RESERVE DETAILING
        </span>

        <h2 className="font-cinzel text-[12vw] sm:text-[10vw] font-extrabold tracking-tight text-white uppercase leading-[0.9] text-glow">
          READY FOR <br />
          <span className="font-light text-titanium-200">THE FINISH?</span>
        </h2>

        <p className="text-sm sm:text-base font-light tracking-[0.2em] text-titanium-300 uppercase max-w-md mt-2">
          Experience Miami&apos;s premier automotive atelier.
        </p>

        <div className="mt-6">
          <Link
            href="/book"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full border border-white/30 text-white text-xs sm:text-sm font-medium tracking-[0.25em] uppercase bg-transparent hover:bg-white hover:text-black transition-all duration-350 shadow-2xl"
          >
            <span>BOOK YOUR DETAIL</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-350 group-hover:translate-x-[6px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}