// src/components/sections/Contact.tsx
// Contact section — ways to reach you.

import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: "madialesalced@gmail.com",
    href: "mailto:madialesalced@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/alcedmadiales",    // ✏️ Update with your real GitHub
    href: "https://github.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/alcedmadiales", // ✏️ Update with your real LinkedIn
    href: "https://linkedin.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Recodo, Zamboanga City, PH",
    href: null,
  },
];

export default function Contact() {
  return (
    <div className="section-padding bg-dark-900/50">
      <div className="max-w-4xl mx-auto text-center">

        {/* Section header */}
        <p className="font-mono text-blue-400 text-sm mb-3">// contact</p>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6">
          Let&apos;s Work Together
        </h2>
        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
          Whether you have a project in mind, an opportunity to share, or just
          want to connect — I&apos;d love to hear from you.
        </p>

        {/* Primary CTA */}
        <a
          href="mailto:madialesalced@gmail.com"
          className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-display font-semibold text-lg rounded-2xl transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-1 mb-12"
        >
          <Send size={20} />
          Say Hello
        </a>

        {/* Contact details grid */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {CONTACT_LINKS.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="glass rounded-xl p-5 text-left">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Icon size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-mono uppercase tracking-wider">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-slate-200 text-sm hover:text-blue-400 transition-colors break-all"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-slate-200 text-sm">{value}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Phone number */}
        <p className="mt-8 text-slate-600 font-mono text-sm">
          📞 0961-058-5703
        </p>
      </div>
    </div>
  );
}
