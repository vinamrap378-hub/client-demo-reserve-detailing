'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run intro animation once per session
    const hasLoaded = sessionStorage.getItem('reserve_intro_seen');
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('reserve_intro_seen', 'true');
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-cinzel text-3xl sm:text-4xl tracking-[0.35em] text-white font-light uppercase"
            >
              RESERVE
            </motion.span>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-[10px] font-mono tracking-[0.4em] text-titanium-400 uppercase"
            >
              THE ART OF THE FINISH.
            </motion.span>

            {/* Thin horizontal line growing 0 -> 100% */}
            <div className="w-48 h-[1px] bg-white/15 overflow-hidden mt-3 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                className="h-full bg-white"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}