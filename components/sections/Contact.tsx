"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail, Linkedin, Phone, Github, Send, CheckCircle,
  ArrowRight, Copy, Check, Sparkles
} from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "himanshuch.dev@gmail.com",
    href: "mailto:himanshuch.dev@gmail.com",
    color: "#6366f1",
    copyable: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/chimanshu",
    href: "https://linkedin.com/in/chimanshu",
    color: "#0A66C2",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/Himanshuch01",
    href: "https://github.com/Himanshuch01",
    color: "#6366f1",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8601748352",
    href: "tel:+918601748352",
    color: "#10b981",
  },
];

const projectTypes = [
  "Freelance Project",
  "Job Opportunity",
  "Collaboration",
  "Just Saying Hi",
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState({
    name: "", email: "", projectType: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setIsSuccess(true);
      setFormData({ name: "", email: "", projectType: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("himanshuch.dev@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-600";

  return (
    <section id="contact" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          {/* badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-indigo-500 mb-5">
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            />
            Available for new projects
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Have a project{" "}
            <span className="gradient-text">in mind?</span>
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgb(var(--text-tertiary))" }}>
            I'm open to freelance work, full-time roles, and interesting collaborations. Drop a message and I'll get back to you within 24 hours.
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-5 gap-8 items-start max-w-5xl mx-auto">

          {/* LEFT — Contact Info (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-2 space-y-3"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-4">
              Contact
            </p>

            {contactLinks.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.07 }}
              >
                {item.copyable ? (
                  /* Email row with copy */
                  <div className="flex items-center gap-3 p-4 rounded-2xl glass group hover:ring-1 hover:ring-indigo-500/30 transition-all">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}18` }}
                    >
                      <item.icon size={16} style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium truncate" style={{ color: "rgb(var(--text-primary))" }}>
                        {item.value}
                      </p>
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1.5 rounded-lg hover:bg-indigo-500/10 transition-colors"
                      title="Copy email"
                    >
                      {copiedEmail
                        ? <Check size={14} className="text-emerald-400" />
                        : <Copy size={14} className="text-slate-400" />
                      }
                    </button>
                  </div>
                ) : (
                  /* Regular link row */
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-2xl glass group hover:ring-1 hover:ring-indigo-500/30 transition-all"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}18` }}
                    >
                      <item.icon size={16} style={{ color: item.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium truncate" style={{ color: "rgb(var(--text-primary))" }}>
                        {item.value}
                      </p>
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all"
                    />
                  </a>
                )}
              </motion.div>
            ))}

            {/* Resume download */}
            <motion.a
              href="https://drive.google.com/file/d/1lSWuDZT8Xzi8lpMM9yoycfTi1Tv7TeDR/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border-2 border-dashed text-sm font-medium transition-all mt-2
                         border-indigo-200 dark:border-indigo-900 text-indigo-500
                         hover:bg-indigo-500 hover:text-white hover:border-indigo-500"
            >
              <Sparkles size={15} />
              View Resume
            </motion.a>
          </motion.div>

          {/* RIGHT — Form (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="card !p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-6">
                Send a Message
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name + Email side by side */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "rgb(var(--text-secondary))" }}>
                      Name <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className={inputBase}
                      style={{
                        background: "rgba(var(--bg-tertiary), 0.6)",
                        border: "1px solid rgba(var(--border-color), 0.5)",
                        color: "rgb(var(--text-primary))",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "rgb(var(--text-secondary))" }}>
                      Email <span className="text-indigo-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@email.com"
                      className={inputBase}
                      style={{
                        background: "rgba(var(--bg-tertiary), 0.6)",
                        border: "1px solid rgba(var(--border-color), 0.5)",
                        color: "rgb(var(--text-primary))",
                      }}
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "rgb(var(--text-secondary))" }}>
                    Project Type <span className="text-indigo-400">*</span>
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className={inputBase}
                    style={{
                      background: "rgba(var(--bg-tertiary), 0.6)",
                      border: "1px solid rgba(var(--border-color), 0.5)",
                      color: formData.projectType ? "rgb(var(--text-primary))" : "rgb(var(--text-tertiary))",
                    }}
                  >
                    <option value="">Select a type…</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "rgb(var(--text-secondary))" }}>
                    Message <span className="text-indigo-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project…"
                    className={`${inputBase} resize-none`}
                    style={{
                      background: "rgba(var(--bg-tertiary), 0.6)",
                      border: "1px solid rgba(var(--border-color), 0.5)",
                      color: "rgb(var(--text-primary))",
                    }}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  whileHover={!isSubmitting && !isSuccess ? { scale: 1.01 } : {}}
                  whileTap={!isSubmitting && !isSuccess ? { scale: 0.98 } : {}}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm text-white
                             bg-indigo-600 hover:bg-indigo-700
                             disabled:opacity-70 transition-colors duration-200
                             flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending…
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle size={16} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {isSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-xs text-emerald-500 flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle size={13} />
                    Message sent! I'll get back to you within 24–48 hours.
                  </motion.p>
                )}

                {errorMsg && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-xs text-red-500"
                  >
                    ⚠️ {errorMsg}
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
