Replace the canvas placeholder with a Liveblocks=based React Flow canvas.

## implementation

1. Keep the workspace page server-side
2. Create a client-side editor/canvas wrapper that sets up the Liveblocks room.
    It should include:
        - `LiveBlocksProvider` using `/api/liveblocks-auth`
        - `RoomProvider` using the current room id
        - intial presence with `cursor:null`
        - `ClientSideSuspense` with a simple loading state
        - an error fallback for LiveBlocks connection issues
3. Wire React Flow to LiveBlocks state.
    - use `useLiveBlocksFlow`
    - enable suspense 
    - start with empty nodes and edges
    - pass the synced nodes, edges and change handlers into `ReactFlow`

4. Add shared canvas types in `types/canvas.ts`

Node data should support:
- label
- color
- shape

Also define the custom node and edge types:

- `canvasNode`
- `canvasEdge`

5. Render the basic canvas.

Include:
- loose connection behaviour
- `fitview`
- `minMap`
- dot-pattern background

## scope limits

- don't add controls yet
- don't add custom node or edge rendering yet
- don't add persistnce logic
- don't add AI behaviour
- keep this focused on the collaborative canvas foundation

## Check when Done

- Client canvas wrapper sets up the libeblocks room.
- react flow uses libeblocks-synced nodes and edges.
- shared canvas types exist in `types/canvas.ts`
- `npm run build` passes.