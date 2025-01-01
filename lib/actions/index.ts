import "server-only";
import { db } from "@/lib/drizzle";
import { cache } from "react";
import { CoreMessage } from "ai";
import { auth } from "@/app/auth";
import { getChatTitle } from "@/lib/actions/helpers";
import { chats } from "../drizzle/schema";

export const getChat = cache(async (cid: string) => {
  try {
    const chat = await db.query.chats.findFirst({
      where: (chat, { eq }) => eq(chat.id, cid),
    });
    if (!chat) return null;
    return chat;
  } catch (e) {
    return null;
  }
});

export const getChats = cache(async (userId: string | undefined) => {
  if (!userId) return [];
  try {
    const chats = await db.query.chats.findMany({
      where: (chat, { eq }) => eq(chat.userId, userId),
      orderBy: (chat, { desc }) => desc(chat.updatedAt),
    });
    return chats;
  } catch (e) {
    return [];
  }
});

const getChatById = cache(async (id: string | undefined) => {
  if (!id) return null;
  const chat = await db.query.chats.findFirst({
    where: (chat, { eq }) => eq(chat.id, id),
  });
  return chat;
});

export async function saveChatData(id: string, messages: CoreMessage[]) {
  try {
    const session = auth();
    const existing = await getChatById(id);
    const title = existing ? existing.title : await getChatTitle(messages);
    const userId = existing ? existing.userId : (await session)?.user?.id;
    if (!userId) return null;
    await db
      .insert(chats)
      .values({
        id: id,
        userId: userId,
        title: title,
        messages: messages,
      })
      .onConflictDoUpdate({
        target: [chats.id],
        set: {
          messages: messages,
        },
      });
  } catch (e) {
    console.error("Error saving chat data:");
    return null;
  }
}

export const getUserChats = cache(async () => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) {
      return [];
    }
    const chats = await db.query.chats.findMany({
      where: (chats, { eq }) => eq(chats.userId, userId),
      orderBy: (chat, { desc }) => desc(chat.updatedAt),
      with: {
        user: true,
      },
    });
    return chats;
  } catch (e) {
    return [];
  }
});
