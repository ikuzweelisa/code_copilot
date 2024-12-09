"use server";
import { AuthStatus } from "@/lib/types";
import { AuthError } from "next-auth";
import { BuiltInProviderType } from "@auth/core/providers";
import { signIn } from "@/app/auth";
import prisma from "@/lib/db";
import { Attachment } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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
   throw new Error("This feature is not implemented yet")
  } catch (error) {
    if (error instanceof Error) {
      return{
        error:error.message
      }
    }
    return {
      error: "Error uploading file",
    };
  }
}

