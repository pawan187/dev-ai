"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Trash2, UserRound } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Collaborator {
  id: string;
  email: string;
  name: string | null;
  imageUrl: string | null;
  role: "owner" | "collaborator";
}

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  isOwner: boolean;
}

export function ShareDialog({ open, onOpenChange, projectId, isOwner }: ShareDialogProps) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;

    const loadCollaborators = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/projects/${projectId}/collaborators`);
        const payload: unknown = await response.json();
        if (!response.ok || !payload || typeof payload !== "object" || !("collaborators" in payload)) {
          throw new Error("Unable to load collaborators");
        }
        setCollaborators(payload.collaborators as Collaborator[]);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load collaborators");
      } finally {
        setIsLoading(false);
      }
    };

    void loadCollaborators();
  }, [open, projectId]);

  const inviteCollaborator = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`/api/projects/${projectId}/collaborators`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const payload: unknown = await response.json();
      if (!response.ok || !payload || typeof payload !== "object" || !("collaborator" in payload)) {
        throw new Error(payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string" ? payload.error : "Unable to invite collaborator");
      }
      const collaborator = payload.collaborator as Collaborator;
      setCollaborators((current) => [...current.filter((item) => item.id !== collaborator.id), collaborator]);
      setEmail("");
    } catch (inviteError) {
      setError(inviteError instanceof Error ? inviteError.message : "Unable to invite collaborator");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeCollaborator = async (collaboratorId: string) => {
    setError(null);
    try {
      const response = await fetch(`/api/projects/${projectId}/collaborators/${collaboratorId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Unable to remove collaborator");
      setCollaborators((current) => current.filter((collaborator) => collaborator.id !== collaboratorId));
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : "Unable to remove collaborator");
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/editor/${projectId}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto border-slate-800 bg-slate-950 text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Share project</DialogTitle>
          <DialogDescription className="text-slate-400">
            {isOwner ? "Invite teammates to collaborate on this workspace." : "People with access to this workspace."}
          </DialogDescription>
        </DialogHeader>

        {isOwner && (
          <form className="flex gap-2" onSubmit={inviteCollaborator}>
            <Input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="teammate@example.com" aria-label="Collaborator email" />
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Inviting..." : "Invite"}</Button>
          </form>
        )}

        {isOwner && (
          <Button variant="secondary" className="w-full gap-2" onClick={() => void copyLink()}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copies!" : "Copy project link"}
          </Button>
        )}

        <section>
          <h3 className="mb-3 text-sm font-medium text-slate-200">People with access</h3>
          {isLoading ? <p className="text-sm text-slate-400">Loading collaborators…</p> : collaborators.length === 0 ? <p className="text-sm text-slate-400">No collaborators yet.</p> : (
            <ul className="space-y-3">
              {collaborators.map((collaborator) => (
                <li key={collaborator.id} className="flex items-center gap-3">
                  {collaborator.imageUrl ? <img src={collaborator.imageUrl} alt="" className="h-9 w-9 rounded-full" /> : <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800"><UserRound className="h-4 w-4 text-slate-400" /></span>}
                  <div className="min-w-0 flex-1"><p className="truncate text-sm text-slate-100">{collaborator.name ?? collaborator.email}</p>{collaborator.name && <p className="truncate text-xs text-slate-400">{collaborator.email}</p>}</div>
                  {collaborator.role === "owner" ? <span className="text-xs text-slate-400">Owner</span> : isOwner && <Button variant="ghost" size="icon" onClick={() => void removeCollaborator(collaborator.id)} aria-label={`Remove ${collaborator.email}`}><Trash2 className="h-4 w-4 text-red-400" /></Button>}
                </li>
              ))}
            </ul>
          )}
        </section>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </DialogContent>
    </Dialog>
  );
}
