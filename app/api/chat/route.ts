import { NextRequest } from "next/server";
import { systemPrompt } from "~/lib/ai/prompt";
import { chatSchema } from "./schema";
import { models } from "~/lib/ai/models";
import { convertToModelMessages, streamText } from "ai";
import { saveChatData } from "~/lib/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedBody = chatSchema.parse(body);
  const { id, messages, model } = parsedBody;
  const modelInstance = models.find((m) => m.name === model);
  if (!modelInstance) {
    return new Response("Model not found", { status: 404 });
  }
  const coreMessage = convertToModelMessages(messages);
  const result = streamText({
    model: modelInstance.model,
    messages: coreMessage,
    system: systemPrompt,
  });
  return result.toUIMessageStreamResponse();
}
