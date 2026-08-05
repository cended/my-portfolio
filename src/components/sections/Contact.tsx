// src/components/sections/Contact.tsx
// Branching contact form — different fields show depending on whether the
// visitor wants AI Automation, Web Development, or both. No backend: submit
// builds a mailto: link with everything filled in and opens the visitor's
// email client. Swap for a real form service (Formspree, Web3Forms, etc.)
// if you want server-side delivery instead.

"use client";

import { useState, FormEvent } from "react";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  ArrowRight,
  Bot,
  Code2,
  Layers,
} from "lucide-react";

type ServiceType = "automation" | "webdev" | "both";

const BOTTLENECKS = [
  { value: "slow-response", label: "Slow Lead Response", note: "Leads go cold before you reach them" },
  { value: "missed-followups", label: "Missed Follow-ups", note: "No system tracking who to chase" },
  { value: "disconnected-tools", label: "Disconnected Tools", note: "Data scattered across apps" },
  { value: "manual-entry", label: "Manual Data Entry", note: "Copy-pasting between systems" },
  { value: "other", label: "Other", note: "Something else entirely" },
];

const WEBDEV_GOALS = [
  { value: "generate-leads", label: "Generate Leads", note: "Turn visitors into inquiries" },
  { value: "sell-products", label: "Sell Products", note: "E-commerce / online store" },
  { value: "showcase-work", label: "Showcase Work", note: "Portfolio / credibility site" },
  { value: "internal-tool", label: "Internal Tool", note: "Dashboard, CRM, admin system" },
  { value: "other", label: "Other", note: "Something else entirely" },
];

const LEAD_VOLUME_OPTIONS = ["Under 10/month", "10–50/month", "50–200/month", "200+/month"];
const PROJECT_TYPE_OPTIONS = ["New Website", "Website Redesign", "Web Application", "E-commerce Store"];
const BUILD_STAGE_OPTIONS = ["Starting from scratch", "Redesigning an existing site"];

interface FormState {
  name: string;
  email: string;
  businessName: string;
  leadVolume: string;
  bottleneck: string;
  bottleneckOther: string;
  currentTools: string;
  projectType: string;
  goal: string;
  goalOther: string;
  buildStage: string;
  notes: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  businessName: "",
  leadVolume: "",
  bottleneck: "",
  bottleneckOther: "",
  currentTools: "",
  projectType: "",
  goal: "",
  goalOther: "",
  buildStage: "",
  notes: "",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--navy)] mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputClasses =
  "w-full px-4 py-2.5 rounded-lg border border-[var(--cream-deep)] bg-white/70 text-sm text-[var(--navy)] placeholder-[var(--text-muted)]/60 focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-all";

function CardSelect({
  options,
  selected,
  onSelect,
  otherValue,
  onOtherChange,
}: {
  options: { value: string; label: string; note: string }[];
  selected: string;
  onSelect: (value: string) => void;
  otherValue: string;
  onOtherChange: (value: string) => void;
}) {
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            aria-pressed={selected === opt.value}
            className={`text-left px-4 py-3 rounded-lg border transition-all ${
              selected === opt.value
                ? "border-[var(--gold)] bg-[var(--gold)]/10"
                : "border-[var(--cream-deep)] bg-white/40 hover:border-[var(--gold)]/50"
            }`}
          >
            <p className="text-sm font-semibold text-[var(--navy)]">{opt.label}</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">{opt.note}</p>
          </button>
        ))}
      </div>

      {selected === "other" && (
        <input
          autoFocus
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          className={`${inputClasses} mt-2`}
          placeholder="Please specify..."
        />
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);

  const update = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const lines: string[] = [];
    lines.push(`Name: ${form.name}`);
    lines.push(`Email: ${form.email}`);
    lines.push(
      `Interested in: ${
        serviceType === "automation" ? "AI Automation" : serviceType === "webdev" ? "Web Development" : "Both / Not sure yet"
      }`
    );
    lines.push("");

    if (serviceType === "automation") {
      if (form.businessName) lines.push(`Business Name: ${form.businessName}`);
      if (form.leadVolume) lines.push(`Monthly Lead Volume: ${form.leadVolume}`);
      if (form.bottleneck) {
        const b = BOTTLENECKS.find((x) => x.value === form.bottleneck);
        if (b) {
          const label = b.value === "other" && form.bottleneckOther ? form.bottleneckOther : b.label;
          lines.push(`Biggest Bottleneck: ${label}`);
        }
      }
      if (form.currentTools) lines.push(`Current Tools: ${form.currentTools}`);
      lines.push("");
    }

    if (serviceType === "webdev") {
      if (form.businessName) lines.push(`Project Name: ${form.businessName}`);
      if (form.projectType) lines.push(`Project Type: ${form.projectType}`);
      if (form.goal) {
        const g = WEBDEV_GOALS.find((x) => x.value === form.goal);
        if (g) {
          const label = g.value === "other" && form.goalOther ? form.goalOther : g.label;
          lines.push(`Primary Goal: ${label}`);
        }
      }
      if (form.buildStage) lines.push(`Build Stage: ${form.buildStage}`);
      lines.push("");
    }

    if (form.notes) {
      lines.push("Additional Details:");
      lines.push(form.notes);
    }

    const subjectLabel =
      serviceType === "automation" ? "AI Automation" : serviceType === "webdev" ? "Web Development" : "Project";
    const subject = encodeURIComponent(`${subjectLabel} Inquiry — ${form.name || "New Lead"}`);
    const body = encodeURIComponent(lines.join("\n"));

    window.location.href = `mailto:madialesalced@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="section-padding bg-[var(--cream)]">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-10">

        {/* Left — intro + info */}
        <div>
          <p className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase mb-4 text-[var(--gold-dark)]">
            // contact
          </p>
          <h2 className="font-serif-display font-bold text-4xl md:text-5xl text-[var(--navy)] mb-5">
            Let&apos;s Build Something
          </h2>
          <p className="text-[var(--text-muted)] leading-relaxed mb-8">
            Whether you need a custom web application, an AI automation
            system, or both working together — tell me what you&apos;re
            trying to build and I&apos;ll get back to you directly.
          </p>

          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 p-4 rounded-xl border border-[var(--cream-deep)] bg-white/50">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--gold)]/15 shrink-0">
                <Mail size={16} className="text-[var(--gold-dark)]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">Direct Email</p>
                <a href="mailto:madialesalced@gmail.com" className="text-sm font-medium text-[var(--navy)] hover:text-[var(--gold-dark)] transition-colors break-all">
                  madialesalced@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl border border-[var(--cream-deep)] bg-white/50">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--gold)]/15 shrink-0">
                <MapPin size={16} className="text-[var(--gold-dark)]" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">Location</p>
                <p className="text-sm font-medium text-[var(--navy)]">Zamboanga City, Philippines</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl border border-[var(--cream-deep)] bg-white/50">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shrink-0 ml-1.5" />
              <p className="text-sm font-medium text-[var(--navy)]">Available for new projects</p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3 mb-8">
            <a href="https://github.com/cended" target="_blank" rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-[var(--cream-deep)] bg-white/50 text-[var(--navy)] hover:border-[var(--gold)] transition-all" aria-label="GitHub">
              <Github size={17} />
            </a>
            <a href="https://linkedin.com/in/alced-jhon-madiales" target="_blank" rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-[var(--cream-deep)] bg-white/50 text-[var(--navy)] hover:border-[var(--gold)] transition-all" aria-label="LinkedIn">
              <Linkedin size={17} />
            </a>
          </div>

          {/* Note */}
          <div className="p-5 rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/5">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--gold-dark)] mb-2">A note</p>
            <p className="text-sm text-[var(--navy)] leading-relaxed italic">
              &quot;I don&apos;t just build interfaces that look good — I write
              clean, maintainable code and design automation systems that
              actually save you time on repeat work.&quot;
            </p>
          </div>
        </div>

        {/* Right — form */}
        <div className="p-6 md:p-8 rounded-2xl border border-[var(--cream-deep)] bg-white/60">
          <h3 className="font-serif-display font-bold text-xl md:text-2xl text-[var(--navy)] mb-1">
            Send Project Details
          </h3>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            Answer what applies — the more context, the faster I can respond with something useful.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Your Name">
                <input required value={form.name} onChange={(e) => update("name", e.target.value)}
                  className={inputClasses} placeholder="Juan Dela Cruz" />
              </Field>
              <Field label="Your Email Address">
                <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
                  className={inputClasses} placeholder="juan@example.com" />
              </Field>
            </div>

            {/* Service type selector */}
            <div>
              <label className="block text-sm font-medium text-[var(--navy)] mb-2">
                What are you interested in?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "automation" as ServiceType, label: "AI Automation", icon: Bot },
                  { value: "webdev" as ServiceType, label: "Web Development", icon: Code2 },
                  { value: "both" as ServiceType, label: "Both / Not Sure", icon: Layers },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setServiceType(opt.value)}
                    aria-pressed={serviceType === opt.value}
                    className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-lg border text-center transition-all ${
                      serviceType === opt.value
                        ? "border-[var(--gold)] bg-[var(--gold)]/10"
                        : "border-[var(--cream-deep)] bg-white/40 hover:border-[var(--gold)]/50"
                    }`}
                  >
                    <opt.icon size={18} className="text-[var(--gold-dark)]" />
                    <span className="text-xs font-medium text-[var(--navy)] leading-tight">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Automation fields */}
            {serviceType === "automation" && (
              <div className="space-y-6 pt-2 border-t border-[var(--cream-deep)]">
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  <Field label="Business Name">
                    <input value={form.businessName} onChange={(e) => update("businessName", e.target.value)}
                      className={inputClasses} placeholder="Acme Corp" />
                  </Field>
                  <Field label="Monthly Lead Volume">
                    <select value={form.leadVolume} onChange={(e) => update("leadVolume", e.target.value)}
                      className={inputClasses}>
                      <option value="">Select a range</option>
                      {LEAD_VOLUME_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="What's your biggest bottleneck?">
                  <CardSelect
                    options={BOTTLENECKS}
                    selected={form.bottleneck}
                    onSelect={(v) => update("bottleneck", v)}
                    otherValue={form.bottleneckOther}
                    onOtherChange={(v) => update("bottleneckOther", v)}
                  />
                </Field>
                <Field label="What tools do you currently use?">
                  <input value={form.currentTools} onChange={(e) => update("currentTools", e.target.value)}
                    className={inputClasses} placeholder="e.g. GoHighLevel, Zapier, Spreadsheets..." />
                </Field>
              </div>
            )}

            {/* Web Development fields */}
            {serviceType === "webdev" && (
              <div className="space-y-6 pt-2 border-t border-[var(--cream-deep)]">
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  <Field label="Project / Business Name">
                    <input value={form.businessName} onChange={(e) => update("businessName", e.target.value)}
                      className={inputClasses} placeholder="Acme Corp" />
                  </Field>
                  <Field label="Project Type">
                    <select value={form.projectType} onChange={(e) => update("projectType", e.target.value)}
                      className={inputClasses}>
                      <option value="">Select a type</option>
                      {PROJECT_TYPE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="What's the primary goal?">
                  <CardSelect
                    options={WEBDEV_GOALS}
                    selected={form.goal}
                    onSelect={(v) => update("goal", v)}
                    otherValue={form.goalOther}
                    onOtherChange={(v) => update("goalOther", v)}
                  />
                </Field>
                <Field label="Build stage">
                  <select value={form.buildStage} onChange={(e) => update("buildStage", e.target.value)}
                    className={inputClasses}>
                    <option value="">Select one</option>
                    {BUILD_STAGE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
              </div>
            )}

            <Field label={serviceType ? "Additional Details" : "Tell me what you need"}>
              <textarea rows={4} value={form.notes} onChange={(e) => update("notes", e.target.value)}
                className={`${inputClasses} resize-none`}
                placeholder="Any context that'll help me understand the project..." />
            </Field>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[var(--navy)] hover:bg-[var(--navy-soft)] text-[var(--cream)] font-medium text-sm transition-all"
            >
              Prepare Inquiry Email
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}