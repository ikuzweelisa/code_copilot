import { getChats } from "~/lib/server";
import { NextResponse } from "next/server";
import { getSession } from "~/lib/auth";

export async function GET() {
  const session = await getSession();
  const id = session?.user?.id;
  if (!id) {
    return NextResponse.json("unauthorized", { status: 401 });
  }
  const chats = await getChats(id);
  return NextResponse.json(chats, { status: 200 });
}
