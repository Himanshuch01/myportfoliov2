"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Rocket, Briefcase, Zap, Target,
  Award, Star, TrendingUp, Download,
  MapPin, Coffee, GitBranch, Layers,
} from "lucide-react";

const differentiators = [
  {
    icon: Rocket,
    title: "Commercial Experience",
    description: "Real production apps for paying clients",
    detail: "Complete lifecycle management",
    gradient: "from-indigo-500 to-purple-500",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    border: "border-indigo-200/60 dark:border-indigo-700/30",
  },
  {
    icon: Briefcase,
    title: "Business Impact",
    description: "Helped local businesses expand digitally",
    detail: "SEO & performance optimization",
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200/60 dark:border-emerald-700/30",
  },
  {
    icon: Zap,
    title: "AI Integration",
    description: "Building AI-powered platforms",
    detail: "OpenAI API expertise",
    gradient: "from-amber-400 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-200/60 dark:border-amber-700/30",
  },
  {
    icon: Target,
    title: "Full Ownership",
    description: "Planning → Dev → Deployment",
    detail: "End-to-end project lifecycle",
    gradient: "from-pink-500 to-rose-500",
    bg: "bg-pink-50 dark:bg-pink-900/20",
    border: "border-pink-200/60 dark:border-pink-700/30",
  },
];

const achievements = [
  {
    icon: Award,
    title: "DevOps Introduction",
    subtitle: "Certified",
    date: "Nov 2025",
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
  },
  {
    icon: Star,
    title: "3-Star HackerRank",
    subtitle: "Problem Solver",
    date: "Active",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  {
    icon: TrendingUp,
    title: "Stack Overflow",
    subtitle: "Bronze Contributor",
    date: "Active",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
];

const quickFacts = [
  { icon: MapPin, text: "Based in India" },
  { icon: Coffee, text: "Fuelled by coffee & curiosity" },
  { icon: GitBranch, text: "249+ GitHub contributions" },
  { icon: Layers, text: "MERN · Next.js · AI stack" },
];

const techPills = ["React", "Node.js", "MongoDB", "TypeScript", "Next.js", "Express",
  "PostgreSQL", "Docker", "AWS", "OpenAI", "Tailwind", "Redis"];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl -z-10
                      bg-indigo-400/8 dark:bg-indigo-600/10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl -z-10
                      bg-purple-400/8 dark:bg-purple-600/10" />

      <div className="container-custom">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4
                           bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400
                           border border-indigo-200/60 dark:border-indigo-700/40">
            Get to know me
          </span>
          <h2 className="heading-2 mb-3">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-base" style={{ color: "rgb(var(--text-tertiary))" }}>
            Full-Stack Engineer turning ideas into scalable, real-world products.
          </p>
        </motion.div>

        {/* ── Main 2-col: Profile card + Bio ── */}
        <div className="grid lg:grid-cols-5 gap-10 items-start mb-20">

          {/* LEFT — Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <div className="relative group">
              {/* Rotating conic border */}
              <div className="absolute -inset-[2px] rounded-3xl overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #6366f1, #10b981, #f59e0b, #ec4899, #6366f1)",
                  }}
                />
              </div>

              {/* Card body */}
              <div
                className="relative rounded-3xl p-6 m-[2px] glass
                           flex flex-col items-center text-center gap-5"
              >
                {/* Avatar */}
                <div className="w-28 h-28 rounded-2xl flex items-center justify-center text-7xl
                                bg-gradient-to-br from-indigo-100 to-purple-100
                                dark:from-indigo-900/40 dark:to-purple-900/40
                                shadow-inner">
                  👨‍💻
                </div>

                {/* Name & title */}
                <div>
                  <h3 className="text-xl font-bold" style={{ color: "rgb(var(--text-primary))" }}>
                    Himanshu Chauhan
                  </h3>
                  <p className="text-sm mt-1" style={{ color: "rgb(var(--text-tertiary))" }}>
                    Full-Stack Engineer
                  </p>
                </div>

                {/* Status chip */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                                bg-emerald-500/10 border border-emerald-400/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                    Open to Opportunities
                  </span>
                </div>

                {/* Quick facts */}
                <div className="w-full space-y-2">
                  {quickFacts.map((f) => (
                    <div key={f.text}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl
                                    bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10">
                      <f.icon size={14} className="text-indigo-500 flex-shrink-0" />
                      <span className="text-xs" style={{ color: "rgb(var(--text-secondary))" }}>
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech orbit pills */}
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {techPills.map((t) => (
                    <span key={t}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-medium
                                     bg-indigo-50 dark:bg-indigo-900/30
                                     text-indigo-600 dark:text-indigo-300
                                     border border-indigo-200/50 dark:border-indigo-700/30">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Bio + differentiators */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Bio text */}
            <div className="space-y-4 text-sm md:text-base leading-relaxed"
              style={{ color: "rgb(var(--text-secondary))" }}>
              <p>
                I'm a full-stack engineer with hands-on commercial experience building{" "}
                <span className="text-indigo-500 dark:text-indigo-400 font-semibold">
                  production-grade applications
                </span>{" "}
                for businesses, startups, and enterprises. I specialize in scalable MERN stack
                systems and have shipped{" "}
                <span className="text-emerald-500 dark:text-emerald-400 font-semibold">
                  commercial products
                </span>{" "}
                used by real users.
              </p>
              <p>
                Currently building{" "}
                <span className="text-amber-500 dark:text-amber-400 font-semibold">
                  WanderMate India
                </span>
                , an AI-powered travel platform — while delivering freelance projects that
                help businesses scale digitally through thoughtful engineering.
              </p>
              <p>
                I care deeply about{" "}
                <span className="text-pink-500 dark:text-pink-400 font-semibold">
                  code quality, user experience,
                </span>{" "}
                and shipping fast. Every project I take on goes through the full lifecycle —
                from architecture decisions all the way to deployment and monitoring.
              </p>
            </div>

            {/* Download Resume */}
            <motion.a
              href="https://drive.google.com/file/d/1lSWuDZT8Xzi8lpMM9yoycfTi1Tv7TeDR/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl font-semibold text-sm
                         bg-gradient-to-r from-indigo-600 to-purple-600 text-white
                         shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow"
            >
              <Download size={16} />
              View Resume
            </motion.a>

            {/* What Sets Me Apart — horizontal 2×2 */}
            <div>
              <h3 className="text-lg font-bold mb-5" style={{ color: "rgb(var(--text-primary))" }}>
                What Sets Me <span className="gradient-text">Apart</span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {differentiators.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ y: -3 }}
                    className={`flex items-start gap-3 p-4 rounded-2xl border transition-all
                                ${item.bg} ${item.border}`}
                  >
                    <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
                                    bg-gradient-to-br ${item.gradient} text-white shadow-md`}>
                      <item.icon size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm mb-0.5"
                        style={{ color: "rgb(var(--text-primary))" }}>
                        {item.title}
                      </div>
                      <div className="text-xs leading-snug"
                        style={{ color: "rgb(var(--text-tertiary))" }}>
                        {item.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Achievements strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl font-bold mb-6 text-center">
            Certifications &amp; <span className="gradient-text">Achievements</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {achievements.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.0 + i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border glass transition-all
                            ${a.bg} border-white/60 dark:border-white/10`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center
                                 flex-shrink-0 ${a.bg} ${a.color} shadow-inner`}>
                  <a.icon size={22} />
                </div>
                <div>
                  <div className="font-bold text-sm" style={{ color: "rgb(var(--text-primary))" }}>
                    {a.title}
                  </div>
                  <div className="text-xs" style={{ color: "rgb(var(--text-tertiary))" }}>
                    {a.subtitle} · {a.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
