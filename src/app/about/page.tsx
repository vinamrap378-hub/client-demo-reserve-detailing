'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Award, Star, MapPin, Phone, Clock, ArrowUpRight, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="bg-graphite-950 min-h-screen pt-32 pb-24 text-white">
      {/* Hero Header */}
      <section className="relative px-6 md:px-12 mb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne-500/10 border border-champagne-500/30 text-champagne-300 text-[11px] font-mono tracking-wider w-fit">
            <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
            <span>THE RESERVE STORY</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extralight tracking-tight text-white uppercase leading-[0.95]">
            Obsessed <br />
            <span className="font-semibold text-metallic-gold">With The Detail.</span>
          </h1>

          <p className="text-titanium-300 text-lg sm:text-xl font-light mt-2 leading-relaxed">
            RESERVE was conceived in Miami with a single non-negotiable ambition: to create an automotive detailing atelier that mirrors the precision and clinical excellence of a Formula 1 skunkworks or a Swiss horological studio.
          </p>
        </div>
      </section>

      {/* Cinematic Workshop Imagery & Pillars Grid */}
      <section className="px-6 md:px-12 mb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative h-[480px] sm:h-[580px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=85"
              alt="RESERVE Detailing Miami Cleanroom Studio"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 p-6 glass-panel rounded-2xl border border-white/15">
              <span className="text-[10px] font-mono tracking-widest text-champagne-400 uppercase">
                Facility Specifications
              </span>
              <h4 className="text-lg font-light text-white mt-1">
                Miami Cleanroom & Presentation Studio
              </h4>
              <p className="text-xs text-titanium-400 font-light mt-0.5">
                5000K daylight-balanced CRI 96+ lighting • Reverse osmosis deionized water system • Dust-free curing bay
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight uppercase">
              The Architecture <br />
              <span className="font-semibold text-metallic-silver">Of Perfection.</span>
            </h2>

            <p className="text-titanium-300 text-sm sm:text-base font-light leading-relaxed">
              Most car washes treat detailing as an afterthought. At RESERVE, detailing is our singular, obsessive focus. We do not use bulk detergents, acid wheel washes, or spinning brushes that induce micro-swirls.
            </p>

            <p className="text-titanium-300 text-sm sm:text-base font-light leading-relaxed">
              Every vehicle that crosses our threshold receives individual calibration. We log digital paint thickness gauge readings in microns across every panel, test paint hardness, and select pad-and-compound pairings tailored exclusively to your clear coat formulation.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-xl bg-graphite-900 border border-white/[0.08]">
                <Award className="w-5 h-5 text-champagne-400 mb-2" />
                <h4 className="text-sm font-medium text-white">IDA Certified</h4>
                <p className="text-xs text-titanium-400 font-light mt-0.5">Skills Validated Master Detailers</p>
              </div>
              <div className="p-4 rounded-xl bg-graphite-900 border border-white/[0.08]">
                <ShieldCheck className="w-5 h-5 text-champagne-400 mb-2" />
                <h4 className="text-sm font-medium text-white">XPEL Factory Certified</h4>
                <p className="text-xs text-titanium-400 font-light mt-0.5">Computer-cut precision templates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY RESERVE? Section */}
      <section className="bg-graphite-900 py-24 px-6 md:px-12 border-t border-b border-white/[0.06] mb-24">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-6">
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-champagne-400">
            // The Core Belief
          </span>
          <h2 className="text-4xl sm:text-6xl font-extralight text-white uppercase tracking-tight">
            Why Reserve?
          </h2>
          <p className="text-2xl sm:text-3xl text-metallic-gold font-light tracking-wide italic max-w-3xl">
            &ldquo;Because your vehicle deserves more than a wash.&rdquo;
          </p>
          <p className="text-titanium-300 text-sm sm:text-base font-light max-w-2xl leading-relaxed mt-2">
            Whether it is an ultra-rare Paint-to-Sample Porsche 911, a V12 Ferrari, or a cherished classic, we treat your vehicle as a masterpiece of mechanical art that demands museum-grade preservation.
          </p>

          <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-graphite-950 border border-white/10 mt-4">
            <div className="flex items-center text-champagne-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-champagne-400 text-champagne-400" />
              ))}
            </div>
            <div className="h-4 w-[1px] bg-white/20" />
            <div className="text-xs text-white font-medium">
              4.9 Rating from ~2,949 Verified Supercar & Luxury Reviews
            </div>
          </div>
        </div>
      </section>

      {/* Studio Location & Concierge Info */}
      <section className="px-6 md:px-12">
        <div className="max-w-7xl mx-auto glass-panel p-8 sm:p-14 rounded-3xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-[10px] font-mono tracking-widest text-champagne-400 uppercase">
              // Visit Our Miami Studio
            </span>
            <h3 className="text-3xl sm:text-4xl font-light text-white tracking-tight uppercase">
              Located in the Heart of Miami.
            </h3>
            <p className="text-sm text-titanium-300 font-light leading-relaxed">
              Conveniently located near Brickell, Coconut Grove, and Downtown Miami. We provide private client lounges, high-speed Wi-Fi, espresso bar, and 4K CCTV feeds of your vehicle throughout the detailing session.
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-titanium-200">
                <MapPin className="w-4 h-4 text-champagne-400 shrink-0" />
                <span>222 SW 7th St, Miami, FL 33130, USA</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-titanium-200">
                <Phone className="w-4 h-4 text-champagne-400 shrink-0" />
                <a href="tel:+17866429018" className="hover:text-white transition-colors">+1 (786) 642-9018</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-titanium-200">
                <Clock className="w-4 h-4 text-champagne-400 shrink-0" />
                <span>Monday – Saturday: 8:00 AM – 7:00 PM (Sunday VIP by Appt)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=85"
                alt="RESERVE Detailing Client Experience"
                fill
                className="object-cover"
              />
            </div>
            <Link
              href="/book"
              className="w-full py-4 rounded-xl bg-white text-graphite-950 font-medium text-xs tracking-widest uppercase hover:bg-champagne-300 transition-colors text-center flex items-center justify-center gap-2"
            >
              <span>Schedule Your Studio Session</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}