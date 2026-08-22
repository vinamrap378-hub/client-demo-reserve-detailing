'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for ~700px scroll pull-away animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Over ~700px scroll:
  // vehicle scale: 1 -> 0.82
  // vehicle Y: 0 -> -40px
  const vehicleScale = useTransform(smoothProgress, [0, 0.7], [1, 0.82]);
  const vehicleY = useTransform(smoothProgress, [0, 0.7], [0, -40]);

  // headline opacity: 1 -> 0
  // headline Y: 0 -> -100px
  const textOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.5], [0, -100]);

  // hero background darkening overlay
  const overlayOpacity = useTransform(smoothProgress, [0, 0.7], [0.3, 0.85]);

  return (
    <div ref={containerRef} className="relative w-full h-[180vh] bg-black">
      {/* Sticky Fullscreen Stage (100vh) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        {/* Background Dark Gradient Overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 z-10 bg-black pointer-events-none"
        />

        {/* Subtle radial lighting for deep contrast */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_45%,rgba(35,38,50,0.4)_0%,rgba(0,0,0,1)_70%)] pointer-events-none" />

        {/* ========================================================================= */}
        {/* CENTERED VEHICLE (60–70% Viewport Width) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ scale: vehicleScale, y: vehicleY }}
          className="relative z-10 w-[90%] sm:w-[75%] md:w-[68%] max-w-[1250px] aspect-[16/9] flex items-center justify-center"
        >
          {/* Vehicle Entrance Animation: 0.4s fade in 0 -> 1, scale 1.06 -> 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2200&q=90"
              alt="Porsche 911 GT3 RS at RESERVE Detailing"
              fill
              priority
              className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
            />
          </motion.div>
        </motion.div>

        {/* Subtle black gradient behind text for supreme readability */}
        <div className="absolute inset-0 z-15 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-15 bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* ========================================================================= */}
        {/* LOWER-LEFT HEADLINE & CTA HIERARCHY */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute bottom-12 sm:bottom-16 left-6 sm:left-12 md:left-16 z-20 max-w-2xl flex flex-col items-start text-left pointer-events-auto"
        >
          {/* Small Label: 0.5s entrance */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] font-mono tracking-[0.35em] text-titanium-400 uppercase mb-3 block"
          >
            RESERVE DETAILING / MIAMI
          </motion.span>

          {/* Large Headline (Line 1: 0.7s, Line 2: 0.9s, moves up 35px while fading in) */}
          <div className="flex flex-col font-cinzel uppercase text-white leading-[0.9] tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[100px] xl:text-[120px] font-normal text-white"
            >
              The Art
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-[11vw] sm:text-[9vw] md:text-[8vw] lg:text-[100px] xl:text-[120px] font-bold text-white"
            >
              Of The Finish.
            </motion.span>
          </div>

          {/* Supporting text: 1.1s fade in */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-xs sm:text-sm md:text-base font-light tracking-[0.2em] text-titanium-300 uppercase"
          >
            Precision detailing. Protection. Obsession.
          </motion.p>

          {/* Buttons: 1.3s fade in */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/book"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-[26px] py-[15px] rounded-[999px] border border-white/30 text-white text-[12px] font-medium tracking-[0.2em] uppercase bg-transparent hover:bg-white hover:text-black transition-all duration-350"
            >
              <span>BOOK YOUR DETAIL</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-350 group-hover:translate-x-[6px]" />
            </Link>

            <Link
              href="/services"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-[26px] py-[15px] rounded-[999px] border border-white/10 text-titanium-300 text-[12px] font-medium tracking-[0.2em] uppercase bg-white/[0.03] hover:bg-white/10 hover:text-white transition-all duration-350"
            >
              <span>EXPLORE SERVICES</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Small bottom "SCROLL TO EXPLORE" indicator: 1.5s entrance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-3 text-titanium-400 pointer-events-none"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase">
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-titanium-400" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}