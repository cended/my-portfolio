// src/components/ui/ProjectCard.tsx
// Reusable card component for displaying a single project.

"use client";

import { useState } from "react";
import { Github, ExternalLink, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const [imgIndex, setImgIndex] = useState(0);
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
    <div className={cn(
      "group flex flex-col rounded-2xl overflow-hidden border border-white/5 bg-slate-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-2xl hover:shadow-black/40",
      featured && "border-blue-500/15 hover:border-blue-500/30 hover:shadow-blue-500/10"
    )}>

      {/* ── Image Carousel ── */}
      <div className="relative w-full h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
        {hasImages ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={imgIndex}
              src={project.images[imgIndex]}
              alt={`${project.title} screenshot ${imgIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-3xl text-slate-700 select-none">{"{ }"}</span>
          </div>
        )}

        {/* Navigation arrows — only show if multiple images */}
        {hasMultiple && (
          <>
            <button onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-all border border-white/10 backdrop-blur-sm">
              <ChevronLeft size={14} />
            </button>
            <button onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 hover:bg-black/80 transition-all border border-white/10 backdrop-blur-sm">
              <ChevronRight size={14} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {hasMultiple && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
            {project.images.map((_, i) => (
              <button key={i}
                onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                className={`transition-all rounded-full ${i === imgIndex ? "w-4 h-1 bg-white" : "w-1 h-1 bg-white/40 hover:bg-white/60"}`} />
            ))}
          </div>
        )}

        {/* Image count badge */}
        {hasMultiple && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-xs font-mono rounded-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
            {imgIndex + 1}/{project.images.length}
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-xs rounded-full font-mono backdrop-blur-sm">
            <Star size={9} fill="currentColor" />featured
          </div>
        )}
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-5 gap-3">

        <h3 className="font-mono font-semibold text-white text-base leading-tight">
          {project.title}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        {project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((tech) => (
              <span key={tech}
                className="px-2 py-0.5 bg-blue-500/8 border border-blue-500/15 text-blue-400/80 text-xs font-mono rounded-md">
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="text-slate-700 text-xs font-mono self-center">
                +{project.techStack.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-4 pt-2 border-t border-white/5">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-500 hover:text-white text-xs font-mono transition-colors">
              <Github size={13} />source
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-blue-400/70 hover:text-blue-300 text-xs font-mono transition-colors">
              <ExternalLink size={13} />live demo
            </a>
          )}
          {!project.githubUrl && !project.liveUrl && (
            <span className="text-slate-700 text-xs font-mono">// no links</span>
          )}
        </div>
      </div>
    </div>
  );
}