import "server-only";
import prisma from "@/lib/db";
import { Chat } from "@/lib/types";
import { cache } from "react";
import { Prisma } from "@prisma/client";
import { CoreMessage } from "ai";
import { auth } from "@/app/auth";
import { getChatTitle } from "@/lib/actions/helpers";

export const getChat = cache(async (cid: string) => {
  try {
    const chat = await prisma.chat.findFirst({
      where: {
        id: cid,
      },
    });
    if (!chat) return null;
    return chat as unknown as Chat;
  } catch (e) {
    return null;
  }
});

export const getChats = async (userId: string | undefined) => {
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

export async function saveChatData(id: string, messages: CoreMessage[]) {
  try {
    const session = auth();
    const existing = await getChatById(id);
    const title = existing ? existing.title : await getChatTitle(messages);
    const userId = existing ? existing.userId : (await session)?.user?.id;
    if (!userId) return null;
    await prisma.chat.upsert({
      where: { id: id },
      update: {
        messages: messages as unknown as Prisma.InputJsonValue[],
      },
      create: {
        id: id,
        title: title,
        messages: messages as unknown as Prisma.InputJsonValue[],
        path: `/chat/${id}`,
        userId: userId,
      },
    });
  } catch (e) {
    console.error("Error saving chat data:");
    return null;
  }
}
