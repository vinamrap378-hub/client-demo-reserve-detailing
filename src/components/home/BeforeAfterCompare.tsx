'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface BeforeAfterCompareProps {
  beforeImage?: string;
  afterImage?: string;
}

export default function BeforeAfterCompare({
  beforeImage = 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=2200&q=85',
  afterImage = 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2200&q=85'
}: BeforeAfterCompareProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging && e.buttons !== 1) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  return (
    <section className="relative w-full bg-black py-28 px-6 sm:px-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-[0.4em] uppercase text-titanium-400">
              03 / TRANSFORMATION
            </span>
            <h2 className="font-cinzel text-4xl sm:text-6xl font-light text-white uppercase leading-[1.0] mt-2">
              See The <br />
              <span className="font-bold">Difference.</span>
            </h2>
          </div>
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-titanium-400">
            DRAG TO REVEAL ↔
          </span>
        </div>

        {/* Draggable 50/50 Comparison Container */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[450px] sm:h-[600px] rounded-3xl overflow-hidden cursor-ew-resize select-none border border-white/15 bg-black"
        >
          {/* AFTER Image (Full Layer at bottom) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={afterImage}
              alt="RESERVE Detailing After Multi-Stage Jeweling"
              fill
              className="object-cover"
            />
            {/* After Tag */}
            <div className="absolute bottom-6 right-6 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-white uppercase">
              RESERVE FINISH • 99.4 GU
            </div>
          </div>

          {/* BEFORE Image (Clipped Layer on top) */}
          <div
            className="absolute inset-0 h-full overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="relative h-full w-[100vw] max-w-7xl">
              <Image
                src={beforeImage}
                alt="Uncorrected Swirls and Micro-Marring"
                fill
                className="object-cover"
              />
            </div>
            {/* Before Tag */}
            <div className="absolute bottom-6 left-6 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-titanium-400 uppercase">
              UNCORRECTED SWIRLS • 53.8 GU
            </div>
          </div>

          {/* Vertical Draggable Divider (1px white line + circular handle with ↔) */}
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-white pointer-events-none z-30"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-black/90 border border-white flex items-center justify-center text-white text-xs font-mono shadow-2xl backdrop-blur-md">
              ↔
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}