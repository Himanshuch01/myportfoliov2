'use client';

import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ThemeBulb() {
  const [isDark, setIsDark] = useState(true);
  const [isPulling, setIsPulling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const cordControls = useAnimation();
  const swingControls = useAnimation();

  useEffect(() => {
    // Check saved theme preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        setIsDark(false);
        document.documentElement.classList.remove('dark');
      } else {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  // Idle swinging animation
  useEffect(() => {
    const swing = async () => {
      await swingControls.start({
        rotate: [0, 2, 0, -2, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      });
    };
    if (!isPulling) {
      swing();
    }
  }, [isPulling, swingControls]);

  const toggleTheme = async () => {
    setIsPulling(true);

    // Stop swing animation
    swingControls.stop();

    // Pull down animation with cord stretch
    await Promise.all([
      cordControls.start({
        scaleY: 1.4,
        transition: { duration: 0.15, ease: 'easeOut' }
      }),
      controls.start({
        y: 35,
        transition: { duration: 0.15, ease: 'easeOut' }
      })
    ]);

    // Slight pause at bottom
    await new Promise(resolve => setTimeout(resolve, 50));

    // Toggle theme
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (typeof window !== 'undefined') {
      if (newTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }

    // Release animation with bounce
    await Promise.all([
      cordControls.start({
        scaleY: [1.4, 0.95, 1],
        transition: { duration: 0.4, ease: 'easeInOut' }
      }),
      controls.start({
        y: [35, -5, 0],
        transition: { duration: 0.4, ease: 'easeInOut' }
      })
    ]);

    setIsPulling(false);
  };

  return (
    <motion.div
      className="fixed top-0 right-16 md:right-24 z-50 cursor-pointer select-none"
      onClick={toggleTheme}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      animate={swingControls}
      style={{ transformOrigin: 'top center' }}
    >
      {/* Ceiling Mount */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800 rounded-b-xl shadow-lg">
        <div className="absolute inset-x-2 top-0 h-0.5 bg-gray-500/50 rounded-full" />
      </div>

      {/* Cord */}
      <motion.div
        animate={cordControls}
        className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1 h-20 origin-top"
        style={{ transformOrigin: 'top center' }}
      >
        <div className="w-full h-full bg-gradient-to-b from-gray-500 via-gray-600 to-gray-700 rounded-full shadow-sm" />
      </motion.div>

      {/* Bulb Container */}
      <motion.div
        animate={controls}
        className="relative top-[88px] left-1/2 -translate-x-1/2"
      >
        {/* Cord Connection to Bulb */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-700 rounded-full border-2 border-gray-600 shadow-md" />

        {/* Bulb Socket (Metal Screw Base) */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-6 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 rounded-t-md">
          <div className="w-full h-0.5 bg-gray-600/50 mt-1" />
          <div className="w-full h-0.5 bg-gray-600/50 mt-0.5" />
          <div className="w-full h-0.5 bg-gray-600/50 mt-0.5" />
        </div>

        {/* Bulb Glass */}
        <motion.div
          className={`relative w-14 h-20 rounded-full transition-all duration-500 ${isDark
              ? 'bg-gradient-to-br from-gray-700/30 via-gray-800/50 to-gray-900/60 border-2 border-gray-600/40'
              : 'bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 border-2 border-yellow-400/50'
            }`}
          animate={{
            boxShadow: isDark
              ? '0 4px 15px rgba(0, 0, 0, 0.3)'
              : [
                '0 0 40px rgba(251, 191, 36, 0.6), 0 0 60px rgba(251, 191, 36, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.3)',
                '0 0 50px rgba(251, 191, 36, 0.8), 0 0 80px rgba(251, 191, 36, 0.4), inset 0 0 25px rgba(255, 255, 255, 0.4)',
                '0 0 40px rgba(251, 191, 36, 0.6), 0 0 60px rgba(251, 191, 36, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.3)',
              ],
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: isDark ? 0 : Infinity,
              ease: 'easeInOut',
            },
            scale: {
              duration: 0.2,
            },
          }}
        >
          {/* Filament */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-10">
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="off"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full bg-gray-600/50 rounded-full shadow-inner"
                >
                  {/* Filament Wire Detail */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-6 border-l border-r border-gray-500/30 rounded-full" />
                </motion.div>
              ) : (
                <motion.div
                  key="on"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: [
                      'brightness(1.2) drop-shadow(0 0 4px rgba(251, 191, 36, 0.8))',
                      'brightness(1.6) drop-shadow(0 0 6px rgba(251, 191, 36, 1))',
                      'brightness(1.2) drop-shadow(0 0 4px rgba(251, 191, 36, 0.8))',
                    ],
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    filter: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                  className="w-full h-full bg-gradient-to-b from-yellow-400 via-yellow-500 to-orange-400 rounded-full"
                >
                  {/* Bright Filament Wire */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-6 border-l-2 border-r-2 border-yellow-200/80 rounded-full" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Inner Glow Effects */}
          {!isDark && (
            <>
              <motion.div
                className="absolute inset-2 rounded-full bg-yellow-200/40 blur-lg"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute inset-4 rounded-full bg-white/30 blur-md"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </>
          )}

          {/* Glass Reflection */}
          <div className={`absolute top-2 left-2 w-4 h-8 rounded-full blur-sm ${isDark ? 'bg-white/5' : 'bg-white/40'
            }`} />
        </motion.div>

        {/* Outer Glow and Light Rays when ON */}
        <AnimatePresence>
          {!isDark && (
            <>
              {/* Main Glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.15, 1],
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 -m-6 rounded-full bg-yellow-400/25 blur-2xl pointer-events-none"
              />

              {/* Extended Glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0.15, 0.25, 0.15],
                  scale: [1, 1.2, 1],
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
                className="absolute inset-0 -m-10 rounded-full bg-yellow-300/15 blur-3xl pointer-events-none"
              />

              {/* Light Rays */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none"
              >
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <div
                    key={angle}
                    className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-gradient-to-r from-yellow-300/40 to-transparent"
                    style={{
                      transform: `rotate(${angle}deg) translateX(-50%)`,
                      transformOrigin: 'left center',
                    }}
                  />
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Pull Chain */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5">
          <div className="w-1 h-4 bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 rounded-full shadow-sm" />
          <motion.div
            className="mt-0.5 w-2.5 h-2.5 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full border border-gray-600 shadow-md"
            animate={{
              y: isHovered ? [0, 2, 0] : 0,
            }}
            transition={{
              duration: 0.6,
              repeat: isHovered ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && !isPulling && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-32 px-4 py-2 bg-gray-900/95 backdrop-blur-sm text-white text-sm font-medium rounded-lg whitespace-nowrap shadow-xl border border-gray-700/50"
          >
            <div className="flex items-center gap-2">
              {isDark ? '💡' : '🌙'}
              <span>{isDark ? 'Turn on the lights' : 'Turn off the lights'}</span>
            </div>
            {/* Tooltip Arrow */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 border-l border-t border-gray-700/50" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Indicator */}
      <AnimatePresence>
        {isPulling && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-32 px-3 py-1.5 bg-indigo-500/20 backdrop-blur-sm border border-indigo-400/30 text-indigo-300 text-xs font-medium rounded-full whitespace-nowrap"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Switching theme...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
