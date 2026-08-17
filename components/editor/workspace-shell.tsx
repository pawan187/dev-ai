"use client";

import { useState } from "react";
import { Bot, PanelRightClose } from "lucide-react";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { ShareDialog } from "@/components/editor/share-dialog";
import { Canvas } from "@/components/editor/canvas";
import { Button } from "@/components/ui/button";
import type { Project } from "@/hooks/useProjectActions";

interface WorkspaceShellProps {
  projectName: string;
  projectId: string;
  ownedProjects: Project[];
  sharedProjects: Project[];
  isOwner: boolean;
}

export function WorkspaceShell({
  projectName,
  projectId,
  ownedProjects,
  sharedProjects,
  isOwner,
}: WorkspaceShellProps) {
  const [isProjectSidebarOpen, setIsProjectSidebarOpen] = useState(false);
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-950 text-white">
      <EditorNavbar
        isOpen={isProjectSidebarOpen}
        onToggleSidebar={() => setIsProjectSidebarOpen((open) => !open)}
        projectName={projectName}
        isAiSidebarOpen={isAiSidebarOpen}
        onToggleAiSidebar={() => setIsAiSidebarOpen((open) => !open)}
        onShare={() => setIsShareDialogOpen(true)}
      />

      <div className="flex min-h-0 flex-1 pt-16">
        <ProjectSidebar
          isOpen={isProjectSidebarOpen}
          onToggleSidebar={setIsProjectSidebarOpen}
          ownedProjects={ownedProjects}
          sharedProjects={sharedProjects}
          currentProjectId={projectId}
          defaultTab={sharedProjects.some((project) => project.id === projectId) ? "shared" : "my-projects"}
          showBackdrop={false}
        />

        <main className={`relative min-w-0 flex-1 bg-slate-950 transition-[margin] ${isProjectSidebarOpen ? "ml-64" : "ml-0"}`}>
          <Canvas roomId={projectId} />
        </main>

        {isAiSidebarOpen && (
          <aside className="flex w-80 shrink-0 flex-col border-l border-slate-800 bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Bot className="h-4 w-4" aria-hidden="true" />
                AI assistant
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsAiSidebarOpen(false)}
                aria-label="Close AI sidebar"
              >
                <PanelRightClose className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-1 items-center justify-center px-6 text-center text-sm text-slate-400">
              AI chat will be available here in a future update.
            </div>
          </aside>
        )}

      </div>
      <ShareDialog
        open={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        projectId={projectId}
        isOwner={isOwner}
      />
    </div>
  );
}
