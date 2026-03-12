// src/components/admin/ProjectForm.tsx
// Form for adding new projects from the admin dashboard.

"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import type { ProjectFormData } from "@/types";

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

const INITIAL_FORM: ProjectFormData = {
  title: "",
  description: "",
  techStack: "",
  githubUrl: "",
  liveUrl: "",
  imageUrl: "",
  featured: false,
};

export default function ProjectForm({ onSubmit, onCancel, loading }: ProjectFormProps) {
  const [form, setForm] = useState<ProjectFormData>(INITIAL_FORM);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
    setForm(INITIAL_FORM); // reset form on success
  };

  return (
    <div className="glass rounded-2xl p-6 border-blue-500/20">
      {/* Form header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-white">Add New Project</h3>
        <button
          onClick={onCancel}
          className="p-1.5 text-slate-500 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">

        {/* Title */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
            Title *
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
            placeholder="e.g. Student Portal System"
          />
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 transition-all resize-none"
            placeholder="What does this project do? What problem does it solve?"
          />
        </div>

        {/* Tech Stack */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
            Tech Stack (comma-separated)
          </label>
          <input
            name="techStack"
            value={form.techStack}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
            placeholder="e.g. PHP, MySQL, Tailwind CSS, JavaScript"
          />
        </div>

        {/* GitHub URL */}
        <div>
          <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
            GitHub URL
          </label>
          <input
            name="githubUrl"
            type="url"
            value={form.githubUrl}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
            placeholder="https://github.com/..."
          />
        </div>

        {/* Live URL */}
        <div>
          <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
            Live URL
          </label>
          <input
            name="liveUrl"
            type="url"
            value={form.liveUrl}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
            placeholder="https://yourproject.netlify.app"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
            Image URL (screenshot)
          </label>
          <input
            name="imageUrl"
            type="url"
            value={form.imageUrl}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
            placeholder="https://..."
          />
        </div>

        {/* Featured checkbox */}
        <div className="flex items-center gap-3 pt-2">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            checked={form.featured}
            onChange={handleChange}
            className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/30"
          />
          <label htmlFor="featured" className="text-slate-300 text-sm cursor-pointer">
            Mark as featured project
          </label>
        </div>

        {/* Submit / Cancel */}
        <div className="sm:col-span-2 flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-all"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Saving...
              </>
            ) : (
              "Save Project"
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 glass text-slate-400 hover:text-white text-sm rounded-xl transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
