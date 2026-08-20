'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Shield, Sparkles, Layers, Sliders, Cpu, Gauge, Wrench } from 'lucide-react';
import { PROCESS_DATA } from '@/data/reviewsData';
import { motion, useScroll, useTransform } from 'framer-motion';

const EQUIPMENT_SPECS = [
  { name: 'Rupes BigFoot LHR21 Mark III', category: 'Orbital Polisher', desc: 'Random orbital 21mm orbit preventing hologramming or edge burn.' },
  { name: 'Scangrip Multimatch 8 CRI+', category: 'Studio Lighting', desc: 'True color rendering CRI+ 96 for inspecting deep metallic micro-swirls.' },
  { name: 'DeFelsko PosiTector 200', category: 'Ultrasonic Gauge', desc: 'Non-destructive ultrasonic paint depth measurement down to 0.1 µm.' },
  { name: 'Optima Steamer DMF', category: 'Dry Vapor Sanitizer', desc: '212°F dry thermal steam penetrating deep carpet fibers without soaking.' }
];

export default function ProcessPage() {
  return (
    <div className="bg-graphite-950 min-h-screen pt-32 pb-24 text-white">
      {/* Hero Header */}
      <section className="relative px-6 md:px-12 mb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 max-w-4xl">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-champagne-400">
            // The 6-Stage Protocol
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extralight tracking-tight text-white uppercase leading-[0.95]">
            Precision <br />
            <span className="font-semibold text-metallic-gold">Is A Process.</span>
          </h1>
          <p className="text-titanium-300 text-lg sm:text-xl font-light mt-2 leading-relaxed">
            Perfection is not accidental. It is the calculated execution of six sequential stages, calibrated chemistry, and surgical machine polishing in our Miami cleanroom.
          </p>
        </div>
      </section>

      {/* Vertical Pinned Journey */}
      <section className="px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col gap-24">
          {PROCESS_DATA.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  isEven ? '' : 'lg:grid-flow-dense'
                }`}
              >
                {/* Visual Stage */}
                <div
                  className={`lg:col-span-6 relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group ${
                    isEven ? '' : 'lg:col-start-7'
                  }`}
                >
                  <Image
                    src={step.image}
                    alt={step.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/40 to-transparent" />

                  {/* Stage Number Watermark */}
                  <div className="absolute top-6 right-8 text-7xl sm:text-8xl font-mono font-extralight text-white/10 select-none pointer-events-none">
                    {step.step}
                  </div>

                  {/* Bottom Float Badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel rounded-2xl border border-white/15 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-champagne-400 uppercase">
                        Stage {step.step}
                      </span>
                      <h4 className="text-sm font-medium text-white">{step.subtitle}</h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-champagne-500/20 flex items-center justify-center text-champagne-300">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Narrative Details */}
                <div
                  className={`lg:col-span-6 flex flex-col gap-6 ${
                    isEven ? '' : 'lg:col-start-1'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-4xl sm:text-5xl font-mono font-extralight text-champagne-400">
                      {step.step}
                    </span>
                    <div className="h-8 w-[1px] bg-white/20" />
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-titanium-400 uppercase">
                        Phase
                      </span>
                      <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight uppercase">
                        {step.name}
                      </h2>
                    </div>
                  </div>

                  <h3 className="text-lg font-mono text-champagne-300 tracking-wide">
                    {step.subtitle}
                  </h3>

                  <p className="text-titanium-300 text-sm sm:text-base font-light leading-relaxed">
                    {step.description}
                  </p>

                  <div className="flex flex-col gap-2.5 pt-4 border-t border-white/10">
                    <span className="text-[11px] font-mono tracking-widest text-titanium-400 uppercase">
                      Stage Specifications:
                    </span>
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-titanium-300 font-light">
                        <CheckCircle2 className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Equipment & Tooling Arsenal */}
      <section className="px-6 md:px-12 mt-32">
        <div className="max-w-7xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-champagne-400">
              // Studio Equipment
            </span>
            <h3 className="text-3xl sm:text-4xl font-light text-white tracking-tight uppercase">
              The Tools Of The Trade.
            </h3>
            <p className="text-titanium-300 text-sm font-light max-w-2xl">
              We exclusively deploy Italian engineered orbital machines, Swiss organic carnaubas, and ultrasonic measurement systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EQUIPMENT_SPECS.map((eq, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-graphite-900/80 border border-white/[0.08] flex flex-col justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-champagne-400 uppercase">
                    {eq.category}
                  </span>
                  <h4 className="text-base font-medium text-white mt-1">{eq.name}</h4>
                  <p className="text-xs text-titanium-400 font-light mt-2 leading-relaxed">
                    {eq.desc}
                  </p>
                </div>
                <div className="w-2 h-2 rounded-full bg-champagne-400" />
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-xs text-titanium-300">
              <Shield className="w-4 h-4 text-champagne-400" />
              <span>All protocols covered by the RESERVE Quality Guarantee</span>
            </div>
            <Link
              href="/book"
              className="px-8 py-3.5 rounded-full bg-white text-graphite-950 font-medium text-xs tracking-widest uppercase hover:bg-champagne-300 transition-colors flex items-center gap-2"
            >
              <span>Experience The Process</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
