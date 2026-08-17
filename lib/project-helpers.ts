import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import {
  getCurrentProjectIdentity,
  type CurrentProjectIdentity,
} from "@/lib/project-access";

export interface ProjectData {
  id: string;
  name: string;
  slug: string;
  owned: boolean;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 50);
}

/**
 * Fetch owned and shared projects for the current user
 * Server-side helper for use in server components
 */
export async function getProjectsForUser(identity?: CurrentProjectIdentity): Promise<{
  owned: ProjectData[];
  shared: ProjectData[];
}> {
  const { userId } = identity ?? (await auth());

  if (!userId) {
    return { owned: [], shared: [] };
  }

  try {
    // Fetch owned projects
    const ownedProjects = await prisma.project.findMany({
      where: { ownerId: userId },
      select: {
        id: true,
        name: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const currentIdentity = identity ?? (await getCurrentProjectIdentity());

    if (!currentIdentity) {
      return {
        owned: ownedProjects.map((p) => ({
          id: p.id,
          name: p.name,
          slug: generateSlug(p.name),
          owned: true,
        })),
        shared: [],
      };
    }

    // Fetch only projects shared with this signed-in user's primary email.
    const sharedProjects = await prisma.projectCollaborator.findMany({
      where: {
        collaboratorEmail: currentIdentity.email,
      },
      select: {
        project: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      owned: ownedProjects.map((p) => ({
        id: p.id,
        name: p.name,
        slug: generateSlug(p.name),
        owned: true,
      })),
      shared: sharedProjects.map((p) => ({
        id: p.project.id,
        name: p.project.name,
        slug: generateSlug(p.project.name),
        owned: false,
      })),
    };
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return { owned: [], shared: [] };
  }
}
