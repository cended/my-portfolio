// src/hooks/useProjects.ts
// Custom React hook for fetching projects from the API.
//
// WHY CUSTOM HOOKS: Reusable data-fetching logic — like a PHP function
// you'd include() across pages. This hook can be used in any component.

"use client"; // This hook uses React state, so it must run in the browser

import { useState, useEffect } from "react";
import type { Project } from "@/types";

interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call our API route: GET /api/projects
      const response = await fetch("/api/projects");

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setProjects(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Run fetchProjects once when the component mounts
  // PHP equivalent: the code that runs at the top of a .php page
  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, error, refetch: fetchProjects };
}
