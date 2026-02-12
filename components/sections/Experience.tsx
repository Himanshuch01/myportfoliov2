"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, Rocket, Code2, GraduationCap, CheckCircle, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

// Experience data structure
interface Experience {
  id: number;
  title: string;
  subtitle: string;
  company?: string;
  period: string;
  current: boolean;
  highlight: string;
  highlightColor: string;
  icon: any;
  description: string;
  achievements: string[];
  projects?: { name: string; url?: string }[];
  techStack?: string[];
  focus?: string[];
  details?: string;
}

// Timeline data
const experiences: Experience[] = [
  {
    id: 1,
    title: "Freelance Full-Stack Developer",
    subtitle: "Self-Employed",
    period: "Sep 2024 - Present",
    current: true,
    highlight: "ACTIVE",
    highlightColor: "secondary",
    icon: Briefcase,
    description: "Building production-grade applications for businesses and startups. Managing complete development lifecycle from planning to deployment.",
    achievements: [
      "Delivered 5+ production applications",
      "Served 3+ business clients",
      "Managed complete development lifecycle",
      "Built scalable MERN stack systems",
    ],
    projects: [
      { name: "LifeBiotech", url: "https://lifebiotech.in" },
      { name: "Shivam Green Solar Energy", url: "https://shivamgreensolarenergy.in" },
      { name: "SachTalks", url: "https://sachtalks.in" },
      { name: "Hubvestor.com (FinTech Integration)" },
    ],
    techStack: ["React", "Node.js", "MongoDB", "Express", "Next.js", "Tailwind CSS", "AWS"],
  },
  {
    id: 2,
    title: "Founder & Developer",
    subtitle: "WanderMate India",
    company: "Startup",
    period: "Dec 2025 - Present",
    current: true,
    highlight: "BUILDING",
    highlightColor: "accent",
    icon: Rocket,
    description: "Building AI-powered travel planning platform with smart itinerary generation and traveler matching based on interests, routes, and budget.",
    achievements: [
      "Architected scalable AI-powered platform",
      "Integrated OpenAI API for smart recommendations",
      "Designed real-time matching algorithm",
      "Building MVP for market validation",
    ],
    focus: [
      "AI integration (OpenAI API)",
      "Scalable architecture",
      "Real-time features",
      "Product development",
    ],
    techStack: ["Next.js", "TypeScript", "MongoDB", "OpenAI API", "Node.js", "Tailwind CSS"],
  },
  {
    id: 3,
    title: "Java Application Development Training",
    subtitle: "Advanced Programming",
    period: "Jun 2025 - Jul 2025",
    current: false,
    highlight: "COMPLETED",
    highlightColor: "primary",
    icon: Code2,
    description: "Intensive training focused on building real-time applications using Java, covering advanced concepts and practical implementations.",
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
    title: "Bachelor of Technology - Computer Science",
    subtitle: "Lovely Professional University",
    period: "Aug 2023 - Present",
    current: true,
    highlight: "IN PROGRESS",
    highlightColor: "primary",
    icon: GraduationCap,
    description: "Pursuing B.Tech in Computer Science & Engineering with focus on full-stack development, data structures, algorithms, and system design.",
    achievements: [
      "CGPA: 7.0",
      "Focus on practical development",
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

// Timeline node component
function TimelineNode({
  experience,
  isActive
}: {
  experience: Experience;
  isActive: boolean;
}) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 z-10">
      <motion.div
        initial={{ scale: 0 }}
        animate={isActive ? { scale: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {/* Pulsing ring */}
        {experience.current && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`absolute inset-0 rounded-full bg-${experience.highlightColor}-400`}
          />
        )}

        {/* Node */}
        <div className={`w-12 h-12 rounded-full bg-gradient-${experience.highlightColor} flex items-center justify-center shadow-lg shadow-${experience.highlightColor}-500/50`}>
          <experience.icon size={24} className="text-white" />
        </div>
      </motion.div>
    </div>
  );
}

// Experience card component
function ExperienceCard({
  experience,
  index,
  isLeft
}: {
  experience: Experience;
  index: number;
  isLeft: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      ref={ref}
      className={`flex ${isLeft ? "justify-end" : "justify-start"} mb-16 relative`}
    >
      {/* Timeline Node */}
      <TimelineNode experience={experience} isActive={isInView} />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        className={`w-[calc(50%-3rem)] ${isLeft ? "pr-8" : "pl-8"}`}
      >
        <motion.div
          className="card group cursor-pointer"
          whileHover={{ scale: 1.02, y: -5 }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-xl group-hover:text-gradient-primary transition-all">
                  {experience.title}
                </h3>
                {experience.current && (
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`px-2 py-0.5 text-xs font-bold rounded-full bg-${experience.highlightColor}-500/20 text-${experience.highlightColor}-400 border border-${experience.highlightColor}-500/30`}
                  >
                    {experience.highlight}
                  </motion.span>
                )}
              </div>
              <p className="text-gray-400 text-sm mb-1">{experience.subtitle}</p>
              <p className="text-gray-500 text-xs">{experience.period}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            {experience.description}
          </p>

          {/* Achievements */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-3 text-primary-400">Key Achievements:</h4>
            <ul className="space-y-2">
              {experience.achievements.map((achievement, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2 + i * 0.1 }}
                  className="text-sm text-gray-400 flex items-start gap-2"
                >
                  <CheckCircle size={14} className="text-secondary-400 mt-0.5 flex-shrink-0" />
                  {achievement}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Projects (if any) */}
          {experience.projects && experience.projects.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2 text-accent-400">Key Projects:</h4>
              <div className="space-y-1">
                {experience.projects.map((project, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">• {project.name}</span>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Focus Areas (if any) */}
          {experience.focus && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4"
            >
              <h4 className="text-sm font-semibold mb-2 text-secondary-400">Focus Areas:</h4>
              <ul className="space-y-1">
                {experience.focus.map((item, i) => (
                  <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                    <span className="text-secondary-400">▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Tech Stack */}
          {experience.techStack && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {experience.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs glass rounded-full text-primary-400 hover:bg-white/10 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Expand/Collapse Button */}
          {experience.focus && (
            <button
              className="flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 transition-colors mt-2"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={14} />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown size={14} />
                  Show More
                </>
              )}
            </button>
          )}

          {/* Glow effect */}
          <div className={`absolute inset-0 bg-gradient-${experience.highlightColor} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl pointer-events-none`} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Scroll progress for timeline
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="section-padding relative" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="heading-2 mb-4">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My commercial experience and educational background in full-stack development
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            {/* Background line */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 via-secondary-500/20 to-accent-500/20" />

            {/* Animated progress line */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500"
            />
          </div>

          {/* Experience Cards */}
          <div className="relative">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-20"
        >
          {[
            { label: "Years Active", value: "2+", icon: Briefcase },
            { label: "Projects Delivered", value: "5+", icon: CheckCircle },
            { label: "Business Clients", value: "3+", icon: Rocket },
            { label: "Technologies", value: "15+", icon: Code2 },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1 + index * 0.1 }}
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

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}
