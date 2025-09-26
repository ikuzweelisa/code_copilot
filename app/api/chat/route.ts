import { NextRequest } from "next/server";
import { systemPrompt } from "~/lib/ai/prompt";
import { chatSchema } from "./schema";
import { models } from "~/lib/ai/models";
import { convertToModelMessages, streamText } from "ai";
import { saveChatData } from "~/lib/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const parsedBody = chatSchema.parse(await request.json());
  const { id, messages } = parsedBody;
  const cookieStore = await cookies();
  const modelId = cookieStore.get("model.id")?.value;
  const model = models.find((m) => m.id === Number(modelId)) ?? models[0];
  const coreMessage = convertToModelMessages(messages);
  const result = streamText({
    model: model.model,
    messages: coreMessage,
    system: systemPrompt,
  });
  return result.toUIMessageStreamResponse({
    async onFinish({ messages, responseMessage }) {
      await saveChatData(id, [...messages, responseMessage]);
    },
  });
}
