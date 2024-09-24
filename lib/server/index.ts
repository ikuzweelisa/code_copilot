"use server";
import { PrismaClient } from "@prisma/client";
import { Chat } from "@/lib/types";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export default async function saveChatData(chat: Chat) {
  try {
    await prisma.chart.upsert({
      where: { id: chat.id },
      update: {
        title: chat.title,
        messages: chat.messages,
        path: chat.path,
      },
      create: {
        id: chat.id,
        title: chat.title,
        messages: chat.messages,
        path: chat.path,
      },
    });

    return revalidatePath(chat.path);
  } catch (error: Error) {
    console.error("Error saving chat data:", error);
  }
}

export async function getChat(cid: string) {
  try {
    const chat = await prisma.chart.findFirst({
      where: {
        id: cid,
      },
    });
    if (!chat) return null;
    return chat;
  } catch (e) {
    console.log(e);
  }
}
