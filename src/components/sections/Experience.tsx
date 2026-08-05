// src/components/sections/Experience.tsx
// Experience — your 3 CV projects reframed as work-experience entries.
// Content pulled directly from your CV bullets (accurate, not invented).
// No fabricated employer names added where the CV didn't list one (Campus Elect).

interface ExperienceEntry {
  role: string;
  project: string;
  org?: string;
  location: string;
  bullets: string[];
}

const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Backend Developer",
    project: "Records and Archives System",
    org: "WMSU Records Office",
    location: "Zamboanga City, Philippines",
    bullets: [
      "Built backend logic (PHP/MySQL) with role-based authentication for four user types.",
      "Built the record-submission and inventory dashboard features, including auto-generated document numbering, file uploads, transactional rollback safeguards, and an automated retention-based soft-delete system.",
      "Built the reporting module with chart visualizations and Excel/PDF export.",
    ],
  },
  {
    role: "Full-Stack Developer",
    project: "Campus Elect — Smart Biometric Voting System",
    location: "Zamboanga City, Philippines",
    bullets: [
      "Built a full-stack election platform (PHP, JavaScript, MySQL) with fingerprint (Windows Hello) and facial recognition (face-api.js) authentication.",
      "Developed the complete voting workflow: voter registration and eligibility verification, duplicate vote prevention, real-time vote tallying, and election result archiving.",
      "Implemented configurable election management (positions, candidates, schedules), analytics dashboards, and PDF/Excel report generation; pilot-tested with 28 student participants.",
    ],
  },
  {
    role: "Full-Stack Developer",
    project: "LNSC Centralized Inventory & Branch Management System",
    location: "Zamboanga City, Philippines",
    bullets: [
      "Co-developed a multi-branch inventory system (PHP, JavaScript, MySQL) with real-time stock tracking and inter-branch transfers.",
      "Implemented role-based access control for admin, branch manager, and staff accounts.",
      "Owned post-deployment revisions based on user feedback.",
    ],
  },
];

export default function Experience() {
  return (
    <div className="section-padding bg-[var(--cream)]">
      <div className="max-w-4xl mx-auto">

        {/* Section header */}
        <div className="mb-14">
          <p className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-4 text-[var(--gold-dark)]">
            // experience
          </p>
          <h2 className="font-serif-display font-bold text-4xl md:text-5xl text-[var(--navy)]">
            A Track Record of Shipping
          </h2>
        </div>

        {/* Timeline */}
        <div className="space-y-10">
          {EXPERIENCE.map((entry, index) => (
            <div
              key={entry.project}
              className="relative pl-8 border-l-2 border-[var(--cream-deep)] last:border-transparent pb-2"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[var(--gold)] border-2 border-[var(--cream)]" />

              <p className="font-mono text-xs uppercase tracking-widest text-[var(--gold-dark)] mb-2">
                {String(index + 1).padStart(2, "0")} &nbsp;·&nbsp; {entry.location}
              </p>

              <h3 className="font-serif-display font-semibold text-xl md:text-2xl text-[var(--navy)] mb-1">
                {entry.role}
              </h3>

              <p className="text-sm font-medium text-[var(--text-muted)] mb-4">
                {entry.project}
                {entry.org && <span> · {entry.org}</span>}
              </p>

              <ul className="space-y-2">
                {entry.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-sm leading-relaxed text-[var(--text-muted)] pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[var(--gold)]"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}