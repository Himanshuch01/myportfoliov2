"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Github, Star, GitFork, Code2, TrendingUp,
  Award, ExternalLink, Calendar, Activity,
  Loader2, AlertCircle,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface GitHubData {
  stats: {
    totalRepos: number;
    followers: number;
    totalContributions: number;
    starsEarned: number;
  };
  featured: {
    name: string; description: string; language: string;
    stars: number; forks: number; url: string; updatedAt: string;
  }[];
  recentActivity: { repo: string; commits: number; pushedAt: string }[];
  languageBreakdown: { name: string; percentage: number; color: string }[];
  contributionWeeks: {
    contributionDays: { contributionCount: number; date: string }[];
  }[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return `${Math.floor(d / 30)}mo ago`;
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
  "C++": "#f34b7d", Java: "#b07219", PHP: "#4F5D95",
};

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let raf: number, start: number;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1800, 1);
      setCount(Math.floor(p * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Contribution graph — enhanced ────────────────────────────────────────────
const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", ""];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// 5-level palette: index 0 = empty, 1-4 = low → high
const LIGHT_LEVELS = ["#e8e8f0", "#c4b5fd", "#a78bfa", "#7c3aed", "#4c1d95"];
const DARK_LEVELS = ["#1e1e2e", "#2e1b5e", "#5b21b6", "#7c3aed", "#a855f7"];

function cellColor(count: number, max: number, dark: boolean) {
  if (count === 0) return dark ? DARK_LEVELS[0] : LIGHT_LEVELS[0];
  const ratio = count / max;
  const lvl = ratio > 0.75 ? 4 : ratio > 0.5 ? 3 : ratio > 0.25 ? 2 : 1;
  return dark ? DARK_LEVELS[lvl] : LIGHT_LEVELS[lvl];
}

function ContributionGraph({ weeks }: { weeks: GitHubData["contributionWeeks"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [dark, setDark] = useState(false);

  // Detect theme
  useEffect(() => {
    const check = () => setDark(document.documentElement.classList.contains("dark"));
    check();
    const ob = new MutationObserver(check);
    ob.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => ob.disconnect();
  }, []);

  // Seeded fallback
  const seeded = (seed: number) => { const x = Math.sin(seed + 9999) * 10000; return x - Math.floor(x); };

  const displayWeeks = weeks.length > 0
    ? weeks
    : [...Array(52)].map((_, wi) => ({
      contributionDays: [...Array(7)].map((_, di) => ({
        contributionCount: Math.round(Math.pow(seeded(wi * 7 + di), 2) * 12),
        date: "",
      })),
    }));

  const maxCount = Math.max(...displayWeeks.flatMap(w => w.contributionDays.map(d => d.contributionCount)), 1);

  // Build month labels: find first week index per month
  const monthMarkers: { label: string; weekIdx: number }[] = [];
  displayWeeks.forEach((week, wi) => {
    const firstDay = week.contributionDays.find(d => d.date);
    if (firstDay?.date) {
      const d = new Date(firstDay.date);
      if (d.getDate() <= 7) {
        const label = MONTH_NAMES[d.getMonth()];
        if (!monthMarkers.length || monthMarkers[monthMarkers.length - 1].label !== label) {
          monthMarkers.push({ label, weekIdx: wi });
        }
      }
    }
  });

  const CELL = 14; // px per cell
  const GAP = 3;  // px gap

  return (
    <div ref={ref} className="overflow-x-auto select-none">
      <div className="flex gap-2">
        {/* Day-of-week labels */}
        <div className="flex flex-col pt-6" style={{ gap: GAP }}>
          {DAY_LABELS.map((label, i) => (
            <div key={i} style={{ height: CELL, fontSize: 10, lineHeight: `${CELL}px` }}
              className="text-right pr-1 text-slate-400 dark:text-slate-600 w-7">
              {label}
            </div>
          ))}
        </div>

        <div>
          {/* Month labels row */}
          <div className="flex mb-1" style={{ gap: GAP }}>
            {displayWeeks.map((_, wi) => {
              const marker = monthMarkers.find(m => m.weekIdx === wi);
              return (
                <div key={wi} style={{ width: CELL, fontSize: 10 }}
                  className="text-slate-400 dark:text-slate-500 whitespace-nowrap overflow-visible">
                  {marker?.label ?? ""}
                </div>
              );
            })}
          </div>

          {/* Grid */}
          <div className="flex" style={{ gap: GAP }}>
            {displayWeeks.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
                {week.contributionDays.map((day, di) => {
                  const bg = cellColor(day.contributionCount, maxCount, dark);
                  const delay = (wi * 7 + di) * 0.0006;
                  return (
                    <motion.div
                      key={di}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay, duration: 0.2, ease: "backOut" }}
                      whileHover={{ scale: 1.5, zIndex: 10 }}
                      style={{ width: CELL, height: CELL, backgroundColor: bg, borderRadius: 3 }}
                      className="cursor-pointer relative"
                      onMouseEnter={(e) => {
                        if (!day.date && day.contributionCount === 0) return;
                        const rect = (e.target as HTMLElement).getBoundingClientRect();
                        setTooltip({
                          text: day.date
                            ? `${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""} · ${day.date}`
                            : `${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""}`,
                          x: rect.left + rect.width / 2,
                          y: rect.top - 8,
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 px-2.5 py-1.5 rounded-lg text-xs font-medium
                     bg-gray-900 dark:bg-white text-white dark:text-gray-900
                     shadow-xl pointer-events-none -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
          <div className="absolute left-1/2 -translate-x-1/2 top-full
                          border-4 border-transparent border-t-gray-900 dark:border-t-white" />
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 text-[11px] text-slate-400 dark:text-slate-500">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map(lvl => (
          <div key={lvl} className="rounded-sm"
            style={{
              width: CELL, height: CELL,
              backgroundColor: dark ? DARK_LEVELS[lvl] : LIGHT_LEVELS[lvl],
              border: `1px solid ${dark ? "#ffffff18" : "#00000010"}`
            }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

// ── Repo card ─────────────────────────────────────────────────────────────────
function RepoCard({ repo, index }: { repo: GitHubData["featured"][0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const langColor = LANG_COLORS[repo.language] || "#6366f1";

  return (
    <motion.a
      ref={ref}
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="glass rounded-2xl p-5 border border-white/20 dark:border-white/10
                 hover:border-indigo-400/30 hover:shadow-lg hover:shadow-indigo-500/10
                 transition-all group relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Code2 size={16} className="text-indigo-500 flex-shrink-0" />
          <h3 className="font-bold text-sm group-hover:text-indigo-500 transition-colors"
            style={{ color: "rgb(var(--text-primary))" }}>
            {repo.name}
          </h3>
        </div>
        <ExternalLink size={14} className="text-slate-400 group-hover:text-indigo-400 transition-colors flex-shrink-0" />
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed mb-4 line-clamp-2"
        style={{ color: "rgb(var(--text-tertiary))" }}>
        {repo.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs" style={{ color: "rgb(var(--text-tertiary))" }}>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: langColor }} />
            {repo.language}
          </div>
          <div className="flex items-center gap-1">
            <Star size={11} /> {repo.stars}
          </div>
          <div className="flex items-center gap-1">
            <GitFork size={11} /> {repo.forks}
          </div>
        </div>
        <span className="text-[10px] font-medium text-emerald-500">
          {timeAgo(repo.updatedAt)}
        </span>
      </div>

      {/* Subtle hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0
                      group-hover:from-indigo-500/5 group-hover:to-purple-500/5
                      transition-all rounded-2xl pointer-events-none" />
    </motion.a>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function GitHub() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setData(d);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const stats = data?.stats ?? { totalRepos: 20, followers: 0, totalContributions: 249, starsEarned: 8 };

  return (
    <section id="github" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -z-10
                      bg-indigo-400/6 dark:bg-indigo-600/8" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl -z-10
                      bg-purple-400/6 dark:bg-purple-600/8" />

      <div className="container-custom">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold
                           tracking-widest uppercase mb-4
                           bg-indigo-50 dark:bg-indigo-900/30
                           text-indigo-600 dark:text-indigo-400
                           border border-indigo-200/60 dark:border-indigo-700/40">
            Open Source
          </span>
          <h2 className="heading-2 mb-3">
            GitHub &amp; <span className="gradient-text">Activity</span>
          </h2>
          <p className="max-w-xl mx-auto text-sm" style={{ color: "rgb(var(--text-tertiary))" }}>
            Real-time stats pulled live from the GitHub API
          </p>

          {/* Live indicator */}
          <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full
                          bg-emerald-500/10 border border-emerald-400/20">
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            />
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-300">
              {loading ? "Loading…" : error ? "Using cached data" : "Live data"}
            </span>
          </div>
        </motion.div>

        {/* Loading skeleton */}
        {loading && (
          <div className="flex flex-col items-center gap-3 py-20">
            <Loader2 size={28} className="text-indigo-500 animate-spin" />
            <p className="text-sm" style={{ color: "rgb(var(--text-tertiary))" }}>
              Fetching GitHub data…
            </p>
          </div>
        )}

        {/* Error banner (non-blocking — still shows fallback stats) */}
        {error && !loading && (
          <div className="flex items-center gap-2 mb-8 px-4 py-3 rounded-2xl
                          bg-amber-50 dark:bg-amber-900/20 border border-amber-200/50
                          dark:border-amber-700/30 text-amber-700 dark:text-amber-300 text-sm">
            <AlertCircle size={15} className="flex-shrink-0" />
            <span>Could not reach GitHub API — showing last known data.</span>
          </div>
        )}

        {!loading && (
          <>
            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12"
            >
              {[
                { label: "Repositories", value: stats.totalRepos, icon: Code2, suffix: "" },
                { label: "Contributions", value: stats.totalContributions, icon: Activity, suffix: "+" },
                { label: "Followers", value: stats.followers, icon: TrendingUp, suffix: "" },
                { label: "Stars Earned", value: stats.starsEarned, icon: Star, suffix: "" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-4 text-center
                             border border-white/20 dark:border-white/10
                             hover:border-indigo-400/30 transition-all"
                >
                  <s.icon size={18} className="text-indigo-500 mx-auto mb-2" />
                  <div className="text-2xl font-black gradient-text mb-0.5">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-[11px]" style={{ color: "rgb(var(--text-tertiary))" }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contribution graph */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 }}
              className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10 mb-10"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold" style={{ color: "rgb(var(--text-primary))" }}>
                  Contribution Activity
                </h3>
                <span className="text-sm font-semibold gradient-text">
                  <AnimatedCounter value={stats.totalContributions} suffix="+" /> this year
                </span>
              </div>
              <ContributionGraph weeks={data?.contributionWeeks ?? []} />
            </motion.div>

            {/* Featured repos */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45 }}
              className="mb-10"
            >
              <h3 className="font-bold mb-5" style={{ color: "rgb(var(--text-primary))" }}>
                Featured Repositories
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {(data?.featured ?? []).map((repo, i) => (
                  <RepoCard key={repo.name} repo={repo} index={i} />
                ))}
              </div>
            </motion.div>

            {/* Activity + Languages */}
            <div className="grid lg:grid-cols-2 gap-6 mb-10">
              {/* Recent activity */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.55 }}
                className="glass rounded-2xl p-5 border border-white/20 dark:border-white/10"
              >
                <h3 className="font-bold flex items-center gap-2 mb-5"
                  style={{ color: "rgb(var(--text-primary))" }}>
                  <Calendar size={16} className="text-amber-500" /> Recent Pushes
                </h3>
                <div className="space-y-3">
                  {(data?.recentActivity ?? []).map((act, i) => (
                    <div key={i}
                      className="flex items-start gap-3 p-3 rounded-xl
                                    bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/10">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-semibold text-sm truncate"
                            style={{ color: "rgb(var(--text-primary))" }}>
                            {act.repo}
                          </span>
                          <span className="text-[10px] flex-shrink-0 ml-2"
                            style={{ color: "rgb(var(--text-tertiary))" }}>
                            {timeAgo(act.pushedAt)}
                          </span>
                        </div>
                        <p className="text-xs" style={{ color: "rgb(var(--text-tertiary))" }}>
                          {act.commits} commit{act.commits !== 1 ? "s" : ""} pushed
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Language breakdown */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.55 }}
                className="glass rounded-2xl p-5 border border-white/20 dark:border-white/10"
              >
                <h3 className="font-bold flex items-center gap-2 mb-5"
                  style={{ color: "rgb(var(--text-primary))" }}>
                  <Code2 size={16} className="text-indigo-500" /> Language Breakdown
                </h3>
                <div className="space-y-3.5">
                  {(data?.languageBreakdown ?? []).map((lang, i) => (
                    <div key={lang.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: lang.color }} />
                          <span className="text-sm font-medium"
                            style={{ color: "rgb(var(--text-secondary))" }}>
                            {lang.name}
                          </span>
                        </div>
                        <span className="text-xs font-semibold" style={{ color: lang.color }}>
                          {lang.percentage}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${lang.percentage}%` } : {}}
                          transition={{ duration: 0.9, delay: 0.7 + i * 0.08, ease: "easeOut" }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: lang.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <motion.a
                href="https://github.com/Himanshuch01"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2.5 px-7 py-3 rounded-2xl font-semibold text-sm
                           bg-gradient-to-r from-indigo-600 to-purple-600 text-white
                           shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow"
              >
                <Github size={18} />
                View Full GitHub Profile
              </motion.a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
