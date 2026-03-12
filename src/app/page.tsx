// src/app/page.tsx
// The public portfolio — your main SPA page.
// All sections are rendered here and scroll into view.
//
// PHP equivalent: your index.php that includes all section partials.

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
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

        <section id="about">
          <About />
        </section>

        <section id="skills">
          <Skills />
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
