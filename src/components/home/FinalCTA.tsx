'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Phone, Sparkles, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FinalCTA() {
  return (
    <section className="relative min-h-[90vh] bg-graphite-950 flex items-center justify-center py-32 px-6 md:px-12 overflow-hidden">
      {/* Cinematic Fullscreen Vehicle Backdrop */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2000&q=85"
          alt="RESERVE Detailing Luxury Supercar Finish"
          fill
          className="object-cover filter brightness-[0.4] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/60 to-graphite-950/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-graphite-900/80 backdrop-blur-xl border border-white/15 shadow-2xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
          <span className="text-[11px] font-mono tracking-[0.25em] text-champagne-300 uppercase">
            Reservations Open For South Florida
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tight text-white uppercase leading-[0.95]"
        >
          Ready For <br />
          <span className="font-semibold text-metallic-silver">The Finish?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-titanium-300 text-base sm:text-xl font-light max-w-2xl"
        >
          Secure your studio appointment or arrange enclosed concierge transport from your private residence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4"
        >
          <Link
            href="/book"
            className="w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-to-r from-white via-titanium-100 to-champagne-300 text-graphite-950 font-medium text-xs tracking-[0.2em] uppercase hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
          >
            <span>Book Your Detail</span>
            <ArrowUpRight className="w-4 h-4 text-graphite-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <a
            href="tel:+17866429018"
            className="w-full sm:w-auto px-8 py-5 rounded-full bg-graphite-900/80 backdrop-blur-xl border border-white/15 text-white font-medium text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-champagne-400" />
            <span>Call Reserve</span>
          </a>
        </motion.div>

        <div className="flex items-center gap-2 text-xs text-titanium-400 font-mono tracking-wider pt-6">
          <MapPin className="w-3.5 h-3.5 text-champagne-400" />
          <span>222 SW 7th St, Miami, FL 33130</span>
        </div>
      </div>
    </section>
  );
}
