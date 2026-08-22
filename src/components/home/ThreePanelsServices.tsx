'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PANELS = [
  {
    id: 'precision',
    number: '01',
    title: 'PRECISION',
    description: 'Ultrasonic multi-stage paint correction and clear coat leveling to 99.4 GU mirror depth.',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85',
    link: '/services?cat=exterior'
  },
  {
    id: 'craft',
    number: '02',
    title: 'CRAFT',
    description: 'Swissvax organic carnauba hand waxing, semi-aniline leather feed, and dry-vapor sanitization.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
    link: '/services?cat=interior'
  },
  {
    id: 'protection',
    number: '03',
    title: 'PROTECTION',
    description: '9H nano-ceramic matrix covalent bonding and computerized XPEL self-healing polyurethane film.',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=85',
    link: '/services?cat=protection'
  }
];

export default function ThreePanelsServices() {
  return (
    <section className="relative w-full bg-black py-20 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-[0.4em] uppercase text-titanium-400">
              // Core Capabilities
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-light text-white uppercase mt-2">
              Three Pillars of Excellence.
            </h2>
          </div>
          <Link
            href="/services"
            className="text-xs font-mono tracking-[0.25em] uppercase text-titanium-400 hover:text-white transition-colors"
          >
            VIEW ALL 12 PROTOCOLS →
          </Link>
        </div>

        {/* 3 Full-Height Panels (33.33% each on desktop, ~650px tall) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PANELS.map((panel) => (
            <Link
              key={panel.id}
              href={panel.link}
              className="group relative h-[560px] sm:h-[650px] w-full rounded-2xl overflow-hidden border border-white/10 hover:border-white/40 transition-all duration-600 flex flex-col justify-between p-8 bg-black"
            >
              {/* Background Image: hover scale 1 -> 1.07 */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Image
                  src={panel.image}
                  alt={panel.title}
                  fill
                  className="object-cover transition-transform duration-600 ease-out group-hover:scale-[1.07] filter brightness-[0.7] group-hover:brightness-[0.8]"
                />
                {/* Black gradient over every image (decreases slightly on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 transition-opacity duration-600 group-hover:opacity-85" />
              </div>

              {/* Number at Top-Left */}
              <div className="relative z-10">
                <span className="font-mono text-3xl sm:text-4xl font-light text-white/70 group-hover:text-white transition-colors">
                  {panel.number}
                </span>
              </div>

              {/* Bottom Content: Title, Description, and Arrow at bottom-right */}
              <div className="relative z-10 flex items-end justify-between gap-4">
                {/* Title & Description: title Y position -10px on hover */}
                <div className="flex flex-col gap-2 transition-transform duration-600 ease-out group-hover:-translate-y-[10px]">
                  <h3 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
                    {panel.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-titanium-300 font-light leading-relaxed max-w-xs">
                    {panel.description}
                  </p>
                </div>

                {/* Arrow at Bottom-Right: arrow X position +8px on hover */}
                <div className="shrink-0 p-3 rounded-full border border-white/20 group-hover:border-white group-hover:bg-white text-white group-hover:text-black transition-all duration-600">
                  <ArrowRight className="w-5 h-5 transition-transform duration-600 group-hover:translate-x-[8px]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}