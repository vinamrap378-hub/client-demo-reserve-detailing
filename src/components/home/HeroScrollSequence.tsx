'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Sparkles, Shield, Award, Gauge, Sliders, ChevronDown, CheckCircle2 } from 'lucide-react';

const CARS = [
  {
    id: 'porsche-gt3rs',
    title: 'Porsche 911 GT3 RS',
    stage: '01',
    headlineMain: 'THE ART',
    headlineSub: 'OF THE FINISH.',
    tagline: 'Surgical paint leveling & multi-stage mirror jeweling.',
    verticalTag: '01 // OPTICAL PURITY • 99.4 GU GLOSS PROFILE',
    spec1: '99.4 GU',
    spec1Label: 'Mirror Gloss',
    spec2: '24 Microns',
    spec2Label: 'Clear Coat Profile',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2200&q=88',
    ctaText: 'Book GT3 RS Detail',
    serviceLink: '/services#polishing'
  },
  {
    id: 'ferrari-sf90',
    title: 'Ferrari SF90 Stradale',
    stage: '02',
    headlineMain: 'NOT JUST CLEAN.',
    headlineSub: 'REDEFINED.',
    tagline: 'Permanent 9H ceramic matrix & short-wave quartz bake.',
    verticalTag: '02 // MOLECULAR ARMOR • 115° WATER BEADING ANGLE',
    spec1: '9H+ Matrix',
    spec1Label: 'Covalent Bond',
    spec2: '000 PPM',
    spec2Label: 'Deionized Wash',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=2200&q=88',
    ctaText: 'Explore Ceramic 9H',
    serviceLink: '/services#ceramic-coating'
  },
  {
    id: 'aston-atelier',
    title: 'Bespoke Atelier Sanctuary',
    stage: '03',
    headlineMain: 'PRECISION',
    headlineSub: 'AT EVERY SURFACE.',
    tagline: 'Museum-grade preservation for South Florida collectors.',
    verticalTag: '03 // MIAMI ATELIER • 4.9 ★★★★★ (2,949 REVIEWS)',
    spec1: '10-Yr',
    spec1Label: 'Warranty Registry',
    spec2: '5000K',
    spec2Label: 'Cleanroom CRI 96+',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=88',
    ctaText: 'Reserve Atelier Session',
    serviceLink: '/book'
  }
];

export default function HeroScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeCarIndex, setActiveCarIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Scroll progression over 350vh for deep, cinematic control
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Track active car index based on scroll position
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      if (latest < 0.38) {
        setActiveCarIndex(0);
      } else if (latest < 0.72) {
        setActiveCarIndex(1);
      } else {
        setActiveCarIndex(2);
      }
    });
  }, [scrollYProgress]);

  // Car 1 (Porsche 911 GT3 RS) transforms: Sideways Left
  const car1Opacity = useTransform(scrollYProgress, [0, 0.28, 0.38], [1, 1, 0]);
  const car1X = useTransform(scrollYProgress, [0, 0.38], [0, -60]);

  // Car 2 (Ferrari SF90) transforms: Sideways Right
  const car2Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.73], [0, 1, 1, 0]);
  const car2X = useTransform(scrollYProgress, [0.35, 0.45, 0.73], [60, 0, -60]);

  // Car 3 (Bespoke Atelier) transforms: Sideways Left
  const car3Opacity = useTransform(scrollYProgress, [0.68, 0.78, 1], [0, 1, 1]);
  const car3X = useTransform(scrollYProgress, [0.68, 0.78], [60, 0]);

  // Preload the 3 high-res curated vehicle images
  const loadedImagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let count = 0;
    const images: HTMLImageElement[] = [];

    CARS.forEach((car, index) => {
      const img = new Image();
      img.src = car.image;
      img.onload = () => {
        count++;
        if (count === CARS.length) {
          loadedImagesRef.current = images;
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        count++;
        if (count === CARS.length) {
          loadedImagesRef.current = images;
          setImagesLoaded(true);
        }
      };
      images[index] = img;
    });
  }, []);

  // Canvas render loop for ultra-smooth 60fps blending between 3 cars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const progress = scrollYProgress.get();
      const images = loadedImagesRef.current;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Black background
      ctx.fillStyle = '#060608';
      ctx.fillRect(0, 0, width, height);

      if (images.length === 3) {
        // Calculate blend across the 3 cars:
        // progress 0.0 - 0.35 -> Car 0
        // progress 0.35 - 0.70 -> Blend Car 0 into Car 1
        // progress 0.70 - 1.0 -> Blend Car 1 into Car 2
        let imgA = images[0];
        let imgB = images[1];
        let blendFactor = 0;

        if (progress <= 0.35) {
          imgA = images[0];
          imgB = images[0];
          blendFactor = 0;
        } else if (progress <= 0.68) {
          imgA = images[0];
          imgB = images[1];
          // smooth cubic easing for the blend
          const t = (progress - 0.35) / 0.33;
          blendFactor = t * t * (3 - 2 * t);
        } else {
          imgA = images[1];
          imgB = images[2];
          const t = Math.min((progress - 0.68) / 0.32, 1);
          blendFactor = t * t * (3 - 2 * t);
        }

        const drawCar = (img: HTMLImageElement, alpha: number, panOffset: number) => {
          if (!img || !img.complete || img.naturalWidth === 0) return;
          ctx.globalAlpha = alpha;

          const imgRatio = img.naturalWidth / img.naturalHeight;
          const canvasRatio = width / height;
          let renderW = width;
          let renderH = height;
          let renderX = 0;
          let renderY = 0;

          if (canvasRatio > imgRatio) {
            renderH = width / imgRatio;
            renderY = (height - renderH) / 2;
          } else {
            renderW = height * imgRatio;
            renderX = (width - renderW) / 2;
          }

          // Subtle cinematic zoom & pan
          const scale = 1.06 + progress * 0.04;
          const panX = renderX + panOffset * 25;

          ctx.drawImage(
            img,
            panX - ((scale - 1) * renderW) / 2,
            renderY - ((scale - 1) * renderH) / 2,
            renderW * scale,
            renderH * scale
          );
        };

        if (imgA) drawCar(imgA, 1 - blendFactor, -progress);
        if (imgB && blendFactor > 0) drawCar(imgB, blendFactor, 1 - progress);

        // Apple-style editorial dark vignetting & side gradient for maximum text readability
        // Left gradient
        const gradLeft = ctx.createLinearGradient(0, 0, width * 0.65, 0);
        gradLeft.addColorStop(0, 'rgba(6, 6, 8, 0.92)');
        gradLeft.addColorStop(0.5, 'rgba(6, 6, 8, 0.6)');
        gradLeft.addColorStop(1, 'rgba(6, 6, 8, 0)');
        ctx.fillStyle = gradLeft;
        ctx.globalAlpha = 1;
        ctx.fillRect(0, 0, width * 0.65, height);

        // Right gradient
        const gradRight = ctx.createLinearGradient(width, 0, width * 0.35, 0);
        gradRight.addColorStop(0, 'rgba(6, 6, 8, 0.92)');
        gradRight.addColorStop(0.5, 'rgba(6, 6, 8, 0.6)');
        gradRight.addColorStop(1, 'rgba(6, 6, 8, 0)');
        ctx.fillStyle = gradRight;
        ctx.fillRect(width * 0.35, 0, width * 0.65, height);

        // Top & Bottom gradients
        const gradTop = ctx.createLinearGradient(0, 0, 0, height * 0.35);
        gradTop.addColorStop(0, 'rgba(6, 6, 8, 0.85)');
        gradTop.addColorStop(1, 'rgba(6, 6, 8, 0)');
        ctx.fillStyle = gradTop;
        ctx.fillRect(0, 0, width, height * 0.35);

        const gradBottom = ctx.createLinearGradient(0, height * 0.65, 0, height);
        gradBottom.addColorStop(0, 'rgba(6, 6, 8, 0)');
        gradBottom.addColorStop(1, 'rgba(6, 6, 8, 0.95)');
        ctx.fillStyle = gradBottom;
        ctx.fillRect(0, height * 0.65, width, height * 0.35);
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollYProgress, imagesLoaded]);

  // Jump to specific car phase when clicking indicators
  const scrollToCar = (index: number) => {
    if (!containerRef.current) return;
    const targetScroll = index === 0 ? 0 : index === 1 ? 0.52 : 0.88;
    const containerHeight = containerRef.current.clientHeight - window.innerHeight;
    window.scrollTo({
      top: containerRef.current.offsetTop + containerHeight * targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <div ref={containerRef} className="relative w-full h-[350vh] bg-graphite-950">
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* ========================================================================= */}
        {/* CAR 1: PORSCHE 911 GT3 RS (Left-Anchored Sideways Dramatic Typography) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: car1Opacity, x: car1X }}
          className="absolute inset-0 z-20 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center pointer-events-none"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
            {/* Left Column: Creative Big Sideways Headline */}
            <div className="lg:col-span-8 flex flex-col items-start text-left">
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-graphite-900/80 backdrop-blur-2xl border border-white/15 mb-6 shadow-2xl">
                <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
                <span className="text-[11px] font-mono tracking-[0.25em] text-champagne-300 uppercase">
                  Miami Studio • 01 Porsche 911 GT3 RS
                </span>
              </div>

              {/* Creative Big Typography */}
              <h1 className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tight text-white uppercase leading-[0.9] text-glow">
                <span className="block text-white font-extrabold">The Art</span>
                <span className="block text-metallic-gold font-light tracking-tighter">
                  Of The Finish.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-base sm:text-xl text-titanium-300 font-light tracking-wide max-w-xl leading-relaxed">
                {CARS[0].tagline} Ultrasonic clear coat depth calibration for Paint-to-Sample collectors.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/book"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-white via-titanium-100 to-champagne-300 text-graphite-950 font-medium text-xs tracking-[0.2em] uppercase hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
                >
                  <span>{CARS[0].ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 text-graphite-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <Link
                  href={CARS[0].serviceLink}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-graphite-900/80 backdrop-blur-xl border border-white/15 text-white font-medium text-xs tracking-[0.2em] uppercase hover:bg-white/10 hover:border-champagne-400/50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Inspect Protocol</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Floating Telemetry HUD */}
            <div className="lg:col-span-4 hidden lg:flex flex-col gap-4">
              <div className="glass-panel p-6 rounded-3xl border border-white/15 backdrop-blur-3xl shadow-2xl flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[10px] font-mono tracking-widest text-champagne-400 uppercase">
                    Stage 01 Telemetry
                  </span>
                  <div className="w-2 h-2 rounded-full bg-champagne-400 animate-pulse" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-2xl font-mono font-light text-white">{CARS[0].spec1}</span>
                    <p className="text-[11px] text-titanium-400 font-light mt-0.5">{CARS[0].spec1Label}</p>
                  </div>
                  <div>
                    <span className="text-2xl font-mono font-light text-champagne-300">{CARS[0].spec2}</span>
                    <p className="text-[11px] text-titanium-400 font-light mt-0.5">{CARS[0].spec2Label}</p>
                  </div>
                </div>

                <p className="text-xs text-titanium-400 font-light pt-2 border-t border-white/10">
                  Rupes Bigfoot dual-action jeweling compound removing 98% of swirl micro-marring.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CAR 2: FERRARI SF90 STRADALE (Right-Anchored Sideways Creative Headline) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: car2Opacity, x: car2X }}
          className="absolute inset-0 z-20 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center pointer-events-none"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
            {/* Left Column: Floating HUD */}
            <div className="lg:col-span-4 hidden lg:flex flex-col gap-4">
              <div className="glass-panel p-6 rounded-3xl border border-white/15 backdrop-blur-3xl shadow-2xl flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[10px] font-mono tracking-widest text-champagne-400 uppercase">
                    Stage 02 Telemetry
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-2xl font-mono font-light text-white">{CARS[1].spec1}</span>
                    <p className="text-[11px] text-titanium-400 font-light mt-0.5">{CARS[1].spec1Label}</p>
                  </div>
                  <div>
                    <span className="text-2xl font-mono font-light text-champagne-300">{CARS[1].spec2}</span>
                    <p className="text-[11px] text-titanium-400 font-light mt-0.5">{CARS[1].spec2Label}</p>
                  </div>
                </div>

                <p className="text-xs text-titanium-400 font-light pt-2 border-t border-white/10">
                  Multi-layer Silicon Dioxide nano-matrix baked with short-wave infrared heat lamps.
                </p>
              </div>
            </div>

            {/* Right Column: Creative Big Sideways Headline */}
            <div className="lg:col-span-8 flex flex-col items-start lg:items-end text-left lg:text-right">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-graphite-900/80 backdrop-blur-2xl border border-white/15 mb-6 shadow-2xl">
                <Shield className="w-3.5 h-3.5 text-champagne-400" />
                <span className="text-[11px] font-mono tracking-[0.25em] text-champagne-300 uppercase">
                  Miami Studio • 02 Ferrari SF90 Stradale
                </span>
              </div>

              <h2 className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tight text-white uppercase leading-[0.9] text-glow">
                <span className="block text-white font-light">Not Just Clean.</span>
                <span className="block text-metallic-gold font-extrabold">Redefined.</span>
              </h2>

              <p className="mt-6 text-base sm:text-xl text-titanium-300 font-light tracking-wide max-w-xl leading-relaxed">
                {CARS[1].tagline} Extreme hydrophobic self-cleaning contact angle shielding against Florida heat.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/services#ceramic-coating"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-white via-titanium-100 to-champagne-300 text-graphite-950 font-medium text-xs tracking-[0.2em] uppercase hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
                >
                  <span>{CARS[1].ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 text-graphite-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <Link
                  href="/book"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-graphite-900/80 backdrop-blur-xl border border-white/15 text-white font-medium text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Book Ceramic Armor</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CAR 3: BESPOKE ATELIER (Left-Anchored Sideways Headline) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: car3Opacity, x: car3X }}
          className="absolute inset-0 z-20 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center pointer-events-none"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
            {/* Left Column: Creative Big Sideways Headline */}
            <div className="lg:col-span-8 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-graphite-900/80 backdrop-blur-2xl border border-white/15 mb-6 shadow-2xl">
                <Award className="w-3.5 h-3.5 text-champagne-400" />
                <span className="text-[11px] font-mono tracking-[0.25em] text-champagne-300 uppercase">
                  Miami Studio • 03 Bespoke Atelier
                </span>
              </div>

              <h2 className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tight text-white uppercase leading-[0.9] text-glow">
                <span className="block text-white font-extrabold">Precision</span>
                <span className="block text-metallic-gold font-light tracking-tighter">
                  At Every Surface.
                </span>
              </h2>

              <p className="mt-6 text-base sm:text-xl text-titanium-300 font-light tracking-wide max-w-xl leading-relaxed">
                {CARS[2].tagline} Semi-aniline leather rejuvenation, dry vapor sterilization, and white-glove delivery.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/book"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-white via-titanium-100 to-champagne-300 text-graphite-950 font-medium text-xs tracking-[0.2em] uppercase hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
                >
                  <span>{CARS[2].ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 text-graphite-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <Link
                  href="/gallery"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-graphite-900/80 backdrop-blur-xl border border-white/15 text-white font-medium text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>View Full Gallery</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Floating Telemetry HUD */}
            <div className="lg:col-span-4 hidden lg:flex flex-col gap-4">
              <div className="glass-panel p-6 rounded-3xl border border-white/15 backdrop-blur-3xl shadow-2xl flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[10px] font-mono tracking-widest text-champagne-400 uppercase">
                    Stage 03 Handover
                  </span>
                  <span className="text-[11px] font-mono text-champagne-400">4.9 ★★★★★</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-2xl font-mono font-light text-white">{CARS[2].spec1}</span>
                    <p className="text-[11px] text-titanium-400 font-light mt-0.5">{CARS[2].spec1Label}</p>
                  </div>
                  <div>
                    <span className="text-2xl font-mono font-light text-champagne-300">{CARS[2].spec2}</span>
                    <p className="text-[11px] text-titanium-400 font-light mt-0.5">{CARS[2].spec2Label}</p>
                  </div>
                </div>

                <p className="text-xs text-titanium-400 font-light pt-2 border-t border-white/10">
                  Staged in 5000K presentation bay with registered CarFax warranty documentation.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* SIDEWAYS VERTICAL ACCENT STRIP (Left Edge) */}
        {/* ========================================================================= */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6 z-30 pointer-events-none">
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-champagne-400/50 to-transparent" />
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-titanium-400 [writing-mode:vertical-rl] rotate-180">
            {CARS[activeCarIndex].verticalTag}
          </span>
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-champagne-400/50 to-transparent" />
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM CAR SELECTOR PILLS & SCROLL INDICATOR */}
        {/* ========================================================================= */}
        <div className="absolute bottom-8 left-6 right-6 max-w-7xl mx-auto flex items-center justify-between z-30 pointer-events-auto">
          {/* 3 Cars Switcher */}
          <div className="flex items-center gap-2">
            {CARS.map((car, idx) => (
              <button
                key={car.id}
                onClick={() => scrollToCar(idx)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all flex items-center gap-2 ${
                  activeCarIndex === idx
                    ? 'bg-white text-graphite-950 font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                    : 'bg-black/60 backdrop-blur-md text-titanium-400 hover:text-white border border-white/10'
                }`}
              >
                <span>{car.stage}</span>
                <span className="hidden sm:inline-block">{car.title}</span>
              </button>
            ))}
          </div>

          {/* Scroll Down Indicator */}
          <div className="hidden sm:flex items-center gap-3 text-titanium-400">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase">
              Scroll To Scrub
            </span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="w-1 h-2 rounded-full bg-champagne-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}