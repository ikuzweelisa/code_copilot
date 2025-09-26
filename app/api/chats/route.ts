import { auth } from "~/app/auth";
import { getChats } from "~/lib/server";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const id = session?.user?.id;
  const chats = await getChats(id);
  return NextResponse.json(chats, { status: 200 });
}