// src/components/sections/About.tsx
// About section — bio, education timeline.

import { GraduationCap, MapPin, Calendar } from "lucide-react";

const education = [
  {
    degree: "BS Information Technology",
    school: "Western Mindanao State University",
    period: "2025 – 2026",
    description: "College of Computing Studies. Focused on full-stack web development and software engineering.",
    current: true,
  },
  {
    degree: "Information and Communications Technology",
    school: "Ayala National High School",
    period: "2020 – 2022",
    description: "Senior High School strand with focus on ICT fundamentals.",
    current: false,
  },
];

export default function About() {
  return (
    <div className="section-padding bg-dark-950">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono text-blue-400 text-sm mb-3">// about me</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Who I Am
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">

          {/* Left — Bio */}
          <div className="space-y-6">
            <p className="text-slate-300 text-lg leading-relaxed">
              I&apos;m a Web Developer and BS Information Technology student with
              a strong foundation in front-end and back-end development.
            </p>
            <p className="text-slate-400 leading-relaxed">
              I enjoy building functional, user-friendly web applications and
              continuously improving my skills through academic projects and
              hands-on experience. I&apos;m resourceful, detail-oriented, and
              passionate about using technology to solve real-world problems.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Currently working on my Capstone Research at WMSU College of
              Computing Studies — designing and developing a web-based system
              using modern full-stack technologies.
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { label: "Projects", value: "3" },
                { label: "Technologies", value: "8+" },
                { label: "Languages", value: "English, Filipino" },
                { label: "Location", value: "Zamboanga City" },
              ].map((fact) => (
                <div key={fact.label} className="glass rounded-xl p-4">
                  <p className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-1">
                    {fact.label}
                  </p>
                  <p className="text-white font-medium text-sm">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Education timeline */}
          <div>
            <h3 className="font-display font-semibold text-xl text-white mb-8 flex items-center gap-2">
              <GraduationCap size={22} className="text-blue-400" />
              Education
            </h3>
            <div className="space-y-6">
              {education.map((item, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-white/10 last:border-transparent">

                  {/* Timeline dot */}
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${
                    item.current
                      ? "bg-blue-500 border-blue-400"
                      : "bg-dark-950 border-slate-600"
                  }`} />

                  <div className="glass rounded-xl p-5">
                    {/* Degree */}
                    <h4 className="font-display font-semibold text-white mb-1">
                      {item.degree}
                    </h4>

                    {/* School + period */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="flex items-center gap-1 text-blue-400 text-sm font-medium">
                        <MapPin size={13} />
                        {item.school}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500 text-sm">
                        <Calendar size={13} />
                        {item.period}
                      </span>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed">
                      {item.description}
                    </p>

                    {item.current && (
                      <span className="inline-block mt-3 px-2 py-0.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-full">
                        Currently Enrolled
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
