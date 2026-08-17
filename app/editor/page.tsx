"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { CreateProjectDialog } from "@/components/editor/create-project-dialog";
import { RenameProjectDialog } from "@/components/editor/rename-project-dialog";
import { DeleteProjectDialog } from "@/components/editor/delete-project-dialog";
import { Button } from "@/components/ui/button";
import { useProjectDialogs } from "@/hooks/useProjectDialogs";

export default function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dialogs = useProjectDialogs();

  const handleNewProject = () => {
    dialogs.openCreateDialog();
  };

  return (
    <div className="h-screen bg-slate-950">
      <EditorNavbar
        isOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewProject={handleNewProject}
        onRenameProject={dialogs.openRenameDialog}
        onDeleteProject={dialogs.openDeleteDialog}
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
        open={dialogs.openDialog === "create"}
        onOpenChange={(open) => {
          if (!open) dialogs.closeDialog();
        }}
        projectName={dialogs.formData.projectName}
        slug={dialogs.formData.slug}
        onProjectNameChange={dialogs.updateProjectName}
        onConfirm={dialogs.handleCreateProject}
        isLoading={dialogs.isLoading}
      />

      {/* Rename Project Dialog */}
      <RenameProjectDialog
        open={dialogs.openDialog === "rename"}
        onOpenChange={(open) => {
          if (!open) dialogs.closeDialog();
        }}
        currentProjectName={dialogs.selectedProject?.name || ""}
        projectName={dialogs.formData.projectName}
        slug={dialogs.formData.slug}
        onProjectNameChange={dialogs.updateProjectName}
        onConfirm={dialogs.handleRenameProject}
        isLoading={dialogs.isLoading}
      />

      {/* Delete Project Dialog */}
      <DeleteProjectDialog
        open={dialogs.openDialog === "delete"}
        onOpenChange={(open) => {
          if (!open) dialogs.closeDialog();
        }}
        projectName={dialogs.selectedProject?.name || ""}
        onConfirm={dialogs.handleDeleteProject}
        isLoading={dialogs.isLoading}
      />
    </div>
  );
}
