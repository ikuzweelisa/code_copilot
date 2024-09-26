"use server";
import { AuthStatus, Chat } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";
import { BuiltInProviderType } from "@auth/core/providers";
import { signIn } from "@/app/auth";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function saveChatData(chat: Chat) {
  try {
    await prisma.chat.upsert({
      where: { id: chat.id },
      update: {
        title: chat.title,
        messages: chat.messages as Prisma.InputJsonValue[],
        path: chat.path,
      },
      create: {
        id: chat.id,
        title: chat.title,
        messages: chat.messages as Prisma.InputJsonValue[],
        path: chat.path,
        user: {
          connect: {
            id: chat.userId,
          },
        },
      },
    });

    return revalidatePath(chat.path);
  } catch (error) {
    console.error("Error saving chat data:", error);
  }
}

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
    console.log(e);
  }
}

export async function getChats(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        chats: true,
      },
    });

    if (!user) return;
    return user.chats as Chat[];
  } catch (e) {
    console.log(e);
  }
}

export default async function signInWithProvider(
  prevState: AuthStatus | undefined,
  formData: FormData,
): Promise<AuthStatus> {
  try {
    const provider = formData.get("provider") as BuiltInProviderType;
    await signIn(provider);
    return {
      status: "success",
      message: "login successfully",
    };
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case "OAuthCallbackError":
          return {
            status: "error",
            message: e.message,
          };
        default:
          return {
            status: "error",
            message: "something went wrong",
          };
      }
    }
    throw e;
  }
}