"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, Star, GitFork, Code2, TrendingUp, Award, ExternalLink, Calendar, Activity } from "lucide-react";

// GitHub stats data
const githubStats = {
  totalRepos: 20,
  totalContributions: 249,
  currentStreak: 15,
  starsEarned: 12,
};

// Featured repositories
const featuredRepos = [
  {
    name: "MaticAi_server",
    description: "AI-powered video generation server with Remotion, OpenAI integration, and BullMQ job processing",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: 2,
    forks: 0,
    recentActivity: "Active - Feb 2026",
    url: "https://github.com/Himanshuch01/Matic_ai_server",
  },
  {
    name: "DSA",
    description: "Data Structures & Algorithms practice repository with solutions in C++, Java, and Python",
    language: "C++",
    languageColor: "#f34b7d",
    stars: 1,
    forks: 0,
    recentActivity: "Learning - Feb 2026",
    url: "https://github.com/Himanshuch01/DSA",
  },
  {
    name: "ShivamGreenSolarEnergy",
    description: "Commercial solar energy business website with SEO optimization and lead generation",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 3,
    forks: 1,
    recentActivity: "Updated - Feb 11",
    url: "https://github.com/Himanshuch01/ShivamGreenSolarEnergy",
  },
  {
    name: "Quite-Connect",
    description: "Anonymous social platform with real-time chat using Socket.io and JWT authentication",
    language: "JavaScript",
    languageColor: "#f1e05a",
    stars: 2,
    forks: 0,
    recentActivity: "Completed",
    url: "https://github.com/Himanshuch01/Quite-Connect",
  },
];

// Recent activity
const recentActivity = [
  {
    repo: "ShivamGreenSolarEnergy",
    action: "Feature update",
    commits: 3,
    linesChanged: 22,
    timeAgo: "3 days ago",
  },
  {
    repo: "MaticAi_server",
    action: "Video generation system",
    commits: 11,
    linesChanged: 450,
    timeAgo: "1 week ago",
  },
  {
    repo: "DSA",
    action: "Algorithm practice",
    commits: 14,
    linesChanged: 280,
    timeAgo: "2 weeks ago",
  },
  {
    repo: "portfolio",
    action: "Portfolio enhancement",
    commits: 8,
    linesChanged: 350,
    timeAgo: "3 weeks ago",
  },
  {
    repo: "Quite-Connect",
    action: "Real-time features",
    commits: 6,
    linesChanged: 180,
    timeAgo: "1 month ago",
  },
];

// Language breakdown
const languageBreakdown = [
  { name: "JavaScript", percentage: 40, color: "#f1e05a" },
  { name: "TypeScript", percentage: 25, color: "#3178c6" },
  { name: "HTML/CSS", percentage: 15, color: "#e34c26" },
  { name: "Java", percentage: 10, color: "#b07219" },
  { name: "PHP", percentage: 5, color: "#4F5D95" },
  { name: "Python", percentage: 5, color: "#3572A5" },
];

// Achievements
const achievements = [
  { name: "HackerRank 3-Star", category: "Problem Solving", icon: "⭐", color: "accent" },
  { name: "Stack Overflow Bronze", category: "Contributor", icon: "📈", color: "secondary" },
  { name: "HackerEarth 1-Star", category: "Basic Programming", icon: "🏆", color: "primary" },
  { name: "DevOps Certified", category: "Introduction", icon: "🎓", color: "accent" },
];

// Animated counter component
function AnimatedCounter({
  value,
  duration = 2
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

// Contribution graph component (simplified)
function ContributionGraph() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Generate 52 weeks of contribution data (simplified)
  const weeks = 52;
  const daysPerWeek = 7;

  // Seeded pseudo-random function for consistent server/client rendering
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  return (
    <div ref={ref} className="overflow-x-auto">
      <div className="flex gap-1 min-w-max">
        {[...Array(weeks)].map((_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {[...Array(daysPerWeek)].map((_, dayIndex) => {
              const seed = weekIndex * daysPerWeek + dayIndex;
              const intensity = seededRandom(seed + 12345); // Use seed for deterministic values
              const delay = seed * 0.002;

              return (
                <motion.div
                  key={dayIndex}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay, duration: 0.3 }}
                  className={`w-3 h-3 rounded-sm ${intensity > 0.7
                    ? "bg-secondary-400"
                    : intensity > 0.4
                      ? "bg-secondary-500/60"
                      : intensity > 0.2
                        ? "bg-secondary-500/30"
                        : "bg-dark-800"
                    }`}
                  whileHover={{ scale: 1.5 }}
                  title={`${Math.floor(intensity * 10)} contributions`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// Repository card component
function RepoCard({
  repo,
  index
}: {
  repo: typeof featuredRepos[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.a
      ref={ref}
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group cursor-pointer"
      whileHover={{ scale: 1.03, y: -5 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Code2 size={20} className="text-primary-400" />
          <h3 className="font-bold group-hover:text-gradient-primary transition-all">
            {repo.name}
          </h3>
        </div>
        <ExternalLink size={16} className="text-gray-400 group-hover:text-primary-400 transition-colors" />
      </div>

      {/* Description */}
      <p className="text-sm text-gray-400 mb-4 leading-relaxed">
        {repo.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: repo.languageColor }}
            />
            {repo.language}
          </div>
          <div className="flex items-center gap-1">
            <Star size={12} />
            {repo.stars}
          </div>
          <div className="flex items-center gap-1">
            <GitFork size={12} />
            {repo.forks}
          </div>
        </div>
        <span className="text-xs text-accent-400 font-medium">
          {repo.recentActivity}
        </span>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl pointer-events-none" />
    </motion.a>
  );
}

export default function GitHub() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="github" className="section-padding relative" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-2 mb-4">
            Open Source & <span className="gradient-text">Continuous Learning</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Active contributions and continuous learning through open source development
          </p>
        </motion.div>

        {/* GitHub Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: "Repositories", value: githubStats.totalRepos, icon: Code2, suffix: "+" },
            { label: "Contributions", value: githubStats.totalContributions, icon: Activity, suffix: "+" },
            { label: "Current Streak", value: githubStats.currentStreak, icon: TrendingUp, suffix: " days" },
            { label: "Stars Earned", value: githubStats.starsEarned, icon: Star, suffix: "" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="card text-center group"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary mb-3 group-hover:scale-110 transition-transform">
                <stat.icon size={20} />
              </div>
              <div className="text-2xl font-bold gradient-text mb-1">
                <AnimatedCounter value={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="card mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="heading-4">Contribution Activity</h3>
            <span className="text-sm text-gray-400">
              <AnimatedCounter value={249} />+ contributions in the last year
            </span>
          </div>
          <ContributionGraph />
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-dark-800 rounded-sm" />
              <div className="w-3 h-3 bg-secondary-500/30 rounded-sm" />
              <div className="w-3 h-3 bg-secondary-500/60 rounded-sm" />
              <div className="w-3 h-3 bg-secondary-400 rounded-sm" />
            </div>
            <span>More</span>
          </div>
        </motion.div>

        {/* Featured Repositories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h3 className="heading-4 mb-6">Featured Repositories</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredRepos.map((repo, index) => (
              <RepoCard key={repo.name} repo={repo} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Two Column Layout: Activity + Languages */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="card"
          >
            <h3 className="heading-4 mb-6 flex items-center gap-2">
              <Calendar size={20} className="text-accent-400" />
              Recent Contributions
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 glass-dark rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="w-2 h-2 bg-secondary-400 rounded-full mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{activity.repo}</span>
                      <span className="text-xs text-gray-500">{activity.timeAgo}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-1">{activity.action}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{activity.commits} commits</span>
                      <span>•</span>
                      <span>{activity.linesChanged} lines</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Language Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="card"
          >
            <h3 className="heading-4 mb-6 flex items-center gap-2">
              <Code2 size={20} className="text-primary-400" />
              Language Breakdown
            </h3>
            <div className="space-y-4">
              {languageBreakdown.map((lang, index) => (
                <div key={lang.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="text-sm text-gray-300">{lang.name}</span>
                    </div>
                    <span className="text-sm font-semibold" style={{ color: lang.color }}>
                      {lang.percentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${lang.percentage}%` } : {}}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <h3 className="heading-4 mb-6 flex items-center gap-2">
            <Award size={20} className="text-accent-400" />
            Achievements & Certifications
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="card text-center group"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <h4 className="font-semibold text-sm mb-1">{achievement.name}</h4>
                <p className="text-xs text-gray-400">{achievement.category}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <motion.a
            href="https://github.com/Himanshuch01"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            View Full GitHub Profile
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}
