'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Sparkles, Shield, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{
    id: string;
    title: string;
    category: string;
    service: string;
    specs: string;
    image: string;
  }>;
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  isOpen,
  onClose,
  items,
  currentIndex,
  onPrev,
  onNext
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !items[currentIndex]) return null;

  const current = items[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono tracking-widest text-champagne-300 uppercase">
            {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
          <span className="text-xs tracking-widest uppercase text-titanium-400 font-mono hidden sm:inline-block">
            // RESERVE Bespoke Archive
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Prev Arrow */}
        <button
          onClick={onPrev}
          className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-graphite-900/80 hover:bg-white text-white hover:text-black border border-white/10 transition-all backdrop-blur-md shadow-2xl"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Image Container */}
        <div className="relative w-full max-w-5xl h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
          <Image
            src={current.image}
            alt={current.title}
            fill
            className="object-contain sm:object-cover"
            priority
          />
        </div>

        {/* Next Arrow */}
        <button
          onClick={onNext}
          className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-graphite-900/80 hover:bg-white text-white hover:text-black border border-white/10 transition-all backdrop-blur-md shadow-2xl"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Metadata Bar */}
      <div className="max-w-4xl mx-auto w-full glass-panel rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest text-champagne-400 uppercase">
              {current.category}
            </span>
            <span className="text-titanium-500">•</span>
            <span className="text-xs text-titanium-400">{current.service}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-light text-white tracking-tight mt-0.5">
            {current.title}
          </h3>
          <p className="text-xs text-titanium-400 font-mono mt-1">{current.specs}</p>
        </div>

        <Link
          href={`/book?service=${encodeURIComponent(current.service)}`}
          className="px-6 py-2.5 rounded-full bg-white text-graphite-950 font-medium text-xs tracking-widest uppercase hover:bg-champagne-300 transition-colors flex items-center gap-2 shrink-0"
        >
          <span>Book This Level</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
