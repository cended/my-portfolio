// src/components/sections/Projects.tsx
// Two static, separately-grouped project showcases: AI automation case
// studies and web development projects. No database/admin dependency.

import { PROJECTS } from "@/data/projects";
import { WEB_PROJECTS } from "@/data/webProjects";
import ProjectCaseStudyCard from "@/components/ui/ProjectCaseStudyCard";
import WebProjectCard from "@/components/ui/WebProjectCard";

export default function Projects() {
  return (
    <div className="section-padding bg-[var(--cream-deep)]">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="mb-14">
          <p className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-4 text-[var(--gold-dark)]">
            // projects
          </p>
          <h2 className="font-serif-display font-bold text-4xl md:text-5xl text-[var(--navy)] mb-4">
            Things I&apos;ve Built
          </h2>
          <p className="text-[var(--text-muted)] max-w-xl">
            A mix of AI automation systems and full-stack web applications —
            real problems solved, real products shipped.
          </p>
        </div>

        {/* AI Automation case studies */}
        <div className="mb-6">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--gold-dark)] mb-1">
            AI Automation Case Studies
          </h3>
          <p className="text-sm text-[var(--text-muted)]">
            Click any project to see the business problem, the build, and how it works.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PROJECTS.map((project) => (
            <ProjectCaseStudyCard key={project.slug} project={project} />
          ))}
        </div>

        {/* Web Development projects */}
        <div className="mb-6">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--gold-dark)]">
            Web Development Projects
          </h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WEB_PROJECTS.map((project) => (
            <WebProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}