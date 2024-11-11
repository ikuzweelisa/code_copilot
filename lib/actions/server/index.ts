import "server-only";

import prisma from "@/lib/db";
import { Chat } from "@/lib/types";

export async function getChat(cid: string) {
  try {
    const chat = await prisma.chat.findFirst({
      where: {
        id: cid,
      },
    });
    if (!chat) return null;
    return chat;
  } catch (e) {
    return null;
  }
}

export async function getChats(userId: string | undefined) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        chats: {
          orderBy: {
            updatedAt: "desc",
          },
          take: 10,
        },
      },
    });

    if (!user) return;
    return user.chats as Chat[];
  } catch (e) {
    return [] ;
  }
}
export async function getAttachmentById(fileId: string) {
  return prisma.attachment.findUnique({
    where: {
      id: fileId,
    },
  });
}
