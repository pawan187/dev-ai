import Link from "next/link";
import { LockKeyhole } from "lucide-react";

export function AccessDenied() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="flex max-w-sm flex-col items-center text-center">
        <div className="mb-5 rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <LockKeyhole className="h-6 w-6 text-slate-300" aria-hidden="true" />
        </div>
        <h1 className="text-xl font-semibold">Project unavailable</h1>
        <p className="mt-2 text-sm text-slate-400">
          This project does not exist or you do not have access to it.
        </p>
        <Link
          href="/editor"
          className="mt-6 inline-flex h-8 items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          Back to projects
        </Link>
      </section>
    </main>
  );
}
