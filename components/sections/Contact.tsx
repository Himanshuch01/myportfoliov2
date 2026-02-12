"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, Phone, FileDown, Github, Globe, Send, CheckCircle, Copy, Briefcase, TrendingUp, Clock } from "lucide-react";

// Contact methods
const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "himanshuch.dev@gmail.com",
    action: "Send Email",
    href: "mailto:himanshuch.dev@gmail.com",
    color: "primary",
    copyable: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/chimanshu",
    action: "Connect on LinkedIn",
    href: "https://linkedin.com/in/chimanshu",
    color: "secondary",
    badge: "500+ connections",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8601748352",
    action: "Schedule Call",
    href: "tel:+918601748352",
    color: "accent",
    badge: "Available for consultation",
  },
  {
    icon: FileDown,
    label: "Resume",
    value: "Download CV",
    action: "Download Resume",
    href: "/resume.pdf",
    color: "primary",
    download: true,
  },
];

// Social links
const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/Himanshuch01" },
  { icon: Globe, label: "Portfolio", href: "https://codexhimanshu.xyz" },
];

// Project types
const projectTypes = [
  "Freelance Project",
  "Job Opportunity",
  "Collaboration",
  "Just Saying Hi",
];

// Regular button component (magnetic effect removed)
function RegularButton({
  children,
  href,
  onClick,
  download,
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  download?: boolean;
  className?: string;
  type?: "button" | "submit";
}) {
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      download={download}
      onClick={onClick}
      type={!href ? type : undefined}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </Component>
  );
}

// Contact method card
function ContactMethodCard({
  method,
  index,
}: {
  method: typeof contactMethods[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (method.copyable) {
      navigator.clipboard.writeText(method.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group relative overflow-hidden"
    >
      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-${method.color} mb-4 group-hover:scale-110 transition-transform`}>
        <method.icon size={24} className="text-white" />
      </div>

      {/* Label & Value */}
      <h3 className="font-semibold mb-1">{method.label}</h3>
      <p className="text-sm text-gray-400 mb-3">{method.value}</p>

      {/* Badge */}
      {method.badge && (
        <p className="text-xs text-gray-500 mb-4">{method.badge}</p>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <RegularButton
          href={method.href}
          download={method.download}
          className={`flex-1 btn-${method.color} text-sm py-2 flex items-center justify-center gap-2`}
        >
          {method.action}
        </RegularButton>

        {method.copyable && (
          <motion.button
            onClick={handleCopy}
            className="px-3 py-2 glass rounded-lg hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <CheckCircle size={16} className="text-secondary-400" />
            ) : (
              <Copy size={16} className="text-gray-400" />
            )}
          </motion.button>
        )}
      </div>

      {/* Copied notification */}
      {copied && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-2 right-2 px-3 py-1 bg-secondary-500 text-white text-xs rounded-full"
        >
          Copied!
        </motion.div>
      )}

      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-${method.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl pointer-events-none`} />
    </motion.div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        message: "",
        budget: "",
      });
      setIsSuccess(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section-padding relative" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-2 mb-4">
            Let's Build Something <span className="gradient-text">Great Together</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Open to freelance projects, collaborations, and full-time opportunities
          </p>

          {/* Availability Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-secondary-400 rounded-full"
            />
            <span className="text-sm font-medium">Available for new projects</span>
          </motion.div>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* LEFT SIDE - Quick Contact */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h3 className="heading-4 mb-6">Quick Contact</h3>

            {/* Contact Methods */}
            <div className="space-y-4 mb-8">
              {contactMethods.map((method, index) => (
                <ContactMethodCard key={method.label} method={method} index={index} />
              ))}
            </div>

            {/* Social Links */}
            <div className="mb-8">
              <h4 className="font-semibold mb-4">Connect With Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <RegularButton
                    key={social.label}
                    href={social.href}
                    className="p-3 glass rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                  </RegularButton>
                ))}
              </div>
            </div>

            {/* Professional Stats */}
            <div className="card">
              <h4 className="font-semibold mb-4">Why Work With Me?</h4>
              <div className="space-y-3">
                {[
                  { icon: Briefcase, text: "Worked with 3+ businesses" },
                  { icon: TrendingUp, text: "100% project completion rate" },
                  { icon: Globe, text: "Available for remote & on-site work" },
                  { icon: Clock, text: "Response time: 24-48 hours" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 text-sm text-gray-400"
                  >
                    <stat.icon size={16} className="text-primary-400" />
                    {stat.text}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <h3 className="heading-4 mb-6">Send a Message</h3>

            <form onSubmit={handleSubmit} className="card space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name <span className="text-accent-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span className="text-accent-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Company/Role */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company / Role
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                  placeholder="Your company or role"
                />
              </div>

              {/* Project Type */}
              <div>
                <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                  Project Type <span className="text-accent-400">*</span>
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                >
                  <option value="">Select project type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget Range */}
              <div>
                <label htmlFor="budget" className="block text-sm font-medium mb-2">
                  Budget Range (Optional)
                </label>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                  placeholder="e.g., $1000 - $5000"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message <span className="text-accent-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <RegularButton
                type="submit"
                className={`w-full btn-primary py-3 flex items-center justify-center gap-2 ${isSubmitting || isSuccess ? "opacity-75" : ""
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle size={20} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </RegularButton>

              {/* Success Message */}
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-secondary-500/20 border border-secondary-500/30 rounded-lg text-center"
                >
                  <p className="text-secondary-400 font-medium">
                    Thank you! I'll get back to you within 24-48 hours.
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}
