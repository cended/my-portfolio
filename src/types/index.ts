// src/types/index.ts
// All TypeScript interfaces for the project.
// Think of these like PHP class definitions — they describe the shape of data.

// -------------------------------------------------------
// Project type — matches the Prisma schema exactly
// -------------------------------------------------------
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  imageUrl?: string | null;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// -------------------------------------------------------
// ProjectFormData — what the admin form submits
// -------------------------------------------------------
export interface ProjectFormData {
  title: string;
  description: string;
  techStack: string;   // comma-separated string from input, split before saving
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  featured: boolean;
}

// -------------------------------------------------------
// ApiResponse — standard wrapper for all API responses
// -------------------------------------------------------
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// -------------------------------------------------------
// NavLink — for the navigation bar
// -------------------------------------------------------
export interface NavLink {
  label: string;
  href: string;   // e.g. "#about", "#projects"
}

// -------------------------------------------------------
// SkillCategory — for grouping skills in the Skills section
// -------------------------------------------------------
export interface SkillCategory {
  category: string;
  skills: string[];
}
