'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Lightbox from '@/components/Lightbox';
import { GALLERY_DATA } from '@/data/reviewsData';

export default function EditorialGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Take top 5 items for the asymmetrical 5-piece grid
  const items = GALLERY_DATA.slice(0, 5);

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === null ? 0 : prev === 0 ? GALLERY_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === null ? 0 : prev === GALLERY_DATA.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full bg-black py-28 px-6 sm:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-[0.4em] uppercase text-titanium-400">
              // Archive
            </span>
            <h2 className="font-cinzel text-4xl sm:text-6xl font-light text-white uppercase leading-[1.0] mt-2">
              Bespoke <br />
              <span className="font-bold">Portfolio.</span>
            </h2>
          </div>
          <Link
            href="/gallery"
            className="text-xs font-mono tracking-[0.25em] uppercase text-titanium-400 hover:text-white transition-colors"
          >
            VIEW FULL GALLERY (9 WORKS) →
          </Link>
        </div>

        {/* Asymmetrical Grid: 2x2, 1x1, 1x2, 2x1, 1x1 with 12px gaps */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-[12px] auto-rows-[240px]">
          {/* Item 1: 2 col x 2 row */}
          {items[0] && (
            <div
              onClick={() => setLightboxIndex(0)}
              className="group relative md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-black"
            >
              <Image
                src={items[0].image}
                alt={items[0].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <span className="text-[10px] font-mono tracking-widest text-champagne-300 uppercase">
                  {items[0].category}
                </span>
                <div className="flex items-end justify-between">
                  <div>
                    <h4 className="font-cinzel text-xl font-bold text-white uppercase">{items[0].title}</h4>
                    <p className="text-xs text-titanium-300 font-light">{items[0].service}</p>
                  </div>
                  <div className="p-2.5 rounded-full bg-white text-black">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Item 2: 1 col x 1 row */}
          {items[1] && (
            <div
              onClick={() => setLightboxIndex(1)}
              className="group relative md:col-span-1 md:row-span-1 rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-black"
            >
              <Image
                src={items[1].image}
                alt={items[1].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                <span className="text-[9px] font-mono tracking-widest text-champagne-300 uppercase">
                  {items[1].category}
                </span>
                <div className="flex items-end justify-between">
                  <h4 className="font-cinzel text-sm font-bold text-white uppercase">{items[1].title}</h4>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>
          )}

          {/* Item 3: 1 col x 2 row */}
          {items[2] && (
            <div
              onClick={() => setLightboxIndex(2)}
              className="group relative md:col-span-1 md:row-span-2 rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-black"
            >
              <Image
                src={items[2].image}
                alt={items[2].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <span className="text-[10px] font-mono tracking-widest text-champagne-300 uppercase">
                  {items[2].category}
                </span>
                <div className="flex items-end justify-between">
                  <div>
                    <h4 className="font-cinzel text-lg font-bold text-white uppercase">{items[2].title}</h4>
                    <p className="text-xs text-titanium-300 font-light">{items[2].service}</p>
                  </div>
                  <div className="p-2 rounded-full bg-white text-black">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Item 4: 2 col x 1 row */}
          {items[3] && (
            <div
              onClick={() => setLightboxIndex(3)}
              className="group relative md:col-span-2 md:row-span-1 rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-black"
            >
              <Image
                src={items[3].image}
                alt={items[3].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                <span className="text-[9px] font-mono tracking-widest text-champagne-300 uppercase">
                  {items[3].category}
                </span>
                <div className="flex items-end justify-between">
                  <h4 className="font-cinzel text-sm font-bold text-white uppercase">{items[3].title}</h4>
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          )}

          {/* Item 5: 1 col x 1 row */}
          {items[4] && (
            <div
              onClick={() => setLightboxIndex(4)}
              className="group relative md:col-span-1 md:row-span-1 rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-black"
            >
              <Image
                src={items[4].image}
                alt={items[4].title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5">
                <span className="text-[9px] font-mono tracking-widest text-champagne-300 uppercase">
                  {items[4].category}
                </span>
                <div className="flex items-end justify-between">
                  <h4 className="font-cinzel text-sm font-bold text-white uppercase">{items[4].title}</h4>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        items={GALLERY_DATA}
        currentIndex={lightboxIndex ?? 0}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}