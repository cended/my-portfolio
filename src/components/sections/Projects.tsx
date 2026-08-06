// src/components/sections/Projects.tsx
// Web Development Projects first, then AI Automation Case Studies. A
// floating button (AutomationJumpButton) tracks scroll position and offers
// a one-click jump to the automation group from anywhere in this section.

import { PROJECTS } from "@/data/projects";
import { WEB_PROJECTS } from "@/data/webProjects";
import ProjectCaseStudyCard from "@/components/ui/ProjectCaseStudyCard";
import WebProjectCard from "@/components/ui/WebProjectCard";
import AutomationJumpButton from "@/components/ui/AutomationJumpButton";

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
            A mix of full-stack web applications and AI automation systems —
            real problems solved, real products shipped.
          </p>
        </div>

        {/* Web Development projects */}
        <div className="mb-6">
          <h3 className="font-serif-display font-bold text-2xl md:text-3xl text-[var(--navy)]">
            Web Development Projects
          </h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {WEB_PROJECTS.map((project) => (
            <WebProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {/* AI Automation case studies — id wraps the FULL block (heading +
            grid), not just the heading, so the jump-button's scroll
            tracking stays accurate all the way through the card grid */}
        <div id="automation-case-studies" className="scroll-mt-28">
          <div className="mb-6">
            <h3 className="font-serif-display font-bold text-2xl md:text-3xl text-[var(--navy)] mb-1">
              AI Automation Case Studies
            </h3>
            <p className="text-sm text-[var(--text-muted)]">
              Click any project to see the business problem, the build, and how it works.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <ProjectCaseStudyCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </div>

      <AutomationJumpButton />
    </div>
  );
}