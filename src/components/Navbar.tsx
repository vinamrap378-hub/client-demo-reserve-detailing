'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, Shield, Phone, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Process', href: '/process' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-graphite-950/80 backdrop-blur-2xl border-b border-white/[0.07] py-3.5 shadow-2xl shadow-black/80'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-white via-titanium-300 to-champagne-500/80 p-[1px] shadow-lg transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-graphite-950 flex items-center justify-center rounded-[1px]">
                <span className="text-[13px] font-bold tracking-widest text-champagne-400">R</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[17px] font-medium tracking-[0.2em] text-white uppercase group-hover:text-champagne-300 transition-colors">
                RESERVE
              </span>
              <span className="text-[9px] tracking-[0.3em] text-titanium-400 font-light uppercase -mt-1">
                Detailing • Miami
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[13px] tracking-[0.15em] uppercase transition-all duration-300 relative py-1 ${
                    isActive
                      ? 'text-white font-medium'
                      : 'text-titanium-400 hover:text-white font-normal'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-champagne-400 to-transparent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+17866429018"
              className="flex items-center gap-2 text-[12px] tracking-wider text-titanium-400 hover:text-white transition-colors px-3 py-2"
              title="Direct Hotline"
            >
              <Phone className="w-3.5 h-3.5 text-champagne-400" />
              <span>+1 (786) 642-9018</span>
            </a>

            <Link
              href="/book"
              className="relative inline-flex items-center justify-center px-6 py-2.5 text-[12px] font-medium tracking-[0.18em] uppercase text-graphite-950 bg-gradient-to-r from-white via-titanium-100 to-champagne-300 rounded-full hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Book Now</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1 text-graphite-950" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-titanium-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Animated Fullscreen Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-graphite-950/95 backdrop-blur-3xl pt-24 px-8 pb-12 flex flex-col justify-between md:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-champagne-400 font-mono">
                // Navigation
              </span>
              <div className="flex flex-col gap-5">
                {NAV_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={`text-2xl font-light tracking-wider uppercase block ${
                        pathname === link.href ? 'text-champagne-400 font-normal' : 'text-white/80'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between text-titanium-400 text-xs tracking-wider">
                <span>MIAMI STUDIO</span>
                <span className="text-champagne-400">4.9 ★★★★★</span>
              </div>
              <a
                href="tel:+17866429018"
                className="text-sm tracking-wider text-titanium-300 flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-champagne-400" />
                +1 (786) 642-9018
              </a>
              <Link
                href="/book"
                className="w-full py-4 text-center text-sm font-medium tracking-[0.2em] uppercase text-graphite-950 bg-gradient-to-r from-white to-champagne-300 rounded-xl mt-2"
              >
                Book Your Detail
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
