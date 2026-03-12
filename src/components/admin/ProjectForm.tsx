// src/components/admin/ProjectForm.tsx
// Form for adding new projects from the admin dashboard.
"use client";

import { useState } from "react";
import { X, Loader2, Plus, ImageIcon, ChevronLeft, ChevronRight, GripVertical } from "lucide-react";
import type { ProjectFormData } from "@/types";

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
  initialData?: ProjectFormData & { id?: string };
  mode?: "create" | "edit";
}

const EMPTY_FORM: ProjectFormData = {
  title: "",
  description: "",
  techStack: "",
  images: [],
  githubUrl: "",
  liveUrl: "",
  featured: false,
};

export default function ProjectForm({
  onSubmit,
  onCancel,
  loading,
  initialData,
  mode = "create",
}: ProjectFormProps) {
  const [form, setForm] = useState<ProjectFormData>(initialData ?? EMPTY_FORM);
  const [imageInput, setImageInput] = useState("");
  const [imageError, setImageError] = useState("");
  const [previewIndex, setPreviewIndex] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const addImage = () => {
    const url = imageInput.trim();
    if (!url) return;
    if (!url.startsWith("http")) {
      setImageError("Please enter a valid URL starting with http");
      return;
    }
    if (form.images.includes(url)) {
      setImageError("This image URL is already added");
      return;
    }
    if (form.images.length >= 8) {
      setImageError("Maximum 8 images per project");
      return;
    }
    setForm((prev) => ({ ...prev, images: [...prev.images, url] }));
    setImageInput("");
    setImageError("");
    setPreviewIndex(form.images.length);
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    setPreviewIndex((prev) => Math.max(0, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
    if (mode === "create") {
      setForm(EMPTY_FORM);
      setImageInput("");
      setPreviewIndex(0);
    }
  };

  const currentImage = form.images[previewIndex];

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10"
      style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.98) 0%, rgba(30,41,59,0.98) 100%)" }}>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5"
        style={{ background: "rgba(59,130,246,0.04)" }}>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50" />
          <h3 className="font-mono text-sm text-slate-300 tracking-wider uppercase">
            {mode === "edit" ? "// edit project" : "// new project"}
          </h3>
        </div>
        <button type="button" onClick={onCancel}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-600 hover:text-white hover:bg-white/10 transition-all">
          <X size={15} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">

        {/* Title */}
        <div>
          <label className="block text-xs font-mono text-blue-400/70 uppercase tracking-widest mb-2">title *</label>
          <input name="title" value={form.title} onChange={handleChange} required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-700 text-sm focus:outline-none focus:border-blue-500/40 transition-all"
            placeholder="e.g. Student Portal System" />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-mono text-blue-400/70 uppercase tracking-widest mb-2">description *</label>
          <textarea name="description" value={form.description} onChange={handleChange} required rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-700 text-sm focus:outline-none focus:border-blue-500/40 transition-all resize-none"
            placeholder="What does this project do? What problem does it solve?" />
        </div>

        {/* Images */}
        <div>
          <label className="block text-xs font-mono text-blue-400/70 uppercase tracking-widest mb-3">
            images <span className="text-slate-600 normal-case">({form.images.length}/8)</span>
          </label>

          {/* Preview */}
          <div className="relative w-full h-52 rounded-xl overflow-hidden mb-3 border border-white/10 bg-slate-900">
            {currentImage ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={currentImage} alt={`Preview ${previewIndex + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {form.images.length > 1 && (
                  <>
                    <button type="button"
                      onClick={() => setPreviewIndex((p) => (p - 1 + form.images.length) % form.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-all border border-white/10">
                      <ChevronLeft size={16} />
                    </button>
                    <button type="button"
                      onClick={() => setPreviewIndex((p) => (p + 1) % form.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-all border border-white/10">
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                  {form.images.map((_, i) => (
                    <button key={i} type="button" onClick={() => setPreviewIndex(i)}
                      className={`transition-all rounded-full ${i === previewIndex ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"}`} />
                  ))}
                </div>

                <button type="button" onClick={() => removeImage(previewIndex)}
                  className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg bg-red-500/80 text-white hover:bg-red-500 transition-all">
                  <X size={13} />
                </button>

                <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/50 rounded-md text-white text-xs font-mono">
                  {previewIndex + 1} / {form.images.length}
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-slate-700">
                <ImageIcon size={32} strokeWidth={1} />
                <p className="text-xs font-mono">no images added yet</p>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {form.images.length > 0 && (
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
              {form.images.map((url, i) => (
                <button key={i} type="button" onClick={() => setPreviewIndex(i)}
                  className={`relative shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === previewIndex ? "border-blue-400" : "border-white/10 opacity-50 hover:opacity-80"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
              {form.images.length < 8 && (
                <div className="shrink-0 w-14 h-14 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center text-slate-700">
                  <Plus size={16} />
                </div>
              )}
            </div>
          )}

          {/* URL Input */}
          <div className="flex gap-2">
            <input
              value={imageInput}
              onChange={(e) => { setImageInput(e.target.value); setImageError(""); }}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-700 text-xs font-mono focus:outline-none focus:border-blue-500/40 transition-all"
              placeholder="paste image URL then press Add or Enter..." />
            <button type="button" onClick={addImage}
              className="px-4 py-2.5 bg-blue-600/80 hover:bg-blue-500 text-white text-xs font-mono rounded-xl transition-all border border-blue-500/30 flex items-center gap-1.5 shrink-0">
              <Plus size={13} /> Add
            </button>
          </div>
          {imageError && <p className="text-red-400 text-xs font-mono mt-1.5">{imageError}</p>}

          <div className="mt-2 px-3 py-2 rounded-lg border border-blue-500/10 bg-blue-500/5">
            <p className="text-slate-600 text-xs font-mono">
              <span className="text-blue-400/60">tip:</span> GitHub repo → Issues → New Issue → drag image → copy URL
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="block text-xs font-mono text-blue-400/70 uppercase tracking-widest mb-2">
            tech stack <span className="text-slate-600 normal-case">(comma-separated)</span>
          </label>
          <input name="techStack" value={form.techStack} onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-700 text-sm focus:outline-none focus:border-blue-500/40 transition-all"
            placeholder="PHP, MySQL, Tailwind CSS, JavaScript" />
        </div>

        {/* Links */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-blue-400/70 uppercase tracking-widest mb-2">github url</label>
            <input name="githubUrl" type="url" value={form.githubUrl} onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-700 text-sm focus:outline-none focus:border-blue-500/40 transition-all"
              placeholder="https://github.com/..." />
          </div>
          <div>
            <label className="block text-xs font-mono text-blue-400/70 uppercase tracking-widest mb-2">live url</label>
            <input name="liveUrl" type="url" value={form.liveUrl} onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-700 text-sm focus:outline-none focus:border-blue-500/40 transition-all"
              placeholder="https://yourproject.netlify.app" />
          </div>
        </div>

        {/* Featured */}
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${form.featured ? "bg-blue-500 border-blue-400" : "bg-white/5 border-white/20 group-hover:border-white/30"}`}>
            {form.featured && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="sr-only" />
          <span className="text-slate-400 text-sm group-hover:text-white transition-colors">
            Mark as <span className="text-yellow-400">featured</span> project
          </span>
        </label>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/5">
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-sm font-mono rounded-xl transition-all shadow-lg shadow-blue-500/20">
            {loading ? (
              <><Loader2 size={14} className="animate-spin" />saving...</>
            ) : (
              mode === "edit" ? "save changes" : "create project"
            )}
          </button>
          <button type="button" onClick={onCancel}
            className="px-6 py-2.5 text-slate-500 hover:text-white text-sm font-mono rounded-xl transition-all hover:bg-white/5">
            cancel
          </button>
          {form.images.length > 0 && (
            <span className="ml-auto text-xs font-mono text-slate-600 flex items-center gap-1.5">
              <GripVertical size={12} />
              {form.images.length} image{form.images.length !== 1 ? "s" : ""} added
            </span>
          )}
        </div>
      </form>
    </div>
  );
}