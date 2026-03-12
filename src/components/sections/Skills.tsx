// src/components/sections/Skills.tsx
// Skills section — grouped by category.

import type { SkillCategory } from "@/types";

// ✏️ CUSTOMIZE: Update these with your actual skills
const SKILLS: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    skills: ["PHP", "Node.js", "MySQL", "PostgreSQL", "Prisma", "REST APIs"],
  },
  {
    category: "Tools & Workflow",
    skills: ["Git", "GitHub", "VS Code", "Figma", "Postman", "Netlify", "Vercel"],
  },
  {
    category: "Soft Skills",
    skills: ["Critical Thinking", "Problem Solving", "Collaboration", "Resourceful", "Detail-Oriented"],
  },
];

export default function Skills() {
  return (
    <div className="section-padding bg-dark-900/50">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-blue-400 text-sm mb-3">// skills</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            What I Work With
          </h2>
        </div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((group) => (
            <div key={group.category} className="glass rounded-2xl p-6">
              <h3 className="font-display font-semibold text-white text-lg mb-5">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono rounded-lg hover:bg-blue-500/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Currently learning banner */}
        <div className="mt-8 glass rounded-2xl p-6 flex flex-wrap items-center gap-4">
          <span className="font-mono text-blue-400 text-sm whitespace-nowrap">// currently learning:</span>
          <div className="flex flex-wrap gap-2">
            {["Next.js App Router", "Prisma ORM", "TypeScript", "PostgreSQL"].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono rounded-lg"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
