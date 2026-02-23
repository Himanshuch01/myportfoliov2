"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, ArrowUpRight, Heart, Code2, Terminal } from "lucide-react";
import { useState, useEffect } from "react";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/Himanshuch01", icon: Github, color: "#6366f1" },
  { name: "LinkedIn", href: "https://linkedin.com/in/chimanshu", icon: Linkedin, color: "#0A66C2" },
  { name: "Twitter", href: "https://twitter.com/himanshuch01", icon: Twitter, color: "#1DA1F2" },
  { name: "Email", href: "mailto:himanshuch.dev@gmail.com", icon: Mail, color: "#10b981" },
];

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "GitHub", href: "#github" },
  { name: "Contact", href: "#contact" },
];

const stack = ["Next.js", "TypeScript", "Node.js", "MongoDB", "Framer Motion", "Three.js"];

// Typewriter hook for terminal line
function useTypewriter(lines: string[], speed = 55) {
  const [displayed, setDisplayed] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (lineIdx >= lines.length) return;
    const line = lines[lineIdx];
    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setDisplayed((d) => d + line[charIdx]);
        setCharIdx((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed((d) => d + "\n");
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, 800);
      return () => clearTimeout(t);
    }
  }, [charIdx, lineIdx, lines, speed]);

  return displayed;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const terminalText = useTypewriter([
    "$ whoami",
    "→ Himanshu Chauhan",
    "$ status",
    "→ Open to work ✓",
  ]);

  return (
    <footer className="relative overflow-hidden" style={{ background: "rgb(var(--bg-secondary))" }}>

      {/* ── Top separator glow ── */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      {/* ── Ambient blob ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/6 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom pt-16 pb-8 relative z-10">

        {/* ── BIG NAME CTA BAND ── */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-12 border-b"
          style={{ borderColor: "rgba(var(--border-color), 0.3)" }}>

          {/* Left — name + tagline */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-2"
            >
              Full-Stack Engineer
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-black tracking-tight"
              style={{ color: "rgb(var(--text-primary))" }}
            >
              Himanshu
              <br />
              <span className="gradient-text">Chauhan.</span>
            </motion.h2>
          </div>

          {/* Right — terminal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-4 font-mono text-xs min-w-[220px]"
            style={{ background: "rgba(var(--bg-primary), 0.6)" }}
          >
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <Terminal size={11} className="ml-auto text-slate-400" />
            </div>
            <pre className="text-emerald-400 whitespace-pre-wrap leading-5">
              {terminalText}
              <span className="animate-pulse text-indigo-400">▌</span>
            </pre>
          </motion.div>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-12 border-b"
          style={{ borderColor: "rgba(var(--border-color), 0.3)" }}>

          {/* Col 1 — About blurb */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Code2 size={16} className="text-indigo-500" />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgb(var(--text-tertiary))" }}>
                About
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "rgb(var(--text-tertiary))" }}>
              Building fast, scalable, and delightful web products — from idea to deployment.
            </p>
            {/* Social icons */}
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-xl glass flex items-center justify-center transition-all"
                  style={{ color: "rgb(var(--text-secondary))" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = s.color)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgb(var(--text-secondary))")}
                >
                  <s.icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgb(var(--text-tertiary))" }}>
              Navigate
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-1 text-sm transition-colors"
                    style={{ color: "rgb(var(--text-secondary))" }}
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-indigo-500 transition-all duration-200" />
                    <span className="group-hover:text-indigo-500 transition-colors">{l.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgb(var(--text-tertiary))" }}>
              Contact
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:himanshuch.dev@gmail.com"
                  className="text-sm hover:text-indigo-500 transition-colors"
                  style={{ color: "rgb(var(--text-secondary))" }}
                >
                  himanshuch.dev@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918601748352"
                  className="text-sm hover:text-indigo-500 transition-colors"
                  style={{ color: "rgb(var(--text-secondary))" }}
                >
                  +91 8601748352
                </a>
              </li>
              <li className="pt-1">
                <motion.a
                  href="#contact"
                  whileHover={{ x: 3 }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-500 hover:text-indigo-400 transition-colors"
                >
                  Get in touch <ArrowUpRight size={13} />
                </motion.a>
              </li>
            </ul>
          </div>

          {/* Col 4 — Stack badges */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgb(var(--text-tertiary))" }}>
              Built With
            </p>
            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium glass"
                  style={{ color: "rgb(var(--text-secondary))" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8">
          <p className="text-xs" style={{ color: "rgb(var(--text-tertiary))" }}>
            © {year} Himanshu Chauhan — All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <p className="text-xs flex items-center gap-1.5" style={{ color: "rgb(var(--text-tertiary))" }}>
              Crafted with <Heart size={11} className="text-red-400 fill-red-400" /> &amp; lots of coffee
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
