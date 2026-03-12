// src/app/api/projects/[id]/route.ts
// PUT    /api/projects/:id  → update a project (admin only)
// DELETE /api/projects/:id  → delete a project (admin only)

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();

    const techStack = body.techStack
      ? body.techStack.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [];

    const project = await prisma.project.update({
      where: { id: params.id },
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

    return NextResponse.json({ data: project, message: "Project updated!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await prisma.project.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Project deleted!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}