# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- Editor Features & Project Management

## Current Goal

- Build editor home screen with project creation UI
- Create Create/Rename/Delete project dialogs
- Add sidebar project items with actions (rename/delete)
- Implement useProjectDialogs hook for state management
- Wire all interactions with mock data
- Mobile: add sidebar backdrop and closing behavior
- Test all dialogs and interactions
- Verify no TypeScript or lint errors

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

## Next Up

- Test Clerk form styling and interactions
- Refine Clerk component appearance customization
- Build feature-specific editor components (canvas, toolbar, etc.)
- Create page layouts for different editor features
- Implement project creation dialog with database integration

## Open Questions

- Add unresolved product or implementation questions here

## Architecture Decisions

- Add decisions made that affect the system design or
  data model — include why the decision was made

## Session Notes

- Add Context needed to resume work in the next session
