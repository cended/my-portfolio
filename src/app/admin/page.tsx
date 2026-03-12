// src/app/admin/page.tsx
// Admin dashboard — protected page to manage projects.
// Redirects to /admin/login if not authenticated.

"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Plus, LogOut, Code2, Loader2, RefreshCw, Pencil, Trash2 } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import ProjectForm from "@/components/admin/ProjectForm";
import type { Project, ProjectFormData } from "@/types";

type Mode = "idle" | "create" | "edit";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { projects, loading, error, refetch } = useProjects();
  const [mode, setMode] = useState<Mode>("idle");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [banner, setBanner] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-blue-400" />
      </div>
    );
  }
  if (!session) return null;

  const showBanner = (type: "success" | "error", msg: string) => {
    setBanner({ type, msg });
    setTimeout(() => setBanner(null), 3500);
  };

  // ── CREATE ──
  const handleCreate = async (formData: ProjectFormData) => {
    setSaving(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showBanner("success", "Project created successfully!");
      setMode("idle");
      refetch();
    } catch (err) {
      showBanner("error", err instanceof Error ? err.message : "Failed to create");
    } finally {
      setSaving(false);
    }
  };

  // ── EDIT ──
  const handleEdit = async (formData: ProjectFormData) => {
    if (!editingProject) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/projects/${editingProject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      showBanner("success", "Project updated!");
      setMode("idle");
      setEditingProject(null);
      refetch();
    } catch (err) {
      showBanner("error", err instanceof Error ? err.message : "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  // ── DELETE ──
  const handleDelete = async (project: Project) => {
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    setDeletingId(project.id);
    try {
      const res = await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      showBanner("success", "Project deleted.");
      refetch();
    } catch {
      showBanner("error", "Failed to delete project.");
    } finally {
      setDeletingId(null);
    }
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setMode("edit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeForm = () => {
    setMode("idle");
    setEditingProject(null);
  };

  return (
    <div className="min-h-screen bg-slate-950">

      {/* Nav */}
      <header className="border-b border-white/5 bg-slate-900/60 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Code2 size={20} className="text-blue-400" />
            <div>
              <h1 className="font-mono font-bold text-white text-base">Dashboard</h1>
              <p className="text-slate-600 text-xs font-mono">{session.user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" className="text-slate-500 hover:text-white text-xs font-mono transition-colors">
              portfolio ↗
            </a>
            <button onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-1.5 px-3 py-1.5 text-slate-500 hover:text-white text-xs font-mono rounded-lg hover:bg-white/5 transition-all">
              <LogOut size={13} />sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* Banner */}
        {banner && (
          <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-mono border ${
            banner.type === "success"
              ? "bg-green-500/10 border-green-500/20 text-green-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}>
            {banner.type === "success" ? "✓" : "✗"} {banner.msg}
          </div>
        )}

        {/* Form */}
        {mode !== "idle" && (
          <div className="mb-8">
            <ProjectForm
              mode={mode}
              onSubmit={mode === "edit" ? handleEdit : handleCreate}
              onCancel={closeForm}
              loading={saving}
              initialData={
                mode === "edit" && editingProject
                  ? {
                      title: editingProject.title,
                      description: editingProject.description,
                      techStack: editingProject.techStack.join(", "),
                      images: editingProject.images,
                      githubUrl: editingProject.githubUrl || "",
                      liveUrl: editingProject.liveUrl || "",
                      featured: editingProject.featured,
                    }
                  : undefined
              }
            />
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-mono font-bold text-xl text-white mb-0.5">Projects</h2>
            <p className="text-slate-600 text-xs font-mono">
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={refetch}
              className="p-2 text-slate-600 hover:text-white rounded-lg hover:bg-white/5 transition-all" title="Refresh">
              <RefreshCw size={15} />
            </button>
            {mode === "idle" && (
              <button onClick={() => setMode("create")}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono rounded-xl transition-all shadow-lg shadow-blue-500/20">
                <Plus size={14} />new project
              </button>
            )}
          </div>
        </div>

        {/* Projects list */}
        {loading ? (
          <div className="flex items-center gap-3 py-20 justify-center text-slate-600">
            <Loader2 size={18} className="animate-spin" />
            <span className="font-mono text-sm">loading...</span>
          </div>
        ) : error ? (
          <p className="text-red-400 text-sm font-mono py-10 text-center">{error}</p>
        ) : projects.length === 0 ? (
          <div className="border border-dashed border-white/10 rounded-2xl p-12 text-center">
            <p className="text-slate-600 font-mono text-sm mb-1">no projects yet</p>
            <p className="text-slate-700 text-xs font-mono">click "new project" to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project: Project) => (
              <div key={project.id}
                className={`group flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  editingProject?.id === project.id
                    ? "border-blue-500/30 bg-blue-500/5"
                    : "border-white/5 bg-white/[0.02] hover:border-white/10"
                }`}>

                {/* Thumbnail */}
                <div className="shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-slate-800 border border-white/5">
                  {project.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-700 font-mono text-lg">
                      {"{ }"}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-mono font-medium text-white text-sm truncate">{project.title}</h3>
                    {project.featured && (
                      <span className="px-1.5 py-0.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs rounded font-mono shrink-0">
                        ★ featured
                      </span>
                    )}
                    {project.images.length > 0 && (
                      <span className="px-1.5 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs rounded font-mono shrink-0">
                        {project.images.length} img{project.images.length !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 text-xs font-mono truncate">{project.description}</p>
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {project.techStack.slice(0, 4).map((t: string) => (
                      <span key={t} className="px-1.5 py-0.5 bg-slate-800 text-slate-500 text-xs rounded font-mono">{t}</span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-slate-700 text-xs font-mono">+{project.techStack.length - 4}</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(project)}
                    className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all" title="Edit">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(project)} disabled={deletingId === project.id}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-40" title="Delete">
                    {deletingId === project.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                </div>

                <div className="text-slate-700 text-xs font-mono shrink-0 hidden sm:block">
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}