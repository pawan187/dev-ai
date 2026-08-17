The database schema is ready. Build the backend project API routes only.

## routes

Create REST endpoint for :

- GET `api/projects` , list current user's projects
- POST `/api/projects` , create project
- PATCH `/api/projects/[projectID]`, rename project
- DELET `/api/projects/[projectID]`, delete project

## Rules

Use the authenticated Clerk user Id as ownerId

when creating:
bl
- default missing project name to `Untitle Project`
- use the schema's existing ID strategy, do not add sequential IDs

Security :

- unauthenticated request return 401
- only the project owner can rename or delete
- non-owner mutations return 403

Keep this backend-only. Do not wire the UI yet.

## check when done

- route exist for list/create/rename/delete
- owner checks are enforced for rename/delete
- 401 or 403 responses are handled correctly
- npm run build passes