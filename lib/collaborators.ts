import { clerkClient } from "@clerk/nextjs/server";

export interface CollaboratorDisplay {
  id: string;
  email: string;
  name: string | null;
  imageUrl: string | null;
  role: "owner" | "collaborator";
}

interface StoredCollaborator {
  id: string;
  collaboratorEmail: string;
}

/** Adds Clerk profile data to stored collaborator emails when a matching user exists. */
export async function enrichCollaborators(
  collaborators: StoredCollaborator[]
): Promise<CollaboratorDisplay[]> {
  if (collaborators.length === 0) {
    return [];
  }

  const emails = collaborators.map(({ collaboratorEmail }) => collaboratorEmail);
  const client = await clerkClient();
  const { data: users } = await client.users.getUserList({ emailAddress: emails });
  const usersByEmail = new Map<string, { name: string | null; imageUrl: string | null }>();

  for (const user of users) {
    const name = user.fullName || null;

    for (const address of user.emailAddresses) {
      usersByEmail.set(address.emailAddress.toLowerCase(), {
        name,
        imageUrl: user.imageUrl || null,
      });
    }
  }

  return collaborators.map(({ id, collaboratorEmail }) => {
    const user = usersByEmail.get(collaboratorEmail.toLowerCase());

    return {
      id,
      email: collaboratorEmail,
      name: user?.name ?? null,
      imageUrl: user?.imageUrl ?? null,
      role: "collaborator",
    };
  });
}

/** Returns the project owner's Clerk profile for the shared access list. */
export async function getOwnerDisplay(ownerId: string): Promise<CollaboratorDisplay> {
  const client = await clerkClient();
  const user = await client.users.getUser(ownerId);

  return {
    id: `owner-${ownerId}`,
    email: user.primaryEmailAddress?.emailAddress ?? ownerId,
    name: user.fullName || null,
    imageUrl: user.imageUrl || null,
    role: "owner",
  };
}
