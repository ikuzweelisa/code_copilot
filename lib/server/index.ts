import "server-only";

import { eq } from "drizzle-orm";
import { cache } from "react";

import { db } from "~/lib/drizzle";
import { chats, userPreferences } from "~/lib/drizzle/schema";
import { getChatTitle } from "~/lib/server/helpers";

import { UIMessage } from "../ai/types";
import { getSession } from "../auth";
import { Customization } from "../types/schema";

export const getChats = cache(
  async (userId: string | undefined, limit = 25, offset = 0, search?: string) => {
    if (!userId) return [];
    try {
      const chats = await db.query.chats.findMany({
        columns: {
          messages: false,
          activeStreamId: false,
        },
        with: {
          user: {
            columns: {
              name: true,
              email: true,
              image: true,
            },
          },
          parentChat: {
            columns: {
              id: true,
              title: true,
            },
          },
        },
        where: (chat, { eq, ilike, and }) =>
          search
            ? and(eq(chat.userId, userId), ilike(chat.title, `%${search}%`))
            : eq(chat.userId, userId),
        orderBy: (chat, { desc }) => desc(chat.updatedAt),
        limit,
        offset,
      });
      return chats.map(({ parentChat, ...chat }) => ({
        ...chat,
        parentChatTitle: parentChat?.title ?? null,
      }));
    } catch (e) {
      console.error("error:", e);
      return [];
    }
  },
);

export const getChatById = async (id: string | undefined) => {
  if (!id) return null;
  const chat = await db.query.chats.findFirst({
    where: (chat, { eq }) => eq(chat.id, id),
  });
  return chat;
};

export const getUserPreferences = async (userId: string | undefined) => {
  if (!userId) return undefined;
  const preferences = await db.query.userPreferences.findFirst({
    where: eq(userPreferences.userId, userId),
  });
  return preferences;
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
      title = await getChatTitle(messages ?? []);
    }
    if (!userId) return null;
    await db
      .insert(chats)
      .values({
        id: id,
        userId: userId,
        ...(messages ? { messages } : {}),
        ...(title ? { title } : {}),
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
  } catch {
    return [];
  }
};

export async function saveUserPreferences(userId: string, data: Customization) {
  await db
    .insert(userPreferences)
    .values({
      userId,
      nickName: data.name,
      ...data,
    })
    .onConflictDoUpdate({
      target: userPreferences.userId,
      set: {
        nickName: data.name,
        ...data,
      },
    });
}
