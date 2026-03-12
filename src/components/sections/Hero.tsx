// src/components/sections/Hero.tsx
"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ArrowDown, ExternalLink } from "lucide-react";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const fade = (delay: string) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.7s ease ${delay}, transform 0.7s ease ${delay}`,
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-950">

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        {/* Status badge */}
        <div style={fade("0s")} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-mono mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for opportunities
        </div>

        {/* Greeting */}
        <div style={fade("0.15s")} className="mb-2">
          <span className="font-mono text-slate-500 text-lg md:text-xl tracking-widest">
            Hi, I&apos;m
          </span>
        </div>

        {/* Name */}
        <h1 style={fade("0.3s")} className="font-display font-extrabold text-6xl md:text-8xl lg:text-9xl text-white leading-none tracking-tight mb-6">
          Alced
          <span className="text-gradient">.</span>
        </h1>

        {/* Role */}
        <p style={fade("0.45s")} className="font-display text-xl md:text-2xl text-slate-400 font-medium mb-4">
          Full Stack Web Developer
        </p>

        {/* Bio */}
        <p style={fade("0.55s")} className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          BS Information Technology student at{" "}
          <span className="text-slate-300">WMSU</span>, building functional and
          user-friendly web applications with modern tools.
          Based in <span className="text-slate-300">Zamboanga City, PH</span>.
        </p>

        {/* CTAs */}
        <div style={fade("0.65s")} className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5">
            View My Work
            <ExternalLink size={16} />
          </a>
          <a href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 glass text-slate-300 hover:text-white font-medium rounded-xl transition-all duration-200 hover:-translate-y-0.5">
            Get In Touch
            <Mail size={16} />
          </a>
        </div>

        {/* Socials */}
        <div style={fade("0.75s")} className="flex items-center justify-center gap-4">
          <a href="https://github.com/cended" target="_blank" rel="noopener noreferrer"
            className="p-3 glass rounded-xl text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/alced-jhon-madiales" target="_blank" rel="noopener noreferrer"
            className="p-3 glass rounded-xl text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="mailto:madialesalced@gmail.com"
            className="p-3 glass rounded-xl text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5" aria-label="Email">
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