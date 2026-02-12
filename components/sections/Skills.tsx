"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code2, Database, Server, Cloud, Layers, Zap, Award, TrendingUp } from "lucide-react";

// Skill categories
type SkillCategory = "all" | "languages" | "frontend" | "backend" | "database" | "devops" | "other";

// Skill data structure
interface Skill {
  name: string;
  level: number;
  category: SkillCategory;
  experience: string;
  commercial: string;
  projects?: string[];
  icon: string;
  color: string;
}

// All skills data
const skills: Skill[] = [
  // Languages
  { name: "JavaScript", level: 90, category: "languages", experience: "2+ years", commercial: "5+ commercial projects", projects: ["LifeBiotech", "SachTalks", "WanderMate"], icon: "JS", color: "accent" },
  { name: "TypeScript", level: 80, category: "languages", experience: "1+ year", commercial: "Production projects", projects: ["WanderMate", "Hubvestor"], icon: "TS", color: "primary" },
  { name: "Python", level: 70, category: "languages", experience: "1+ year", commercial: "Scripting, automation", icon: "🐍", color: "secondary" },
  { name: "C++", level: 65, category: "languages", experience: "1+ year", commercial: "DSA, system programming", icon: "C++", color: "primary" },
  { name: "Java", level: 70, category: "languages", experience: "1+ year", commercial: "Multi-threading, Sockets", icon: "☕", color: "accent" },
  { name: "PHP", level: 65, category: "languages", experience: "1+ year", commercial: "Backend development", icon: "PHP", color: "secondary" },

  // Frontend
  { name: "React", level: 90, category: "frontend", experience: "2+ years", commercial: "5+ commercial projects", projects: ["LifeBiotech", "Solar Energy", "SachTalks"], icon: "⚛️", color: "primary" },
  { name: "Next.js", level: 85, category: "frontend", experience: "1+ year", commercial: "Modern web apps", projects: ["WanderMate", "Portfolio"], icon: "▲", color: "secondary" },
  { name: "Tailwind CSS", level: 90, category: "frontend", experience: "2+ years", commercial: "All recent projects", icon: "🎨", color: "accent" },
  { name: "HTML/CSS", level: 95, category: "frontend", experience: "3+ years", commercial: "Foundation of all projects", icon: "🌐", color: "primary" },

  // Backend
  { name: "Node.js", level: 90, category: "backend", experience: "2+ years", commercial: "Primary backend stack", projects: ["LifeBiotech", "SachTalks", "WanderMate"], icon: "🟢", color: "secondary" },
  { name: "Express.js", level: 85, category: "backend", experience: "2+ years", commercial: "API development", projects: ["LifeBiotech", "SachTalks"], icon: "⚡", color: "primary" },
  { name: "Socket.io", level: 80, category: "backend", experience: "1+ year", commercial: "Real-time features", projects: ["Quite-Connect"], icon: "🔌", color: "accent" },
  { name: "REST APIs", level: 90, category: "backend", experience: "2+ years", commercial: "Architecture design", icon: "🔗", color: "secondary" },

  // Databases
  { name: "MongoDB", level: 85, category: "database", experience: "2+ years", commercial: "Primary database", projects: ["LifeBiotech", "SachTalks", "WanderMate"], icon: "🍃", color: "secondary" },
  { name: "MySQL", level: 75, category: "database", experience: "1+ year", commercial: "Relational data", icon: "🐬", color: "primary" },
  { name: "Supabase", level: 70, category: "database", experience: "6+ months", commercial: "Backend services", icon: "⚡", color: "accent" },

  // DevOps
  { name: "AWS", level: 75, category: "devops", experience: "1+ year", commercial: "Cloud deployment", icon: "☁️", color: "accent" },
  { name: "Docker", level: 70, category: "devops", experience: "1+ year", commercial: "Containerization", icon: "🐳", color: "primary" },
  { name: "Vercel", level: 90, category: "devops", experience: "1+ year", commercial: "Next.js hosting", projects: ["WanderMate", "Portfolio"], icon: "▲", color: "secondary" },
  { name: "Git", level: 90, category: "devops", experience: "2+ years", commercial: "Version control", icon: "📦", color: "primary" },
  { name: "Linux", level: 80, category: "devops", experience: "2+ years", commercial: "Server management", icon: "🐧", color: "secondary" },

  // Other
  { name: "SEO", level: 85, category: "other", experience: "1+ year", commercial: "Optimization", projects: ["Solar Energy"], icon: "📈", color: "accent" },
  { name: "Performance", level: 80, category: "other", experience: "1+ year", commercial: "Optimization", icon: "⚡", color: "primary" },
  { name: "JWT Auth", level: 85, category: "other", experience: "2+ years", commercial: "Authentication", projects: ["LifeBiotech", "Quite-Connect"], icon: "🔐", color: "secondary" },
  { name: "System Design", level: 75, category: "other", experience: "1+ year", commercial: "Architecture", icon: "🏗️", color: "accent" },
];

// Category configuration
const categories = [
  { id: "all" as SkillCategory, label: "All Skills", icon: Layers, count: skills.length },
  { id: "languages" as SkillCategory, label: "Languages", icon: Code2, count: skills.filter(s => s.category === "languages").length },
  { id: "frontend" as SkillCategory, label: "Frontend", icon: Zap, count: skills.filter(s => s.category === "frontend").length },
  { id: "backend" as SkillCategory, label: "Backend", icon: Server, count: skills.filter(s => s.category === "backend").length },
  { id: "database" as SkillCategory, label: "Database", icon: Database, count: skills.filter(s => s.category === "database").length },
  { id: "devops" as SkillCategory, label: "DevOps", icon: Cloud, count: skills.filter(s => s.category === "devops").length },
  { id: "other" as SkillCategory, label: "Other", icon: Award, count: skills.filter(s => s.category === "other").length },
];

// Circular progress component
function CircularProgress({
  percentage,
  size = 120,
  strokeWidth = 8,
  color = "primary"
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        className="text-dark-800"
      />
      {/* Progress circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        className={`text-${color}-400`}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          strokeDasharray: circumference,
        }}
      />
    </svg>
  );
}

// Skill card component
function SkillCard({
  skill,
  index,
  onClick
}: {
  skill: Skill;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative"
    >
      <motion.div
        className="card h-full cursor-pointer overflow-hidden"
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
      >
        {/* Particle effect background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 bg-${skill.color}-400 rounded-full`}
              initial={{ x: "50%", y: "50%", opacity: 0 }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Circular Progress */}
          <div className="relative mb-4">
            <CircularProgress percentage={skill.level} size={100} color={skill.color} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl">{skill.icon}</span>
            </div>
          </div>

          {/* Skill Name */}
          <h3 className="font-bold text-lg mb-2 group-hover:text-gradient-primary transition-all">
            {skill.name}
          </h3>

          {/* Proficiency */}
          <div className={`text-2xl font-bold text-${skill.color}-400 mb-2`}>
            {skill.level}%
          </div>

          {/* Experience */}
          <p className="text-xs text-gray-400 mb-1">{skill.experience}</p>
          <p className="text-xs text-gray-500">{skill.commercial}</p>

          {/* Hover indicator */}
          <motion.div
            className="mt-3 text-xs text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ y: 10 }}
            whileHover={{ y: 0 }}
          >
            Click for details →
          </motion.div>
        </div>

        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-${skill.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl pointer-events-none`} />
      </motion.div>
    </motion.div>
  );
}

// Proficiency detail panel
function ProficiencyPanel({
  skill,
  onClose
}: {
  skill: Skill | null;
  onClose: () => void;
}) {
  if (!skill) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="card max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{skill.icon}</div>
            <div>
              <h2 className="heading-3 mb-1">{skill.name}</h2>
              <p className="text-gray-400 text-sm">{skill.category.toUpperCase()}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Proficiency */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-300">Proficiency Level</span>
            <span className={`text-2xl font-bold text-${skill.color}-400`}>{skill.level}%</span>
          </div>
          <div className="h-3 bg-dark-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full bg-gradient-${skill.color} relative`}
            >
              <div className="absolute inset-0 bg-white/20 animate-shimmer" />
            </motion.div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="glass-dark p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-accent-400" />
              <h3 className="font-semibold text-sm">Experience</h3>
            </div>
            <p className="text-gray-400 text-sm">{skill.experience}</p>
          </div>

          <div className="glass-dark p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Award size={16} className="text-secondary-400" />
              <h3 className="font-semibold text-sm">Commercial Usage</h3>
            </div>
            <p className="text-gray-400 text-sm">{skill.commercial}</p>
          </div>
        </div>

        {/* Related Projects */}
        {skill.projects && skill.projects.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Code2 size={16} className="text-primary-400" />
              Used in Projects
            </h3>
            <div className="flex flex-wrap gap-2">
              {skill.projects.map((project) => (
                <span
                  key={project}
                  className="px-3 py-1.5 glass rounded-full text-sm text-primary-400 hover:bg-white/10 transition-colors"
                >
                  {project}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-primary w-full"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("all");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  // Show only top 8 skills initially
  const displayedSkills = showAll ? filteredSkills : filteredSkills.slice(0, 8);
  const hasMore = filteredSkills.length > 8;

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-2 mb-4">
            Tech Stack <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Production-ready skills with commercial experience across the full stack
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 transition-all ${activeCategory === category.id
                  ? "bg-gradient-primary text-white shadow-lg shadow-primary-500/50"
                  : "glass hover:bg-white/10"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon size={16} />
                {category.label}
                <span className="text-xs opacity-70">({category.count})</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8"
        >
          {displayedSkills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              skill={skill}
              index={index}
              onClick={() => setSelectedSkill(skill)}
            />
          ))}
        </motion.div>

        {/* Show More/Less Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-center mb-12"
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="btn-outline inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Layers size={18} />
              {showAll ? `Show Less (${filteredSkills.length - 8} hidden)` : `Show All Skills (${filteredSkills.length - 8} more)`}
            </motion.button>
          </motion.div>
        )}

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { label: "Total Skills", value: skills.length, icon: Layers },
            { label: "90%+ Proficiency", value: skills.filter(s => s.level >= 90).length, icon: Award },
            { label: "Commercial Use", value: skills.filter(s => s.commercial.includes("commercial") || s.commercial.includes("projects")).length, icon: TrendingUp },
            { label: "Categories", value: categories.length - 1, icon: Code2 },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="card text-center group"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary mb-3 group-hover:scale-110 transition-transform">
                <stat.icon size={20} />
              </div>
              <div className="text-2xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Proficiency Detail Panel */}
      {selectedSkill && (
        <ProficiencyPanel
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}
