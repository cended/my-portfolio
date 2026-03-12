"use client";

import { useState } from "react";
import { Github, ExternalLink, Star, ChevronLeft, ChevronRight, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const hasImages = project.images && project.images.length > 0;
  const hasMultiple = project.images && project.images.length > 1;

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
      {/* ── Card ── */}
      <div
        onClick={() => setExpanded(true)}
        className={cn(
          "group flex flex-col rounded-2xl overflow-hidden border border-white/5 bg-slate-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-2xl hover:shadow-black/40 cursor-pointer",
          featured && "border-blue-500/15 hover:border-blue-500/30 hover:shadow-blue-500/10"
        )}>

        {/* Image */}
        <div className="relative w-full h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
          {hasImages ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={imgIndex}
                src={project.images[imgIndex]}
                alt={`${project.title} screenshot ${imgIndex + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-mono text-3xl text-slate-700 select-none">{"{ }"}</span>
            </div>
          )}

          {hasMultiple && (
            <>
              <button onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-all border border-white/10">
                <ChevronLeft size={14} />
              </button>
              <button onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-all border border-white/10">
                <ChevronRight size={14} />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
                {project.images.map((_, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                    className={`transition-all rounded-full ${i === imgIndex ? "w-4 h-1 bg-white" : "w-1 h-1 bg-white/40"}`} />
                ))}
              </div>
            </>
          )}

          {project.featured && (
            <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs rounded-full font-mono backdrop-blur-sm">
              <Star size={9} fill="currentColor" />featured
            </div>
          )}

          {/* Expand hint */}
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-1 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-xs font-mono rounded-md border border-white/10">
              <ArrowUpRight size={11} />
              view details
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          <h3 className="font-mono font-semibold text-white text-base leading-tight">
            {project.title}
          </h3>

          {/* Description — clamped on card */}
          <p className="text-slate-500 text-sm leading-relaxed flex-1 line-clamp-2">
            {project.description}
          </p>

          {project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 4).map((tech) => (
                <span key={tech}
                  className="px-2 py-0.5 bg-blue-500/8 border border-blue-500/15 text-blue-400/80 text-xs font-mono rounded-md">
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="text-slate-600 text-xs font-mono self-center">
                  +{project.techStack.length - 4} more
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="flex items-center gap-4">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-white text-xs font-mono transition-colors">
                  <Github size={13} />source
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-blue-400/70 hover:text-blue-300 text-xs font-mono transition-colors">
                  <ExternalLink size={13} />live demo
                </a>
              )}
            </div>
            <span className="text-slate-700 text-xs font-mono">click to expand</span>
          </div>
        </div>
      </div>

      {/* ── Modal / Expanded View ── */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={() => setExpanded(false)}>

          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal content */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/60">

            {/* Close button */}
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all">
              <X size={16} />
            </button>

            {/* Modal image carousel */}
            {hasImages && (
              <div className="relative w-full h-56 md:h-72 overflow-hidden rounded-t-2xl bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.images[imgIndex]}
                  alt={`${project.title} ${imgIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                {hasMultiple && (
                  <>
                    <button onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-all border border-white/10">
                      <ChevronLeft size={18} />
                    </button>
                    <button onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-all border border-white/10">
                      <ChevronRight size={18} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                      {project.images.map((_, i) => (
                        <button key={i} onClick={() => setImgIndex(i)}
                          className={`transition-all rounded-full ${i === imgIndex ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`} />
                      ))}
                    </div>
                    <div className="absolute bottom-4 right-4 px-2 py-0.5 bg-black/60 text-white text-xs font-mono rounded-md">
                      {imgIndex + 1} / {project.images.length}
                    </div>
                  </>
                )}

                {project.featured && (
                  <div className="absolute top-4 left-4 flex items-center gap-1 px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs rounded-full font-mono">
                    <Star size={10} fill="currentColor" />featured project
                  </div>
                )}
              </div>
            )}

            {/* Modal body */}
            <div className="p-6 space-y-5">

              {/* Title */}
              <h2 className="font-mono font-bold text-white text-xl leading-tight pr-8">
                {project.title}
              </h2>

              {/* Full description — no clamp */}
              <p className="text-slate-400 text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Tech stack — all shown */}
              {project.techStack.length > 0 && (
                <div>
                  <p className="text-xs font-mono text-slate-600 uppercase tracking-widest mb-2">tech stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech}
                        className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/5">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-slate-300 hover:text-white text-sm font-mono transition-all hover:border-white/20">
                    <Github size={15} />View Source
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-white text-sm font-mono transition-all shadow-lg shadow-blue-500/20">
                    <ExternalLink size={15} />Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}