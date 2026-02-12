"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Rocket, Briefcase, Zap, Target, Award, Star, TrendingUp } from "lucide-react";

// Key differentiators data
const differentiators = [
  {
    icon: Rocket,
    title: "Commercial Experience",
    description: "Real production apps for paying clients",
    detail: "Complete lifecycle management",
    color: "primary",
  },
  {
    icon: Briefcase,
    title: "Business Impact",
    description: "Helped local businesses expand digitally",
    detail: "SEO & performance optimization focus",
    color: "secondary",
  },
  {
    icon: Zap,
    title: "AI Integration",
    description: "Building AI-powered platforms",
    detail: "OpenAI API expertise",
    color: "accent",
  },
  {
    icon: Target,
    title: "Full Ownership",
    description: "Planning → Development → Deployment",
    detail: "Complete project lifecycle",
    color: "primary",
  },
];

// Tech stack with proficiency
const techStack = {
  Frontend: [
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Tailwind CSS", level: 90 },
  ],
  Backend: [
    { name: "Node.js", level: 90 },
    { name: "Express", level: 85 },
    { name: "MongoDB", level: 85 },
  ],
  DevOps: [
    { name: "AWS", level: 75 },
    { name: "Docker", level: 70 },
    { name: "Vercel", level: 90 },
  ],
  Other: [
    { name: "REST APIs", level: 90 },
    { name: "Socket.io", level: 80 },
    { name: "JWT Auth", level: 85 },
  ],
};

// Achievements
const achievements = [
  { icon: Award, title: "DevOps Introduction", date: "Nov 2025" },
  { icon: Star, title: "3-Star HackerRank", subtitle: "Problem Solver" },
  { icon: TrendingUp, title: "Bronze Stack Overflow", subtitle: "Contributor" },
];

// Proficiency bar component
function ProficiencyBar({
  skill,
  index
}: {
  skill: { name: string; level: number };
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.05 }}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm">
        <span className="text-gray-300 font-medium">{skill.name}</span>
        <span className="text-primary-400 font-semibold">{skill.level}%</span>
      </div>
      <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.05, ease: "easeOut" }}
          className="h-full bg-gradient-primary rounded-full relative"
        >
          <div className="absolute inset-0 bg-white/20 animate-shimmer" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Full-Stack Engineer with Real-World Impact
          </p>
        </motion.div>

        {/* Main Content: Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Left Side: Professional Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Image Container with Animated Border */}
            <div className="relative group">
              {/* Rotating Tech Border */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                  style={{
                    background: "conic-gradient(from 0deg, #6366f1, #10b981, #f59e0b, #6366f1)",
                    padding: "3px",
                  }}
                />
              </div>

              {/* Image Placeholder */}
              <div className="relative bg-dark-800 rounded-2xl overflow-hidden aspect-square flex items-center justify-center m-[3px]">
                <div className="text-8xl">👨‍💻</div>

                {/* Availability Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2"
                >
                  <div className="glass px-4 py-2 rounded-full border border-secondary-500/30 flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Open to Opportunities</span>
                  </div>
                </motion.div>
              </div>

              {/* Tech Icons Floating Around */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 pointer-events-none"
              >
                {[
                  { icon: "⚛️", top: "23.5497%", left: "13.5942%" },
                  { icon: "🟢", top: "86.4503%", left: "36.3271%" },
                  { icon: "🍃", top: "86.4503%", left: "63.6729%" },
                  { icon: "▲", top: "23.5497%", left: "86.4058%" },
                  { icon: "TS", top: "50%", left: "5%" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="absolute text-2xl"
                    style={{
                      top: item.top,
                      left: item.left,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {item.icon}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Bio */}
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Full-stack engineer with proven experience building{" "}
                <span className="text-primary-400 font-semibold">production-grade applications</span>{" "}
                for businesses, startups, and enterprises. I specialize in scalable MERN stack systems
                and have successfully delivered{" "}
                <span className="text-secondary-400 font-semibold">commercial products</span>{" "}
                used by real users.
              </p>
              <p>
                Currently building{" "}
                <span className="text-accent-400 font-semibold">WanderMate India</span>,
                an AI-powered travel platform, while delivering freelance projects that help
                businesses scale digitally.
              </p>
            </div>

            {/* Download Resume Button */}
            <motion.a
              href="/resume.pdf"
              download
              className="btn-primary inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Award size={20} />
              Download Resume
            </motion.a>
          </motion.div>
        </div>

        {/* Key Differentiators */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            What Sets Me <span className="gradient-text">Apart</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="card group text-center"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-${item.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon size={28} />
                </div>
                <h4 className="font-bold text-lg mb-2 group-hover:text-gradient-primary transition-all">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-400 mb-1">{item.description}</p>
                <p className="text-xs text-gray-500">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack with Proficiency */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            Tech Stack <span className="gradient-text">Proficiency</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(techStack).map(([category, skills], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2 + catIndex * 0.15 }}
                className="card"
              >
                <h4 className="text-xl font-bold mb-6 text-gradient-primary">
                  {category}
                </h4>
                <div className="space-y-4">
                  {skills.map((skill, index) => (
                    <ProficiencyBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications & Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            Certifications & <span className="gradient-text">Achievements</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.6 + index * 0.1 }}
                className="card group text-center"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary mb-4 group-hover:rotate-12 transition-transform">
                  <achievement.icon size={24} />
                </div>
                <h4 className="font-bold mb-1">{achievement.title}</h4>
                {achievement.subtitle && (
                  <p className="text-sm text-gray-400">{achievement.subtitle}</p>
                )}
                {achievement.date && (
                  <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}
