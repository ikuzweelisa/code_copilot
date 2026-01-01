"use server";
import { AuthStatus } from "~/lib/types";
import { db } from "~/lib/drizzle";
import { editChatSchema } from "~/lib/types/schema";
import { z } from 'zod/v3';
import { revalidatePath } from "next/cache";
import { chats } from "~/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { utpapi } from "./helpers";

export async function deleteAttachment(attachemnt: string) {
  const status = await utpapi.deleteFiles(attachemnt);
  return status.success;
}
export async function deleteChat(
  prevState: AuthStatus | undefined,
  formData: FormData,
): Promise<AuthStatus> {
  const validate = z
    .object({
      chatId: z.string().min(10, {
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

  revalidatePath("/history", "page");
  redirect("/history");
}
export async function editChat(
  prevState: AuthStatus | undefined,
  formData: FormData,
): Promise<AuthStatus> {
  const validate = editChatSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validate.success) {
    return {
      status: "error",
      message: validate.error.message,
    };
  }
  const { chatId, title } = validate.data;
  await db.update(chats).set({ title: title }).where(eq(chats.id, chatId));
  revalidatePath("/history", "page");
  redirect("/history");
}
