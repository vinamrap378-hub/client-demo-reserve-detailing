'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Maximize2, ArrowUpRight, SlidersHorizontal, Eye } from 'lucide-react';
import { GALLERY_DATA } from '@/data/reviewsData';
import Lightbox from '@/components/Lightbox';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { id: 'all', label: 'All Archive' },
  { id: 'exterior', label: 'Exterior' },
  { id: 'interior', label: 'Interior' },
  { id: 'correction', label: 'Paint Correction' },
  { id: 'protection', label: 'Protection & PPF' },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  const filteredGallery = useMemo(() => {
    if (selectedCategory === 'all') return GALLERY_DATA;
    return GALLERY_DATA.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="bg-graphite-950 min-h-screen pt-32 pb-24 text-white">
      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        items={filteredGallery}
        currentIndex={lightboxIndex || 0}
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev === 0 ? filteredGallery.length - 1 : (prev || 0) - 1
          )
        }
        onNext={() =>
          setLightboxIndex((prev) =>
            ((prev || 0) + 1) % filteredGallery.length
          )
        }
      />

      {/* Hero Header */}
      <section className="relative px-6 md:px-12 mb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 max-w-3xl">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-champagne-400">
            // Visual Archive
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extralight tracking-tight text-white uppercase leading-[0.95]">
            See The <br />
            <span className="font-semibold text-metallic-silver">Difference.</span>
          </h1>
          <p className="text-titanium-300 text-base sm:text-lg font-light mt-2 leading-relaxed">
            A curated portfolio of exotic, bespoke, and classic automobiles rejuvenated inside our Miami studio. Click any frame for full-screen inspection.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 border-t border-white/10 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-white text-graphite-950 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                    : 'bg-graphite-900/80 text-titanium-400 hover:text-white border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured 50/50 Inspection Showcase */}
      <section className="px-6 md:px-12 mb-20">
        <div className="max-w-7xl mx-auto glass-panel p-6 sm:p-10 rounded-3xl border border-white/10">
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85"
            afterImage="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=85"
            beforeLabel="Heavy Swirls & Dealer Buffer Trails"
            afterLabel="RESERVE 3-Stage Mirror Finish (99.4 GU)"
            title="Featured Inspection: Porsche 911 GT3 RS"
            vehicle="Paint-to-Sample Arctic Grey • 22 Hours Correction"
          />
        </div>
      </section>

      {/* Masonry-Style Curated Grid */}
      <section className="px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            <AnimatePresence>
              {filteredGallery.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setLightboxIndex(index)}
                  className="group relative rounded-3xl overflow-hidden border border-white/10 bg-graphite-900 cursor-pointer break-inside-avoid shadow-2xl hover:border-champagne-400/50 transition-all duration-500"
                >
                  <div
                    className={`relative w-full ${
                      item.aspect === 'tall'
                        ? 'h-[500px]'
                        : item.aspect === 'square'
                        ? 'h-[380px]'
                        : 'h-[300px]'
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                    {/* Top Overlay Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-champagne-300 uppercase">
                      {item.category}
                    </div>

                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>

                    {/* Bottom Metadata Reveal on Hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
                      <h3 className="text-xl font-light text-white tracking-tight group-hover:text-champagne-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-titanium-300 font-light">{item.service}</p>
                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-titanium-400">
                        <span>{item.specs}</span>
                        <span className="text-champagne-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Inspect <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Booking Bridge CTA */}
      <section className="px-6 md:px-12 mt-24 text-center">
        <div className="max-w-4xl mx-auto glass-panel p-10 sm:p-14 rounded-3xl border border-white/10 flex flex-col items-center gap-6">
          <span className="text-[10px] font-mono tracking-widest text-champagne-400 uppercase">
            // Studio Reservations
          </span>
          <h3 className="text-3xl sm:text-5xl font-extralight text-white uppercase tracking-tight">
            Your Vehicle Deserves <br />
            <span className="font-semibold text-metallic-gold">This Standard.</span>
          </h3>
          <p className="text-sm text-titanium-300 font-light max-w-xl">
            Book your session online with our instant vehicle builder or speak with our master technician.
          </p>
          <Link
            href="/book"
            className="px-8 py-4 rounded-full bg-white text-graphite-950 font-medium text-xs tracking-widest uppercase hover:bg-champagne-300 transition-colors flex items-center gap-2 mt-2"
          >
            <span>Book Your Studio Session</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
