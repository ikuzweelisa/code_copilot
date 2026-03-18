import { webSearch } from "@exalabs/ai-sdk";
import {
  convertToModelMessages,
  generateId,
  stepCountIs,
  streamText,
  safeValidateUIMessages,
} from "ai";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { after, NextResponse } from "next/server";
import { createResumableStreamContext } from "resumable-stream/ioredis";

import { modelProvider } from "~/lib/ai/models";
import { systemPrompt } from "~/lib/ai/prompt";
import { generateImageTool } from "~/lib/ai/tools/generate-image";
import { UIMessage } from "~/lib/ai/types";
import { generateMessageId } from "~/lib/ai/utils";
import { getSession } from "~/lib/auth";
import { getUserPreferences, saveChatData } from "~/lib/server";
import { getModelByIdOrDefault, getUpdatedChatMessages } from "~/lib/server/ai";
import { chatSchema } from "~/lib/types/ai";

export const maxDuration = 300;
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedBody = chatSchema.parse(body);
    const session = await getSession();

    const { id, message, trigger, messageId, search } = parsedBody;
    const validatedMessage = await safeValidateUIMessages<UIMessage>({
      messages: [message],
    });
    if (!validatedMessage.success) {
      return NextResponse.json(validatedMessage.error, { status: 400 });
    }

    const cookieStore = await cookies();
    const modelId = cookieStore.get("model.id")?.value;
    const model = await getModelByIdOrDefault(modelId);
    if (!model) return NextResponse.json("Unimplemented", { status: 405 });

    const userPreferences = await getUserPreferences(session?.user.id);
    const messages = await getUpdatedChatMessages({
      id,
      message: validatedMessage.data[0],
      trigger,
      messageId,
    });
    const coreMessage = await convertToModelMessages(messages);

    await saveChatData({
      id: id,
      messages: messages,
      streamId: null,
    });
    const result = streamText({
      model: modelProvider[model.provider](model.model),
      messages: coreMessage,
      system: systemPrompt({
        tools: [
          { name: "web_search", description: "Search the web for information" },
          { name: "generate_image", description: "Generate an image" },
        ],
        userPreferences,
      }),
      tools: {
        web_search: webSearch({ numResults: 5 }),
        generate_image: generateImageTool,
      },
      stopWhen: stepCountIs(10),
      activeTools: ["web_search", "generate_image"],
    });

    return result.toUIMessageStreamResponse({
      generateMessageId: generateMessageId,
      originalMessages: messages,
      messageMetadata: ({ part }) => {
        if (part.type === "start") {
          return {
            createdAt: Date.now(),
            model: model?.name,
          };
        }
        if (part.type === "finish") {
          console.log("total tokens:", part.totalUsage.totalTokens);
          console.log("output tokens:", part.totalUsage.outputTokens);
          console.log("Input tokens:", part.totalUsage.inputTokens);
          console.log("reasoning tokens:", part.totalUsage.outputTokenDetails);
          console.log("finish reason", part.finishReason);

          return {
            totalTokens: part.totalUsage.outputTokens,
          };
        }
      },
      onFinish: async ({ messages }) => {
        //generete title when model is done
        await saveChatData({
          id,
          messages,
          streamId: null,
          generateTitle: true,
        });
      },
      async consumeSseStream({ stream }) {
        const streamId = generateId();
        const streamContext = createResumableStreamContext({
          waitUntil: after,
        });
        await streamContext.createNewResumableStream(streamId, () => stream);
        await saveChatData({ id, streamId: streamId });
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
