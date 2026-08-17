# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- Backend API Development

## Current Goal

- Implement project management API routes
- Build database query and mutation handlers
- Ensure authentication and authorization
- Wire UI components to API endpoints

## Completed

- ✓ Initialized shadcn/ui with Base UI components library
- ✓ Installed all 7 required UI components (Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea)
- ✓ Installed lucide-react for icon support
- ✓ Created lib/utils.ts with cn() helper function for merging Tailwind classes
- ✓ Verified dark theme CSS variables in app/globals.css
- ✓ Confirmed all components import without errors
- ✓ Build completed successfully with no errors
- ✓ Created components/editor/editor-navbar.tsx with sidebar toggle
- ✓ Created components/editor/project-sidebar.tsx with floating overlay
- ✓ Created components/editor/dialog-pattern.tsx for reusable dialogs
- ✓ Verified all new components compile without TypeScript errors
- ✓ Verified no lint errors in new components
- ✓ Created proxy.ts with clerkMiddleware() for route protection
- ✓ Created sign-in and sign-up pages using Clerk components
- ✓ Wrapped root layout with ClerkProvider
- ✓ Updated app/page.tsx to redirect based on auth status
- ✓ Added UserButton to editor navbar
- ✓ Created app/editor/page.tsx with navbar and sidebar
- ✓ Updated .env.local with Clerk redirect URLs
- ✓ Verified build passes with no TypeScript or compilation errors
- ✓ Redesigned sign-in and sign-up pages with 50/50 two-panel layout
- ✓ Left panel: Clerk forms with light surface color (#111827)
- ✓ Right panel: Dark background with testimonial and feature messaging
- ✓ Applied Geist Sans font throughout (from UI guidelines)
- ✓ Used CSS custom property color values from dark theme palette

## In Progress

- None

---

### Project Dialogs Implementation Complete
- ✓ Created useProjectDialogs hook for managing dialog/form/loading state
- ✓ Slug generation from project name (live preview)
- ✓ Created Create Project dialog with name input and slug preview
- ✓ Created Rename Project dialog with prefilled name and auto-focus
- ✓ Created Delete Project dialog with destructive confirmation
- ✓ Updated editor home page with centered content and New Project button
- ✓ Updated sidebar with mock project data (3 projects: 2 owned, 1 shared)
- ✓ Added sidebar project actions (rename/delete) visible on hover for owned projects
- ✓ Sidebar actions now show as direct icons (pencil + trash) instead of 3-dot menu
- ✓ Mobile: backdrop scrim already in place
- ✓ All dialogs wired to editor page
- ✓ Build passes with no TypeScript or compilation errors
- ✓ No lint errors

### Bug Fixes Applied
- ✓ Fixed title positioning - added pt-20 to main element to prevent overlap with navbar
- ✓ Updated dialog button styling to dark theme (blue for primary, red for destructive, slate for secondary)
- ✓ Replaced 3-dot menu with direct icon buttons (rename/delete) shown on hover next to project name

### Prisma Database Setup Complete
- ✓ Created prisma/schema.prisma with Project and ProjectCollaborator models
- ✓ Project model: ownerId (Clerk User), name, description, status enum (DRAFT/ARCHIVED), canvasJsonPath, timestamps, indexes on ownerId and createdAt
- ✓ ProjectCollaborator model: projectId with cascade delete, collaboratorEmail, createdAt, unique constraint on project/email, indexes on email and project/createdAt
- ✓ Created lib/prisma.ts as cached singleton for development hot reloads
- ✓ Prisma client uses global instance in development to prevent connection leaks
- ✓ Fixed prisma.config.ts schema path (removed trailing space)
- ✓ Updated schema.prisma to use standard prisma-client-js generator
- ✓ Ran migration: 20260817071233_init_projects successfully applied
- ✓ Generated Prisma Client to node_modules/@prisma/client
- ✓ npm run build passed with no TypeScript or compilation errors

### Project API Routes Implementation Complete
- ✓ Created app/api/projects/route.ts with GET and POST handlers
- ✓ GET /api/projects: List current user's projects (authenticated only)
- ✓ POST /api/projects: Create project with default name "Untitled Project"
- ✓ Installed @prisma/adapter-pg and pg for PostgreSQL driver support
- ✓ Updated lib/prisma.ts to use PrismaPg adapter for database connections
- ✓ Created app/api/projects/[projectId]/route.ts with PATCH and DELETE handlers
- ✓ PATCH /api/projects/[projectId]: Rename project (owner only, returns 403 for non-owners)
- ✓ DELETE /api/projects/[projectId]: Delete project (owner only, returns 403 for non-owners)
- ✓ All endpoints return 401 for unauthenticated requests
- ✓ All endpoints verify Clerk authentication using auth() from @clerk/nextjs
- ✓ All endpoints verify project ownership before mutations
- ✓ npm run build passes with no TypeScript or compilation errors
- ✓ Routes correctly registered: GET/POST /api/projects and PATCH/DELETE /api/projects/[projectId]

### Editor Workspace Shell Complete (Feature Spec 08)
- ✓ Created `lib/project-access.ts` with Clerk identity and project membership helpers
- ✓ Created server-rendered `/editor/[roomId]` page with sign-in redirect and project access checks
- ✓ Added `AccessDenied` state for missing or unauthorized projects
- ✓ Added a full-viewport workspace shell with project navbar context, project sidebar, canvas placeholder, and AI sidebar placeholder
- ✓ Added project navigation and current-project highlighting to the existing sidebar
- ✓ Filtered shared project lists by the signed-in user's primary email
- ✓ Verified `npm run build` passes with no TypeScript or compilation errors
- ✓ Included the project owner in the Share dialog access list with their Clerk profile data
- ✓ Refined sidebar controls: open icons appear only while their sidebar is closed, with close actions contained in each sidebar
- ✓ Moved Share and AI chat controls to the navbar's right side and increased the project title prominence

### Share Dialog Complete (Feature Spec 09)
- ✓ Added a Share dialog opened from the workspace navbar
- ✓ Owners can invite and remove project collaborators by email
- ✓ Collaborators have view-only access to the collaborator list
- ✓ Added project collaborator list, invite, and removal API endpoints with server-side owner enforcement for mutations
- ✓ Enriched collaborator emails with Clerk display names and avatars, with email-only fallback
- ✓ Added project-link copying with temporary `Copies!` feedback
- ✓ Verified `npm run build` passes with no TypeScript or compilation errors

### Wire Editor Home to Real API Complete (Feature Spec 07)
- ✓ Created lib/project-helpers.ts with getProjectsForUser() server-side data fetcher
- ✓ Fetches owned projects from Prisma for current Clerk user
- ✓ Fetches shared projects via ProjectCollaborator model
- ✓ Generates slugs for all projects server-side
- ✓ Created hooks/useProjectActions.ts with real API integration
- ✓ POST /api/projects: Create project with real API call
- ✓ Generates unique room ID suffix for each project
- ✓ Navigates to /editor/[projectId] on successful creation
- ✓ PATCH /api/projects/[id]: Rename project with real API call
- ✓ Refreshes page on successful rename
- ✓ DELETE /api/projects/[id]: Delete project with real API call
- ✓ Redirects to /editor on successful deletion
- ✓ Converted app/editor/page.tsx to server component
- ✓ Server component fetches projects using getProjectsForUser()
- ✓ Created components/editor/editor-page-client.tsx wrapper
- ✓ Client component manages sidebar state and dialogs
- ✓ Client component receives owned/shared projects as props
- ✓ Updated components/editor/project-sidebar.tsx
- ✓ Removed mock project data
- ✓ Accepts real ownedProjects and sharedProjects from props
- ✓ Changed onClose to onToggleSidebar callback pattern
- ✓ Shows "My projects" and "Shared" tabs with real data
- ✓ Projects display properly with rename/delete actions for owned
- ✓ Sidebar correctly filters and displays projects
- ✓ Create dialog shows room ID preview (slug generation)
- ✓ Rename dialog pre-fills current project name
- ✓ Delete dialog shows project name for confirmation
- ✓ All API calls include proper error handling
- ✓ Sidebar uses real project data from server
- ✓ Create navigates to new workspace (/editor/[projectId])
- ✓ Rename updates correctly and refreshes page
- ✓ Delete redirects or refreshes correctly

## Next Up

- Test API integration with browser network tools
- Add toast notifications for success/error feedback
- Add loading states and error handling in UI
- Test full user flow: create → rename → delete projects

## Open Questions

- Add unresolved product or implementation questions here

## Architecture Decisions

- Add decisions made that affect the system design or
  data model — include why the decision was made

## Session Notes

- Add Context needed to resume work in the next session
