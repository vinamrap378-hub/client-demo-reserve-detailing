'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, ArrowRight } from 'lucide-react';
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
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-400 flex items-center ${
          scrolled
            ? 'bg-[rgba(5,5,5,0.72)] backdrop-blur-[20px] border-b border-white/10'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-8 flex items-center justify-between">
          {/* Logo at Left */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex flex-col">
              <span className="font-cinzel text-[16px] font-semibold tracking-[0.25em] text-white uppercase group-hover:text-champagne-300 transition-colors">
                RESERVE
              </span>
              <span className="text-[8px] font-mono tracking-[0.35em] text-titanium-400 uppercase -mt-0.5">
                Detailing • Miami
              </span>
            </div>
          </Link>

          {/* Navigation Centered */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative py-1 text-[12px] uppercase text-white/90 hover:text-white transition-colors duration-200"
                  style={{ letterSpacing: '8px' }}
                >
                  <span>{link.name}</span>
                  {/* Underline 0 -> 100% in 250ms */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-250 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Book Now at Right */}
          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/book"
              className="group relative inline-flex items-center gap-2 px-[22px] py-[14px] rounded-[999px] border border-white/30 text-white text-[12px] font-medium tracking-[0.2em] uppercase bg-transparent hover:bg-white hover:text-black transition-all duration-300"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-[5px]" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-24 px-8 pb-12 flex flex-col justify-between lg:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-titanium-400">
                // Menu
              </span>
              <div className="flex flex-col gap-5">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="font-cinzel text-2xl font-light tracking-[0.2em] uppercase text-white/90 hover:text-white"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-6 border-t border-white/10">
              <Link
                href="/book"
                className="w-full py-4 text-center text-sm font-medium tracking-[0.2em] uppercase rounded-full bg-white text-black"
              >
                Book Your Detail →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}