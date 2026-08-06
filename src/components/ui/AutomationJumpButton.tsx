// src/components/ui/AutomationJumpButton.tsx
// Floating pill that appears while the visitor is anywhere in the Projects
// section but hasn't yet scrolled to the Automation Case Studies part —
// clicking it smooth-scrolls them there. Hides once that section is
// actually in view, since the nudge is no longer needed at that point.

"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function AutomationJumpButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const projectsSection = document.getElementById("projects");
    const automationSection = document.getElementById("automation-case-studies");
    if (!projectsSection || !automationSection) return;

    let inProjects = false;
    let inAutomation = false;

    const updateVisibility = () => setVisible(inProjects && !inAutomation);

    const projectsObserver = new IntersectionObserver(
      ([entry]) => {
        inProjects = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0.05 }
    );
    const automationObserver = new IntersectionObserver(
      ([entry]) => {
        inAutomation = entry.isIntersecting;
        updateVisibility();
      },
      { threshold: 0.05 }
    );

    projectsObserver.observe(projectsSection);
    automationObserver.observe(automationSection);

    return () => {
      projectsObserver.disconnect();
      automationObserver.disconnect();
    };
  }, []);

  const handleClick = () => {
    const el = document.getElementById("automation-case-studies");
    if (!el) return;
    // Manual offset instead of plain scrollIntoView so the heading doesn't
    // land tucked directly under the floating navbar pill.
    const offset = 110;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 pl-4 pr-3.5 py-3 rounded-full bg-[var(--navy)] text-[var(--cream)] text-sm font-medium shadow-xl hover:bg-[var(--navy-soft)] hover:-translate-y-0.5 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <span className="hidden sm:inline">AI Automation Case Studies</span>
      <span className="sm:hidden">Automation Below</span>
      <ChevronDown size={16} />
    </button>
  );
}