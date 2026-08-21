import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export interface CurrentProjectIdentity {
  userId: string;
  email: string;
}

export interface ProjectAccess {
  id: string;
  name: string;
  ownerId: string;
}

/** Returns the signed-in Clerk user's identifier and primary email address. */
export async function getCurrentProjectIdentity(): Promise<CurrentProjectIdentity | null> {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  if (!email) {
    return null;
  }

  return { userId, email: email.toLowerCase() };
}

/** Returns a project only when the identity is its owner or a collaborator. */
export async function getProjectAccess(
  projectId: string,
  identity: CurrentProjectIdentity
): Promise<ProjectAccess | null> {
  return prisma.project.findFirst({
    where: {
      id: projectId,
      OR: [
        { ownerId: identity.userId },
        { collaborators: { some: { collaboratorEmail: identity.email } } },
      ],
    },
    select: {
      id: true,
      name: true,
      ownerId: true,
    },
  });
}
