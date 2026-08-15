# Architecture Context

## Stack

| Layer     | Technology                  | Role   |
| --------- | --------------------------- | ------ |
| Framework | Next.js + TypeScript        | Full-stack app with server/client boundaries |
| UI        | Tailwind + shadcn/ui        | Component composition and styling |
| Auth      | Clerk                       | user identity and route protection |
| Database  | Prisma + PostgreSQL         | Relationship metadata: projects, collaborators, specs, task runs |
| Canvas    | Liveblocks + React Flow     | Real-time collaborative canvas, presence, and cursors |
| Background tasks  | Trigger.dev         | Durable AI generation workflows |
| Artifact Storage  | Vercel Blob         | Canvas snapshots and generated Markdown specs |

## System Boundaries

- app/api - Authenticated request handlers:input vaidation, ownership checks, task triggering, and persistence.
- trigger - Long-running background jobs: AI design generation and spec genertion.
- lib - Shared infrastructrure: Prisma lclient, access control helpers, and utilities.
- components - UI composition: canvas suraces, sderbars, diablogs and interctive elements.
- prisma - Datbase schema and generated client output
- data - Legacy kicak directory. Not used for new artiacts.

## Storage Model

- databse - metadata, ownershup, relationshups and task run records.
- Vercek Blob - generated artifats 0 canvas snapshots at canvas/proejctId.json and secs at specs/projectId/specId.md
- Project records, soec records and teask run records belong in PostreSql. 
- Canvas content and Markdown output are stores in and retrieved from Vercel Blob.
- The blob URL is stored in the databsae [ canvasJosnPath, filePath ] as the reference to the artifact.

## Auth and Access Model

- Every user signs in via Clerk
- Every project has a single owner clerk user id
- Only authenticated users can access protected routes.
- Only the owner or a collaborator can mutate project resources
- Liveblocks room tokens are issued only after verifiyng project membership.


## Invariants

1. Request handlers do not run long-lived ai-work - that belongs in background tasks.
2. Metadata and large generated artifacts are stored in seprate layers.
3. Auth and ownershup are enforced at every mutation boundary.
4. Client components are used only where broswer interactivity or real-time state requires them.
5. The canvas schema must remain consistent between user0created content and imported templates.
