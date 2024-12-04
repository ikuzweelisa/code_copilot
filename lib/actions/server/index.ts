import "server-only";
import prisma from "@/lib/db";
import { Chat } from "@/lib/types";
import { cache } from "react";
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { Prisma } from "@prisma/client";


export const getChat = async (cid: string) => {
  try {
    const chat = await prisma.chat.findFirst({
      where: {
        id: cid,
      },
    });
    if (!chat) return null;
    return chat as Chat;
  } catch (e) {
    return null;
  }
};

export const getChats = async (userId: string | undefined) => {
  "use cache";
  cacheTag("chats");
  cacheLife("hours");
  if (!userId) return [];
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return chats as unknown as Chat[];
  } catch (e) {
    return [];
  }
};

export async function getChatById(id: string | undefined) {
  if (!id) return null;
  return prisma.chat.findUnique({
    where: {
      id: id,
    },
  });
}

export async function saveChatData(chat: Partial<Chat>) {
  await prisma.chat.upsert({
    where: { id: chat.id },
    update: {
      messages: chat.messages as Prisma.InputJsonValue[],
    },
    create: {
      id: chat.id as string,
      title: chat.title as string,
      messages: chat.messages as Prisma.InputJsonValue[],
      path: chat.path as string,
      user: {
        connect: {
          id: chat.userId,
        },
      },
    },
  });
}
