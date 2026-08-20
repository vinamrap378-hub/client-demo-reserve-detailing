'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Sparkles, AlertCircle } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  vehicle?: string;
  beforeGloss?: string;
  afterGloss?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Uncorrected Paint (Swirls & Oxidation)',
  afterLabel = 'RESERVE Stage 3 Jeweled Finish',
  title = 'Optical Paint Correction Difference',
  vehicle = 'Porsche 911 GT3 RS — Paint-to-Sample',
  beforeGloss = '54.2 GU',
  afterGloss = '99.4 GU'
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] text-champagne-400 uppercase">
            // Interactive 50/50 Inspection
          </span>
          <h4 className="text-xl md:text-2xl font-light tracking-tight text-white mt-0.5">
            {title}
          </h4>
          <p className="text-xs text-titanium-400 font-light">{vehicle}</p>
        </div>

        {/* Gloss Meter Indicators */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-graphite-900/80 border border-red-500/20 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <div className="text-[11px]">
              <span className="text-titanium-400">Before: </span>
              <span className="text-white font-mono">{beforeGloss}</span>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-graphite-900/80 border border-champagne-500/30 flex items-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <span className="w-2 h-2 rounded-full bg-champagne-400 animate-pulse" />
            <div className="text-[11px]">
              <span className="text-titanium-400">After: </span>
              <span className="text-champagne-300 font-mono font-medium">{afterGloss}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Canvas Comparison */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        className="relative w-full h-[380px] sm:h-[480px] md:h-[540px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl group"
      >
        {/* After Image (Background full width) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={afterImage}
            alt={afterLabel}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-6 right-6 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-champagne-400/30 text-[11px] font-medium tracking-wider text-champagne-300 flex items-center gap-1.5 z-10 pointer-events-none">
            <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
            <span>{afterLabel}</span>
          </div>
        </div>

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}>
            <Image
              src={beforeImage}
              alt={beforeLabel}
              fill
              className="object-cover filter contrast-[0.9] saturate-[0.8]"
            />
            {/* Added subtle swirl reflection effect on before half */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/20" />
          </div>
          <div className="absolute bottom-6 left-6 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-medium tracking-wider text-titanium-300 flex items-center gap-1.5 z-10 pointer-events-none">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            <span>{beforeLabel}</span>
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white to-transparent pointer-events-none shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-graphite-950 border border-champagne-400/80 shadow-[0_0_20px_rgba(212,175,55,0.5)] flex items-center justify-center pointer-events-auto cursor-ew-resize group-hover:scale-110 transition-transform">
            <div className="flex items-center gap-1">
              <div className="w-1 h-3 border-l border-white/60" />
              <div className="w-1 h-3 border-r border-white/60" />
            </div>
          </div>
        </div>

        {/* Instruction overlay on load */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-graphite-950/60 backdrop-blur-md border border-white/10 text-[10px] tracking-widest uppercase text-titanium-400 pointer-events-none">
          Drag slider horizontally to inspect
        </div>
      </div>
    </div>
  );
}
