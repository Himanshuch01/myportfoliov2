"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Award, Zap, Code2 } from "lucide-react";
import FloatingGeometry from "@/components/3d/FloatingGeometry";
import { useEffect, useRef, useState } from "react";

// ── Animated counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !seen) setSeen(true); },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [seen]);

  useEffect(() => {
    if (!seen) return;
    let start: number, raf: number;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1800, 1);
      setCount(Math.floor(p * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, end]);

  return (
    <div ref={ref} className="text-2xl font-bold bg-clip-text text-transparent
                              bg-gradient-to-r from-indigo-500 to-purple-500">
      {count}{suffix}
    </div>
  );
}

// ── Magnetic CTA button ───────────────────────────────────────────────────────
function MagneticButton({
  children, href, primary = false, download,
}: {
  children: React.ReactNode; href: string; primary?: boolean; download?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xS = useSpring(x, { damping: 15, stiffness: 150 });
  const yS = useSpring(y, { damping: 15, stiffness: 150 });
  const isExternal = href.startsWith("http");

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: xS, y: yS }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={primary
        ? "inline-flex items-center justify-center whitespace-nowrap px-7 py-3 rounded-2xl \
           bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm \
           shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow"
        : "inline-flex items-center justify-center whitespace-nowrap px-7 py-3 rounded-2xl \
           font-semibold text-sm transition-all border-2 border-indigo-400/40 \
           text-indigo-600 dark:text-indigo-300 \
           hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-500"
      }
    >
      {children}
    </motion.a>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden
                 bg-gradient-to-br from-slate-50 via-indigo-50/40 to-white
                 dark:from-slate-950 dark:via-indigo-950/50 dark:to-slate-900"
    >
      {/* ── Ambient glow blob behind 3D ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 right-[25%] -translate-y-1/2
                        w-[600px] h-[600px] rounded-full blur-3xl
                        bg-indigo-400/12 dark:bg-indigo-600/18" />
      </div>

      {/* ── Top & bottom section fades ── */}
      <div className="absolute top-0 inset-x-0 h-28 z-[2] pointer-events-none
                      bg-gradient-to-b from-slate-50 dark:from-slate-950 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-28 z-[2] pointer-events-none
                      bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent" />

      {/* ── 3D element: absolute right half, full viewport height ── */}
      <div className="absolute inset-y-0 right-0 hidden md:block
                      w-[50%] z-[1] pointer-events-none">
        <FloatingGeometry />
      </div>

      {/* ── Left content: fills left half, vertically centred ── */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full md:w-[50%] px-8 md:px-16 lg:px-24 py-32">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8
                       bg-emerald-500/10 dark:bg-emerald-500/15
                       border border-emerald-400/30 rounded-full"
          >
            <motion.span
              animate={{ scale: [1, 1.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-emerald-400"
            />
            <span className="text-xs font-semibold tracking-wide
                             text-emerald-600 dark:text-emerald-300">
              Available for Opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black tracking-tight leading-[1.05] mb-5
                       text-5xl sm:text-6xl lg:text-7xl xl:text-8xl"
            style={{ color: "rgb(var(--text-primary))" }}
          >
            Himanshu
            <br />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                             bg-clip-text text-transparent">
              Chauhan
            </span>
          </motion.h1>

          {/* Roles — horizontal chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-5"
          >
            {["Full-Stack Engineer", "MERN Specialist", "AI Product Builder"].map((role) => (
              <span
                key={role}
                className="px-3 py-1 rounded-lg text-sm font-medium
                           bg-indigo-50 dark:bg-indigo-900/30
                           text-indigo-700 dark:text-indigo-300
                           border border-indigo-200/60 dark:border-indigo-700/40"
              >
                {role}
              </span>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="text-sm md:text-base leading-relaxed mb-8 max-w-sm"
            style={{ color: "rgb(var(--text-tertiary))" }}
          >
            Building production-grade apps that{" "}
            <span className="text-emerald-500 font-semibold">ship</span>,{" "}
            <span className="text-indigo-500 font-semibold">scale</span>, and create{" "}
            <span className="text-amber-500 font-semibold">real-world impact</span>.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.36 }}
            className="flex flex-row gap-3 mb-10"
          >
            <MagneticButton href="#projects" primary>View Projects</MagneticButton>
            <MagneticButton href="https://drive.google.com/file/d/1lSWuDZT8Xzi8lpMM9yoycfTi1Tv7TeDR/view?usp=sharing">Resume</MagneticButton>
          </motion.div>

          {/* Keyword badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.44 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {[
              { icon: Award, text: "Commercial Experience" },
              { icon: Code2, text: "MERN Stack" },
              { icon: Zap, text: "AI Integration" },
            ].map((b, i) => (
              <motion.span
                key={b.text}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.07 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass
                           hover:ring-1 hover:ring-indigo-400/30 transition-all cursor-default"
              >
                <b.icon size={13} className="text-indigo-500" />
                <span className="text-xs font-medium" style={{ color: "rgb(var(--text-secondary))" }}>
                  {b.text}
                </span>
              </motion.span>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.6 }}
            className="grid grid-cols-4 gap-2 max-w-sm"
          >
            {[
              { end: 249, suffix: "+", label: "GitHub\nContributions" },
              { end: 5, suffix: "+", label: "Production\nApps" },
              { end: 3, suffix: "+", label: "Business\nClients" },
              { end: 2, suffix: "+", label: "Years\nExperience" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.07 }}
                className="flex flex-col items-center text-center py-3 px-1
                           rounded-2xl glass hover:ring-1 hover:ring-indigo-400/30 transition-all"
              >
                <AnimatedCounter end={s.end} suffix={s.suffix} />
                <div className="text-[10px] mt-1 leading-tight whitespace-pre-line"
                  style={{ color: "rgb(var(--text-tertiary))" }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-[25%] -translate-x-1/2 z-10
                   flex flex-col items-center gap-1 transition-colors"
        style={{ color: "rgb(var(--text-tertiary))" }}
      >
        <span className="text-[10px] font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={15} />
        </motion.div>
      </motion.a>
    </section>
  );
}
