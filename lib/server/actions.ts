"use server";
import type { AuthStatus } from "~/lib/types";
import { db } from "~/lib/drizzle";
import { editChatSchema } from "~/lib/types/schema";
import { z } from "zod";
import { chats } from "~/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { utpapi } from "./helpers";

export async function deleteAttachment(attachemnt: string) {
  const status = await utpapi.deleteFiles(attachemnt);
  return status.success;
}
export async function deleteChat(
  prevState: AuthStatus | undefined,
  formData: FormData
): Promise<AuthStatus> {
  console.log("running action");
  const validate = z
    .object({
      chatId: z.string().min(4, {
        message: "Chat not found",
      }),
    })
    .safeParse(Object.fromEntries(formData.entries()));
  if (!validate.success) {
    return {
      status: "error",
      message: validate.error.message,
    };
  }
  const { chatId } = validate.data;
  await db.delete(chats).where(eq(chats.id, chatId));

  return {
    status: "success",
    message: "Chat deleted",
  };
}

export async function editChat(
  prevState: AuthStatus | undefined,
  formData: FormData
): Promise<AuthStatus> {
  const validate = editChatSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validate.success) {
    return {
      status: "error",
      message: validate.error.message,
    };
  }
  const { chatId, title } = validate.data;
  await db.update(chats).set({ title: title }).where(eq(chats.id, chatId));
  return {
    status: "success",
    message: "Chat name updated",
  };
}
