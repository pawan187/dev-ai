Build the `/editor/[roomId]` workspace shell with server-side access checks. No canvas logic yet.

## Access

`/editor/[roomId]` must be a server component.

Before rendering:

- unauthenticated users redirect to `/sign-in`
- users without project access see `AccessDenied`
- non-existent project also show `AccessDenied`

Create `component/editor/access-denied.tsx` with:

- centered layout
- lock icon
- short message
- link back to `/editor`

## Access Helpers

 Create `lib/project-acces.ts` with helpers for:

 - getting current Clerk identity: `userid` + primry email
 - checking project access by owner or collaborator

 ## Layout

 Build a full-viewport workspace layout with:

 - use existing top navbar and it showing the projct Name
 - in existing navbar add in left side actions: share button nd AI sidebar toggle
 - use existing `ProjectSidebar` on the left
 - current room highlighted in the existing ProjectSidebar
 - central canvas placeholder with dark backgroun and centered message
 - a new right sidebar plaholder for future AI chat

 The canvas area should fill the remaining space.

 
## scope

Do not add real canvas logic, Liveblocks, AI chat, or sharing behaviour yet.

## check when done 

- `/editor/[roomId]` builds succesffully
- access helper exists outside the page component
- `AccessDenied` is used for missing or unauthorized projects
- workpsace layout renders with current project context
- no typescript errors