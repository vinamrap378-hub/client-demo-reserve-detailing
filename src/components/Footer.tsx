'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Star, MapPin, Phone, Clock, ArrowUpRight, Award, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-graphite-950 border-t border-white/[0.08] relative overflow-hidden pt-20 pb-12">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-champagne-500/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-white via-titanium-300 to-champagne-500 p-[1px] shadow-lg">
                <div className="w-full h-full bg-graphite-950 flex items-center justify-center">
                  <span className="text-[15px] font-bold tracking-widest text-champagne-400">R</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-medium tracking-[0.2em] text-white uppercase">
                  RESERVE
                </span>
                <span className="text-[10px] tracking-[0.3em] text-titanium-400 font-light uppercase -mt-0.5">
                  Automotive Atelier • Miami
                </span>
              </div>
            </Link>

            <p className="text-titanium-400 text-sm leading-relaxed max-w-sm font-light">
              South Florida’s premier automotive detailing, paint correction, and surface protection studio. Delivering an uncompromising Apple-level standard of perfection for exotic, classic, and luxury vehicles.
            </p>

            <div className="inline-flex items-center gap-3 p-3.5 rounded-xl bg-graphite-900 border border-white/[0.07] w-fit">
              <div className="flex items-center text-champagne-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-champagne-400 text-champagne-400" />
                ))}
              </div>
              <div className="h-4 w-[1px] bg-white/20" />
              <div className="text-xs text-white font-medium">
                4.9 Rating <span className="text-titanium-400 font-normal">(2,949 Verified Reviews)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-mono tracking-[0.25em] text-champagne-400 uppercase">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3 text-sm font-light text-titanium-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">Services Catalogue</Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-white transition-colors">6-Stage Process</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">Supercar Gallery</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Atelier</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact & Directions</Link>
              </li>
            </ul>
          </div>

          {/* Services Menu */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-mono tracking-[0.25em] text-champagne-400 uppercase">
              Signature Services
            </h4>
            <ul className="flex flex-col gap-3 text-sm font-light text-titanium-300">
              <li>
                <Link href="/services#signature-detail" className="hover:text-white transition-colors">Reserve Signature Detail</Link>
              </li>
              <li>
                <Link href="/services#polishing" className="hover:text-white transition-colors">Stage 2/3 Paint Correction</Link>
              </li>
              <li>
                <Link href="/services#ceramic-coating" className="hover:text-white transition-colors">Ceramic Pro 9H Matrix</Link>
              </li>
              <li>
                <Link href="/services#ppf-film" className="hover:text-white transition-colors">XPEL Ultimate Plus PPF</Link>
              </li>
              <li>
                <Link href="/services#detailing-car" className="hover:text-white transition-colors">Interior Sanctuary Revival</Link>
              </li>
              <li>
                <Link href="/services#concierge-delivery" className="hover:text-white transition-colors">Enclosed Transporter Delivery</Link>
              </li>
            </ul>
          </div>

          {/* Studio Location & Hours */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-mono tracking-[0.25em] text-champagne-400 uppercase">
              Miami Studio
            </h4>
            <div className="flex flex-col gap-3 text-sm font-light text-titanium-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                <span>222 SW 7th St, Miami, FL 33130, USA</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-champagne-400 shrink-0" />
                <a href="tel:+17866429018" className="hover:text-white transition-colors">+1 (786) 642-9018</a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                <div>
                  <p>Mon – Sat: 8:00 AM – 7:00 PM</p>
                  <p className="text-xs text-titanium-400">Sunday: VIP By Appointment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accreditations Bar */}
        <div className="border-t border-white/[0.08] py-8 flex flex-wrap items-center justify-between gap-6 text-xs text-titanium-400">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-champagne-400" />
              <span>IDA Certified Detailers with Skills Validation</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-champagne-400" />
              <span>XPEL Factory Certified Installation Center</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-champagne-400" />
              <span>Ceramic Pro Elite Certified Studio</span>
            </div>
          </div>
          <Link
            href="/book"
            className="text-white hover:text-champagne-400 flex items-center gap-1 font-medium tracking-wider uppercase"
          >
            <span>Book A Studio Session</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/[0.05] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-titanium-500 font-light">
          <p>© {new Date().getFullYear()} RESERVE Detailing LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-titanium-300 transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-titanium-300 transition-colors">Terms of Service</Link>
            <Link href="/about" className="hover:text-titanium-300 transition-colors">Warranty Standards</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
