'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Car,
  MapPin,
  ArrowUpRight,
  Download,
  Share2,
  Phone,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBooking } from '@/context/BookingContext';
import { motion } from 'framer-motion';

export default function ConfirmationPage() {
  const { booking, selectedService, calculatePricing } = useBooking();
  const pricing = calculatePricing();
  const [bookingRef, setBookingRef] = useState('RSV-2024-8849');

  useEffect(() => {
    // Generate random reference code
    const randomRef = `RSV-2024-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(randomRef);

    // Trigger subtle luxury gold celebration confetti
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#C5A880', '#FFFFFF', '#94A3B8']
      });
    } catch (e) {}
  }, []);

  // Generate .ics calendar file download
  const handleDownloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//RESERVE Detailing//Studio Reservation//EN
BEGIN:VEVENT
UID:${bookingRef}@reservedetailing.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:RESERVE Detailing Session: ${selectedService.name}
DESCRIPTION:RESERVE Detailing Studio Reservation for ${booking.vehicleYear} ${booking.vehicleMake} ${booking.vehicleModel}. Reference: ${bookingRef}
LOCATION:222 SW 7th St, Miami, FL 33130, USA
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${bookingRef}-reserve-detailing.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-graphite-950 min-h-screen pt-32 pb-24 text-white relative overflow-hidden flex items-center justify-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-champagne-500/[0.04] blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 sm:p-14 rounded-3xl border border-white/15 flex flex-col items-center text-center gap-8 shadow-2xl"
        >
          {/* Animated Gold Checkmark */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-champagne-400 to-champagne-600 flex items-center justify-center text-graphite-950 shadow-[0_0_40px_rgba(212,175,55,0.4)]">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute inset-0 rounded-full border border-champagne-400 pointer-events-none"
            />
          </div>

          {/* Confirmation Headlines */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-champagne-400">
              // Reservation Confirmed • Reference {bookingRef}
            </span>
            <h1 className="text-4xl sm:text-6xl font-extralight tracking-tight text-white uppercase">
              You&apos;re <span className="font-semibold text-metallic-gold">Booked.</span>
            </h1>
            <p className="text-titanium-300 text-sm sm:text-base font-light max-w-xl mx-auto mt-1">
              Your appointment has been confirmed in our Miami studio schedule. A calendar invitation and diagnostic itinerary have been dispatched to your email.
            </p>
          </div>

          {/* Booking Summary Box */}
          <div className="w-full rounded-2xl bg-graphite-900/90 border border-white/10 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left text-xs">
            <div>
              <span className="text-[10px] font-mono text-titanium-400 uppercase block">Service</span>
              <span className="text-white font-medium">{selectedService.name}</span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-titanium-400 uppercase block">Vehicle</span>
              <span className="text-white font-medium">
                {booking.vehicleYear} {booking.vehicleMake} {booking.vehicleModel}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-titanium-400 uppercase block">Date & Time</span>
              <span className="text-white font-medium">
                {booking.date || 'Pending Schedule'} • {booking.timeSlot}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-titanium-400 uppercase block">Studio Address</span>
              <span className="text-white font-medium">222 SW 7th St, Miami</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={handleDownloadCalendar}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-graphite-950 font-medium text-xs tracking-widest uppercase hover:bg-champagne-300 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Add to Calendar (.ics)</span>
            </button>

            <a
              href="https://maps.google.com/?q=222+SW+7th+St,+Miami,+FL+33130"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-graphite-900 border border-white/15 text-white font-medium text-xs tracking-widest uppercase hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4 text-champagne-400" />
              <span>Get Directions</span>
            </a>

            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-graphite-900 border border-white/15 text-white font-medium text-xs tracking-widest uppercase hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <span>Back To Home</span>
            </Link>
          </div>

          {/* Studio Hotline Note */}
          <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-xs text-titanium-400 font-mono">
            <Phone className="w-3.5 h-3.5 text-champagne-400" />
            <span>Need modifications? Speak with concierge at +1 (786) 642-9018</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
