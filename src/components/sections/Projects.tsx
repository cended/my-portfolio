// src/components/sections/Projects.tsx
// Projects section — fetches projects from the API dynamically.
// When you add a project via the Admin Dashboard, it appears here automatically.

"use client";

import { useProjects } from "@/hooks/useProjects";
import ProjectCard from "@/components/ui/ProjectCard";
import { Loader2, FolderOpen } from "lucide-react";

export default function Projects() {
  const { projects, loading, error } = useProjects();

  return (
    <div className="section-padding bg-dark-950">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-blue-400 text-sm mb-3">// projects</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Things I&apos;ve Built
          </h2>
          <p className="text-slate-400 max-w-xl">
            A collection of projects from my academic work and personal experiments.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-slate-400">
              <Loader2 size={20} className="animate-spin" />
              <span className="font-mono text-sm">Loading projects...</span>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="glass rounded-2xl p-8 text-center max-w-md">
              <p className="text-red-400 font-mono text-sm mb-2">// error</p>
              <p className="text-slate-400">{error}</p>
            </div>
          </div>
        )}

        {/* Empty state — shown when no projects added yet */}
        {!loading && !error && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="glass rounded-2xl p-10 text-center max-w-md">
              <FolderOpen size={40} className="text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">No projects yet.</p>
              <p className="text-slate-600 text-sm font-mono">
                Log in to /admin to add your first project.
              </p>
            </div>
          </div>
        )}

        {/* Featured projects — shown first */}
        {!loading && !error && projects.length > 0 && (
          <>
            {projects.some((p) => p.featured) && (
              <div className="mb-12">
                <h3 className="font-mono text-slate-500 text-sm mb-6">// featured</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {projects
                    .filter((p) => p.featured)
                    .map((project) => (
                      <ProjectCard key={project.id} project={project} featured />
                    ))}
                </div>
              </div>
            )}

            {/* Other projects */}
            {projects.some((p) => !p.featured) && (
              <div>
                <h3 className="font-mono text-slate-500 text-sm mb-6">// other projects</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {projects
                    .filter((p) => !p.featured)
                    .map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
