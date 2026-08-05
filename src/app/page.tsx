// src/app/page.tsx
// The public portfolio — your main SPA page.
// All sections are rendered here and scroll into view.

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      {/* Sticky top navigation */}
      <Navbar />

      {/* Main content — each section has an id for anchor links */}
      <main>
        <section id="home">
          <Hero />
        </section>

        {/* NOTE: not in your stated new site structure (Hero > Skills > Services
            > Experience > Projects > Contact) — left in place since it's your
            existing content. Tell me if you want it merged, kept, or removed. */}

        <section id="skills">
          <Skills />
        </section>

        <section id="services">
          <Services />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-slate-500 text-sm border-t border-white/5">
        <p>
          © {new Date().getFullYear()} Alced Jhon Madiales.
        </p>
      </footer>
    </>
  );
}