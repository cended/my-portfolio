// src/components/sections/Hero.tsx
// Hero section — the first thing visitors see.
// Features animated entrance, your name, role, and CTA buttons.

import { Github, Linkedin, Mail, ArrowDown, ExternalLink } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-950">

      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Glowing orb — decorative background element */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-mono mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for opportunities
        </div>

        {/* Main heading */}
        <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl text-white leading-none tracking-tight mb-6 animate-fade-up">
          cended
          <br />
          <span className="text-gradient">.dev</span>
        </h1>

        {/* Sub-heading / role */}
        <p className="font-display text-xl md:text-2xl text-slate-400 font-medium mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Full Stack Web Developer
        </p>

        {/* Short bio */}
        <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
          BS Information Technology student at{" "}
          <span className="text-slate-300">WMSU</span>, building functional and
          user-friendly web applications with modern tools.
          Based in <span className="text-slate-300">Zamboanga City, PH</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
          >
            View My Work
            <ExternalLink size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 glass text-slate-300 hover:text-white font-medium rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            Get In Touch
            <Mail size={16} />
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <a
            href="https://github.com/cended"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass rounded-xl text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/alced-jhon-madiales"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass rounded-xl text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:madialesalced@gmail.com"
            className="p-3 glass rounded-xl text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 animate-bounce z-10">
        <ArrowDown size={18} />
        <span className="text-xs font-mono tracking-widest">scroll</span>
      </div>
    </div>
  );
}
