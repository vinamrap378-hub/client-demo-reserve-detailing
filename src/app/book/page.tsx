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
  ArrowUpRight
} from 'lucide-react';
import { SERVICES_DATA } from '@/data/servicesData';
import { useBooking, VEHICLE_OPTIONS, AVAILABLE_ADDONS } from '@/context/BookingContext';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { id: 1, name: 'Service', label: '1. Select Service' },
  { id: 2, name: 'Vehicle', label: '2. Vehicle Type' },
  { id: 3, name: 'Date', label: '3. Schedule Date' },
  { id: 4, name: 'Time', label: '4. Select Time' },
  { id: 5, name: 'Details', label: '5. Client Info' },
  { id: 6, name: 'Review', label: '6. Review & Add-ons' },
];

const TIME_SLOTS = [
  { id: '08:30 AM', label: '08:30 AM', period: 'Morning Primary Session', badge: 'Recommended' },
  { id: '11:00 AM', label: '11:00 AM', period: 'Midday Cleanroom Slot', badge: 'Available' },
  { id: '02:00 PM', label: '02:00 PM', period: 'Afternoon Rejuvenation', badge: 'Available' },
  { id: '04:30 PM', label: '04:30 PM', period: 'Twilight Stage Handover', badge: 'Limited' },
  { id: 'Concierge Valet', label: 'Concierge Valet', period: 'Enclosed Home Pickup (8:00 AM)', badge: 'White Glove' }
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
    <div className="bg-graphite-950 min-h-screen pt-32 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Step Progress Header */}
        <div className="mb-12">
          <div className="flex flex-col gap-2 max-w-3xl">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-champagne-400">
              // Studio Reservation Protocol
            </span>
            <h1 className="text-4xl sm:text-6xl font-extralight tracking-tight text-white uppercase">
              Configure <br />
              <span className="font-semibold text-metallic-gold">Your Session.</span>
            </h1>
          </div>

          {/* Stepper Progress Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between overflow-x-auto pb-4 scrollbar-none gap-2">
            {STEPS.map((s) => {
              const isPassed = currentStep > s.id;
              const isCurrent = currentStep === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => s.id <= currentStep && setCurrentStep(s.id)}
                  disabled={s.id > currentStep}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all shrink-0 ${
                    isCurrent
                      ? 'bg-white text-graphite-950 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                      : isPassed
                      ? 'bg-graphite-900 text-champagne-400 border border-champagne-500/30'
                      : 'text-titanium-500 bg-white/[0.03] border border-white/[0.05]'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      isCurrent
                        ? 'bg-black text-white'
                        : isPassed
                        ? 'bg-champagne-500 text-black'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {isPassed ? '✓' : s.id}
                  </span>
                  <span>{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Wizard Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Step Stage Container */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {/* STEP 1: SERVICE SELECTION */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-light text-white">Select Service Package</h2>
                      <p className="text-xs text-titanium-400 font-light mt-0.5">
                        Choose from our signature detailing and surface protection treatments.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SERVICES_DATA.map((srv) => {
                      const isSelected = booking.serviceId === srv.id;
                      return (
                        <div
                          key={srv.id}
                          onClick={() => selectService(srv.id)}
                          className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-4 ${
                            isSelected
                              ? 'bg-gradient-to-b from-graphite-850 to-graphite-900 border-champagne-400 shadow-[0_0_25px_rgba(212,175,55,0.15)]'
                              : 'bg-graphite-900/80 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono tracking-widest text-champagne-400 uppercase">
                                {srv.category}
                              </span>
                              {isSelected && (
                                <div className="w-5 h-5 rounded-full bg-champagne-400 text-black flex items-center justify-center text-xs">
                                  ✓
                                </div>
                              )}
                            </div>
                            <h3 className="text-base font-medium text-white">{srv.name}</h3>
                            <p className="text-xs text-titanium-400 font-light line-clamp-2">
                              {srv.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                            <span className="text-titanium-400 font-mono">{srv.duration}</span>
                            <span className="text-base font-mono font-medium text-white">
                              ${srv.price}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: VEHICLE TYPE & SPECS */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-8"
                >
                  <div>
                    <h2 className="text-2xl font-light text-white">Vehicle Classification</h2>
                    <p className="text-xs text-titanium-400 font-light mt-0.5">
                      Select your body style and enter vehicle details for accurate panel preparation.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {VEHICLE_OPTIONS.map((veh) => {
                      const isSelected = booking.vehicleCategory === veh.id;
                      return (
                        <div
                          key={veh.id}
                          onClick={() => updateBooking({ vehicleCategory: veh.id })}
                          className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-3 ${
                            isSelected
                              ? 'bg-gradient-to-b from-graphite-850 to-graphite-900 border-champagne-400 shadow-[0_0_25px_rgba(212,175,55,0.15)]'
                              : 'bg-graphite-900/80 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <Car className={`w-5 h-5 ${isSelected ? 'text-champagne-400' : 'text-titanium-400'}`} />
                            {isSelected && (
                              <div className="w-4 h-4 rounded-full bg-champagne-400 text-black flex items-center justify-center text-[10px]">
                                ✓
                              </div>
                            )}
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-white">{veh.name}</h4>
                            <p className="text-[11px] text-titanium-400 font-light mt-0.5">{veh.subtext}</p>
                          </div>

                          <div className="text-[10px] font-mono text-champagne-300">
                            {veh.multiplier === 1.0 ? 'Base Tier' : `+${Math.round((veh.multiplier - 1) * 100)}% Surface Area`}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Vehicle Specs Inputs */}
                  <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
                    <span className="text-[10px] font-mono tracking-widest text-champagne-400 uppercase">
                      Vehicle Specifications
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] text-titanium-400 font-mono">Year</label>
                        <input
                          type="text"
                          placeholder="2024"
                          value={booking.vehicleYear}
                          onChange={(e) => updateBooking({ vehicleYear: e.target.value })}
                          className="glass-input px-3.5 py-2.5 rounded-xl text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] text-titanium-400 font-mono">Make</label>
                        <input
                          type="text"
                          placeholder="Porsche"
                          value={booking.vehicleMake}
                          onChange={(e) => updateBooking({ vehicleMake: e.target.value })}
                          className="glass-input px-3.5 py-2.5 rounded-xl text-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] text-titanium-400 font-mono">Model / Trim</label>
                        <input
                          type="text"
                          placeholder="911 GT3 RS"
                          value={booking.vehicleModel}
                          onChange={(e) => updateBooking({ vehicleModel: e.target.value })}
                          className="glass-input px-3.5 py-2.5 rounded-xl text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: DATE SELECTION */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h2 className="text-2xl font-light text-white">Schedule Reservation Date</h2>
                    <p className="text-xs text-titanium-400 font-light mt-0.5">
                      Select your preferred studio session date (real-time live availability).
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                    {dates.map((d) => {
                      const isSelected = booking.date === d.fullDate;
                      return (
                        <div
                          key={d.fullDate}
                          onClick={() => updateBooking({ date: d.fullDate })}
                          className={`p-4 rounded-2xl border cursor-pointer text-center transition-all flex flex-col items-center gap-1 ${
                            isSelected
                              ? 'bg-gradient-to-b from-graphite-850 to-graphite-900 border-champagne-400 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                              : 'bg-graphite-900/80 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <span className="text-[11px] font-mono text-titanium-400 uppercase">
                            {d.dayName}
                          </span>
                          <span className="text-2xl font-mono font-light text-white">
                            {d.dayNumber}
                          </span>
                          <span className="text-[10px] font-mono text-champagne-400 uppercase">
                            {d.month}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: TIME SLOT SELECTION */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h2 className="text-2xl font-light text-white">Select Arrival Time Slot</h2>
                    <p className="text-xs text-titanium-400 font-light mt-0.5">
                      Choose your arrival slot or select white-glove enclosed transporter pickup.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {TIME_SLOTS.map((slot) => {
                      const isSelected = booking.timeSlot === slot.id;
                      return (
                        <div
                          key={slot.id}
                          onClick={() => updateBooking({ timeSlot: slot.id })}
                          className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-gradient-to-b from-graphite-850 to-graphite-900 border-champagne-400 shadow-[0_0_25px_rgba(212,175,55,0.15)]'
                              : 'bg-graphite-900/80 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <Clock className={`w-5 h-5 ${isSelected ? 'text-champagne-400' : 'text-titanium-400'}`} />
                            <div>
                              <h4 className="text-base font-medium text-white">{slot.label}</h4>
                              <p className="text-xs text-titanium-400 font-light">{slot.period}</p>
                            </div>
                          </div>

                          <span className="px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[10px] font-mono text-champagne-300">
                            {slot.badge}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 5: CUSTOMER INFORMATION */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h2 className="text-2xl font-light text-white">Client Credentials</h2>
                    <p className="text-xs text-titanium-400 font-light mt-0.5">
                      Provide contact coordinates for booking confirmations and telemetry updates.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-titanium-300 font-mono uppercase">Full Name *</label>
                      <input
                        type="text"
                        placeholder="Marcus Sterling"
                        value={booking.customerName}
                        onChange={(e) => updateBooking({ customerName: e.target.value })}
                        className="glass-input px-4 py-3 rounded-xl text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-titanium-300 font-mono uppercase">Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="+1 (786) 642-9018"
                        value={booking.customerPhone}
                        onChange={(e) => updateBooking({ customerPhone: e.target.value })}
                        className="glass-input px-4 py-3 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-titanium-300 font-mono uppercase">Email Address *</label>
                    <input
                      type="email"
                      placeholder="marcus@example.com"
                      value={booking.customerEmail}
                      onChange={(e) => updateBooking({ customerEmail: e.target.value })}
                      className="glass-input px-4 py-3 rounded-xl text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-titanium-300 font-mono uppercase">
                      Special Studio Requests or Paint Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Please note any delicate aftermarket splitters, ceramic tint, or transport instructions..."
                      value={booking.notes}
                      onChange={(e) => updateBooking({ notes: e.target.value })}
                      className="glass-input px-4 py-3 rounded-xl text-sm resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {/* STEP 6: REVIEW & ADD-ONS */}
              {currentStep === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-8"
                >
                  <div>
                    <h2 className="text-2xl font-light text-white">Review & Recommended Add-ons</h2>
                    <p className="text-xs text-titanium-400 font-light mt-0.5">
                      Elevate your service with master-level add-on treatments before proceeding to checkout.
                    </p>
                  </div>

                  {/* Add-ons List */}
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-mono tracking-widest text-champagne-400 uppercase">
                      Recommended Studio Add-Ons:
                    </span>

                    {AVAILABLE_ADDONS.map((addon) => {
                      const isAdded = booking.selectedAddOns.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => toggleAddOn(addon.id)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                            isAdded
                              ? 'bg-gradient-to-b from-graphite-850 to-graphite-900 border-champagne-400'
                              : 'bg-graphite-900/70 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                                isAdded ? 'bg-champagne-400 text-black' : 'bg-white/10 text-white'
                              }`}
                            >
                              {isAdded ? '✓' : '+'}
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-white">{addon.name}</h4>
                              <p className="text-xs text-titanium-400 font-light">{addon.description}</p>
                            </div>
                          </div>

                          <div className="text-sm font-mono text-white font-medium shrink-0">
                            +${addon.price}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stepper Navigation Actions */}
            <div className="flex items-center justify-between pt-8 border-t border-white/10 mt-10">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 ${
                  currentStep === 1
                    ? 'opacity-30 cursor-not-allowed text-titanium-500'
                    : 'text-white hover:bg-white/10 border border-white/15'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleNext}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-white via-titanium-100 to-champagne-300 text-graphite-950 font-medium text-xs tracking-widest uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <span>{currentStep === 6 ? 'Continue To Checkout' : 'Proceed To Next'}</span>
                <ArrowRight className="w-4 h-4 text-graphite-950" />
              </button>
            </div>
          </div>

          {/* Sticky Apple-Style Live Summary Sidebar */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 flex flex-col gap-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-[11px] font-mono tracking-widest text-champagne-400 uppercase">
                  Reservation Summary
                </span>
                <span className="text-xs font-mono text-titanium-400">Step {currentStep} of 6</span>
              </div>

              {/* Service Card Mini */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono text-titanium-400 uppercase">Selected Protocol</span>
                <h3 className="text-lg font-light text-white">{selectedService.name}</h3>
                <p className="text-xs text-champagne-400/80 font-mono">{selectedService.duration}</p>
              </div>

              {/* Vehicle & Date Mini */}
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-white/10 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-titanium-400 uppercase block">Vehicle</span>
                  <span className="text-white font-medium">
                    {booking.vehicleYear} {booking.vehicleMake} {booking.vehicleModel}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-titanium-400 uppercase block">Time Slot</span>
                  <span className="text-white font-medium">
                    {booking.date || 'Pending'} • {booking.timeSlot}
                  </span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="flex flex-col gap-2.5 text-xs text-titanium-300">
                <div className="flex justify-between">
                  <span>Base Protocol:</span>
                  <span className="text-white font-mono">${pricing.basePrice}</span>
                </div>
                {pricing.vehicleMultiplier > 1 && (
                  <div className="flex justify-between text-titanium-400">
                    <span>Vehicle Multiplier ({Math.round((pricing.vehicleMultiplier - 1) * 100)}%):</span>
                    <span className="text-white font-mono">
                      +${pricing.serviceTotal - pricing.basePrice}
                    </span>
                  </div>
                )}
                {pricing.addOnsTotal > 0 && (
                  <div className="flex justify-between">
                    <span>Selected Add-ons ({booking.selectedAddOns.length}):</span>
                    <span className="text-white font-mono">+${pricing.addOnsTotal}</span>
                  </div>
                )}
                <div className="flex justify-between text-titanium-400">
                  <span>Estimated FL Tax (7%):</span>
                  <span className="text-white font-mono">${pricing.tax}</span>
                </div>

                <div className="pt-3 border-t border-white/15 flex justify-between items-baseline text-sm">
                  <span className="text-white font-medium">Estimated Total:</span>
                  <span className="text-2xl font-mono font-light text-champagne-300">
                    ${pricing.total}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-graphite-900 border border-white/[0.06] text-[11px] text-titanium-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-champagne-400 shrink-0" />
                <span>Zero deposit required to reserve. Pay after studio sign-off.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
