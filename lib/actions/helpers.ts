import "server-only";
import { google } from "@ai-sdk/google";
import {
  Attachment,
  CoreMessage,
  CoreToolMessage,
  generateId,
  generateObject,
  Message,
  ToolInvocation,
} from "ai";
import { z } from "zod";
import { UTApi } from "uploadthing/server";

export const utpapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});

async function getChatTitle(messages: CoreMessage[]) {
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

function addToolMessageToChat({
  toolMessage,
  messages,
}: {
  toolMessage: CoreToolMessage;
  messages: Array<Message>;
}): Array<Message> {
  return messages.map((message) => {
    if (message.toolInvocations) {
      return {
        ...message,
        toolInvocations: message.toolInvocations.map((toolInvocation) => {
          const toolResult = toolMessage.content.find(
            (tool) => tool.toolCallId === toolInvocation.toolCallId
          );

          if (toolResult) {
            return {
              ...toolInvocation,
              state: "result",
              result: toolResult.result,
            };
          }

          return toolInvocation;
        }),
      };
    }

    return message;
  });
}

export function converToUIMessage(
  messages: Array<CoreMessage>
): Array<Message> {
  return messages.reduce((chatMessages: Array<Message>, message) => {
    if (message.role === "tool") {
      return addToolMessageToChat({
        toolMessage: message as CoreToolMessage,
        messages: chatMessages,
      });
    }

    let textContent = "";
    const attachments: Attachment[] = [];

    const tools: Array<ToolInvocation> = [];
    if (typeof message.content === "string") {
      textContent = message.content;
    } else if (Array.isArray(message.content)) {
      const toolInvocations: Array<ToolInvocation> = [];
      for (const content of message.content) {
        if (content.type === "text") {
          textContent += content.text;
        } else if (content.type === "tool-call") {
          toolInvocations.push({
            state: "call",
            toolCallId: content.toolCallId,
            toolName: content.toolName,
            args: content.args,
          });
        } else if (content.type === "file") {
          attachments.push({
            url: content.data.toString(),
            contentType: content.mimeType,
            name: content.type,
          });
        } else {
          attachments.push({
            url: content.image.toString(),
            contentType: content.mimeType || "image/",
            name: content.type,
          });
        }
      }
    }
    const toolInvocations: Array<ToolInvocation> | undefined =
      tools.length === 0 ? undefined : tools;
    chatMessages.push({
      id: generateId(13),
      role: message.role,
      content: textContent,
      toolInvocations,
      experimental_attachments: attachments,
    });

    return chatMessages;
  }, []);
}
