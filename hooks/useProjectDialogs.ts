import { useState, useCallback } from "react";

export interface Project {
  id: string;
  name: string;
  slug: string;
  owned: boolean;
}

export type DialogType =
  | "create"
  | "rename"
  | "delete"
  | null;

interface UseProjectDialogsState {
  openDialog: DialogType;
  formData: {
    projectName: string;
    slug: string;
  };
  selectedProject: Project | null;
  isLoading: boolean;
}

export function useProjectDialogs() {
  const [state, setState] = useState<UseProjectDialogsState>({
    openDialog: null,
    formData: {
      projectName: "",
      slug: "",
    },
    selectedProject: null,
    isLoading: false,
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
    }));
  }, []);

  // Open Delete dialog
  const openDeleteDialog = useCallback((project: Project) => {
    setState((prev) => ({
      ...prev,
      openDialog: "delete",
      selectedProject: project,
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
    }));
  }, []);

  // Update project name and regenerate slug
  const updateProjectName = useCallback((name: string) => {
    setState((prev) => ({
      ...prev,
      formData: {
        projectName: name,
        slug: generateSlug(name),
      },
    }));
  }, [generateSlug]);

  // Create project handler
  const handleCreateProject = useCallback(async () => {
    if (!state.formData.projectName.trim()) return;

    setState((prev) => ({ ...prev, isLoading: true }));

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock: log the new project
    console.log("Creating project:", {
      name: state.formData.projectName,
      slug: state.formData.slug,
    });

    setState((prev) => ({
      ...prev,
      isLoading: false,
      openDialog: null,
      formData: {
        projectName: "",
        slug: "",
      },
    }));
  }, [state.formData.projectName, state.formData.slug]);

  // Rename project handler
  const handleRenameProject = useCallback(async () => {
    if (!state.formData.projectName.trim() || !state.selectedProject) return;

    setState((prev) => ({ ...prev, isLoading: true }));

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock: log the renamed project
    console.log("Renaming project:", {
      oldName: state.selectedProject.name,
      newName: state.formData.projectName,
      slug: state.formData.slug,
    });

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
  }, [state.formData.projectName, state.formData.slug, state.selectedProject]);

  // Delete project handler
  const handleDeleteProject = useCallback(async () => {
    if (!state.selectedProject) return;

    setState((prev) => ({ ...prev, isLoading: true }));

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock: log the deleted project
    console.log("Deleting project:", state.selectedProject.name);

    setState((prev) => ({
      ...prev,
      isLoading: false,
      openDialog: null,
      selectedProject: null,
    }));
  }, [state.selectedProject]);

  return {
    // State
    openDialog: state.openDialog,
    formData: state.formData,
    selectedProject: state.selectedProject,
    isLoading: state.isLoading,

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
