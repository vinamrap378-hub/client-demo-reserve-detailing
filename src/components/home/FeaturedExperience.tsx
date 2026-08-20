'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, Sliders } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturedExperience() {
  return (
    <section className="relative bg-graphite-900 py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typography & Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
              <span className="text-[11px] font-mono tracking-widest text-titanium-300 uppercase">
                Master Craftsmanship
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-light tracking-tight text-white uppercase leading-[1.05]">
              Precision <br />
              <span className="font-semibold text-metallic-silver">At Every</span> <br />
              Surface.
            </h2>

            <p className="text-titanium-300 text-base sm:text-lg font-light leading-relaxed">
              Every vehicle entering our Miami studio undergoes a clinical, multi-stage transformation. We combine aerospace-grade surface chemistry, Scangrip color-temperature inspection lights, and Italian Rupes Bigfoot rotary systems to achieve an optical clarity standard that exceeds factory perfection.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-champagne-400 mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-white">40-Point Inspection</h4>
                  <p className="text-xs text-titanium-400 font-light mt-0.5">Digital ultrasonic paint depth profiling.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-champagne-400 mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-white">000-PPM Water</h4>
                  <p className="text-xs text-titanium-400 font-light mt-0.5">Deionized pure reverse osmosis wash.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-champagne-400 mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-white">IR Heat Curing</h4>
                  <p className="text-xs text-titanium-400 font-light mt-0.5">Quartz short-wave ceramic matrix baking.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-champagne-400 mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-white">IDA Certified</h4>
                  <p className="text-xs text-titanium-400 font-light mt-0.5">Master technicians with Skills Validation.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-medium text-white hover:text-champagne-300 transition-colors group"
              >
                <span>Explore Our Services</span>
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-champagne-400 group-hover:text-graphite-950 transition-all">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Cinematic Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative h-[480px] sm:h-[560px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] group">
              <Image
                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85"
                alt="Precision Detailing Technician at RESERVE Detailing Miami"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-graphite-950/90 via-transparent to-black/30" />

              {/* Floating Studio Spec Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 glass-panel rounded-2xl border border-white/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-champagne-400 uppercase">
                    Studio Protocol
                  </span>
                  <h4 className="text-base font-light text-white mt-0.5">
                    Jeweling Multi-Stage Compound
                  </h4>
                  <p className="text-xs text-titanium-400 font-mono mt-0.5">
                    Rupes BigFoot Mark III • Rupes Yellow Fine Pad
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-champagne-500/20 border border-champagne-400/40 flex items-center justify-center text-champagne-300">
                  <Sliders className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
