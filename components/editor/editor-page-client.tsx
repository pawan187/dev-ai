"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { CreateProjectDialog } from "@/components/editor/create-project-dialog";
import { RenameProjectDialog } from "@/components/editor/rename-project-dialog";
import { DeleteProjectDialog } from "@/components/editor/delete-project-dialog";
import { Button } from "@/components/ui/button";
import { useProjectActions, type Project } from "@/hooks/useProjectActions";

interface EditorPageClientProps {
  ownedProjects: Project[];
  sharedProjects: Project[];
}

export function EditorPageClient({
  ownedProjects,
  sharedProjects,
}: EditorPageClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const actions = useProjectActions();

  const handleNewProject = () => {
    actions.openCreateDialog();
  };

  return (
    <>
      <EditorNavbar
        isOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <ProjectSidebar
        isOpen={isSidebarOpen}
        onToggleSidebar={(isOpen) => setIsSidebarOpen(isOpen)}
        ownedProjects={ownedProjects}
        sharedProjects={sharedProjects}
        onRenameProject={actions.openRenameDialog}
        onDeleteProject={actions.openDeleteDialog}
      />

      <main className="flex-1 overflow-auto pt-20">
        {/* Editor Home */}
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-3">
              Create a project or open an existing one
            </h1>
            <p className="text-slate-400 text-lg mb-8">
              Start a new architecture workspace, or choose a project from the sidebar.
            </p>
            <Button
              onClick={handleNewProject}
              size="lg"
              className="gap-2"
            >
              <Plus className="h-5 w-5" />
              New Project
            </Button>
          </div>
        </div>
      </main>

      {/* Create Project Dialog */}
      <CreateProjectDialog
        open={actions.openDialog === "create"}
        onOpenChange={(open) => {
          if (!open) actions.closeDialog();
        }}
        projectName={actions.formData.projectName}
        slug={actions.formData.slug}
        onProjectNameChange={actions.updateProjectName}
        onConfirm={actions.handleCreateProject}
        isLoading={actions.isLoading}
      />

      {/* Rename Project Dialog */}
      <RenameProjectDialog
        open={actions.openDialog === "rename"}
        onOpenChange={(open) => {
          if (!open) actions.closeDialog();
        }}
        currentProjectName={actions.selectedProject?.name || ""}
        projectName={actions.formData.projectName}
        slug={actions.formData.slug}
        onProjectNameChange={actions.updateProjectName}
        onConfirm={actions.handleRenameProject}
        isLoading={actions.isLoading}
      />

      {/* Delete Project Dialog */}
      <DeleteProjectDialog
        open={actions.openDialog === "delete"}
        onOpenChange={(open) => {
          if (!open) actions.closeDialog();
        }}
        projectName={actions.selectedProject?.name || ""}
        onConfirm={actions.handleDeleteProject}
        isLoading={actions.isLoading}
      />
    </>
  );
}
