// src/components/sections/Hero.tsx
//
// PHOTO: already wired to /images/portrait.png — no change needed.

"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

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
    <div className="relative min-h-screen overflow-hidden bg-[var(--cream)]">

      {/* Dot-grid texture, top right */}
      <div
        className="absolute top-20 right-16 w-40 h-40 opacity-40 pointer-events-none hidden lg:block"
        style={{
          backgroundImage: "radial-gradient(circle, var(--gold) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-36 md:pt-44 pb-20 grid lg:grid-cols-2 gap-16 items-start min-h-screen">

        {/* Left — text content */}
        <div>
          {/* Eyebrow */}
          <p
            style={fade("0s")}
            className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-6 text-[var(--gold-dark)]"
          >
            Full Stack Developer &nbsp;•&nbsp; AI Automation Specialist
          </p>

          {/* Headline — short, punchy, navy only */}
          <h1
            style={fade("0.1s")}
            className="font-serif-display font-bold text-4xl md:text-5xl leading-[1.15] mb-4 text-[var(--navy)]"
          >
            AI Automation Specialist with
            Web Development Foundation
          </h1>

          {/* Subheadline — separate element, its own smaller size, gold accent */}
          <p
            style={fade("0.18s")}
            className="font-serif-display font-semibold text-lg md:text-xl leading-snug mb-6 text-[var(--gold)]"
          >
            I build automations that save time, eliminate repetitive work, and
            help businesses grow.
          </p>

          {/* Decorative divider */}
          <svg style={fade("0.25s")} width="120" height="16" viewBox="0 0 120 16" fill="none" className="mb-6">
            <path
              d="M2 8 Q 20 -2, 40 8 T 80 8 T 118 8"
              stroke="var(--gold)"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>

          {/* Description */}
          <p
            style={fade("0.32s")}
            className="text-base md:text-lg max-w-lg mb-10 leading-relaxed text-[var(--text-muted)]"
          >
            I design and build intelligent automation workflows, AI-powered
            systems, and modern web applications that streamline operations
            and drive real results.
          </p>

          {/* CTAs */}
          <div style={fade("0.4s")} className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-medium text-sm bg-[var(--navy)] text-[var(--cream)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2"
            >
              View My Work
              <ArrowUpRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-medium text-sm border border-[var(--navy)] text-[var(--navy)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--navy)] hover:text-[var(--cream)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2"
            >
              Let&apos;s Work Together
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* Right — photo */}
        <div
          style={fade("0.2s")}
          className="relative flex justify-center lg:justify-end lg:-mt-14"
        >
          <div className="relative w-full max-w-md aspect-[4/5]">

            {/* Soft circle — centered on THIS box specifically via flexbox,
                so it always tracks the photo even if the headline column
                changes height or width. */}
            <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none">
              <div className="w-[440px] h-[440px] rounded-full bg-[var(--cream-deep)]" />
            </div>

            <div className="relative w-full h-full overflow-hidden z-10">
              <img
                src="/images/portrait.png"
                alt="Alced Jhon Madiales"
                className="w-full h-full object-contain object-bottom"
                style={{
                  maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}