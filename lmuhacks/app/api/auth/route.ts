import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { gamertag, bio, userId } = await request.json();

  await (
    await clerkClient()
  ).users.updateUserMetadata(userId, {
    publicMetadata: {
      gamertag,
      bio,
    },
  });

  return Response.json({ success: true });
}

export async function GET(request: NextRequest) {
  const { userId } = await request.json();

  const user = await (await clerkClient()).users.getUser(userId);

  return Response.json({
    gamertag: user.publicMetadata.gamertag,
    bio: user.publicMetadata.bio,
  });
}

// export async function DELETE(request: NextRequest) {
//   const { userId } = await request.json();

//   await (await clerkClient()).users.deleteUser(userId);
// }
