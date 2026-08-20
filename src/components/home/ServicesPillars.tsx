'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, ShieldCheck, Droplets, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const PILLARS = [
  {
    id: 'exterior',
    title: 'EXTERIOR',
    subtitle: 'Premium Exterior Rejuvenation',
    description: 'Multi-stage deionized hand washes, chemical fallout decontamination, synthetic clay bar exfoliation, and Swissvax carnauba hand waxing for liquid optical depth.',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=85',
    link: '/services?cat=exterior',
    features: ['000-PPM Filtered Wash', 'Swissvax Carnauba Wax', 'Clay Bar Decontamination', 'Wheel Caliper Deep Clean'],
    startingPrice: '$119'
  },
  {
    id: 'interior',
    title: 'INTERIOR',
    subtitle: 'Deep Interior Restoration',
    description: 'Bespoke semi-aniline leather nourishment, Alcantara grooming, 212°F thermal vapor sterilization, carpet fiber extraction, and true OEM matte finish.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
    link: '/services?cat=interior',
    features: ['Swissvax Leather Milk', '212°F Vapor Sanitization', 'Alcantara Revival Groom', 'Odor Neutralization'],
    startingPrice: '$139'
  },
  {
    id: 'protection',
    title: 'PROTECTION',
    subtitle: 'Ceramic Coating & XPEL PPF',
    description: '9H nano-ceramic matrix covalent bonding and computerized XPEL Ultimate Plus self-healing film for permanent stone chip defense and extreme hydrophobicity.',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=85',
    link: '/services?cat=protection',
    features: ['Ceramic Pro 9H Multi-Layer', 'XPEL Self-Healing PPF', 'Short-Wave IR Curing', 'CarFax Warranty Registry'],
    startingPrice: '$999'
  }
];

export default function ServicesPillars() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative bg-graphite-950 py-32 px-6 md:px-12 overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-champagne-400">
              // Core Capabilities
            </span>
            <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white uppercase mt-2">
              Three Pillars <br />
              <span className="font-semibold text-metallic-silver">Of Perfection.</span>
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-medium text-titanium-300 hover:text-white transition-colors"
          >
            <span>View Full 12-Service Catalogue</span>
            <ArrowUpRight className="w-4 h-4 text-champagne-400" />
          </Link>
        </div>

        {/* 3 Pillars Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PILLARS.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative flex flex-col justify-between h-[560px] sm:h-[620px] rounded-3xl overflow-hidden border border-white/10 hover:border-champagne-500/40 transition-all duration-500 bg-graphite-900"
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.7] group-hover:brightness-[0.8]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/60 to-black/30" />
              </div>

              {/* Top Card Info */}
              <div className="relative z-10 p-8 flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest text-champagne-400">
                  0{index + 1}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-titanium-200">
                  From {pillar.startingPrice}
                </span>
              </div>

              {/* Bottom Card Content */}
              <div className="relative z-10 p-8 flex flex-col gap-4">
                <h3 className="text-3xl sm:text-4xl font-extralight tracking-tight text-white uppercase group-hover:text-champagne-300 transition-colors">
                  {pillar.title}
                </h3>
                <h4 className="text-sm font-medium text-titanium-200 -mt-2">
                  {pillar.subtitle}
                </h4>
                <p className="text-xs text-titanium-400 font-light leading-relaxed">
                  {pillar.description}
                </p>

                {/* Features Pill List */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {pillar.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.08] text-[10px] tracking-wider text-titanium-300"
                    >
                      {feat}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/10 mt-2">
                  <Link
                    href={pillar.link}
                    className="text-xs tracking-widest uppercase font-medium text-white group-hover:text-champagne-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>Configure Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/book?cat=${pillar.id}`}
                    className="px-4 py-2 rounded-full bg-white text-graphite-950 text-[11px] font-medium tracking-wider uppercase hover:bg-champagne-300 transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
