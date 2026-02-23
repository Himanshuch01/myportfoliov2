'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeBulb() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Get initial theme
    const savedTheme = localStorage.getItem('theme');
    const htmlElement = document.documentElement;

    if (savedTheme === 'light') {
      setIsDark(false);
      htmlElement.classList.remove('dark');
    } else {
      setIsDark(true);
      htmlElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    console.log('Toggle clicked! Current isDark:', isDark);

    const htmlElement = document.documentElement;
    const newIsDark = !isDark;

    setIsDark(newIsDark);

    if (newIsDark) {
      console.log('Switching to DARK mode');
      htmlElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      console.log('Switching to LIGHT mode');
      htmlElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    console.log('HTML classes after toggle:', htmlElement.className);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-[100] p-3.5 rounded-2xl backdrop-blur-md border shadow-lg hover:shadow-xl transition-all cursor-pointer"
      style={{
        background: 'rgba(var(--bg-secondary), 0.8)',
        borderColor: 'rgba(var(--border-color), 0.3)',
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
      type="button"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 1.1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-500" strokeWidth={2.5} />
        ) : (
          <Moon className="w-5 h-5 text-indigo-600" strokeWidth={2.5} />
        )}
      </motion.div>
    </motion.button>
  );
}
