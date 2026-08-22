'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar as CalendarIcon,
  Clock,
  Car,
  User,
  ShieldCheck,
  Plus,
  Minus,
  Check
} from 'lucide-react';
import { SERVICES_DATA } from '@/data/servicesData';
import { useBooking, VEHICLE_OPTIONS, AVAILABLE_ADDONS } from '@/context/BookingContext';
import { motion } from 'framer-motion';

const STEPS = [
  { id: 1, name: '01 SERVICE' },
  { id: 2, name: '02 VEHICLE' },
  { id: 3, name: '03 DATE' },
  { id: 4, name: '04 TIME' },
  { id: 5, name: '05 DETAILS' },
  { id: 6, name: '06 REVIEW' },
];

const TIME_SLOTS = [
  { id: '08:30 AM', label: '08:30 AM', period: 'Morning Primary Session' },
  { id: '11:00 AM', label: '11:00 AM', period: 'Midday Cleanroom Slot' },
  { id: '02:00 PM', label: '02:00 PM', period: 'Afternoon Rejuvenation' },
  { id: '04:30 PM', label: '04:30 PM', period: 'Twilight Stage Handover' },
  { id: 'Concierge Valet', label: 'Concierge Valet', period: 'Enclosed Home Pickup (8:00 AM)' }
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    booking,
    selectedService,
    updateBooking,
    selectService,
    toggleAddOn,
    calculatePricing
  } = useBooking();
  const router = useRouter();

  const pricing = calculatePricing();

  // Helper date generator for next 14 days
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push({
        fullDate: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' })
      });
    }
    return dates;
  };

  const dates = getAvailableDates();

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      router.push('/checkout');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black min-h-screen pt-28 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        {/* Step Progress Header */}
        <div className="mb-12">
          <div className="flex flex-col gap-2 max-w-3xl mb-8">
            <span className="text-[11px] font-mono tracking-[0.4em] uppercase text-titanium-400">
              // STUDIO RESERVATION PROTOCOL
            </span>
            <h1 className="font-cinzel text-4xl sm:text-6xl font-light tracking-tight text-white uppercase">
              Configure <br />
              <span className="font-bold">Your Session.</span>
            </h1>
          </div>

          {/* Top: 01 SERVICE → 02 VEHICLE → 03 DATE → 04 TIME → 05 DETAILS → 06 REVIEW */}
          <div className="w-full">
            <div className="flex items-center justify-between overflow-x-auto pb-4 gap-4 no-scrollbar">
              {STEPS.map((s, idx) => {
                const isActive = currentStep === s.id;
                const isPast = currentStep > s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => s.id <= currentStep && setCurrentStep(s.id)}
                    className={`text-xs font-mono tracking-widest uppercase transition-colors whitespace-nowrap flex items-center gap-2 ${
                      isActive
                        ? 'text-white font-bold'
                        : isPast
                        ? 'text-white/80'
                        : 'text-titanium-400'
                    }`}
                  >
                    <span>{s.name}</span>
                    {idx < STEPS.length - 1 && (
                      <span className="text-white/20 ml-2">→</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Thin Progress Line Underneath */}
            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden mt-1">
              <motion.div
                animate={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-white"
              />
            </div>
          </div>
        </div>

        {/* 2-Column Layout (Content Left + Sticky Summary Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Wizard Area (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* STEP 1: SERVICE SELECTION (Large Horizontal Rows) */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-4">
                <span className="text-xs font-mono tracking-widest text-titanium-400 uppercase">
                  Select Detailing Protocol
                </span>

                <div className="flex flex-col gap-3">
                  {SERVICES_DATA.map((srv) => {
                    const isSelected = booking.serviceId === srv.id;
                    return (
                      <div
                        key={srv.id}
                        onClick={() => selectService(srv.id)}
                        className={`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isSelected
                            ? 'bg-white/[0.08] border-white shadow-2xl'
                            : 'bg-black border-white/10 hover:border-white/30 hover:bg-white/[0.03]'
                        }`}
                      >
                        <div className="flex flex-col gap-1 max-w-lg">
                          <div className="flex items-center gap-3">
                            <span className="font-cinzel text-lg sm:text-xl font-bold text-white uppercase">
                              {srv.name}
                            </span>
                            <span className="text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded-full bg-white/10 text-titanium-300">
                              {srv.duration}
                            </span>
                          </div>
                          <p className="text-xs text-titanium-300 font-light leading-relaxed">
                            {srv.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                          <span className="font-mono text-lg font-semibold text-white">
                            ${srv.price}
                          </span>
                          <div
                            className={`p-2.5 rounded-full border transition-all duration-300 ${
                              isSelected
                                ? 'bg-white text-black border-white translate-x-[4px]'
                                : 'border-white/20 text-white group-hover:border-white group-hover:translate-x-[4px]'
                            }`}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: VEHICLE SELECTION (Clean Silhouette Cards) */}
            {currentStep === 2 && (
              <div className="flex flex-col gap-6">
                <span className="text-xs font-mono tracking-widest text-titanium-400 uppercase">
                  Select Vehicle Category & Dimensions
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {VEHICLE_OPTIONS.map((veh) => {
                    const isSelected = booking.vehicleCategory === veh.id;
                    return (
                      <div
                        key={veh.id}
                        onClick={() => updateBooking({ vehicleCategory: veh.id })}
                        className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between h-[200px] ${
                          isSelected
                            ? 'bg-white/[0.08] border-white shadow-2xl'
                            : 'bg-black border-white/10 hover:border-white/30 hover:bg-white/[0.03]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <Car className="w-6 h-6 text-white" />
                          <span className="text-xs font-mono text-titanium-400">{veh.multiplier}x Base</span>
                        </div>

                        <div className="flex flex-col gap-1">
                          <h4 className="font-cinzel text-lg font-bold text-white uppercase">{veh.name}</h4>
                          <p className="text-xs text-titanium-400 font-light">{veh.subtext}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Make & Model Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <input
                    type="text"
                    placeholder="Vehicle Year (e.g. 2024)"
                    value={booking.vehicleYear}
                    onChange={(e) => updateBooking({ vehicleYear: e.target.value })}
                    className="p-4 rounded-xl bg-black border border-white/15 text-white placeholder:text-titanium-500 text-xs font-mono focus:border-white focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Vehicle Make (e.g. Porsche)"
                    value={booking.vehicleMake}
                    onChange={(e) => updateBooking({ vehicleMake: e.target.value })}
                    className="p-4 rounded-xl bg-black border border-white/15 text-white placeholder:text-titanium-500 text-xs font-mono focus:border-white focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Vehicle Model (e.g. 911 GT3 RS)"
                    value={booking.vehicleModel}
                    onChange={(e) => updateBooking({ vehicleModel: e.target.value })}
                    className="p-4 rounded-xl bg-black border border-white/15 text-white placeholder:text-titanium-500 text-xs font-mono focus:border-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: DATE SELECTION (Large Minimal Date Buttons) */}
            {currentStep === 3 && (
              <div className="flex flex-col gap-6">
                <span className="text-xs font-mono tracking-widest text-titanium-400 uppercase">
                  Select Studio Session Date
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                  {dates.map((d) => {
                    const isSelected = booking.date === d.fullDate;
                    return (
                      <button
                        key={d.fullDate}
                        onClick={() => updateBooking({ date: d.fullDate })}
                        className={`p-4 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center gap-1 ${
                          isSelected
                            ? 'bg-white text-black border-white font-semibold shadow-2xl'
                            : 'bg-black border-white/10 text-white hover:border-white/30'
                        }`}
                      >
                        <span className="text-[10px] font-mono uppercase opacity-70">{d.dayName}</span>
                        <span className="font-cinzel text-2xl font-bold">{d.dayNumber}</span>
                        <span className="text-[10px] font-mono uppercase opacity-70">{d.month}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: TIME SELECTION (Compact Outlined Pills) */}
            {currentStep === 4 && (
              <div className="flex flex-col gap-6">
                <span className="text-xs font-mono tracking-widest text-titanium-400 uppercase">
                  Select Studio Time Window
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TIME_SLOTS.map((t) => {
                    const isSelected = booking.timeSlot === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => updateBooking({ timeSlot: t.id })}
                        className={`p-5 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between ${
                          isSelected
                            ? 'bg-white text-black border-white shadow-2xl'
                            : 'bg-black border-white/10 text-white hover:border-white/30'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-mono text-sm font-semibold">{t.label}</span>
                          <span className="text-xs font-light opacity-70">{t.period}</span>
                        </div>
                        {isSelected && <Check className="w-5 h-5 text-black" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: CLIENT DETAILS */}
            {currentStep === 5 && (
              <div className="flex flex-col gap-6">
                <span className="text-xs font-mono tracking-widest text-titanium-400 uppercase">
                  Client & Contact Coordinates
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Legal Name"
                    value={booking.customerName}
                    onChange={(e) => updateBooking({ customerName: e.target.value })}
                    className="p-4 rounded-xl bg-black border border-white/15 text-white placeholder:text-titanium-500 text-xs font-mono focus:border-white focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number (+1 786...)"
                    value={booking.customerPhone}
                    onChange={(e) => updateBooking({ customerPhone: e.target.value })}
                    className="p-4 rounded-xl bg-black border border-white/15 text-white placeholder:text-titanium-500 text-xs font-mono focus:border-white focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email Address (for calendar .ics & updates)"
                    value={booking.customerEmail}
                    onChange={(e) => updateBooking({ customerEmail: e.target.value })}
                    className="sm:col-span-2 p-4 rounded-xl bg-black border border-white/15 text-white placeholder:text-titanium-500 text-xs font-mono focus:border-white focus:outline-none"
                  />
                  <textarea
                    rows={3}
                    placeholder="Special Notes or Specific Vulnerability Requests (optional)"
                    value={booking.notes}
                    onChange={(e) => updateBooking({ notes: e.target.value })}
                    className="sm:col-span-2 p-4 rounded-xl bg-black border border-white/15 text-white placeholder:text-titanium-500 text-xs font-mono focus:border-white focus:outline-none resize-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 6: REVIEW & ADD-ONS */}
            {currentStep === 6 && (
              <div className="flex flex-col gap-6">
                <span className="text-xs font-mono tracking-widest text-titanium-400 uppercase">
                  Review & Optional Atelier Add-ons
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {AVAILABLE_ADDONS.map((addon) => {
                    const isAdded = booking.selectedAddOns.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                          isAdded
                            ? 'bg-white/[0.08] border-white'
                            : 'bg-black border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-white">{addon.name}</span>
                          <span className="text-[11px] font-mono text-titanium-400">+${addon.price}</span>
                        </div>
                        <div className={`p-1.5 rounded-full border ${isAdded ? 'bg-white text-black border-white' : 'border-white/20 text-white'}`}>
                          {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation Buttons (Back & Continue) */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              {currentStep > 1 ? (
                <button
                  onClick={handlePrev}
                  className="px-6 py-3.5 rounded-full border border-white/20 text-white text-xs font-mono tracking-widest uppercase hover:bg-white hover:text-black transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>PREVIOUS</span>
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={handleNext}
                className="group px-8 py-4 rounded-full border border-white/30 text-white text-xs font-medium tracking-[0.2em] uppercase bg-transparent hover:bg-white hover:text-black transition-all duration-350 flex items-center gap-2"
              >
                <span>{currentStep === 6 ? 'PROCEED TO CHECKOUT' : 'CONTINUE'}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-350 group-hover:translate-x-[6px]" />
              </button>
            </div>
          </div>

          {/* Sticky Reservation Summary Right Column (4 Cols) */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="p-8 rounded-3xl border border-white/15 bg-black flex flex-col gap-6 shadow-2xl">
              <span className="font-cinzel text-xl font-bold tracking-tight text-white uppercase">
                YOUR RESERVATION
              </span>

              <div className="flex flex-col gap-3 text-xs font-mono">
                <div className="flex justify-between text-titanium-400">
                  <span>Service</span>
                  <span className="text-white text-right max-w-[180px] truncate">{selectedService?.name || 'None Selected'}</span>
                </div>
                <div className="flex justify-between text-titanium-400">
                  <span>Vehicle</span>
                  <span className="text-white">{booking.vehicleCategory.toUpperCase()}</span>
                </div>
                <div className="flex justify-between text-titanium-400">
                  <span>Date</span>
                  <span className="text-white">{booking.date || 'Pending'}</span>
                </div>
                <div className="flex justify-between text-titanium-400">
                  <span>Time</span>
                  <span className="text-white">{booking.timeSlot || 'Pending'}</span>
                </div>
              </div>

              <div className="h-[1px] bg-white/10" />

              <div className="flex items-baseline justify-between">
                <span className="font-mono text-sm tracking-widest text-titanium-400 uppercase">TOTAL</span>
                <span className="font-mono text-3xl font-bold text-white">${pricing.total}</span>
              </div>

              <button
                onClick={handleNext}
                className="group w-full py-4 rounded-full border border-white/30 text-white text-xs font-medium tracking-[0.2em] uppercase bg-transparent hover:bg-white hover:text-black transition-all duration-350 flex items-center justify-center gap-2"
              >
                <span>{currentStep === 6 ? 'CHECKOUT' : 'CONTINUE'}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-350 group-hover:translate-x-[6px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}