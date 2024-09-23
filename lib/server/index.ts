"use server";
import { Chat } from "@/lib/types";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {redirect} from "next/navigation";


const prisma = new PrismaClient();

export default async function saveChatData(chat: Chat) {

  const existing = await prisma.chart.findFirst({
    where: { id: chat.id },
  });

  if (existing) {

    await prisma.chart.update({
      where: { id: chat.id },
      data: {
        messages: chat.messages,
      },
    });

    await revalidatePath(chat.path);

  } else {
    await prisma.chart.create({
      data: {
        id: chat.id,
        messages: chat.messages,
        path: chat.path,
        title: chat.title,
      },
    });
    redirect("/home")
  }
}
