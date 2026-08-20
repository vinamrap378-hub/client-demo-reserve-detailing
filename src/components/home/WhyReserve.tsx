'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Crosshair, Sparkles, Layers, ArrowUpRight, Gauge, Cpu, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const PILLARS = [
  {
    number: '01',
    title: 'PRECISION',
    tagline: 'Every surface receives deliberate attention.',
    description: 'We do not rush. Ultrasonic digital paint gauges scan clear coat down to single microns, ensuring safe defect leveling without compromising factory clear coat integrity.',
    metric: '40-Point Diagnostic',
    icon: Crosshair,
  },
  {
    number: '02',
    title: 'CRAFT',
    tagline: 'Professional techniques and premium products.',
    description: 'We curate world-class materials: Swissvax Brazilian carnauba waxes, Italian Rupes dual-action polishers, deionized 000-PPM pure water, and Gyeon ceramic matrices.',
    metric: '98+ Gloss Units',
    icon: Sparkles,
  },
  {
    number: '03',
    title: 'PROTECTION',
    tagline: 'A finish designed to look exceptional and stay exceptional.',
    description: 'Our ceramic coatings and XPEL self-healing PPF create an impenetrable chemical shield against harsh Florida sun, acid rain, bird etching, and highway rock chips.',
    metric: '10-Year Warranty',
    icon: ShieldCheck,
  }
];

const INSPECTION_LAYERS = [
  { id: 'clearcoat', label: 'Clear Coat (35-50µm)', desc: 'Levelled to 99% mirror clarity with micro-abrasives', status: 'Optimal' },
  { id: 'ceramic', label: 'Ceramic 9H Nano-Matrix', desc: 'Permanent covalent molecular barrier (pH 2-12)', status: 'Active' },
  { id: 'hydrophobic', label: 'Hydrophobic Top Layer', desc: '115° contact water contact beading angle', status: 'Active' },
  { id: 'ppf', label: 'XPEL Self-Healing Polyurethane', desc: '8.5 mil physical impact barrier on high-strike zones', status: 'Installed' }
];

export default function WhyReserve() {
  const [selectedPillar, setSelectedPillar] = useState(0);

  return (
    <section className="relative bg-graphite-950 py-32 px-6 md:px-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-champagne-500/[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-champagne-400">
            // The Reserve Standard
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-white uppercase">
            Detailing <br />
            <span className="font-semibold text-metallic-silver">Without Compromise.</span>
          </h2>
          <p className="text-titanium-300 text-base sm:text-lg font-light">
            Founded on the principle that world-class automotive engineering deserves an equally meticulous standard of preservation.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-champagne-400/40 transition-all flex flex-col justify-between group"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-mono font-extralight text-champagne-400">
                      {pillar.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-titanium-300 group-hover:text-champagne-300 group-hover:scale-110 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-light tracking-tight text-white uppercase">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-mono text-champagne-300 tracking-wider mt-1">
                      {pillar.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-titanium-400 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 mt-8 flex items-center justify-between">
                  <span className="text-xs font-mono tracking-widest text-titanium-300 uppercase">
                    {pillar.metric}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-champagne-400 animate-pulse" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Exploded Surface Inspection Showcase */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-500/10 border border-champagne-500/30 text-champagne-300 text-[11px] font-mono tracking-wider w-fit">
                <Layers className="w-3.5 h-3.5 text-champagne-400" />
                <span>SURFACE ARCHITECTURE</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-light text-white tracking-tight uppercase">
                Molecular Matrix <br />
                <span className="font-semibold text-metallic-gold">Multi-Layer Armor.</span>
              </h3>
              <p className="text-sm text-titanium-300 font-light leading-relaxed">
                When you invest in RESERVE detailing, your vehicle receives an engineered stack of optical perfection and protective barriers designed to resist UV oxidation, road salt, acid rain, and environmental etching.
              </p>

              <div className="flex flex-col gap-3 pt-2">
                {INSPECTION_LAYERS.map((layer, i) => (
                  <div
                    key={layer.id}
                    className="p-3.5 rounded-xl bg-graphite-900/90 border border-white/[0.08] flex items-center justify-between gap-4 hover:border-champagne-400/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-champagne-500/20 text-champagne-400 flex items-center justify-center text-xs font-mono">
                        {i + 1}
                      </div>
                      <div>
                        <h5 className="text-xs font-medium text-white">{layer.label}</h5>
                        <p className="text-[11px] text-titanium-400 font-light">{layer.desc}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono shrink-0">
                      {layer.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85"
                alt="Porsche 911 GT3 RS Ceramic Matrix Protection"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-transparent to-black/20" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-champagne-400" />
                  <span className="text-white">Studio Diagnostic Spec</span>
                </div>
                <span className="text-champagne-300 font-mono">118µm Total Panel Depth</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
