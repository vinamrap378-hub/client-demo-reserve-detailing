'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Sun, Droplets, Shield, Gauge, Sliders, ArrowUpRight, CheckCircle2, Layers, Crosshair } from 'lucide-react';

interface SurfaceMode {
  id: string;
  name: string;
  badge: string;
  glossUnits: string;
  beadingAngle: string;
  defectReduction: string;
  clearDepth: string;
  tagline: string;
  description: string;
  image: string;
  accentColor: string;
}

const SURFACE_MODES: SurfaceMode[] = [
  {
    id: 'mirror-gloss',
    name: 'Mirror Jeweled Gloss',
    badge: '99.4 GU Optical Clarity',
    glossUnits: '99.4 GU',
    beadingAngle: '118° Angle',
    defectReduction: '98.6%',
    clearDepth: '42.4 µm',
    tagline: 'Multi-stage rotary jeweling pass eliminating micro-haze for liquid reflection.',
    description: 'Developed for Paint-to-Sample collectors. Micro-abrasive emulsions level clear coat orange-peel textures to achieve maximum specular light return.',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=85',
    accentColor: '#D4AF37'
  },
  {
    id: 'ceramic-matrix',
    name: '9H Ceramic Pro Matrix',
    badge: 'Molecular Covalent Armor',
    glossUnits: '98.2 GU',
    beadingAngle: '122° Hyper-Bead',
    defectReduction: '100% Shield',
    clearDepth: '45.1 µm',
    tagline: 'Short-wave infrared quartz baked nano-ceramic permanent covalent barrier.',
    description: 'Silicon Dioxide (SiO2) nano-particles crystallize inside clear coat pores, repelling brake dust, acid rain, bird droppings, and UV radiation for up to 9 years.',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1600&q=85',
    accentColor: '#38BDF8'
  },
  {
    id: 'satin-magno',
    name: 'Satin Matte Magno',
    badge: 'Zero-Gloss Protection',
    glossUnits: '24.1 GU',
    beadingAngle: '115° Angle',
    defectReduction: 'Preserved OEM',
    clearDepth: '38.0 µm',
    tagline: 'Specialized non-polishing decontamination and matte ceramic coating.',
    description: 'Engineered specifically for Mercedes Magno, Porsche Frozen, and BMW Individual satin paints without altering OEM non-reflective surface sheen.',
    image: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=1600&q=85',
    accentColor: '#94A3B8'
  },
  {
    id: 'uncorrected-swirls',
    name: 'Uncorrected Paint State',
    badge: 'Dealer Swirl Micro-Marring',
    glossUnits: '53.8 GU',
    beadingAngle: '42° Flat Sheet',
    defectReduction: '0.0%',
    clearDepth: '43.2 µm',
    tagline: 'Factory orange peel, tunnel wash spider webs, and dealership buffer trails.',
    description: 'Uncorrected clear coats scatter incoming light in random directions, dulling paint depth and washing out metallic and pearl flecks under direct sun.',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85',
    accentColor: '#EF4444'
  }
];

const LIGHT_RIGS = [
  { id: '3200k', label: '3200K Studio Tungsten', filterClass: 'sepia-[0.2] brightness-[0.98]' },
  { id: '4500k', label: '4500K True Daylight', filterClass: 'brightness-[1.02] contrast-[1.05]' },
  { id: '6500k', label: '6500K Cleanroom CRI 96+', filterClass: 'saturate-[1.1] contrast-[1.1] hue-rotate-[-3deg]' }
];

export default function SurfaceLabShowcase() {
  const [activeMode, setActiveMode] = useState<SurfaceMode>(SURFACE_MODES[0]);
  const [activeLight, setActiveLight] = useState(LIGHT_RIGS[1]);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const LAYERS_INFO = [
    { name: '01. Substrate & Primer', depth: '20 µm', desc: 'OEM electro-deposition corrosion barrier' },
    { name: '02. Base Color Pigment', depth: '15 µm', desc: 'Paint-to-Sample metallic & pearl particles' },
    { name: '03. Optical Clear Coat', depth: '40 µm', desc: 'Jeweled to 99.4 GU mirror smoothness' },
    { name: '04. Ceramic Pro 9H Armor', depth: '3.5 µm', desc: 'Crystalline SiO2 permanent molecular shield' }
  ];

  return (
    <section className="relative bg-graphite-950 py-32 px-6 md:px-12 overflow-hidden border-t border-b border-white/[0.06]">
      {/* Subtle Studio Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-champagne-500/[0.03] blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne-500/10 border border-champagne-500/30 text-champagne-300 text-[11px] font-mono tracking-wider w-fit">
              <Crosshair className="w-3.5 h-3.5 text-champagne-400" />
              <span>INTERACTIVE SURFACE SPECTROMETRY LAB</span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-white uppercase leading-[0.95]">
              The Science <br />
              <span className="font-semibold text-metallic-gold">Of The Surface.</span>
            </h2>

            <p className="text-titanium-300 text-sm sm:text-base font-light leading-relaxed mt-2">
              Inspect how microscopic clear coat leveling, Scangrip lighting calibration, and 9H ceramic cross-linking transform light refraction on exotic clear coats.
            </p>
          </div>

          {/* Scangrip Light Temperature Switcher */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono tracking-widest text-titanium-400 uppercase">
              // Scangrip Lighting Spectrum:
            </span>
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-graphite-900 border border-white/10">
              {LIGHT_RIGS.map((rig) => (
                <button
                  key={rig.id}
                  onClick={() => setActiveLight(rig)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-mono tracking-wider transition-all ${
                    activeLight.id === rig.id
                      ? 'bg-white text-graphite-950 font-semibold shadow-md'
                      : 'text-titanium-400 hover:text-white'
                  }`}
                >
                  {rig.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Lab Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Visual Canvas */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="relative h-[420px] sm:h-[520px] rounded-3xl overflow-hidden border border-white/15 bg-graphite-900 shadow-2xl group">
              {/* Dynamic Image Canvas */}
              <div className={`relative w-full h-full transition-all duration-500 ${activeLight.filterClass}`}>
                <Image
                  src={activeMode.image}
                  alt={activeMode.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/20 to-transparent" />
              </div>

              {/* Floating Active State Badge */}
              <div className="absolute top-6 left-6 px-4 py-2 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/15 flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: activeMode.accentColor }}
                />
                <span className="text-xs font-mono text-white font-medium">
                  {activeMode.badge}
                </span>
              </div>

              {/* Bottom Telemetry HUD Bar */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel rounded-2xl p-5 border border-white/15 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-champagne-400 uppercase">
                    Active Spectrometry Mode
                  </span>
                  <h4 className="text-lg font-light text-white mt-0.5">{activeMode.name}</h4>
                </div>

                <div className="flex items-center gap-6 text-xs font-mono">
                  <div>
                    <span className="text-titanium-400 block text-[10px] uppercase">Gloss Index</span>
                    <span className="text-white font-semibold text-base">{activeMode.glossUnits}</span>
                  </div>
                  <div className="h-6 w-[1px] bg-white/15" />
                  <div>
                    <span className="text-titanium-400 block text-[10px] uppercase">Water Contact</span>
                    <span className="text-champagne-300 font-semibold text-base">{activeMode.beadingAngle}</span>
                  </div>
                  <div className="h-6 w-[1px] bg-white/15" />
                  <div>
                    <span className="text-titanium-400 block text-[10px] uppercase">Swirl Eradication</span>
                    <span className="text-emerald-400 font-semibold text-base">{activeMode.defectReduction}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mode Switcher Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SURFACE_MODES.map((mode) => {
                const isSelected = activeMode.id === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setActiveMode(mode)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                      isSelected
                        ? 'bg-gradient-to-b from-graphite-850 to-graphite-900 border-champagne-400 shadow-[0_0_25px_rgba(212,175,55,0.15)]'
                        : 'bg-graphite-900/80 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-titanium-400">{mode.glossUnits}</span>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-champagne-400" />
                      )}
                    </div>
                    <span className="text-xs font-medium text-white">{mode.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Microscopic Layer Architecture */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono tracking-widest text-champagne-400 uppercase flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Layer Cross-Section</span>
                </span>
                <span className="text-[11px] font-mono text-titanium-400">Total ~78 µm</span>
              </div>

              <div className="flex flex-col gap-3">
                {LAYERS_INFO.map((layer, idx) => {
                  const isHovered = activeLayer === idx;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setActiveLayer(idx)}
                      onMouseLeave={() => setActiveLayer(null)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isHovered
                          ? 'bg-graphite-850 border-champagne-400 shadow-lg'
                          : 'bg-graphite-900/90 border-white/[0.08]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-medium text-white">{layer.name}</h5>
                        <span className="text-[11px] font-mono text-champagne-300">{layer.depth}</span>
                      </div>
                      <p className="text-[11px] text-titanium-400 font-light mt-1">{layer.desc}</p>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-titanium-300 font-light leading-relaxed pt-2 border-t border-white/10">
                {activeMode.description}
              </p>

              <Link
                href="/book"
                className="btn-luminous-gold w-full py-4 rounded-2xl font-medium text-xs tracking-widest uppercase text-center flex items-center justify-center gap-2 mt-2"
              >
                <span>Configure Your Finish</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}