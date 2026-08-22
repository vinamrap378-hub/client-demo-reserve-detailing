'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function PrecisionEditorial() {
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

  // Image scroll scale 1.08 -> 1.0
  const imageScale = useTransform(smoothProgress, [0.1, 0.8], [1.08, 1.0]);

  // Text enters from right by 40px
  const textX = useTransform(smoothProgress, [0.2, 0.5], [40, 0]);
  const textOpacity = useTransform(smoothProgress, [0.2, 0.5], [0, 1]);

  // Horizontal progress line underneath
  const lineProgress = useTransform(smoothProgress, [0.2, 0.7], ['0%', '100%']);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-black flex flex-col justify-between">
      <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[90vh]">
        {/* Left 60%: Large Detailing Image */}
        <div className="lg:col-span-7 relative h-[450px] lg:h-auto overflow-hidden bg-black">
          <motion.div style={{ scale: imageScale }} className="relative w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=85"
              alt="Precision Detailing at RESERVE Miami"
              fill
              className="object-cover object-center filter brightness-[0.85]"
            />
            {/* Edge fade to right black */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/90 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:hidden" />
          </motion.div>
        </div>

        {/* Right 40%: Black Background & Content */}
        <div className="lg:col-span-5 bg-black p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start text-left">
          <motion.div style={{ x: textX, opacity: textOpacity }} className="flex flex-col gap-6 max-w-lg">
            <span className="text-[11px] font-mono tracking-[0.4em] uppercase text-titanium-400">
              01 / PRECISION
            </span>

            <h2 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-light text-white uppercase leading-[1.0] tracking-tight">
              PRECISION <br />
              AT EVERY <br />
              <span className="font-bold">SURFACE.</span>
            </h2>

            <p className="text-titanium-300 text-sm sm:text-base font-light leading-relaxed">
              Every curve, edge, and clear-coat micron receives surgical attention. Combining ultrasonic depth profiling, daylight-balanced 5000K inspection lights, and Italian dual-action jeweling systems for flawless optical purity.
            </p>

            <div className="pt-4">
              <Link
                href="/process"
                className="group inline-flex items-center gap-3 text-xs tracking-[0.25em] font-medium text-white uppercase hover:text-champagne-300 transition-colors"
              >
                <span>EXPLORE THE PROCESS</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-[6px]" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 1px Horizontal Progress Line Underneath */}
      <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
        <motion.div style={{ width: lineProgress }} className="h-full bg-white" />
      </div>
    </section>
  );
}