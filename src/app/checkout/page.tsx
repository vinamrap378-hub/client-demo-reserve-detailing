'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  Car,
  MapPin,
  CheckCircle2,
  Sparkles,
  Phone
} from 'lucide-react';
import { useBooking, AVAILABLE_ADDONS } from '@/context/BookingContext';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const router = useRouter();
  const { booking, selectedService, calculatePricing } = useBooking();
  const pricing = calculatePricing();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'studio'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState(booking.customerName || '');
  const [isProcessing, setIsProcessing] = useState(false);

  // Format credit card with spaces
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 16) val = val.slice(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length >= 2) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setCardExpiry(val);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    setCardCvv(val);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      router.push('/checkout/confirmation');
    }, 1200);
  };

  return (
    <div className="bg-graphite-950 min-h-screen pt-32 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-champagne-400">
              // Final Step • Express Confirmation
            </span>
            <h1 className="text-4xl sm:text-6xl font-extralight tracking-tight text-white uppercase">
              Secure <br />
              <span className="font-semibold text-metallic-gold">Checkout.</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 mt-4 text-xs text-titanium-400 font-mono">
            <span>SERVICE</span>
            <span>→</span>
            <span>VEHICLE</span>
            <span>→</span>
            <span>DATE</span>
            <span>→</span>
            <span>DETAILS</span>
            <span>→</span>
            <span className="text-champagne-400 font-bold">CONFIRM</span>
          </div>
        </div>

        {/* 2-Column Apple-Style Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Configuration Review & Payment Form */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Booking Configuration Snapshot */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-light text-white uppercase tracking-tight">
                  Reservation Configuration
                </h3>
                <Link
                  href="/book"
                  className="text-xs font-mono text-champagne-400 hover:text-white underline"
                >
                  Edit Configuration
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-graphite-900 border border-white/[0.06] flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono text-titanium-400 uppercase block">
                      Service
                    </span>
                    <span className="text-white font-medium text-sm">{selectedService.name}</span>
                    <p className="text-titanium-400 font-mono mt-0.5">{selectedService.duration}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-graphite-900 border border-white/[0.06] flex items-start gap-3">
                  <Car className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono text-titanium-400 uppercase block">
                      Vehicle
                    </span>
                    <span className="text-white font-medium text-sm">
                      {booking.vehicleYear} {booking.vehicleMake} {booking.vehicleModel}
                    </span>
                    <p className="text-titanium-400 font-mono mt-0.5 capitalize">
                      {booking.vehicleCategory} Tier
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-graphite-900 border border-white/[0.06] flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono text-titanium-400 uppercase block">
                      Date & Arrival
                    </span>
                    <span className="text-white font-medium text-sm">
                      {booking.date || 'To Be Confirmed'}
                    </span>
                    <p className="text-titanium-400 font-mono mt-0.5">{booking.timeSlot}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-graphite-900 border border-white/[0.06] flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-champagne-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono text-titanium-400 uppercase block">
                      Studio Location
                    </span>
                    <span className="text-white font-medium text-sm">222 SW 7th St</span>
                    <p className="text-titanium-400 font-mono mt-0.5">Miami, FL 33130</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selector & Form */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-light text-white uppercase tracking-tight">
                  Payment Method
                </h3>
                <div className="flex items-center gap-1 text-[11px] font-mono text-titanium-400">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
              </div>

              {/* Payment Type Tabs */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border text-xs font-mono tracking-wider uppercase transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'bg-gradient-to-b from-graphite-850 to-graphite-900 border-champagne-400 text-white shadow-lg'
                      : 'bg-graphite-900/80 border-white/10 text-titanium-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-champagne-400" />
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-3.5 rounded-2xl border text-xs font-mono tracking-wider uppercase transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'applepay'
                      ? 'bg-gradient-to-b from-graphite-850 to-graphite-900 border-champagne-400 text-white shadow-lg'
                      : 'bg-graphite-900/80 border-white/10 text-titanium-400 hover:text-white'
                  }`}
                >
                  <span className="font-bold text-sm"> Pay</span>
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('studio')}
                  className={`p-3.5 rounded-2xl border text-xs font-mono tracking-wider uppercase transition-all flex flex-col items-center gap-1.5 ${
                    paymentMethod === 'studio'
                      ? 'bg-gradient-to-b from-graphite-850 to-graphite-900 border-champagne-400 text-white shadow-lg'
                      : 'bg-graphite-900/80 border-white/10 text-titanium-400 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-champagne-400" />
                  <span>Pay At Studio</span>
                </button>
              </div>

              {/* Form Input Fields */}
              <form onSubmit={handleConfirmBooking} className="flex flex-col gap-4 mt-2">
                {paymentMethod === 'card' && (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-titanium-300 font-mono uppercase">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="4000 1234 5678 9010"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          className="glass-input w-full pl-11 pr-4 py-3 rounded-xl text-sm font-mono tracking-wider"
                        />
                        <CreditCard className="w-4 h-4 text-titanium-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] text-titanium-300 font-mono uppercase">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="08/28"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          className="glass-input px-4 py-3 rounded-xl text-sm font-mono tracking-wider"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] text-titanium-300 font-mono uppercase">
                          Security CVV
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="•••"
                          maxLength={4}
                          value={cardCvv}
                          onChange={handleCvvChange}
                          className="glass-input px-4 py-3 rounded-xl text-sm font-mono tracking-widest"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] text-titanium-300 font-mono uppercase">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Marcus Sterling"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="glass-input px-4 py-3 rounded-xl text-sm"
                      />
                    </div>
                  </>
                )}

                {paymentMethod === 'applepay' && (
                  <div className="p-6 rounded-2xl bg-graphite-900 border border-white/10 text-center flex flex-col items-center gap-3">
                    <span className="text-3xl font-light text-white"> Pay</span>
                    <p className="text-xs text-titanium-300 font-light">
                      Click confirm below to complete biometric authentication via Apple FaceID / TouchID.
                    </p>
                  </div>
                )}

                {paymentMethod === 'studio' && (
                  <div className="p-6 rounded-2xl bg-graphite-900 border border-white/10 flex items-start gap-3 text-xs text-titanium-300">
                    <ShieldCheck className="w-5 h-5 text-champagne-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-white">Zero Deposit Required</h5>
                      <p className="font-light mt-0.5">
                        You will only be charged at our Miami studio after inspecting the finished vehicle under our 5000K presentation bay spotlights.
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-white via-titanium-100 to-champagne-300 text-graphite-950 font-medium text-xs tracking-[0.2em] uppercase hover:shadow-[0_0_35px_rgba(212,175,55,0.45)] transition-all flex items-center justify-center gap-2 mt-4 hover:scale-[1.01] active:scale-[0.99]"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      <span>Confirming Reservation...</span>
                    </span>
                  ) : (
                    <>
                      <span>Confirm Booking • ${pricing.total}</span>
                      <ArrowRight className="w-4 h-4 text-graphite-950" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Sticky Order Summary */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 flex flex-col gap-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-[11px] font-mono tracking-widest text-champagne-400 uppercase">
                  Order Summary
                </span>
                <span className="text-xs font-mono text-titanium-400">Miami Atelier</span>
              </div>

              {/* Itemized Services Breakdown */}
              <div className="flex flex-col gap-3 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-medium text-sm">{selectedService.name}</h4>
                    <p className="text-[11px] text-titanium-400 font-mono mt-0.5">
                      Base Treatment Tier
                    </p>
                  </div>
                  <span className="text-white font-mono text-sm">${pricing.basePrice}</span>
                </div>

                {pricing.vehicleMultiplier > 1 && (
                  <div className="flex justify-between text-titanium-300">
                    <div>
                      <span>Vehicle Size Adjustment</span>
                      <p className="text-[10px] text-titanium-400 font-mono capitalize">
                        {booking.vehicleCategory} (+{Math.round((pricing.vehicleMultiplier - 1) * 100)}%)
                      </p>
                    </div>
                    <span className="text-white font-mono">
                      +${pricing.serviceTotal - pricing.basePrice}
                    </span>
                  </div>
                )}

                {booking.selectedAddOns.map((addonId) => {
                  const addon = AVAILABLE_ADDONS.find((a) => a.id === addonId);
                  if (!addon) return null;
                  return (
                    <div key={addon.id} className="flex justify-between text-titanium-300">
                      <span>{addon.name}</span>
                      <span className="text-white font-mono">+${addon.price}</span>
                    </div>
                  );
                })}

                <div className="pt-3 border-t border-white/10 flex justify-between text-titanium-400">
                  <span>Subtotal:</span>
                  <span className="text-white font-mono">${pricing.subtotal}</span>
                </div>

                <div className="flex justify-between text-titanium-400">
                  <span>Florida Sales Tax (7%):</span>
                  <span className="text-white font-mono">${pricing.tax}</span>
                </div>

                <div className="pt-4 border-t border-white/15 flex justify-between items-baseline">
                  <div>
                    <span className="text-base font-medium text-white uppercase tracking-wider block">
                      Total
                    </span>
                    <span className="text-[10px] text-titanium-400 font-mono">All inclusive</span>
                  </div>
                  <span className="text-3xl font-mono font-light text-champagne-300">
                    ${pricing.total}
                  </span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="flex flex-col gap-2 pt-4 border-t border-white/10 text-[11px] text-titanium-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-champagne-400" />
                  <span>Free cancellation up to 24 hours prior</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-champagne-400" />
                  <span>Official CarFax Registry & Warranty Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-champagne-400" />
                  <span>Climate-controlled cleanroom protocol</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
