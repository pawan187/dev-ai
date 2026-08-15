"use client";

import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
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
            onClick={onClose}
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
              <div className="flex items-center justify-center py-12 text-center">
                <div>
                  <p className="text-sm text-slate-400">
                    No projects yet
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Create your first project to get started
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Shared Tab */}
            <TabsContent value="shared" className="mt-4">
              <div className="flex items-center justify-center py-12 text-center">
                <div>
                  <p className="text-sm text-slate-400">
                    No shared projects
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Projects shared with you will appear here
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>

        {/* New Project Button */}
        <div className="px-4 py-4 border-t border-slate-800">
          <Button className="w-full" variant="default">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}
