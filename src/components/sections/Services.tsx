// src/components/sections/Services.tsx
// Services — what you offer, grounded in your actual verified skill set
// (not copied from the reference site — original categories and wording,
// built from your real tool list and CV).

import { Zap, Bot, LayoutGrid, Webhook, Code2, Database } from "lucide-react";

interface Service {
  icon: typeof Zap;
  title: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    icon: Zap,
    title: "Workflow Automation",
    description:
      "Automations built in n8n, Make, and Zapier that take repetitive manual tasks off your plate.",
  },
  {
    icon: Bot,
    title: "AI Agent & Chatbot Development",
    description:
      "Custom AI agents on Claude and ChatGPT APIs that handle FAQs, support, and conversations for your business.",
  },
  {
    icon: LayoutGrid,
    title: "CRM & Business Systems Setup",
    description:
      "Configuring GoHighLevel, Notion, Airtable, and Asana into a connected system that fits how your team works.",
  },
  {
    icon: Webhook,
    title: "API & Webhook Integrations",
    description:
      "Connecting your tools together — forms, CRMs, databases — so data flows automatically instead of manual re-entry.",
  },
  {
    icon: Code2,
    title: "Full-Stack Web Development",
    description:
      "Custom web applications built with PHP, Next.js, React, and MySQL/PostgreSQL — from database design to deployment.",
  },
  {
    icon: Database,
    title: "Database & Backend Systems",
    description:
      "Role-based access control, automated reporting, and reliable backend logic that scales with your business.",
  },
];

export default function Services() {
  return (
    <div className="section-padding bg-[var(--cream-deep)]">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="mb-14">
          <p className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-4 text-[var(--gold-dark)]">
            // services
          </p>
          <h2 className="font-serif-display font-bold text-4xl md:text-5xl text-[var(--navy)]">
            Where I Can Help
          </h2>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="p-6 rounded-2xl border border-[var(--navy)]/10 bg-[var(--cream)] transition-all duration-200 hover:border-[var(--gold)] hover:-translate-y-1"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-[var(--gold)]/15 mb-5">
                <service.icon size={20} className="text-[var(--gold-dark)]" />
              </div>
              <h3 className="font-serif-display font-semibold text-lg text-[var(--navy)] mb-2">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}