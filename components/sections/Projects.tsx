"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Star, Rocket, Briefcase, Code2, CheckCircle, TrendingUp } from "lucide-react";

// Project categories
type Category = "all" | "commercial" | "startup" | "demo";

// Project data
const projects = [
  {
    id: 1,
    title: "LifeBiotech",
    subtitle: "Medical & Pharma Platform",
    category: "commercial" as Category,
    featured: true,
    status: "Live & In Production",
    statusColor: "secondary",
    url: "https://lifebiotech.in",
    description: "Complete commercial ordering platform for pharmaceutical company. Enabled online medicine ordering with delivery support, helping local business expand digitally.",
    impact: "Active users, real revenue generation",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    features: [
      "Customer ordering system",
      "Product management",
      "Admin dashboard",
      "Delivery integration",
    ],
    image: "💊",
    badge: "FEATURED",
  },
  {
    id: 2,
    title: "Shivam Green Solar Energy",
    subtitle: "Business Website",
    category: "commercial" as Category,
    featured: false,
    status: "Live & Active",
    statusColor: "secondary",
    url: "https://shivamgreensolarenergy.in",
    description: "SEO-optimized business website for solar energy company. Improved digital presence and lead generation capabilities.",
    impact: "Increased organic traffic, lead capture system",
    tech: ["React", "Node.js", "Tailwind CSS"],
    features: [
      "SEO optimization",
      "Lead capture forms",
      "Mobile-first design",
      "Fast performance",
    ],
    image: "☀️",
    badge: "COMMERCIAL",
  },
  {
    id: 3,
    title: "SachTalks",
    subtitle: "Online News Portal",
    category: "commercial" as Category,
    featured: false,
    status: "Live & Publishing",
    statusColor: "secondary",
    url: "https://sachtalks.in",
    description: "Full-featured news portal with custom CMS and admin panel. Designed for scalable daily content updates.",
    impact: "Daily content publishing, growing readership",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    features: [
      "Custom CMS",
      "Admin panel",
      "Category management",
      "Performance optimized",
    ],
    image: "📰",
    badge: "COMMERCIAL",
  },
  {
    id: 4,
    title: "WanderMate India",
    subtitle: "AI Travel Platform",
    category: "startup" as Category,
    featured: true,
    status: "Building MVP",
    statusColor: "accent",
    url: "#",
    description: "AI-powered travel planning platform with smart itinerary generation and traveler matching based on interests, routes, and budget.",
    impact: "Innovative AI integration",
    tech: ["Next.js", "Node.js", "MongoDB", "OpenAI API", "Tailwind CSS"],
    features: [
      "AI itinerary generation",
      "Traveler matching algorithm",
      "Real-time recommendations",
      "Scalable architecture",
    ],
    image: "🗺️",
    badge: "IN DEVELOPMENT",
  },
  {
    id: 5,
    title: "Hubvestor.com",
    subtitle: "FinTech Platform",
    category: "startup" as Category,
    featured: false,
    status: "Completed",
    statusColor: "primary",
    url: "#",
    description: "Integrated Due Diligence System, AI scoring, and KYC for investor-startup platform. Resolved critical backend bugs.",
    impact: "System stability improved",
    tech: ["React", "Node.js", "TypeScript"],
    features: [
      "Backend bug fixes",
      "System integration",
      "Performance optimization",
    ],
    image: "💼",
    badge: "CLIENT PROJECT",
  },
  {
    id: 6,
    title: "Quite-Connect",
    subtitle: "Anonymous Social Platform",
    category: "startup" as Category,
    featured: false,
    status: "Live Demo Available",
    statusColor: "secondary",
    url: "#",
    description: "Privacy-first anonymous platform with real-time chat using Socket.io. Users can express thoughts and connect anonymously.",
    impact: "Real-time communication",
    tech: ["React", "Node.js", "Express", "Socket.io", "MongoDB"],
    features: [
      "Real-time chat",
      "Anonymous posting",
      "Profanity moderation",
      "JWT authentication",
    ],
    image: "💬",
    badge: "LIVE DEMO",
  },
  {
    id: 7,
    title: "Java Chat Application",
    subtitle: "Multi-threaded System",
    category: "demo" as Category,
    featured: false,
    status: "Completed",
    statusColor: "primary",
    url: "#",
    description: "Multi-threaded chat system using Java Sockets and Swing GUI with concurrent client support.",
    impact: "Technical demonstration",
    tech: ["Java", "Swing", "Sockets", "Multi-threading"],
    features: [],
    image: "☕",
    badge: "TECH DEMO",
  },
  {
    id: 8,
    title: "Event Calendar Platform",
    subtitle: "PHP Backend System",
    category: "demo" as Category,
    featured: false,
    status: "Completed",
    statusColor: "primary",
    url: "#",
    description: "Interactive calendar with PHP backend, event management, and reminder notifications.",
    impact: "Full-stack demonstration",
    tech: ["PHP", "MySQL", "XAMPP", "JavaScript"],
    features: [],
    image: "📅",
    badge: "TECH DEMO",
  },
];

// Project card component
function ProjectCard({
  project,
  index
}: {
  project: typeof projects[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative ${project.featured ? "md:col-span-2" : ""}`}
    >
      <motion.div
        className="card h-full cursor-pointer"
        whileHover={{
          scale: 1.02,
          y: -4,
          transition: { duration: 0.2 }
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full bg-${project.statusColor}-500/20 text-${project.statusColor}-400 border border-${project.statusColor}-500/30`}>
            {project.badge}
          </span>
          {project.status.includes("Live") && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" />
              <span className="text-xs text-secondary-400 font-medium">LIVE</span>
            </div>
          )}
        </div>

        {/* Project Icon/Image */}
        <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
          {project.image}
        </div>

        {/* Title */}
        <h3 className="heading-4 mb-2 group-hover:text-gradient-primary transition-all">
          {project.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4">{project.subtitle}</p>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Impact */}
        {project.impact && (
          <div className="flex items-start gap-2 mb-4 p-3 glass-dark rounded-lg">
            <TrendingUp size={16} className="text-accent-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-300">
              <span className="font-semibold text-accent-400">Impact:</span> {project.impact}
            </p>
          </div>
        )}

        {/* Features (if expanded or featured) */}
        {(isExpanded || project.featured) && project.features.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-4"
          >
            <h4 className="text-sm font-semibold mb-2 text-primary-400">Key Features:</h4>
            <ul className="space-y-1">
              {project.features.map((feature, i) => (
                <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                  <CheckCircle size={12} className="text-secondary-400 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs glass rounded-full text-primary-400 hover:bg-white/10 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          {project.url !== "#" && (
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-primary text-center text-sm py-2 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} />
              Visit Live Site
            </motion.a>
          )}
          {project.featured && (
            <motion.button
              className="px-4 py-2 btn-outline text-sm flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? "Less Info" : "Case Study"}
            </motion.button>
          )}
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none -z-10" />
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [showAllProjects, setShowAllProjects] = useState(false);

  const filteredProjects = projects.filter(
    (project) => activeFilter === "all" || project.category === activeFilter
  );

  // Show only 4 projects initially (featured + commercial)
  const displayedProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 4);
  const hasMoreProjects = filteredProjects.length > 4;

  const categories = [
    { id: "all" as Category, label: "All Projects", icon: Code2 },
    { id: "commercial" as Category, label: "Commercial", icon: Briefcase },
    { id: "startup" as Category, label: "Startups", icon: Rocket },
    { id: "demo" as Category, label: "Tech Demos", icon: Star },
  ];

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-2 mb-4">
            Commercial <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Real-world applications built for businesses, startups, and production environments
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 transition-all ${activeFilter === category.id
                  ? "bg-gradient-primary text-white shadow-lg shadow-primary-500/50"
                  : "glass hover:bg-white/10"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon size={16} />
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid (Masonry Style) */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* Show More/Less Projects Button */}
        {hasMoreProjects && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center mb-12"
          >
            <motion.button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="btn-outline inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code2 size={18} />
              {showAllProjects ? `Show Less (${filteredProjects.length - 4} hidden)` : `View All Projects (${filteredProjects.length - 4} more)`}
            </motion.button>
          </motion.div>
        )}

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { label: "Commercial Projects", value: "3", icon: Briefcase },
            { label: "Startup Projects", value: "3", icon: Rocket },
            { label: "Live & Active", value: "4", icon: CheckCircle },
            { label: "Tech Stack Items", value: "15+", icon: Code2 },
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">
            Want to see more or discuss a project?
          </p>
          <motion.a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Briefcase size={20} />
            Let's Work Together
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}
