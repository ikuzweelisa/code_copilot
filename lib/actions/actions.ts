"use server";
import { AuthStatus, FileState } from "~/lib/types";
import { AuthError } from "next-auth";
import { BuiltInProviderType } from "@auth/core/providers";
import { signIn } from "~/app/auth";
import { db } from "~/lib/drizzle";
import { editChatSchema, fileSchema } from "~/lib/types/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { chats } from "~/lib/drizzle/schema";
import { eq } from "drizzle-orm";

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

export async function saveFile(formData: FormData): Promise<FileState> {
  try {
    const fileValidate = fileSchema.safeParse(formData.get("file"));
    if (!fileValidate.success) {
      return {
        error:
          fileValidate.error.errors[0]?.message || "File Format not supported",
      };
    }
    throw new Error("This feature is not implemented yet");
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return {
      error: "Error uploading file",
    };
  }
}
export async function deleteChat(
  prevState: AuthStatus | undefined,
  formData: FormData
): Promise<AuthStatus> {
  try {
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
    return {
      status: "success",
      message: "Chat Removed ",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Chat not removed try again",
    };
  }
}

export async function editChat(
  prevState: AuthStatus | undefined,
  formData: FormData
): Promise<AuthStatus> {
  try {
    const validate = editChatSchema.safeParse(
      Object.fromEntries(formData.entries())
    );
    if (!validate.success) {
      return {
        status: "error",
        message: validate.error.errors[0].message,
      };
    }
    const { chatId, title } = validate.data;
    await db.update(chats).set({ title: title }).where(eq(chats.id, chatId));
    return {
      message: "Title has been updated",
      status: "success",
    };
  } catch (e) {
    return {
      status: "error",
      message: "Chat not Updated try again",
    };
  }
}
