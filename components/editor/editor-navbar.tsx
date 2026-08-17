"use client";

import { Bot, PanelLeftOpen, Share2 } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface EditorNavbarProps {
  isOpen?: boolean;
  onToggleSidebar?: () => void;
  projectName?: string;
  isAiSidebarOpen?: boolean;
  onToggleAiSidebar?: () => void;
  onShare?: () => void;
}

export function EditorNavbar({
  isOpen = false,
  onToggleSidebar,
  projectName,
  isAiSidebarOpen = false,
  onToggleAiSidebar,
  onShare,
}: EditorNavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-950 border-b border-slate-800 flex items-center px-4 z-50">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {!isOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="h-8 w-8 shrink-0"
            aria-label="Open projects sidebar"
          >
            <PanelLeftOpen className="h-5 w-5" />
          </Button>
        )}
        {projectName && (
          <span className="max-w-96 truncate text-xl font-semibold tracking-tight text-slate-100">
            {projectName}
          </span>
        )}
      </div>

      <div className="flex flex-shrink-0 items-center gap-1">
        {projectName && (
          <Button variant="ghost" size="sm" className="gap-2" aria-label="Share project" onClick={onShare}>
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        )}
        {projectName && !isAiSidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleAiSidebar}
            aria-label="Open AI chat sidebar"
          >
            <Bot className="h-5 w-5" />
          </Button>
        )}
        <UserButton />
      </div>
    </nav>
  );
}
