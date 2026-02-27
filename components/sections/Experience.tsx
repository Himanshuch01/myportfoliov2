"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Briefcase, Rocket, Code2, GraduationCap,
  CheckCircle, ExternalLink,
} from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────
const experiences = [
  {
    id: 1,
    title: "Freelance Full-Stack Developer",
    subtitle: "Self-Employed",
    period: "Sep 2024 – Present",
    current: true,
    badge: "ACTIVE",
    badgeStyle: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    nodeStyle: "from-emerald-500 to-teal-500",
    ringColor: "bg-emerald-400",
    accentColor: "text-emerald-500",
    icon: Briefcase,
    description:
      "Building production-grade applications for businesses and startups. Managing the complete development lifecycle — from planning and architecture to deployment and post-launch support.",
    achievements: [
      "Delivered 5+ production applications",
      "Served 3+ paying business clients",
      "Managed complete development lifecycle",
      "Built scalable MERN stack systems",
    ],
    projects: [
      { name: "LifeBiotech", url: "https://lifebiotech.in" },
      { name: "Shivam Green Solar Energy", url: "https://shivamgreensolarenergy.in" },
      { name: "SachTalks", url: "https://sachtalks.in" },
      { name: "Hubvestor.com – FinTech Integration" },
    ],
    techStack: ["React", "Node.js", "MongoDB", "Express", "Next.js", "Tailwind CSS", "AWS"],
  },
  {
    id: 2,
    title: "Founder & Developer",
    subtitle: "WanderMate India",
    period: "Dec 2025 – Present",
    current: true,
    badge: "BUILDING",
    badgeStyle: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    nodeStyle: "from-amber-400 to-orange-500",
    ringColor: "bg-amber-400",
    accentColor: "text-amber-500",
    icon: Rocket,
    description:
      "Founding and engineering an AI-powered travel planning platform with smart itinerary generation and traveller matching based on interests, routes, and budget.",
    achievements: [
      "Architected scalable AI-powered platform",
      "Integrated OpenAI API for smart recommendations",
      "Designed real-time traveller matching algorithm",
      "Building MVP for market validation",
    ],
    focus: [
      "AI integration (OpenAI API)",
      "Scalable architecture",
      "Real-time features",
      "Full product development",
    ],
    techStack: ["Next.js", "TypeScript", "MongoDB", "OpenAI API", "Node.js", "Tailwind CSS"],
  },
  {
    id: 3,
    title: "Java Application Development Training",
    subtitle: "Advanced Programming",
    period: "Jun 2025 – Jul 2025",
    current: false,
    badge: "COMPLETED",
    badgeStyle: "bg-indigo-500/15 text-indigo-500 border-indigo-500/30",
    nodeStyle: "from-indigo-500 to-purple-500",
    ringColor: "bg-indigo-400",
    accentColor: "text-indigo-500",
    icon: Code2,
    description:
      "Intensive training focused on building real-time applications in Java, covering advanced concurrency concepts and practical network programming.",
    achievements: [
      "Built multi-threaded chat application",
      "Implemented socket programming",
      "Developed Swing GUI applications",
      "Mastered client-server architecture",
    ],
    focus: [
      "Multi-threading & concurrency",
      "Socket programming",
      "Swing GUI development",
      "Client-server architecture",
    ],
    techStack: ["Java", "Swing", "Sockets", "Multi-threading"],
  },
  {
    id: 4,
    title: "B.Tech Computer Science & Engineering",
    subtitle: "Lovely Professional University",
    period: "Aug 2023 – Present",
    current: true,
    badge: "IN PROGRESS",
    badgeStyle: "bg-purple-500/15 text-purple-500 border-purple-500/30",
    nodeStyle: "from-purple-500 to-pink-500",
    ringColor: "bg-purple-400",
    accentColor: "text-purple-500",
    icon: GraduationCap,
    description:
      "Pursuing B.Tech with a focused emphasis on full-stack development, data structures, algorithms, and system design — complementing hands-on commercial work.",
    achievements: [
      "CGPA: 7.0",
      "Focus on practical software development",
      "Strong foundation in DSA",
      "System design expertise",
    ],
    focus: [
      "Full-stack development",
      "Data Structures & Algorithms",
      "System Design",
      "Software Engineering",
    ],
    techStack: ["C++", "Java", "Python", "DSA", "System Design"],
  },
];

const summaryStats = [
  { label: "Years Active", value: "2+" },
  { label: "Projects Delivered", value: "5+" },
  { label: "Business Clients", value: "3+" },
  { label: "Technologies", value: "15+" },
];

// ── Timeline node ─────────────────────────────────────────────────────────────
function TimelineNode({ exp, isActive }: { exp: typeof experiences[0]; isActive: boolean }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-6 z-10">
      <motion.div
        initial={{ scale: 0 }}
        animate={isActive ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative"
      >
        {exp.current && (
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`absolute inset-0 rounded-full ${exp.ringColor}`}
          />
        )}
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${exp.nodeStyle}
                         flex items-center justify-center shadow-xl text-white`}>
          <exp.icon size={22} />
        </div>
      </motion.div>
    </div>
  );
}

// ── Experience card ───────────────────────────────────────────────────────────
function ExperienceCard({
  exp, index, isLeft,
}: {
  exp: typeof experiences[0]; index: number; isLeft: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={`flex mb-16 relative ${isLeft ? "justify-end" : "justify-start"}`}>
      <TimelineNode exp={exp} isActive={isInView} />

      <motion.div
        initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.15 }}
        className={`w-[calc(50%-3.5rem)] ${isLeft ? "pr-8" : "pl-8"}`}
      >
        <motion.div
          whileHover={{ y: -4 }}
          className="glass rounded-2xl p-5 border relative overflow-hidden
                     border-white/20 dark:border-white/10
                     hover:border-indigo-400/30 transition-all group"
        >
          {/* Coloured left accent bar */}
          <div className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-full
                           bg-gradient-to-b ${exp.nodeStyle}`} />

          {/* Header row */}
          <div className="flex items-start justify-between gap-2 mb-3 pl-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="font-bold text-base leading-tight"
                  style={{ color: "rgb(var(--text-primary))" }}>
                  {exp.title}
                </h3>
                <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border
                                  whitespace-nowrap ${exp.badgeStyle}`}>
                  {exp.badge}
                </span>
              </div>
              <p className="text-sm font-medium" style={{ color: "rgb(var(--text-secondary))" }}>
                {exp.subtitle}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "rgb(var(--text-tertiary))" }}>
                {exp.period}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-4 pl-4"
            style={{ color: "rgb(var(--text-tertiary))" }}>
            {exp.description}
          </p>

          {/* Achievements */}
          <div className="mb-4 pl-4">
            <ul className="space-y-1.5">
              {exp.achievements.map((a, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "rgb(var(--text-secondary))" }}
                >
                  <CheckCircle size={13} className={`mt-0.5 flex-shrink-0 ${exp.accentColor}`} />
                  {a}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          {"projects" in exp && exp.projects && (
            <div className="mb-4 pl-4">
              <p className="text-xs font-bold uppercase tracking-wider mb-2 text-amber-500">
                Shipped Projects
              </p>
              <div className="space-y-1">
                {exp.projects.map((p, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="text-xs" style={{ color: "rgb(var(--text-tertiary))" }}>
                      {p.name}
                    </span>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-indigo-500 hover:text-indigo-400 transition-colors"
                      >
                        <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Focus areas — always visible */}
          {"focus" in exp && exp.focus && (
            <div className="pl-4 mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-indigo-500">
                Focus Areas
              </p>
              <ul className="space-y-1">
                {exp.focus.map((f, i) => (
                  <li key={i} className="text-xs flex items-center gap-1.5"
                    style={{ color: "rgb(var(--text-tertiary))" }}>
                    <span className="w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech stack pills */}
          {"techStack" in exp && exp.techStack && (
            <div className="flex flex-wrap gap-1.5 mt-4 pl-4">
              {exp.techStack.map((t) => (
                <span key={t}
                  className="px-2.5 py-0.5 rounded-lg text-[10px] font-medium
                                 bg-white/40 dark:bg-white/5
                                 border border-white/60 dark:border-white/10
                                 text-indigo-600 dark:text-indigo-300">
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Hover gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${exp.nodeStyle}
                           opacity-0 group-hover:opacity-[0.04] transition-opacity
                           rounded-2xl pointer-events-none`} />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" ref={ref} className="section-padding relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl -z-10
                      bg-indigo-400/6 dark:bg-indigo-600/8" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl -z-10
                      bg-emerald-400/6 dark:bg-emerald-600/8" />

      <div className="container-custom">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold tracking-widest
                           uppercase mb-4 bg-indigo-50 dark:bg-indigo-900/30
                           text-indigo-600 dark:text-indigo-400
                           border border-indigo-200/60 dark:border-indigo-700/40">
            My history
          </span>
          <h2 className="heading-2 mb-3">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-base"
            style={{ color: "rgb(var(--text-tertiary))" }}>
            Commercial experience and educational background in full-stack development
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Animated timeline spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="absolute inset-0 bg-indigo-200/30 dark:bg-indigo-800/30" />
            <motion.div
              style={{ height: lineH }}
              className="absolute top-0 left-0 right-0
                         bg-gradient-to-b from-indigo-500 via-emerald-500 to-purple-500"
            />
          </div>

          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} isLeft={i % 2 === 0} />
          ))}
        </div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-10"
        >
          {summaryStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1 + i * 0.08 }}
              whileHover={{ y: -3 }}
              className="text-center py-5 px-3 rounded-2xl glass
                         border border-white/30 dark:border-white/10
                         hover:border-indigo-400/30 transition-all"
            >
              <div className="text-2xl font-black gradient-text mb-1">{s.value}</div>
              <div className="text-[11px]" style={{ color: "rgb(var(--text-tertiary))" }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
