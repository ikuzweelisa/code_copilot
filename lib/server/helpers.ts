import "server-only";
import { google } from "@ai-sdk/google";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { fileTypeFromBuffer } from "file-type";
import { generateObject, UIMessage, convertToModelMessages } from "ai";
import { z } from "zod";
import { UTApi } from "uploadthing/server";

export const utpapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(5, "5h"),
});

async function getChatTitle(messages: UIMessage[]) {
  const modelMessages = convertToModelMessages(messages);
  const title = await generateObject({
    model: google("gemini-2.0-flash-exp"),
    system: `you are a chat title generator assistant  based The main context in chat messages about programming concepts.
    if you are given achat message generate a small title for it`,
    messages: modelMessages,
    schema: z.object({
      title: z.string().describe("chat title"),
    }),
  });

  return title.object.title;
}
async function getFileType(buffer: ArrayBuffer) {
  const fileType = await fileTypeFromBuffer(buffer);
  return fileType;
}

export { getChatTitle, getFileType };
