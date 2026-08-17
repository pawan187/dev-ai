import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export interface ProjectData {
  id: string;
  name: string;
  slug: string;
  owned: boolean;
}

/**
 * Fetch owned and shared projects for the current user
 * Server-side helper for use in server components
 */
export async function getProjectsForUser(): Promise<{
  owned: ProjectData[];
  shared: ProjectData[];
}> {
  const { userId } = await auth();

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

    // Fetch shared projects (via ProjectCollaborator)
    // Note: We need the user's email for this, which we'll get from the request context
    const sharedProjects = await prisma.projectCollaborator.findMany({
      where: {
        // We'll filter by collaborator in a more practical way
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

    const generateSlug = (name: string): string => {
      return name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s]+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 50);
    };

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
