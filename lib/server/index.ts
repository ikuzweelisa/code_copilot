import "server-only";
import { db } from "~/lib/drizzle";
import { cache } from "react";
import { getChatTitle } from "~/lib/server/helpers";
import { chats } from "~/lib/drizzle/schema";
import { getSession } from "../auth";
import { UIMessage } from "../ai/types";

export const getChats = cache(async (userId: string | undefined) => {
  if (!userId) return [];
  try {
    const chats = await db.query.chats.findMany({
      where: (chat, { eq }) => eq(chat.userId, userId),
      orderBy: (chat, { desc }) => desc(chat.updatedAt),
    });
    return chats;
  } catch (e) {
    console.error("error:", e);
    return [];
  }
});

export const getChatById = async (id: string | undefined) => {
  if (!id) return null;
  const chat = await db.query.chats.findFirst({
    where: (chat, { eq }) => eq(chat.id, id),
  });
  return chat;
};

export async function saveChatData({
  id,
  messages,
  streamId,
  generateTitle = false,
}: {
  id: string;
  messages?: UIMessage[];
  streamId?: string | null;
  generateTitle?: boolean;
}) {
  try {
    const session = await getSession();
    if (!session || !session?.user?.id) return;
    const existing = await getChatById(id);
    const userId = existing ? existing.userId : session.user.id;
    let title = existing?.title;
    if (!title && generateTitle) {
      console.log("genereted chat title");
      title = await getChatTitle(messages ?? []);
    }
    if (!userId) return null;
    await db
      .insert(chats)
      .values({
        id: id,
        title: title,
        userId: userId,
        ...(messages ? { messages } : {}),
        ...(streamId !== undefined ? { activeStreamId: streamId } : {}),
      })
      .onConflictDoUpdate({
        target: chats.id,
        set: {
          ...(messages ? { messages } : {}),
          ...(streamId !== undefined ? { activeStreamId: streamId } : {}),
          ...(title ? { title } : {}),
        },
      });
  } catch (e) {
    console.error("Error savingachat data:", e);
    return null;
  }
}

export const getUserChats = async () => {
  try {
    const session = await getSession();
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
};
