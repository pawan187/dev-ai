import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RenameProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentProjectName: string;
  projectName: string;
  slug: string;
  onProjectNameChange: (name: string) => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export function RenameProjectDialog({
  open,
  onOpenChange,
  currentProjectName,
  projectName,
  slug,
  onProjectNameChange,
  onConfirm,
  isLoading,
}: RenameProjectDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && projectName.trim() && !isLoading) {
      onConfirm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Rename Project</DialogTitle>
          <DialogDescription>
            Rename "{currentProjectName}" to something new.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Project Name Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">
              New Project Name
            </label>
            <Input
              ref={inputRef}
              placeholder="Enter new project name"
              value={projectName}
              onChange={(e) => onProjectNameChange(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="bg-slate-900 border-slate-700 text-white placeholder-slate-500"
            />
          </div>

          {/* Slug Preview */}
          {projectName && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">
                New Project Slug
              </label>
              <div className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-sm text-slate-300">
                {slug || "project-name"}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-200"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!projectName.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? "Renaming..." : "Rename"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
