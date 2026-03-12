// src/app/admin/page.tsx
// Admin dashboard — protected page to manage projects.
// Redirects to /admin/login if not authenticated.

"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Plus, LogOut, Code2, Loader2, RefreshCw } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import ProjectForm from "@/components/admin/ProjectForm";
import type { Project, ProjectFormData } from "@/types";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { projects, loading, error, refetch } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  // Show loading spinner while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-blue-400" />
      </div>
    );
  }

  // Not logged in — will redirect
  if (!session) return null;

  const handleAddProject = async (formData: ProjectFormData) => {
    setSaving(true);
    setSaveError("");
    setSaveSuccess("");

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save project");
      }

      setSaveSuccess("Project added successfully!");
      setShowForm(false);
      refetch(); // refresh the projects list

      // Clear success message after 3 seconds
      setTimeout(() => setSaveSuccess(""), 3000);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">

      {/* Top navigation */}
      <header className="border-b border-white/5 bg-dark-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Code2 size={22} className="text-blue-400" />
            <div>
              <h1 className="font-display font-bold text-white text-lg">Dashboard</h1>
              <p className="text-slate-500 text-xs font-mono">
                {session.user?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="px-3 py-1.5 text-slate-400 hover:text-white text-sm transition-colors"
            >
              View Portfolio ↗
            </a>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-2 px-3 py-1.5 glass text-slate-400 hover:text-white text-sm rounded-lg transition-all"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Page header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl text-white mb-1">Projects</h2>
            <p className="text-slate-500 text-sm font-mono">
              {projects.length} project{projects.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refetch}
              className="p-2 glass text-slate-400 hover:text-white rounded-lg transition-all"
              title="Refresh"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl transition-all"
            >
              <Plus size={16} />
              Add Project
            </button>
          </div>
        </div>

        {/* Success / Error banners */}
        {saveSuccess && (
          <div className="mb-6 px-4 py-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-xl">
            ✓ {saveSuccess}
          </div>
        )}
        {saveError && (
          <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">
            ✗ {saveError}
          </div>
        )}

        {/* Add project form */}
        {showForm && (
          <div className="mb-8">
            <ProjectForm
              onSubmit={handleAddProject}
              onCancel={() => setShowForm(false)}
              loading={saving}
            />
          </div>
        )}

        {/* Projects list */}
        {loading ? (
          <div className="flex items-center gap-3 py-20 justify-center text-slate-500">
            <Loader2 size={20} className="animate-spin" />
            <span className="font-mono text-sm">Loading...</span>
          </div>
        ) : error ? (
          <p className="text-red-400 text-sm font-mono py-10 text-center">{error}</p>
        ) : projects.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-slate-500 mb-2">No projects yet</p>
            <p className="text-slate-600 text-sm font-mono">Click &quot;Add Project&quot; to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project: Project) => (
              <div key={project.id} className="glass rounded-xl p-5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-medium text-white truncate">{project.title}</h3>
                    {project.featured && (
                      <span className="px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs rounded-full shrink-0">
                        featured
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm truncate">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.techStack.slice(0, 4).map((t: string) => (
                      <span key={t} className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 text-xs rounded font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-slate-600 text-xs font-mono">
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
