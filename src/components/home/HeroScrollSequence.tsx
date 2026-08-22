'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const mouseTargetRef = useRef({ x: 0.5, y: 0.5, currentX: 0.5, currentY: 0.5 });

  // Scroll progression over 350vh for deep, cinematic control
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001
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

  // Track mouse movement for dynamic specular lighting on desktop
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (typeof window === 'undefined') return;
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    mouseTargetRef.current.x = x;
    mouseTargetRef.current.y = y;
  }, []);

  // Car 1 (Porsche 911 GT3 RS) transforms: Sideways Left
  const car1Opacity = useTransform(smoothProgress, [0, 0.28, 0.38], [1, 1, 0]);
  const car1X = useTransform(smoothProgress, [0, 0.38], [0, -70]);
  const car1Scale = useTransform(smoothProgress, [0, 0.38], [1, 0.96]);

  // Car 2 (Ferrari SF90) transforms: Sideways Right
  const car2Opacity = useTransform(smoothProgress, [0.35, 0.45, 0.65, 0.74], [0, 1, 1, 0]);
  const car2X = useTransform(smoothProgress, [0.35, 0.45, 0.74], [70, 0, -70]);
  const car2Scale = useTransform(smoothProgress, [0.35, 0.45, 0.74], [0.96, 1, 0.96]);

  // Car 3 (Bespoke Atelier) transforms: Sideways Left
  const car3Opacity = useTransform(smoothProgress, [0.68, 0.78, 1], [0, 1, 1]);
  const car3X = useTransform(smoothProgress, [0.68, 0.78], [70, 0]);
  const car3Scale = useTransform(smoothProgress, [0.68, 0.78], [0.96, 1]);

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

  // Canvas render loop for ultra-smooth 60fps blending with dynamic studio specular lighting
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const progress = smoothProgress.get();
      const images = loadedImagesRef.current;

      // Smooth mouse interpolation
      const target = mouseTargetRef.current;
      target.currentX += (target.x - target.currentX) * 0.05;
      target.currentY += (target.y - target.currentY) * 0.05;

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

      // Deep studio black background
      ctx.fillStyle = '#060608';
      ctx.fillRect(0, 0, width, height);

      if (images.length === 3) {
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

          // Cinematic subtle zoom & interactive parallax
          const scale = 1.05 + progress * 0.05;
          const mouseParallaxX = (target.currentX - 0.5) * 20;
          const mouseParallaxY = (target.currentY - 0.5) * 12;
          const panX = renderX + panOffset * 30 + mouseParallaxX;
          const panY = renderY + mouseParallaxY;

          ctx.drawImage(
            img,
            panX - ((scale - 1) * renderW) / 2,
            panY - ((scale - 1) * renderH) / 2,
            renderW * scale,
            renderH * scale
          );
        };

        if (imgA) drawCar(imgA, 1 - blendFactor, -progress);
        if (imgB && blendFactor > 0) drawCar(imgB, blendFactor, 1 - progress);

        // Dynamic Interactive Specular Studio Spotlight
        const lightX = width * target.currentX;
        const lightY = height * target.currentY;
        const specularGrad = ctx.createRadialGradient(
          lightX,
          lightY,
          20,
          lightX,
          lightY,
          width * 0.45
        );
        specularGrad.addColorStop(0, 'rgba(212, 175, 55, 0.09)');
        specularGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.03)');
        specularGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = specularGrad;
        ctx.globalAlpha = 1;
        ctx.fillRect(0, 0, width, height);

        // Apple-style multi-stop editorial vignetting & side gradients for text contrast
        const gradLeft = ctx.createLinearGradient(0, 0, width * 0.65, 0);
        gradLeft.addColorStop(0, 'rgba(6, 6, 8, 0.94)');
        gradLeft.addColorStop(0.45, 'rgba(6, 6, 8, 0.65)');
        gradLeft.addColorStop(1, 'rgba(6, 6, 8, 0)');
        ctx.fillStyle = gradLeft;
        ctx.fillRect(0, 0, width * 0.65, height);

        const gradRight = ctx.createLinearGradient(width, 0, width * 0.35, 0);
        gradRight.addColorStop(0, 'rgba(6, 6, 8, 0.94)');
        gradRight.addColorStop(0.45, 'rgba(6, 6, 8, 0.65)');
        gradRight.addColorStop(1, 'rgba(6, 6, 8, 0)');
        ctx.fillStyle = gradRight;
        ctx.fillRect(width * 0.35, 0, width * 0.65, height);

        const gradTop = ctx.createLinearGradient(0, 0, 0, height * 0.35);
        gradTop.addColorStop(0, 'rgba(6, 6, 8, 0.88)');
        gradTop.addColorStop(1, 'rgba(6, 6, 8, 0)');
        ctx.fillStyle = gradTop;
        ctx.fillRect(0, 0, width, height * 0.35);

        const gradBottom = ctx.createLinearGradient(0, height * 0.65, 0, height);
        gradBottom.addColorStop(0, 'rgba(6, 6, 8, 0)');
        gradBottom.addColorStop(1, 'rgba(6, 6, 8, 0.96)');
        ctx.fillStyle = gradBottom;
        ctx.fillRect(0, height * 0.65, width, height * 0.35);
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [smoothProgress, imagesLoaded]);

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
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[350vh] bg-graphite-950"
    >
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
          style={{ opacity: car1Opacity, x: car1X, scale: car1Scale }}
          className="absolute inset-0 z-20 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center pointer-events-none"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
            {/* Left Column: Creative Big Sideways Headline */}
            <div className="lg:col-span-8 flex flex-col items-start text-left">
              {/* Category Pill */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-graphite-900/80 backdrop-blur-2xl border border-white/15 mb-6 shadow-2xl"
              >
                <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
                <span className="text-[11px] font-mono tracking-[0.25em] text-champagne-300 uppercase">
                  Miami Atelier • 01 Porsche 911 GT3 RS
                </span>
              </motion.div>

              {/* Creative Big Typography */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tight text-white uppercase leading-[0.9] text-glow"
              >
                <span className="block text-white font-extrabold tracking-tight">The Art</span>
                <span className="block text-metallic-gold font-light tracking-tighter">
                  Of The Finish.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="mt-6 text-base sm:text-xl text-titanium-300 font-light tracking-wide max-w-xl leading-relaxed"
              >
                {CARS[0].tagline} Ultrasonic clear coat depth calibration for Paint-to-Sample collectors.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              >
                <Link
                  href="/book"
                  className="btn-luminous-gold w-full sm:w-auto px-8 py-4 rounded-full font-medium text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 group"
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
              </motion.div>
            </div>

            {/* Right Column: Floating Telemetry HUD */}
            <div className="lg:col-span-4 hidden lg:flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="glass-panel p-6 rounded-3xl border border-white/15 backdrop-blur-3xl shadow-2xl flex flex-col gap-4"
              >
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
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* CAR 2: FERRARI SF90 STRADALE (Right-Anchored Sideways Creative Headline) */}
        {/* ========================================================================= */}
        <motion.div
          style={{ opacity: car2Opacity, x: car2X, scale: car2Scale }}
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
                  Miami Atelier • 02 Ferrari SF90 Stradale
                </span>
              </div>

              <h2 className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tight text-white uppercase leading-[0.9] text-glow">
                <span className="block text-white font-light tracking-tight">Not Just Clean.</span>
                <span className="block text-metallic-gold font-extrabold">Redefined.</span>
              </h2>

              <p className="mt-6 text-base sm:text-xl text-titanium-300 font-light tracking-wide max-w-xl leading-relaxed">
                {CARS[1].tagline} Extreme hydrophobic self-cleaning contact angle shielding against Florida heat.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/services#ceramic-coating"
                  className="btn-luminous-gold w-full sm:w-auto px-8 py-4 rounded-full font-medium text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 group"
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
          style={{ opacity: car3Opacity, x: car3X, scale: car3Scale }}
          className="absolute inset-0 z-20 max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center pointer-events-none"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
            {/* Left Column: Creative Big Sideways Headline */}
            <div className="lg:col-span-8 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-graphite-900/80 backdrop-blur-2xl border border-white/15 mb-6 shadow-2xl">
                <Award className="w-3.5 h-3.5 text-champagne-400" />
                <span className="text-[11px] font-mono tracking-[0.25em] text-champagne-300 uppercase">
                  Miami Atelier • 03 Bespoke Atelier
                </span>
              </div>

              <h2 className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold tracking-tight text-white uppercase leading-[0.9] text-glow">
                <span className="block text-white font-extrabold tracking-tight">Precision</span>
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
                  className="btn-luminous-gold w-full sm:w-auto px-8 py-4 rounded-full font-medium text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 group"
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
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-champagne-400/60 to-transparent" />
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-titanium-300 [writing-mode:vertical-rl] rotate-180">
            {CARS[activeCarIndex].verticalTag}
          </span>
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-champagne-400/60 to-transparent" />
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM CAR SELECTOR PILLS & SCROLL PROGRESS BAR */}
        {/* ========================================================================= */}
        <div className="absolute bottom-8 left-6 right-6 max-w-7xl mx-auto flex items-center justify-between z-30 pointer-events-auto">
          {/* 3 Cars Switcher */}
          <div className="flex items-center gap-2 p-1 rounded-full bg-graphite-950/70 backdrop-blur-2xl border border-white/10">
            {CARS.map((car, idx) => (
              <button
                key={car.id}
                onClick={() => scrollToCar(idx)}
                className={`relative px-4 py-2 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  activeCarIndex === idx
                    ? 'text-graphite-950 font-semibold'
                    : 'text-titanium-400 hover:text-white'
                }`}
              >
                {activeCarIndex === idx && (
                  <motion.div
                    layoutId="activeCarPill"
                    className="absolute inset-0 bg-gradient-to-r from-white via-titanium-100 to-champagne-300 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{car.stage}</span>
                <span className="relative z-10 hidden sm:inline-block">{car.title}</span>
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