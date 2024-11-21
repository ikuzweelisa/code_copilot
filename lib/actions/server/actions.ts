"use server";
import { AuthStatus, Chat } from "@/lib/types";
import { AuthError } from "next-auth";
import { BuiltInProviderType } from "@auth/core/providers";
import { signIn } from "@/app/auth";
import prisma from "@/lib/db";
import { Attachment, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function saveChatData(chat: Chat) {
  try {
    await prisma.chat.upsert({
      where: { id: chat.id },
      update: {
        messages: chat.messages as Prisma.InputJsonValue[],
      },
      create: {
        id: chat.id,
        title: chat.title as string,
        messages: chat.messages as Prisma.InputJsonValue[],
        path: chat.path,
        user: {
          connect: {
            id: chat.userId,
          },
        },
      },
    });
    revalidatePath("/", "layout");
    revalidatePath(chat.path, "page");
  } catch (error) {
    return null;
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
    return {
      status: "error",
      message: "Error deleting chat",
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
    // TODO :save file to a storage bucket
    const file = fileValidate.data;
    const filePath = "/logo.png";
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
        chatId: newFile.chatId,
        createdAt: newFile.createdAt,
      },
    };
  } catch (error) {
    return {
      error: "Error uploading file",
    };
  }
}
