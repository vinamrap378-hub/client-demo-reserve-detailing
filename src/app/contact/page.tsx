'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Star, Send, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    serviceInterest: 'Reserve Signature Detail',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-graphite-950 min-h-screen pt-32 pb-24 text-white">
      {/* Hero Header */}
      <section className="relative px-6 md:px-12 mb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-champagne-500/10 border border-champagne-500/30 text-champagne-300 text-[11px] font-mono tracking-wider w-fit">
            <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
            <span>MIAMI STUDIO & CONCIERGE</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extralight tracking-tight text-white uppercase leading-[0.95]">
            Let&apos;s Get <br />
            <span className="font-semibold text-metallic-gold">Your Car Ready.</span>
          </h1>

          <p className="text-titanium-300 text-lg sm:text-xl font-light mt-2 leading-relaxed">
            Visit our studio at 222 SW 7th St in Miami, schedule an in-person consultation, or arrange door-to-door enclosed transport.
          </p>
        </div>
      </section>

      {/* Main Studio Grid */}
      <section className="px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Studio Coordinates & Live Details */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col gap-6">
              <span className="text-[10px] font-mono tracking-widest text-champagne-400 uppercase">
                // Studio Coordinates
              </span>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-champagne-500/10 border border-champagne-500/20 flex items-center justify-center text-champagne-400 shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Studio Address</h4>
                    <p className="text-sm text-titanium-300 font-light mt-0.5">
                      222 SW 7th St<br />
                      Miami, FL 33130, USA
                    </p>
                    <a
                      href="https://maps.google.com/?q=222+SW+7th+St,+Miami,+FL+33130"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-champagne-400 font-mono underline hover:text-white mt-1 inline-block"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-champagne-500/10 border border-champagne-500/20 flex items-center justify-center text-champagne-400 shrink-0 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Direct Phone</h4>
                    <a
                      href="tel:+17866429018"
                      className="text-sm text-titanium-300 font-light mt-0.5 block hover:text-white"
                    >
                      +1 (786) 642-9018
                    </a>
                    <span className="text-[11px] text-titanium-400 font-mono">
                      Calls answered 7 days / week
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-champagne-500/10 border border-champagne-500/20 flex items-center justify-center text-champagne-400 shrink-0 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Operating Hours</h4>
                    <p className="text-sm text-titanium-300 font-light mt-0.5">
                      Monday – Saturday: 8:00 AM – 7:00 PM<br />
                      Sunday: VIP By Appointment
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-champagne-500/10 border border-champagne-500/20 flex items-center justify-center text-champagne-400 shrink-0 mt-1">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Google Rating</h4>
                    <p className="text-sm text-champagne-300 font-medium mt-0.5">
                      4.9 ★★★★★ (2,949 Verified Reviews)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Map Frame */}
            <div className="relative h-64 rounded-3xl overflow-hidden border border-white/10 bg-graphite-900">
              <iframe
                title="RESERVE Detailing Miami Location"
                src="https://maps.google.com/maps?q=222%20SW%207th%20St,%20Miami,%20FL%2033130&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: VIP Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 relative">
              <span className="text-[10px] font-mono tracking-widest text-champagne-400 uppercase">
                // Direct Concierge Inquiry
              </span>
              <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight uppercase mt-1">
                Consult With A Master Technician
              </h3>
              <p className="text-xs text-titanium-400 font-light mt-1 mb-8">
                Fill out the details below and our lead technician will review your vehicle specifications and reach out within 2 hours.
              </p>

              {submitted ? (
                <div className="py-16 text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-champagne-500/20 border border-champagne-400 flex items-center justify-center text-champagne-300">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-light text-white">Inquiry Received</h4>
                  <p className="text-sm text-titanium-300 font-light max-w-md">
                    Thank you, {formData.name}. Our master detailer has received your vehicle details for the {formData.vehicle} and will contact you at {formData.phone} shortly.
                  </p>
                  <Link
                    href="/book"
                    className="mt-4 px-8 py-3 rounded-full bg-white text-graphite-950 text-xs font-medium tracking-widest uppercase hover:bg-champagne-300 transition-colors"
                  >
                    Proceed To Instant Online Booking
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-mono tracking-wider text-titanium-300 uppercase">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Marcus Sterling"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="glass-input px-4 py-3 rounded-xl text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-mono tracking-wider text-titanium-300 uppercase">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (786) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="glass-input px-4 py-3 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-mono tracking-wider text-titanium-300 uppercase">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="glass-input px-4 py-3 rounded-xl text-sm"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-mono tracking-wider text-titanium-300 uppercase">
                        Vehicle (Year, Make, Model) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 2024 Porsche 911 GT3 RS"
                        value={formData.vehicle}
                        onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                        className="glass-input px-4 py-3 rounded-xl text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-mono tracking-wider text-titanium-300 uppercase">
                      Preferred Service Protocol
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="glass-input px-4 py-3 rounded-xl text-sm bg-graphite-900 text-white"
                    >
                      <option value="Reserve Signature Detail">Auto Detailing — Reserve Signature</option>
                      <option value="Precision Polishing">Precision Polishing & Jeweling</option>
                      <option value="Ceramic Pro 9H Coating">Ceramic Pro 9H Coating</option>
                      <option value="XPEL PPF">XPEL Ultimate Plus PPF</option>
                      <option value="Swissvax Carnauba Wax">Swissvax Concours Carnauba Wax</option>
                      <option value="Interior Sanctuary">Detailing Car — Interior Sanctuary</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-mono tracking-wider text-titanium-300 uppercase">
                      Special Requests or Paint Concerns
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your paint condition, swirl marks, PPF wrap needs, or enclosed transport requests..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="glass-input px-4 py-3 rounded-xl text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-white via-titanium-100 to-champagne-300 text-graphite-950 font-medium text-xs tracking-widest uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Submit VIP Concierge Inquiry</span>
                    <Send className="w-4 h-4 text-graphite-950" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
