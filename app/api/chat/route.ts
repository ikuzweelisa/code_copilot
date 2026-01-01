import type { NextRequest } from "next/server";
import { systemPrompt } from "~/lib/ai/prompt";
import { chatSchema } from "./schema";
import { models } from "~/lib/ai/models";
import { convertToModelMessages, generateId, streamText } from "ai";
import { getChatById, saveChatData } from "~/lib/server";
import { cookies } from "next/headers";
import { after } from "next/server";
import { createResumableStreamContext } from "resumable-stream/ioredis";
import { generateMessageId } from "~/lib/ai/utis";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsedBody = chatSchema.parse(body);

  const { id, message, trigger, messageId } = parsedBody;
  const cookieStore = await cookies();
  const modelId = cookieStore.get("model.id")?.value;
  const model = models.find((m) => m.id === modelId) ?? models[0];
  const chat = await getChatById(id);
  let messages = chat?.messages ?? [];
  if (trigger === "submit-message") {
    if (messageId !== null) {
      const messageIndex = messages?.findIndex((m) => m.id === messageId);
      if (messageIndex === -1) {
        throw new Error(`message ${messageId} not found`);
      }
      messages = messages.slice(0, messageIndex);
      messages.push(message);
    } else {
      messages = [...messages, message];
    }
  }
  if (trigger === "regenerate-message") {
    const messageIndex =
      messageId == null
        ? messages.length - 1
        : messages.findIndex((message) => message.id === messageId);

    if (messageIndex === -1) {
      throw new Error(`message ${messageId} not found`);
    }

    // set the messages to the message before the assistant message
    messages = messages.slice(
      0,
      messages[messageIndex].role === "assistant"
        ? messageIndex
        : messageIndex + 1
    );
  }
  const coreMessage = convertToModelMessages(messages);

  await saveChatData({ id: id, messages: messages, streamId: null });
  const result = streamText({
    model: model.model,
    messages: coreMessage,
    system: systemPrompt,
  });

  return result.toUIMessageStreamResponse({
    generateMessageId: generateMessageId,
    originalMessages: messages,
    onFinish: async ({ messages }) => {
      await saveChatData({ id, messages, streamId: null });
    },
    async consumeSseStream({ stream }) {
      const streamId = generateId();
      const streamContext = createResumableStreamContext({ waitUntil: after });
      await streamContext.createNewResumableStream(streamId, () => stream);
      // Update the chat with the active stream ID
      console.log("streamId", streamId);
      await saveChatData({ id, streamId: streamId });
    },
  });
}
