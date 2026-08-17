"use client";

import { useState } from "react";
import { X, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Project } from "@/hooks/useProjectActions";

interface ProjectSidebarProps {
  isOpen: boolean;
  onToggleSidebar: (isOpen: boolean) => void;
  ownedProjects: Project[];
  sharedProjects: Project[];
  onRenameProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
}

export function ProjectSidebar({
  isOpen,
  onToggleSidebar,
  ownedProjects,
  sharedProjects,
  onRenameProject,
  onDeleteProject,
}: ProjectSidebarProps) {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const handleRename = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    onRenameProject(project);
  };

  const handleDelete = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteProject(project);
  };

  const ProjectItem = ({ project }: { project: Project }) => (
    <div
      key={project.id}
      className="relative"
      onMouseEnter={() => setHoveredProjectId(project.id)}
      onMouseLeave={() => setHoveredProjectId(null)}
    >
      <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-slate-800 transition-colors group cursor-pointer">
        <span className="text-sm text-slate-300 truncate flex-1">{project.name}</span>

        {/* Action Icons (shown on hover for owned projects) */}
        {project.owned && hoveredProjectId === project.id && (
          <div className="flex items-center gap-1 ml-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-slate-400 hover:text-slate-200 hover:bg-slate-700"
              onClick={(e) => handleRename(project, e)}
              title="Rename"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-slate-400 hover:text-red-400 hover:bg-slate-700"
              onClick={(e) => handleDelete(project, e)}
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => onToggleSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-slate-950 border-r border-slate-800 z-40 flex flex-col transition-transform duration-300 ease-in-out pt-16 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
          <h2 className="text-lg font-semibold">Projects</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleSidebar(false)}
            className="h-8 w-8"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <ScrollArea className="flex-1 px-4 py-4">
          <Tabs defaultValue="my-projects" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="my-projects">My projects</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
            </TabsList>

            {/* My Projects Tab */}
            <TabsContent value="my-projects" className="mt-4">
              {ownedProjects.length > 0 ? (
                <div className="space-y-2">
                  {ownedProjects.map((project) => (
                    <ProjectItem key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-12 text-center">
                  <div>
                    <p className="text-sm text-slate-400">No projects yet</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Create your first project to get started
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Shared Tab */}
            <TabsContent value="shared" className="mt-4">
              {sharedProjects.length > 0 ? (
                <div className="space-y-2">
                  {sharedProjects.map((project) => (
                    <ProjectItem key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-12 text-center">
                  <div>
                    <p className="text-sm text-slate-400">No shared projects</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Projects shared with you will appear here
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </aside>
    </>
  );
}
