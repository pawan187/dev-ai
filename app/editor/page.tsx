"use client";

import { useState } from "react";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";

export default function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen bg-slate-950">
      <EditorNavbar
        isOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 overflow-auto">
        <div className="pt-20 p-8">
          <h1 className="text-3xl font-bold text-white mb-4">Editor</h1>
          <p className="text-slate-400">
            Welcome to the dev ai editor. Start building your AI-powered application.
          </p>
        </div>
      </main>
    </div>
  );
}
