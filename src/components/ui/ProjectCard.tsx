// src/components/ui/ProjectCard.tsx
// Reusable card component for displaying a single project.

import { Github, ExternalLink, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:border-white/20 flex flex-col",
        featured && "border-blue-500/20 hover:border-blue-500/40"
      )}
    >
      {/* Project image or placeholder */}
      <div className="relative w-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 h-44 flex items-center justify-center overflow-hidden">
        {project.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="font-mono text-3xl text-slate-700 select-none">
            {`{ }`}
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs rounded-full">
            <Star size={10} fill="currentColor" />
            Featured
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1 gap-3">

        {/* Title */}
        <h3 className="font-display font-semibold text-white text-lg leading-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack tags */}
        {project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="px-2 py-0.5 text-slate-600 text-xs font-mono">
                +{project.techStack.length - 5} more
              </span>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
            >
              <Github size={15} />
              Source
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              <ExternalLink size={15} />
              Live Demo
            </a>
          )}
          {!project.githubUrl && !project.liveUrl && (
            <span className="text-slate-600 text-xs font-mono">// no links added</span>
          )}
        </div>
      </div>
    </div>
  );
}
