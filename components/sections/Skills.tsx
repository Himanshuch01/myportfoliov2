"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  SiJavascript, SiTypescript, SiPython, SiCplusplus, SiPhp, SiOpenjdk,
  SiReact, SiNextdotjs, SiTailwindcss, SiHtml5,
  SiNodedotjs, SiExpress, SiSocketdotio,
  SiMongodb, SiSupabase, SiPostgresql,
  SiAmazon, SiDocker, SiVercel, SiGit, SiLinux,
  SiGoogleanalytics, SiJsonwebtokens, SiGraphql,
} from "react-icons/si";
import { Code2, Database, Server, Cloud, Layers, Zap, Award } from "lucide-react";
import dynamic from "next/dynamic";

// Lazy-load the 3D globe (WebGL — no SSR)
const SkillGlobe = dynamic(() => import("@/components/GlobeSkills"), { ssr: false });

// ── Data ──────────────────────────────────────────────────────────────────────
type SkillCategory = "all" | "languages" | "frontend" | "backend" | "database" | "devops" | "other";

interface Skill {
  name: string;
  category: SkillCategory;
  Icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>;
  color: string;
}

const skills: Skill[] = [
  { name: "JavaScript", category: "languages", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", category: "languages", Icon: SiTypescript, color: "#3178C6" },
  { name: "Python", category: "languages", Icon: SiPython, color: "#3776AB" },
  { name: "C++", category: "languages", Icon: SiCplusplus, color: "#00599C" },
  { name: "Java", category: "languages", Icon: SiOpenjdk, color: "#007396" },
  { name: "PHP", category: "languages", Icon: SiPhp, color: "#777BB4" },

  { name: "React", category: "frontend", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", category: "frontend", Icon: SiNextdotjs, color: "#6366f1" },
  { name: "Tailwind", category: "frontend", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "HTML5", category: "frontend", Icon: SiHtml5, color: "#E34F26" },

  { name: "Node.js", category: "backend", Icon: SiNodedotjs, color: "#339933" },
  { name: "Express", category: "backend", Icon: SiExpress, color: "#6366f1" },
  { name: "Socket.io", category: "backend", Icon: SiSocketdotio, color: "#6366f1" },
  { name: "GraphQL", category: "backend", Icon: SiGraphql, color: "#E10098" },

  { name: "MongoDB", category: "database", Icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", category: "database", Icon: SiPostgresql, color: "#4169E1" },
  { name: "Supabase", category: "database", Icon: SiSupabase, color: "#3ECF8E" },

  { name: "AWS", category: "devops", Icon: SiAmazon, color: "#FF9900" },
  { name: "Docker", category: "devops", Icon: SiDocker, color: "#2496ED" },
  { name: "Vercel", category: "devops", Icon: SiVercel, color: "#6366f1" },
  { name: "Git", category: "devops", Icon: SiGit, color: "#F05032" },
  { name: "Linux", category: "devops", Icon: SiLinux, color: "#FCC624" },

  { name: "SEO", category: "other", Icon: SiGoogleanalytics, color: "#E37400" },
  { name: "JWT Auth", category: "other", Icon: SiJsonwebtokens, color: "#6366f1" },
];

const categories = [
  { id: "all" as SkillCategory, label: "All", Icon: Layers },
  { id: "languages" as SkillCategory, label: "Languages", Icon: Code2 },
  { id: "frontend" as SkillCategory, label: "Frontend", Icon: Zap },
  { id: "backend" as SkillCategory, label: "Backend", Icon: Server },
  { id: "database" as SkillCategory, label: "Database", Icon: Database },
  { id: "devops" as SkillCategory, label: "DevOps", Icon: Cloud },
  { id: "other" as SkillCategory, label: "Other", Icon: Award },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("all");

  const filtered = skills.filter(
    (s) => activeCategory === "all" || s.category === activeCategory
  );

  return (
    <section id="skills" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Top divider line */}
      <div className="absolute top-0 inset-x-0 h-px
                      bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="container-custom">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold
                           tracking-widest uppercase mb-4
                           bg-indigo-50 dark:bg-indigo-900/30
                           text-indigo-600 dark:text-indigo-400
                           border border-indigo-200/60 dark:border-indigo-700/40">
            What I work with
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Tech Stack{" "}
            <span className="bg-clip-text text-transparent
                             bg-gradient-to-r from-violet-500 to-indigo-500">
              Arsenal
            </span>
          </h2>
          <p className="text-sm" style={{ color: "rgb(var(--text-tertiary))" }}>
            Technologies I use to build scalable, production-ready applications
          </p>
        </motion.div>

        {/* ── Category tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs
                          font-medium transition-all duration-200
                          ${activeCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "glass text-slate-500 dark:text-slate-400 hover:text-indigo-500"
                }`}
            >
              <cat.Icon size={13} />
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* ── Skills chip grid ── */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-20"
        >
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              whileHover={{ scale: 1.07, y: -2 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass cursor-default
                         hover:ring-1 hover:ring-indigo-500/40 transition-all duration-200
                         hover:shadow-md hover:shadow-indigo-500/10"
            >
              {(() => {
                const Icon = skill.Icon;
                return <Icon size={18} style={{ color: skill.color }} className="flex-shrink-0" />;
              })()}
              <span
                className="text-sm font-medium whitespace-nowrap"
                style={{ color: "rgb(var(--text-primary))" }}
              >
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Globe (below the chips grid) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* Label above the globe */}
          <div className="text-center mb-2">
            <p className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: "rgb(var(--text-tertiary))" }}>
              Interactive · Drag to rotate
            </p>
          </div>

          {/* Radial glow behind the globe */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[500px] h-[500px] rounded-full blur-3xl
                              bg-violet-400/10 dark:bg-violet-600/15" />
            </div>
            <SkillGlobe />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
