"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Database, Palette, Zap } from "lucide-react";

const techIcons = [
  { Icon: Code2, delay: 0, position: { x: -50, y: -30 } },
  { Icon: Database, delay: 0.2, position: { x: 50, y: -20 } },
  { Icon: Palette, delay: 0.4, position: { x: -40, y: 40 } },
  { Icon: Zap, delay: 0.6, position: { x: 60, y: 30 } },
];

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] bg-dark-900 flex items-center justify-center"
        >
          <div className="relative">
            {/* Floating tech icons */}
            {techIcons.map(({ Icon, delay, position }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0],
                  x: [0, position.x],
                  y: [0, position.y],
                }}
                transition={{
                  duration: 2,
                  delay,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <Icon size={32} className="text-primary-400" />
              </motion.div>
            ))}

            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10"
            >
              <div className="text-8xl font-bold gradient-text">HC</div>
            </motion.div>

            {/* Name reveal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center mt-4"
            >
              <h2 className="text-xl font-semibold text-gray-300">
                Himanshu Chauhan
              </h2>
              <p className="text-sm text-gray-500 mt-1">Full-Stack Developer</p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 w-64"
            >
              <div className="h-1 bg-dark-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <motion.p
                className="text-center text-xs text-gray-500 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {progress}%
              </motion.p>
            </motion.div>

            {/* Glow effect */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
