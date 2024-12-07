import "server-only";

import { Message } from "@/lib/types";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

async function getChatTitle(messages: Message[]) {
  const title = await generateObject({
    model: google("gemini-1.5-flash-latest"),
    system: `you are a chat title generator assistant  based The main context in chat messages about programming concepts.
    if you are given achat message generate a small title for it`,
    messages: messages,
    schema: z.object({
      title: z.string().describe("chat title"),
    }),
  });

  return title.object.title;
}

export { getChatTitle };
