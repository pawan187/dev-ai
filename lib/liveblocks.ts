import { Liveblocks } from "@liveblocks/node";

const CURSOR_COLORS = [
  "#7AA2FF",
  "#4CC9F0",
  "#A78BFA",
  "#F472B6",
  "#34D399",
  "#FBBF24",
  "#FB7185",
  "#22D3EE",
] as const;

declare global {
  var liveblocksClient: Liveblocks | undefined;
}

/** Returns the shared server-side Liveblocks client. */
export function getLiveblocksClient(): Liveblocks {
  const secret = process.env.LIVEBLOCKS_SECRET_KEY;

  if (!secret) {
    throw new Error("LIVEBLOCKS_SECRET_KEY is not configured.");
  }

  if (!globalThis.liveblocksClient) {
    globalThis.liveblocksClient = new Liveblocks({ secret });
  }

  return globalThis.liveblocksClient;
}

/** Maps an identifier to the same cursor color on every request. */
export function getCursorColor(userId: string): string {
  let hash = 0;

  for (let index = 0; index < userId.length; index += 1) {
    hash = (hash * 31 + userId.charCodeAt(index)) | 0;
  }

  return CURSOR_COLORS[(hash >>> 0) % CURSOR_COLORS.length];
}
