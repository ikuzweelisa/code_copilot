import "server-only";

import { google } from "@ai-sdk/google";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { UIMessage, convertToModelMessages, GeneratedFile, generateText, Output } from "ai";
import { fileTypeFromBuffer } from "file-type";
import { UTApi } from "uploadthing/server";

import { db } from "../drizzle";

export const utpapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(5, "5h"),
});

async function getChatTitle(messages: UIMessage[]) {
  const modelMessages = await convertToModelMessages(messages);
  const { output } = await generateText({
    model: google("gemini-2.5-flash"),
    system: `you are a chat title generator assistant  based The main context in chat messages.
    if you are given a chat message generate a small title for it not over 30 characters`,
    messages: modelMessages,
    output: Output.text(),
  });
  console.log("generated title", output);
  return output;
}
async function getFileType(buffer: ArrayBuffer) {
  const fileType = await fileTypeFromBuffer(buffer);
  return fileType;
}

async function uploadImage(files: GeneratedFile[]) {
  const imageFiles = files.filter((f) => f.mediaType.startsWith("image/"));
  const uploadFiles = imageFiles.map(
    (f) => new File([Buffer.from(f.base64)], "image", { type: f.mediaType }),
  );
  const result = await utpapi.uploadFiles(uploadFiles);
  return result.map((res) => {
    if (res.error) {
      return null;
    }
    return {
      url: res.data.ufsUrl,
      mediaType: res.data.type,
    };
  });
}
async function findUser(id: string) {
  const user = await db.query.user.findFirst({
    where: (c, { eq }) => eq(c.id, id),
  });
  return user;
}
export { getChatTitle, getFileType, uploadImage, findUser };
