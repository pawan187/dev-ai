import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getCursorColor, getLiveblocksClient } from "@/lib/liveblocks";
import { getProjectAccess } from "@/lib/project-access";

interface LiveblocksAuthRequest {
  room?: unknown;
}

/** Issues a Liveblocks access token for an authorized project collaborator. */
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: LiveblocksAuthRequest = await request.json();
    const roomId = typeof body.room === "string" ? body.room : "";

    if (!roomId) {
      return NextResponse.json({ error: "A project room is required" }, { status: 400 });
    }

    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase();

    if (!user || !email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const project = await getProjectAccess(roomId, { userId, email });

    if (!project) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const name =
      user.fullName ?? user.username ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous";
    const avatar = user.imageUrl;
    const color = getCursorColor(userId);
    const liveblocks = getLiveblocksClient();

    await liveblocks.getOrCreateRoom(project.id, { defaultAccesses: [] });

    const session = liveblocks.prepareSession(userId, {
      userInfo: { name, avatar, color },
    });
    session.allow(project.id, ["*:write"]);

    const { body: token, status } = await session.authorize();

    return new NextResponse(token, {
      status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to authorize Liveblocks session:", error);
    return NextResponse.json(
      { error: "Unable to authorize Liveblocks session" },
      { status: 500 }
    );
  }
}
