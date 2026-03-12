// src/app/api/projects/route.ts
// GET  → fetch all projects (public)
// POST → create project (admin only)

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json({ data: projects });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    if (!body.title || !body.description)
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });

    const techStack = body.techStack
      ? body.techStack.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [];

    const project = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description,
        techStack,
        images: body.images || [],
        githubUrl: body.githubUrl || null,
        liveUrl: body.liveUrl || null,
        featured: body.featured ?? false,
        order: body.order ?? 0,
      },
    });

    return NextResponse.json({ data: project, message: "Project created!" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}