// src/app/api/projects/route.ts
// API Route handlers for /api/projects
//
// GET  /api/projects       → returns all projects (public)
// POST /api/projects       → creates a new project (admin only)
//
// PHP equivalent: a switch($_SERVER['REQUEST_METHOD']) block in projects.php

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// -------------------------------------------------------
// GET — Fetch all projects (public, no auth needed)
// -------------------------------------------------------
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [
        { featured: "desc" },  // featured projects first
        { order: "asc" },      // then by custom order
        { createdAt: "desc" }, // newest first
      ],
    });

    return NextResponse.json({ data: projects });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// -------------------------------------------------------
// POST — Create a new project (admin only)
// -------------------------------------------------------
export async function POST(request: NextRequest) {
  // Check if the user is logged in as admin
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized — please log in" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // Convert techStack from comma-separated string to array
    const techStack = body.techStack
      ? body.techStack.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [];

    const project = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description,
        techStack,
        githubUrl: body.githubUrl || null,
        liveUrl: body.liveUrl || null,
        imageUrl: body.imageUrl || null,
        featured: body.featured ?? false,
        order: body.order ?? 0,
      },
    });

    return NextResponse.json(
      { data: project, message: "Project created!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
