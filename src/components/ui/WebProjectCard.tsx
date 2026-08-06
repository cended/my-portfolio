// src/components/ui/WebProjectCard.tsx
// Card + modal for web development portfolio projects — same visual
// language and hover behavior as ProjectCaseStudyCard, but with a
// multi-photo carousel instead of a single workflow screenshot, and
// a simpler modal (description + tech stack + live link, no
// business-problem/solution/workflow-steps structure).

"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, ArrowRight, X } from "lucide-react";
import type { WebProject } from "@/data/webProjects";

interface WebProjectCardProps {
  project: WebProject;
}

function TechPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2.5 py-1 rounded-full border-2 border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--navy)] text-[10px] font-mono font-semibold uppercase tracking-widest">
      {children}
    </span>
  );
}

export default function WebProjectCard({ project }: WebProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
  const hasMultiple = project.images.length > 1;
  const currentFailed = failedImages.has(imgIndex);

  const markFailed = (i: number) =>
    setFailedImages((prev) => new Set(prev).add(i));

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((i) => (i - 1 + project.images.length) % project.images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((i) => (i + 1) % project.images.length);
  };

  return (
    <>
      {/* Card */}
      <div className="group relative h-full" onClick={() => setExpanded(true)}>

        <div className="absolute -inset-2 rounded-3xl bg-[var(--gold)]/25 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 pointer-events-none" />

        <div className="relative flex flex-col h-full rounded-2xl overflow-hidden border border-[var(--cream-deep)] bg-white/60 cursor-pointer transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-[var(--gold)]/50">

          {/* Image carousel */}
          <div className="relative w-full h-56 bg-[var(--cream-deep)] overflow-hidden shrink-0">
            {!currentFailed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.images[imgIndex]}
                alt={`${project.title} screenshot ${imgIndex + 1}`}
                onError={() => markFailed(imgIndex)}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-mono text-xs text-[var(--gold-dark)] uppercase tracking-widest text-center px-4">
                  screenshot placeholder
                </span>
              </div>
            )}

            {hasMultiple && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-[var(--navy)]/70 text-[var(--cream)] hover:bg-[var(--navy)] transition-all"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-[var(--navy)]/70 text-[var(--cream)] hover:bg-[var(--navy)] transition-all"
                >
                  <ChevronRight size={14} />
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-[var(--navy)]/40">
                  {project.images.map((_, i) => (
                    <span
                      key={i}
                      className={`rounded-full transition-all ${
                        i === imgIndex ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Body */}
          <div className="flex flex-col flex-1 p-5 gap-3">
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 3).map((t) => (
                <TechPill key={t}>{t}</TechPill>
              ))}
              {project.techStack.length > 3 && (
                <span className="text-xs font-mono text-[var(--text-muted)] self-center">
                  +{project.techStack.length - 3} more
                </span>
              )}
            </div>
            <h3 className="font-serif-display font-semibold text-lg text-[var(--navy)] leading-snug min-h-[3.25rem]">
              {project.title}
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-3 flex-1 whitespace-pre-line">
              {project.description}
            </p>
            <div className="flex items-center gap-1.5 text-sm font-medium text-[var(--gold-dark)] pt-1">
              See full details
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
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[var(--navy)]/10 hover:bg-[var(--navy)]/20 text-[var(--navy)] transition-all"
            >
              <X size={16} />
            </button>

            <div className="max-h-[90vh] overflow-y-auto">

              {!currentFailed && (
                <div className="relative w-full h-56 md:h-72 bg-[var(--cream-deep)] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.images[imgIndex]}
                    alt={`${project.title} screenshot ${imgIndex + 1}`}
                    onError={() => markFailed(imgIndex)}
                    className="w-full h-full object-cover"
                  />
                  {hasMultiple && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-[var(--navy)]/70 text-[var(--cream)] hover:bg-[var(--navy)] transition-all"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={next}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-[var(--navy)]/70 text-[var(--cream)] hover:bg-[var(--navy)] transition-all"
                      >
                        <ChevronRight size={18} />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[var(--navy)]/40">
                        {project.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                            className={`rounded-full transition-all ${
                              i === imgIndex ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/60 hover:bg-white/90"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-[var(--navy)]/70 text-[var(--cream)] text-xs font-mono rounded-md">
                        {imgIndex + 1} / {project.images.length}
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="p-6 md:p-8 space-y-6">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((t) => (
                    <TechPill key={t}>{t}</TechPill>
                  ))}
                </div>

                <h2 className="font-serif-display font-bold text-2xl md:text-3xl text-[var(--navy)] leading-tight">
                  {project.title}
                </h2>

                <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>

                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--navy)] text-[var(--cream)] text-sm font-medium hover:bg-[var(--navy-soft)] transition-all"
                  >
                    View Live Site
                    <ExternalLink size={15} />
                  </a>
                ) : (
                  <p className="text-sm font-mono text-[var(--text-muted)] italic">
                    Internal system — not publicly deployed
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}