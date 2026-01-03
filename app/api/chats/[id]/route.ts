import { NextRequest, NextResponse } from "next/server";
import { getSession } from "~/lib/auth";
import { db } from "~/lib/drizzle";
import { chats } from "~/lib/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const session = await getSession();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json("unauthorized", { status: 401 });
  }
  await db.delete(chats).where(and(eq(chats.id, id), eq(chats.userId, userId)));
  return NextResponse.json("chat deleted", { status: 200 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const { title } = z
    .object({
      title: z.string().min(1).max(30),
    })
    .parse(await req.json());
  const session = await getSession();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json("unauthorized", { status: 401 });
  }
  await db
    .update(chats)
    .set({ title })
    .where(and(eq(chats.id, id), eq(chats.userId, userId)));
  return NextResponse.json("chat deleted", { status: 200 });
}
