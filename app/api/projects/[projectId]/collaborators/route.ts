import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { enrichCollaborators, getOwnerDisplay } from "@/lib/collaborators";
import { getCurrentProjectIdentity } from "@/lib/project-access";
import { prisma } from "@/lib/prisma";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Lists collaborators for any user with access to the project. */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const identity = await getCurrentProjectIdentity();

  if (!identity) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId } = await params;
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      OR: [
        { ownerId: identity.userId },
        { collaborators: { some: { collaboratorEmail: identity.email } } },
      ],
    },
    select: {
      ownerId: true,
      collaborators: {
        select: { id: true, collaboratorEmail: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  const [owner, collaborators] = await Promise.all([
    getOwnerDisplay(project.ownerId),
    enrichCollaborators(project.collaborators),
  ]);

  return NextResponse.json({
    isOwner: project.ownerId === identity.userId,
    collaborators: [owner, ...collaborators],
  });
}

/** Invites a collaborator. Project ownership is enforced server-side. */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId } = await params;
  const body: unknown = await request.json().catch(() => null);
  const email = typeof body === "object" && body !== null && "email" in body && typeof body.email === "string"
    ? body.email.trim().toLowerCase()
    : "";

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address" }, { status: 400 });
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { ownerId: true },
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  if (project.ownerId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const collaborator = await prisma.projectCollaborator.upsert({
    where: { projectId_collaboratorEmail: { projectId, collaboratorEmail: email } },
    update: {},
    create: { projectId, collaboratorEmail: email },
    select: { id: true, collaboratorEmail: true },
  });

  const [enrichedCollaborator] = await enrichCollaborators([collaborator]);
  return NextResponse.json({ collaborator: enrichedCollaborator }, { status: 201 });
}
