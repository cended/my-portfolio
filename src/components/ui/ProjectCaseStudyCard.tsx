// src/components/ui/ProjectCaseStudyCard.tsx
// Card + expandable case-study modal for the static automation projects.
// Hover effect matches the reference site: image wash + zoom icon,
// card lift, and a soft ambient glow — reworked in your gold/navy palette.

"use client";

import { useState } from "react";
import { Search, ArrowRight, X } from "lucide-react";
import type { AutomationProject } from "@/data/projects";

interface ProjectCaseStudyCardProps {
  project: AutomationProject;
}

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2.5 py-1 rounded-full border-2 border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--navy)] text-[10px] font-mono font-semibold uppercase tracking-widest">
      {children}
    </span>
  );
}

export default function ProjectCaseStudyCard({ project }: ProjectCaseStudyCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <>
      {/* Card */}
      <div className="group relative h-full" onClick={() => setExpanded(true)}>

        {/* Ambient glow — fades in behind the card on hover */}
        <div className="absolute -inset-2 rounded-3xl bg-[var(--gold)]/25 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 pointer-events-none" />

        <div className="relative flex flex-col h-full rounded-2xl overflow-hidden border border-[var(--cream-deep)] bg-white/60 cursor-pointer transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-[var(--gold)]/50">

          {/* Image — fixed height, image itself zooms slightly on hover */}
          <div className="relative w-full h-56 bg-[var(--cream-deep)] overflow-hidden shrink-0">
            {!imgError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.image}
                alt={project.title}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-mono text-xs text-[var(--gold-dark)] uppercase tracking-widest text-center px-4">
                  screenshot placeholder
                </span>
              </div>
            )}

            {/* Hover wash + zoom icon */}
            <div className="absolute inset-0 bg-[var(--cream)]/0 group-hover:bg-[var(--cream)]/40 transition-colors duration-300 flex items-center justify-center">
              <div className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                <Search size={18} className="text-[var(--navy)]" />
              </div>
            </div>
          </div>

          {/* Body — description flex-grows to absorb height differences, so every
              card ends up the same total height regardless of title/text length */}
          <div className="flex flex-col flex-1 p-5 gap-3">
            <div className="flex flex-wrap gap-2">
              <TagPill>{project.platform}</TagPill>
              <TagPill>{project.tag}</TagPill>
            </div>
            <h3 className="font-serif-display font-semibold text-lg text-[var(--navy)] leading-snug min-h-[3.25rem]">
              {project.title}
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-3 flex-1">
              {project.cardDescription}
            </p>
            <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--gold-dark)] pt-1">
              See case study
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={() => setExpanded(false)}
        >
          <div className="absolute inset-0 bg-[var(--navy)]/70 backdrop-blur-sm" />

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] rounded-2xl border border-[var(--cream-deep)] bg-[var(--cream)] shadow-2xl overflow-hidden"
          >
            {/* Close button — sibling of the scrollable div below, so it
                stays fixed in the corner instead of scrolling with content */}
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--navy)]/10 hover:bg-[var(--navy)]/20 text-[var(--navy)] transition-all"
            >
              <X size={16} />
            </button>

            {/* Scrollable content */}
            <div className="max-h-[90vh] overflow-y-auto">

            {!imgError && (
              <div className="relative w-full h-56 md:h-64 bg-[var(--cream-deep)] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-6 md:p-8 space-y-6">
              <div className="flex flex-wrap gap-2">
                <TagPill>{project.platform}</TagPill>
                <TagPill>{project.tag}</TagPill>
              </div>

              <h2 className="font-serif-display font-bold text-2xl md:text-3xl text-[var(--navy)] leading-tight">
                {project.title}
              </h2>

              <p className="text-[var(--text-muted)] leading-relaxed">
                {project.briefDescription}
              </p>

              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--gold-dark)] mb-2">
                  Business Problem
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {project.businessProblem}
                </p>
              </div>

              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--gold-dark)] mb-2">
                  Solution
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {project.solution}
                </p>
              </div>

              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--gold-dark)] mb-3">
                  How It Works
                </h3>
                <ol className="space-y-3">
                  {project.workflowSteps.map((step, i) => (
                    <li key={step.title} className="flex gap-3">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-[var(--navy)] text-[var(--cream)] text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-sm text-[var(--navy)]">{step.title}</p>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}