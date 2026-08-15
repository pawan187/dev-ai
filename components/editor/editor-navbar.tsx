"use client";

import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface EditorNavbarProps {
  isOpen: boolean;
  onToggleSidebar: () => void;
}

export function EditorNavbar({ isOpen, onToggleSidebar }: EditorNavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-950 border-b border-slate-800 flex items-center px-4 z-50">
      {/* Left Section */}
      <div className="flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="h-8 w-8"
          aria-label="Toggle sidebar"
        >
          {isOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Center Section */}
      <div className="flex-1" />

      {/* Right Section */}
      <div className="flex-shrink-0">
        <UserButton />
      </div>
    </nav>
  );
}
