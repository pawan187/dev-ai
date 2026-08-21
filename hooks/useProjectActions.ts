import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export interface Project {
  id: string;
  name: string;
  slug: string;
  owned: boolean;
}

export type DialogType = "create" | "rename" | "delete" | null;

interface UseProjectActionsState {
  openDialog: DialogType;
  formData: {
    projectName: string;
    slug: string;
  };
  selectedProject: Project | null;
  isLoading: boolean;
  error: string | null;
}

export function useProjectActions() {
  const router = useRouter();
  const [state, setState] = useState<UseProjectActionsState>({
    openDialog: null,
    formData: {
      projectName: "",
      slug: "",
    },
    selectedProject: null,
    isLoading: false,
    error: null,
  });

  // Generate slug from project name
  const generateSlug = useCallback((name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s]+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 50);
  }, []);

  // Generate unique suffix for room ID
  const generateRoomIdSuffix = useCallback((): string => {
    return Math.random().toString(36).substring(2, 8);
  }, []);

  // Open Create dialog
  const openCreateDialog = useCallback(() => {
    setState((prev) => ({
      ...prev,
      openDialog: "create",
      formData: {
        projectName: "",
        slug: "",
      },
      selectedProject: null,
      error: null,
    }));
  }, []);

  // Open Rename dialog
  const openRenameDialog = useCallback((project: Project) => {
    setState((prev) => ({
      ...prev,
      openDialog: "rename",
      formData: {
        projectName: project.name,
        slug: project.slug,
      },
      selectedProject: project,
      error: null,
    }));
  }, []);

  // Open Delete dialog
  const openDeleteDialog = useCallback((project: Project) => {
    setState((prev) => ({
      ...prev,
      openDialog: "delete",
      selectedProject: project,
      error: null,
    }));
  }, []);

  // Close dialog
  const closeDialog = useCallback(() => {
    setState((prev) => ({
      ...prev,
      openDialog: null,
      formData: {
        projectName: "",
        slug: "",
      },
      selectedProject: null,
      error: null,
    }));
  }, []);

  // Update project name and regenerate slug
  const updateProjectName = useCallback(
    (name: string) => {
      setState((prev) => ({
        ...prev,
        formData: {
          projectName: name,
          slug: generateSlug(name),
        },
      }));
    },
    [generateSlug]
  );

  // Create project handler
  const handleCreateProject = useCallback(async () => {
    if (!state.formData.projectName.trim()) return;

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.formData.projectName,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create project");
      }

      const newProject = await response.json();

      setState((prev) => ({
        ...prev,
        isLoading: false,
        openDialog: null,
        formData: {
          projectName: "",
          slug: "",
        },
      }));

      // Navigate to new workspace
      router.push(`/editor/${newProject.id}`);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to create project",
      }));
    }
  }, [state.formData.projectName, router]);

  // Rename project handler
  const handleRenameProject = useCallback(async () => {
    if (!state.formData.projectName.trim() || !state.selectedProject) return;

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(
        `/api/projects/${state.selectedProject.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: state.formData.projectName,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to rename project");
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        openDialog: null,
        formData: {
          projectName: "",
          slug: "",
        },
        selectedProject: null,
      }));

      // Refresh the page to show updated project name
      router.refresh();
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to rename project",
      }));
    }
  }, [state.formData.projectName, state.selectedProject, router]);

  // Delete project handler
  const handleDeleteProject = useCallback(async () => {
    if (!state.selectedProject) return;

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(
        `/api/projects/${state.selectedProject.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete project");
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        openDialog: null,
        selectedProject: null,
      }));

      // Redirect to /editor (home) after deletion
      router.push("/editor");
      router.refresh();
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to delete project",
      }));
    }
  }, [state.selectedProject, router]);

  return {
    // State
    openDialog: state.openDialog,
    formData: state.formData,
    selectedProject: state.selectedProject,
    isLoading: state.isLoading,
    error: state.error,

    // Actions
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    updateProjectName,

    // Handlers
    handleCreateProject,
    handleRenameProject,
    handleDeleteProject,
  };
}
