'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const TECHNICAL_NODES = [
  { id: '1', title: 'SiO2 CROSS-LINKING', val: '9H Matrix Hardness', pos: 'top-10 left-6 sm:left-12' },
  { id: '2', title: 'WATER CONTACT ANGLE', val: '122° Hyper-Hydrophobic', pos: 'top-16 right-6 sm:right-12' },
  { id: '3', title: 'UV OXIDATION BARRIER', val: 'pH 2 - pH 12 Resistance', pos: 'bottom-16 left-6 sm:left-12' },
  { id: '4', title: 'OPTICAL CLEAR DEPTH', val: '42.4 µm Gauge Standard', pos: 'bottom-10 right-6 sm:right-12' }
];

export default function MolecularSection() {
  const headingWords = ['PROTECTION', 'AT', 'A', 'MOLECULAR', 'LEVEL.'];

  return (
    <section className="relative w-full min-h-screen bg-[#050505] py-32 px-6 sm:px-12 flex flex-col items-center justify-center overflow-hidden border-t border-white/10">
      {/* Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-16 relative z-10">
        {/* Main Heading Word-by-Word Reveal */}
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-[11px] font-mono tracking-[0.4em] uppercase text-titanium-400">
            // Nano-Ceramic Architecture
          </span>

          <h2 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase leading-[1.05] flex flex-wrap justify-center gap-x-4 gap-y-2">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={word === 'MOLECULAR' || word === 'LEVEL.' ? 'text-white' : 'font-light text-titanium-200'}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* Centered Visual (~70% Viewport Height) with Floating Motion & Technical Labels */}
        <div className="relative w-full max-w-5xl h-[480px] sm:h-[600px] flex items-center justify-center">
          {/* Subtle Floating Automotive Model Image */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="relative w-[85%] sm:w-[75%] h-[80%] rounded-3xl overflow-hidden border border-white/15 bg-black/60 backdrop-blur-md shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1800&q=85"
              alt="Molecular Ceramic Matrix Protection"
              fill
              className="object-cover filter contrast-[1.1] brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
          </motion.div>

          {/* Technical Floating Data Nodes with Connecting Hairlines */}
          {TECHNICAL_NODES.map((node) => (
            <div
              key={node.id}
              className={`absolute ${node.pos} p-4 rounded-xl bg-black/80 backdrop-blur-xl border border-white/15 flex flex-col gap-1 z-20 shadow-2xl`}
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] font-mono tracking-widest text-titanium-400 uppercase">
                  {node.title}
                </span>
              </div>
              <span className="text-xs sm:text-sm font-mono text-white font-medium">
                {node.val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}