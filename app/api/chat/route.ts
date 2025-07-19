import { saveChatData } from "~/lib/server";
import { convertToCoreMessages, streamText } from "ai";
import { NextRequest } from "next/server";
import { systemPrompt } from "~/lib/ai/prompt";
import { chatSchema } from "./schema";
import { models } from "~/lib/ai/models";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedBody = chatSchema.parse(body);
  const { id, messages, model } = parsedBody;
  const modelInstance = models.find((m) => m.name === model);
  if (!modelInstance) {
    return new Response("Model not found", { status: 404 });
  }
  const coreMessage = convertToCoreMessages(messages);
  const response = streamText({
    model: modelInstance.model,
    messages: coreMessage,
    system: systemPrompt,
    experimental_continueSteps: true,
    onFinish: async ({ response }) => {
      await saveChatData(id, [
        ...coreMessage,
        ...response.messages.map((m) => ({ ...m, model })),
      ]);
    },
  });
  return response.toDataStreamResponse();
}
