Set up the realtime collaboration infrastructure using Liveblocks.

## Configuration

Configure the `liveblocks.config.ts` at the project root.

Define:

### Presence

- cursor postion
- `isThinking` boolean

### userMeta

- user id
- display name
- avatar url
- cursor color

## Liveblocks Client

Creat a cached libeblocks node client in `lib`

Add a helper that determinstically maps a user ID to a consistent color from a fixed paletter.

## Auth Route

Create `POST /api/liveblocks-auth`

Use the projct Id as the Liveblocks room id.

This route must:

- require Clerk authentication
- verify project access using the exsting access helper
- ensure the Liveblocks room exists ( create only if needed)
- return a session token with:
    - user name
    - avatar
    - generated cursor color

return 403 for unauthorized project access.
