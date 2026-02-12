"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Award, Zap, Code2 } from "lucide-react";
import TechStackNetwork from "@/components/3d/TechStackNetwork";
import { useEffect, useRef, useState } from "react";

// Animated counter component
function AnimatedCounter({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-2xl md:text-3xl font-bold text-white">
      {count}{suffix}
    </div>
  );
}

// Magnetic button component
function MagneticButton({
  children,
  href,
  primary = false
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={primary ? "btn-primary" : "btn-outline"}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Tech Stack Network Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <TechStackNetwork />
      </div>

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-dark-900/40 backdrop-blur-[1px] z-[1]" />

      {/* Content */}
      <div className="container-custom relative z-10 px-6 py-32">
        <div className="max-w-4xl mx-auto">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-500/10 rounded-full border border-secondary-500/20">
              <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-300">Available for Commercial Projects</span>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="text-center space-y-6">
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4"
            >
              Himanshu Chauhan
            </motion.h1>

            {/* Subheading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-300 mb-6"
            >
              Full-Stack Engineer | MERN Specialist | AI Product Builder
            </motion.h2>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Building production-grade applications that{" "}
              <span className="text-secondary-400 font-medium">ship</span>,{" "}
              <span className="text-primary-400 font-medium">scale</span>, and create{" "}
              <span className="text-accent-400 font-medium">real-world impact</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 pb-12"
            >
              <MagneticButton href="#projects" primary>
                View Commercial Projects
              </MagneticButton>
              <MagneticButton href="/resume.pdf">
                Download Resume
              </MagneticButton>
            </motion.div>

            {/* Simple Technical Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3 justify-center items-center py-6"
            >
              {[
                { icon: Award, text: "Commercial Experience" },
                { icon: Code2, text: "MERN Stack Expert" },
                { icon: Zap, text: "AI Integration" },
              ].map((badge, index) => (
                <motion.div
                  key={badge.text}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <badge.icon size={16} className="text-primary-400" />
                  <span className="text-sm text-gray-300">{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Hero Stats - Simplified */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto mt-16"
          >
            {[
              { end: 249, suffix: "+", label: "GitHub Contributions" },
              { end: 5, suffix: "+", label: "Production Apps" },
              { end: 3, suffix: "+", label: "Business Clients" },
              { end: 2, suffix: "+", label: "Years Experience" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                <div className="text-xs md:text-sm text-gray-400 mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
        >
          <span className="text-xs font-medium">Scroll Down</span>
          <ArrowDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}
