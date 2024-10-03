"use server";
import { AuthStatus, Chat, Attachment } from "@/lib/types";
import { AuthError } from "next-auth";
import { BuiltInProviderType } from "@auth/core/providers";
import { signIn } from "@/app/auth";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import fs from "fs/promises";

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
  formData: FormData
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
export async function deleteChat(
  prevState: AuthStatus | undefined,
  formData: FormData
): Promise<AuthStatus> {
  const id = formData.get("id");
  try {
    await prisma.chat.delete({
      where: { id: id as string },
    });
    revalidatePath("/");
    return {
      status: "success",
      message: "chat deleted",
    };
  } catch (e) {
    console.log(e);
    return {
      status: "error",
      message: "chat not delete",
    };
  }
}

export type FileState = {
  attachment?: Attachment;
  error?: string;
};
const fileSchema = z
  .instanceof(File, { message: "File is Required" })
  .refine((file) => file.type.startsWith("application/pdf"), {
    message: "Only PDF files supported.",
  });

export async function saveFile(formData: FormData): Promise<FileState> {
  try {
    const fileValidate = fileSchema.safeParse(formData.get("file"));
    if (!fileValidate.success) {
      return {
        error:
          fileValidate.error.errors[0]?.message || "File Format not supported",
      };
    }
    const chatId = formData.get("chatId") as string;
    const file = fileValidate.data;
    await fs.mkdir("assets", { recursive: true });
    const filePath = `assets/chat-data/${crypto.randomUUID()}-${file.name}`;
    await fs.writeFile(filePath, Buffer.from(await file.arrayBuffer()));
    const newFile = await prisma.attachment.create({
      data: {
        name: file.name,
        path: filePath,
        type: file.type,
        chatId: chatId,
      },
    });
    return {
      attachment: {
        id: newFile.id,
        name: file.name,
        path: filePath,
        type: file.type,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Error uploading file",
    };
  }
}

export async function getAttachmentById(fileId: string) {
  const attachment = await prisma.attachment.findUnique({
    where: {
      id: fileId,
    },
  });
  return attachment;
}
