"use server";
import { getMutableAIState, streamUI } from "ai/rsc";
import { google } from "@ai-sdk/google";
import { BotMessage } from "@/components/ai/bot-message";
import { ClientMessage } from "@/lib/types";
import {
  setupGuideSchema,
  tableSchema,
  codeAnalyzerSchema,
  uuidGenSchema,
} from "@/lib/types/schemas";
import { SpinnerMessage } from "@/components/ai/spinner-message";
import { z } from "zod";
import { CoreMessage, generateObject } from "ai";
import DisplayTable from "@/components/ai/table";
import CodeSnippet from "@/components/ai/code-snippet";
import SetupGuide from "@/components/ai/setup-guide";
import UuidGenerator from "@/components/ai/uuid-generator";
import AIProvider from "@/providers/ai-provider";
export async function submitMessage(
  userMessage: string,
): Promise<ClientMessage> {
  const state = getMutableAIState<typeof AIProvider>();
  state.update({
    ...state.get(),
    messages: [
      ...state.get()?.messages,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: userMessage,
      },
    ],
  });
  const result = await streamUI({
    model: google("models/gemini-1.5-flash-latest"),
    initial: <SpinnerMessage />,
    messages: [
      ...state.get()?.messages.map((message) => ({
        role: message.role,
        content: message.content,
        id: message.id,
      })),
    ] as CoreMessage[],
    text: ({ done, content }) => {
      if (done) {
        state.done({
          ...state.get(),
          messages: [
            ...state.get()?.messages,
            {
              role: "assistant",
              id: crypto.randomUUID(),
              content: content,
            },
          ],
        });
      }
      return <BotMessage>{content}</BotMessage>;
    },
    tools: {
      comparison: {
        description: "Comparing or differentiation",
        parameters: z.object({
          itemNames: z
            .array(z.string().describe("Item Name"))
            .describe("Names of items to compare or contrast"),
          operation: z
            .string()
            .describe("Operation tobe done compare or Contrast"),
        }),
        generate: async function* ({ itemNames, operation }) {
          yield <SpinnerMessage />;
          const data = await generateObject({
            model: google("models/gemini-1.5-flash-latest"),
            schema: tableSchema,
            prompt: `${operation} the following ${itemNames.join(",")}`,
          });
          const toolId = crypto.randomUUID();
          state.done({
            ...state.get(),
            messages: [
              ...state.get()?.messages,
              {
                id: crypto.randomUUID(),
                role: "assistant",
                content: [
                  {
                    type: "tool-call",
                    toolName: "comparison",
                    toolCallId: toolId,
                    args: { operation, itemNames },
                  },
                  {
                    id: crypto.randomUUID(),
                    role: "tool",
                    content: [
                      {
                        type: "tool-result",
                        toolName: "comparison",
                        toolCallId: toolId,
                        toolResult: data,
                      },
                    ],
                  },
                ],
              },
            ],
          });
          return <DisplayTable {...data.object} />;
        },
      },
      codeAnalyzer: {
        description: "Told to analyze or given codes",
        parameters: z.object({
          codes: z.string().describe("a text of codes to analyze"),
        }),
        generate: async function* ({ codes }) {
          yield <SpinnerMessage />;
          const analyzed = await generateObject({
            model: google("models/gemini-1.5-flash-latest"),
            schema: codeAnalyzerSchema,
            prompt: `Analyze this code :\n${codes}\nProvide the language, key concepts, and suggest 
            improvements.you can optional include comments in
             the improved version`,
          });
          const toolId = crypto.randomUUID();
          state.update({
            ...state.get(),
            messages: [
              ...state.get()?.messages,
              {
                id: crypto.randomUUID(),
                role: "assistant",
                content: [
                  {
                    toolCallId: toolId,
                    toolName: "codeAnalyzer",
                    args: { codes },
                    type: "tool-call",
                  },
                  {
                    id: crypto.randomUUID(),
                    role: "tool",
                    content: [
                      {
                        type: "tool-result",
                        toolCallId: toolId,
                        toolName: "codeAnalyzer",
                        result: analyzed,
                      },
                    ],
                  },
                ],
              },
            ],
          });
          return <CodeSnippet {...analyzed.object} />;
        },
      },
      setupGuide: {
        description:
          "steps to setup or install tools or how to setup or install tools",
        parameters: z.object({
          tool: z.string().describe("the name of the tool to setup"),
        }),
        generate: async function* ({ tool }) {
          const steps = await generateObject({
            model: google("models/gemini-1.5-flash-latest"),
            schema: setupGuideSchema,
            prompt: `What are the possible steps required to setup this or install ${tool} include code example where necessary`,
          });
          const toolId = crypto.randomUUID();
          state.done({
            ...state.get(),
            messages: [
              ...state.get()?.messages,
              {
                id: crypto.randomUUID(),
                role: "assistant",
                content: [
                  {
                    toolCallId: toolId,
                    toolName: "setupGuide",
                    args: { tool },
                    type: "tool-call",
                  },
                  {
                    id: crypto.randomUUID(),
                    role: "tool",
                    content: [
                      {
                        type: "tool-result",
                        toolCallId: toolId,
                        result: steps,
                        toolName: "setupGuide",
                      },
                    ],
                  },
                ],
              },
            ],
          });
          return <SetupGuide {...steps.object} />;
        },
      },
      uuidGenerator: {
        description: "generate a uuid",
        parameters: z.object({
          version: z.number().optional().describe("version of the uuid"),
        }),
        generate: async function* ({ version = 4 }) {
          const response = await generateObject({
            model: google("models/gemini-1.5-flash-latest"),
            schema: uuidGenSchema,
            prompt: `Generate me a unique version  ${version} uuid `,
          });
          const toolId = crypto.randomUUID();
          state.done({
            ...state.get(),
            messages: [
              ...state.get()?.messages,
              {
                id: crypto.randomUUID(),
                role: "assistant",
                content: [
                  {
                    toolCallId: toolId,
                    toolName: "uuidGenerator",
                    type: "tool-call",
                    args: { version },
                  },
                  {
                    id: crypto.randomUUID(),
                    role: "tool",
                    content: [
                      {
                        type: "tool-result",
                        toolCallId: toolId,
                        toolName: "uuidGenerator",
                        result: response,
                      },
                    ],
                  },
                ],
              },
            ],
          });
          return <UuidGenerator {...response.object} />;
        },
      },
    },
  });
  return {
    id: crypto.randomUUID(),
    role: "assistant",
    display: result.value,
  };
}
