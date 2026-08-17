import { EditorPageClient } from "@/components/editor/editor-page-client";
import { getProjectsForUser } from "@/lib/project-helpers";

export default async function EditorPage() {
  // Fetch projects server-side
  const { owned, shared } = await getProjectsForUser();

  return (
    <div className="h-screen bg-slate-950">
      <EditorPageClient ownedProjects={owned} sharedProjects={shared} />
    </div>
  );
}
