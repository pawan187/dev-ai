import { redirect } from "next/navigation";
import { AccessDenied } from "@/components/editor/access-denied";
import { WorkspaceShell } from "@/components/editor/workspace-shell";
import { getProjectAccess, getCurrentProjectIdentity } from "@/lib/project-access";
import { getProjectsForUser } from "@/lib/project-helpers";

export default async function EditorWorkspacePage({
  params,
}: PageProps<"/editor/[roomId]">) {
  const { roomId } = await params;
  const identity = await getCurrentProjectIdentity();

  if (!identity) {
    redirect("/sign-in");
  }

  const project = await getProjectAccess(roomId, identity);

  if (!project) {
    return <AccessDenied />;
  }

  const { owned, shared } = await getProjectsForUser(identity);

  return (
    <WorkspaceShell
      projectName={project.name}
      projectId={project.id}
      ownedProjects={owned}
      sharedProjects={shared}
      isOwner={project.ownerId === identity.userId}
    />
  );
}
