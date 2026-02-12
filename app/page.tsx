import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import GitHub from "@/components/sections/GitHub";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Background gradient mesh */}
      <div className="fixed inset-0 bg-mesh opacity-30 pointer-events-none" />
      <div className="fixed inset-0 noise-overlay pointer-events-none" />

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
