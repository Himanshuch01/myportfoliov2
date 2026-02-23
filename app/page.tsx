import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import GitHub from "@/components/sections/GitHub";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeBulb from "@/components/ThemeBulb";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Background gradient mesh - Subtle & Modern */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 opacity-50 dark:opacity-70 pointer-events-none" />
      <div className="fixed inset-0 noise-overlay pointer-events-none opacity-30" />

      <ThemeBulb />
      <Navbar />

      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <GitHub />
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
