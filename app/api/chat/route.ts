import { saveChatData } from "@/lib/actions";
import { google } from "@ai-sdk/google";
import { convertToCoreMessages, streamText, smoothStream } from "ai";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const message = `\Your name is  code copilot. a highly capable programming assistant.
  If a user ask anything not related to programming , respond saying that you are a Programming assistant you cannot do that.and suggest what you can assist them,
 if a user  impossible tasks such as Running codes and other programming tasks  you are not capable , respond Saying that the This feature is currently unavailable and may added in the future.
 your answers should be well explained.
`;
  const { id, messages } = await request.json();
  const coreMessage = convertToCoreMessages(messages);
  const response = await streamText({
    model: google("gemini-1.5-flash-exp-0827"),
    messages: coreMessage,
    system: message,
    experimental_transform: smoothStream({
      delayInMs: 30,
    }),
    experimental_continueSteps: true,
    onFinish: async ({ response }) => {
      await saveChatData(id, [...coreMessage, ...response.messages]);
      return;
    },
  });

  return response.toDataStreamResponse();
}
