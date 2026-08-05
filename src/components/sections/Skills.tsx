// src/components/sections/Skills.tsx
// Skills & Tools — grouped by category, with real brand icons where available.
//
// DEPENDENCY: this file needs react-icons installed:
//   npm install react-icons
//
// ICON NOTE: 5 tools (GoHighLevel, Vapi, Microsoft 365, ChatGPT, Grok) don't
// have official icons in react-icons/si — verified directly against the
// package rather than guessed, since a wrong import breaks the whole build.
// Those five render as small text-badge fallbacks instead.

import type { IconType } from "react-icons";
import {
  SiPhp,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiGit,
  SiGithub,
  SiFigma,
  SiN8N,
  SiMake,
  SiZapier,
  SiAirtable,
  SiAsana,
  SiXero,
  SiMeta,
  SiNotion,
  SiClaude,
  SiDeepseek,
} from "react-icons/si";

interface Tool {
  name: string;
  Icon?: IconType;
  fallback?: string; // short label shown when no verified icon exists
}

interface ToolCategory {
  category: string;
  tools: Tool[];
}

const TOOL_CATEGORIES: ToolCategory[] = [
  {
    category: "Development & Design",
    tools: [
      { name: "PHP", Icon: SiPhp },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "React", Icon: SiReact },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
      { name: "MySQL", Icon: SiMysql },
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "Supabase", Icon: SiSupabase },
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
      { name: "Figma", Icon: SiFigma },
    ],
  },
  {
    category: "Automation Platforms",
    tools: [
      { name: "n8n", Icon: SiN8N },
      { name: "Make", Icon: SiMake },
      { name: "Zapier", Icon: SiZapier },
      { name: "GoHighLevel", fallback: "GHL" },
      { name: "Vapi", fallback: "VP" },
    ],
  },
  {
    category: "Business & Productivity",
    tools: [
      { name: "Airtable", Icon: SiAirtable },
      { name: "Asana", Icon: SiAsana },
      { name: "Xero", Icon: SiXero },
      { name: "Meta Business Suite", Icon: SiMeta },
      { name: "Notion", Icon: SiNotion },
      { name: "Microsoft 365", fallback: "365" },
    ],
  },
  {
    category: "AI Models",
    tools: [
      { name: "ChatGPT", fallback: "GPT" },
      { name: "Claude", Icon: SiClaude },
      { name: "Grok", fallback: "xAI" },
      { name: "DeepSeek", Icon: SiDeepseek },
    ],
  },
];

function ToolBadge({ tool }: { tool: Tool }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-[var(--cream-deep)] bg-white/40 hover:border-[var(--gold)] hover:bg-white/70 transition-all duration-200">
      {tool.Icon ? (
        <tool.Icon size={18} className="text-[var(--navy)] shrink-0" />
      ) : (
        <span className="flex items-center justify-center min-w-[20px] h-[18px] px-1 rounded bg-[var(--navy)] text-[var(--cream)] text-[7px] font-bold tracking-tight shrink-0">
          {tool.fallback}
        </span>
      )}
      <span className="text-sm font-medium text-[var(--navy)] whitespace-nowrap">
        {tool.name}
      </span>
    </div>
  );
}

export default function Skills() {
  return (
    <div className="section-padding bg-[var(--cream)]">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="mb-14">
          <p className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-4 text-[var(--gold-dark)]">
            // skills &amp; tools
          </p>
          <h2 className="font-serif-display font-bold text-4xl md:text-5xl text-[var(--navy)]">
            What I Work With
          </h2>
        </div>

        {/* Categories */}
        <div className="space-y-10">
          {TOOL_CATEGORIES.map((group) => (
            <div key={group.category}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--gold-dark)] mb-4">
                {group.category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {group.tools.map((tool) => (
                  <ToolBadge key={tool.name} tool={tool} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}