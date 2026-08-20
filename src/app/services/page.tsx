'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Clock, CheckCircle2, ArrowUpRight, ShieldCheck, Filter, Car, Search } from 'lucide-react';
import { SERVICES_DATA, ServiceItem } from '@/data/servicesData';
import { useBooking } from '@/context/BookingContext';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { id: 'all', label: 'All Services' },
  { id: 'exterior', label: 'Exterior & Wash' },
  { id: 'interior', label: 'Interior & Leather' },
  { id: 'correction', label: 'Paint Correction' },
  { id: 'protection', label: 'Ceramic & PPF' },
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { selectService } = useBooking();
  const router = useRouter();

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        service.category === selectedCategory ||
        service.category === 'all';
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleBookService = (serviceId: string) => {
    selectService(serviceId);
    router.push('/book');
  };

  return (
    <div className="bg-graphite-950 min-h-screen pt-32 pb-24 text-white">
      {/* Hero Header */}
      <section className="relative px-6 md:px-12 mb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 max-w-3xl">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-champagne-400">
              // Bespoke Catalogue
            </span>
            <h1 className="text-5xl sm:text-7xl font-extralight tracking-tight text-white uppercase leading-[0.95]">
              Services <br />
              <span className="font-medium text-metallic-silver">& Protocols.</span>
            </h1>
            <p className="text-titanium-300 text-base sm:text-lg font-light mt-2 leading-relaxed">
              Every package is performed in our climate-controlled cleanroom studio using 000-PPM deionized water, Rupes machine polishers, Swissvax organic carnaubas, and registered Ceramic Pro coatings.
            </p>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mt-12 pt-8 border-t border-white/10">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-all shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-white text-graphite-950 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                      : 'bg-graphite-900/80 text-titanium-400 hover:text-white border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-titanium-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-graphite-900 border border-white/10 text-xs text-white placeholder-titanium-500 focus:outline-none focus:border-champagne-400 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`group relative flex flex-col justify-between rounded-3xl overflow-hidden border transition-all duration-300 ${
                    service.highlight
                      ? 'bg-gradient-to-b from-graphite-850 to-graphite-900 border-champagne-500/40 shadow-[0_0_30px_rgba(212,175,55,0.08)]'
                      : 'bg-graphite-900/90 border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Service Image Header */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-graphite-900 via-graphite-900/40 to-transparent" />

                    {/* Badge */}
                    {service.badge && (
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-champagne-500/90 text-graphite-950 text-[10px] font-mono font-semibold tracking-wider uppercase backdrop-blur-md">
                        {service.badge}
                      </div>
                    )}

                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-champagne-300 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      <span>{service.duration}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between gap-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="text-xl font-light text-white tracking-tight group-hover:text-champagne-300 transition-colors">
                          {service.name}
                        </h3>
                      </div>

                      <p className="text-xs font-mono text-champagne-400/90 tracking-wide">
                        {service.tagline}
                      </p>

                      <p className="text-xs text-titanium-400 font-light leading-relaxed">
                        {service.description}
                      </p>

                      {/* Inclusions Checklist */}
                      <div className="flex flex-col gap-2 pt-4 border-t border-white/[0.08]">
                        <span className="text-[10px] font-mono tracking-widest text-titanium-400 uppercase">
                          Protocol Inclusions:
                        </span>
                        {service.includes.slice(0, 4).map((inc, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-titanium-300 font-light">
                            <CheckCircle2 className="w-3.5 h-3.5 text-champagne-400 mt-0.5 shrink-0" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Pricing & Action */}
                    <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-titanium-400 uppercase">Starting At</span>
                        <div className="text-2xl font-mono font-light text-white">
                          ${service.price}
                        </div>
                      </div>

                      <button
                        onClick={() => handleBookService(service.id)}
                        className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                          service.highlight
                            ? 'bg-gradient-to-r from-white to-champagne-300 text-graphite-950 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                            : 'bg-white/10 text-white hover:bg-white hover:text-black'
                        }`}
                      >
                        <span>Select & Book</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Concierge & Transport Banner */}
      <section className="px-6 md:px-12 mt-24">
        <div className="max-w-7xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="text-[10px] font-mono tracking-widest text-champagne-400 uppercase">
              // White-Glove Logistics
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              Need Enclosed Hydraulic Transport?
            </h3>
            <p className="text-sm text-titanium-300 font-light">
              We offer single-car enclosed transport across South Florida (Miami-Dade, Broward, and Palm Beach counties). Your exotic or luxury vehicle never touches highway rain or road debris.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-8 py-4 rounded-full bg-white text-graphite-950 font-medium text-xs tracking-widest uppercase hover:bg-champagne-300 transition-colors shrink-0 flex items-center gap-2"
          >
            <span>Arrange Transport</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
