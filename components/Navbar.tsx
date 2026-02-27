"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Home, User, Briefcase, Layers, GitBranch, Mail, Cpu } from "lucide-react";
import ThemeBulb from "./ThemeBulb";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Skills", href: "#skills", icon: Layers },
  { name: "Experience", href: "#experience", icon: Cpu },
  { name: "GitHub", href: "#github", icon: GitBranch },
  { name: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [atTop, setAtTop] = useState(true);   // true = at very top of page
  const [tooltip, setTooltip] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();

  // Track scroll position & active section
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 80);

      // Active section detection
      const sections = ["home", ...navItems.slice(1).map(i => i.href.substring(1))];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 160) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  // When at top → bottom-right pill   |   When scrolled → right-center pill
  const positionClass = atTop
    ? "fixed bottom-8 right-6 z-50"
    : "fixed right-6 top-1/2 -translate-y-1/2 z-50";

  return (
    <>
      {/* ── Scroll progress bar at top ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-indigo-500 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ── Minimal logo (top-left) ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-5 left-6 z-50"
      >
        <Link
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="text-xl font-black gradient-text select-none"
        >
          HC
        </Link>
      </motion.div>

      {/* ── Theme toggle (top-right, always visible) ── */}
      <div className="fixed top-4 right-6 z-50">
        <ThemeBulb />
      </div>

      {/* ── Capsule Nav ── */}
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, layout: { type: "spring", stiffness: 260, damping: 28 } }}
        className={positionClass}
      >
        <motion.nav
          layout
          className="flex flex-col items-center gap-1 px-2 py-3 rounded-3xl
                     backdrop-blur-xl border shadow-2xl
                     bg-white/70 dark:bg-slate-900/70
                     border-white/40 dark:border-slate-700/50
                     shadow-indigo-500/10"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1) ||
              (item.href === "#home" && activeSection === "home");
            return (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  onMouseEnter={() => setTooltip(item.name)}
                  onMouseLeave={() => setTooltip(null)}
                  aria-label={item.name}
                  className={`relative flex items-center justify-center w-9 h-9 rounded-2xl transition-all duration-200
                    ${isActive
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/40"
                      : "text-slate-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}
                >
                  <item.icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 rounded-2xl bg-indigo-500 -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>

                {/* Tooltip on hover */}
                <AnimatePresence>
                  {tooltip === item.name && (
                    <motion.div
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-12 top-1/2 -translate-y-1/2
                                 px-2.5 py-1 rounded-lg text-xs font-medium
                                 bg-slate-900 dark:bg-slate-700 text-white
                                 whitespace-nowrap pointer-events-none shadow-lg"
                    >
                      {item.name}
                      <div className="absolute right-[-4px] top-1/2 -translate-y-1/2
                                      border-4 border-transparent border-l-slate-900
                                      dark:border-l-slate-700" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Divider */}
          <div className="w-5 h-px bg-slate-200 dark:bg-slate-700 my-1" />

          {/* Contact shortcut button */}
          <Link
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            aria-label="Let's Talk"
            className="flex items-center justify-center w-9 h-9 rounded-2xl
                       bg-indigo-600 hover:bg-indigo-700
                       text-white shadow-sm transition-colors duration-200"
          >
            <Mail size={14} />
          </Link>
        </motion.nav>
      </motion.div>
    </>
  );
}
