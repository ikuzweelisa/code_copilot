"use server";
import { getMutableAIState, streamUI } from "ai/rsc";
import { google } from "@ai-sdk/google";
import { BotMessage } from "@/components/ai/bot-message";
import fs from "fs";
import {
  Attachment,
  ClientMessage,
  CodeAnalyzerProps,
  CodeExampleProps,
  DebuggerProps,
  DefineProps,
  SetupProps,
  TableProps,
  TopicPros,
  UuidGenProps,
} from "@/lib/types";
import {
  codeAnalyzerSchema,
  codeExampleSchema,
  debuggerSchema,
  defineSchema,
  setupGuideSchema,
  tableSchema,
  topicSchema,
  uuidGenSchema,
} from "@/lib/types/schemas";
import { SpinnerMessage } from "@/components/ai/spinner-message";
import { z } from "zod";
import { CoreMessage, generateObject } from "ai";
import DisplayTable from "@/components/ai/table";
import CodeSnippet from "@/components/ai/code-snippet";
import SetupGuide from "@/components/ai/setup-guide";
import UuidGenerator from "@/components/ai/uuid-generator";
import AIProvider from "@/components/providers/ai-provider";
import Debugger from "@/components/ai/debugger";
import CodeExample from "@/components/ai/code-example";
import ExplainTopic from "@/components/ai/explain-topic";
import Define from "@/components/ai/define";
import { getSystemMessage } from "@/lib/actions/server/message";
import { sleep } from "@/lib/utils";
import ErrorMessage from "@/components/ai/error-message";

export async function submitMessage(
  userMessage: string,
  attachment?: Attachment
): Promise<ClientMessage> {
  try {
    const systemMessage = await getSystemMessage();
    const state = getMutableAIState<typeof AIProvider>();

    state.update({
      ...state.get(),
      messages: [
        ...state.get()?.messages,
        {
          id: crypto.randomUUID(),
          role: "user",

          content: attachment
            ? [
                {
                  id: attachment.id,
                  type: "file",
                  data: fs.readFileSync(attachment.path),
                  mimeType: attachment.type,
                },
                {
                  type: "text",
                  text: userMessage,
                },
              ]
            : [
                {
                  type: "text",
                  text: userMessage,
                },
              ],
        },
      ],
    });
    const result = await streamUI({
      model: google("gemini-1.5-flash-latest"),
      initial: <SpinnerMessage />,
      system: systemMessage,
      messages: [
        ...state.get()?.messages.map((message) => ({
          role: message.role,
          content: message.content,
          id: message.id,
        })),
      ] as CoreMessage[],
      text: async ({ done, content }) => {
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

          return <BotMessage>{content}</BotMessage>;
        }
      },
      tools: {
        comparison: {
          description:
            "Comparing or differentiation.use this when the user tell you to compare,differentiate or contrasting",
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
                  ],
                },
                {
                  id: crypto.randomUUID(),
                  role: "tool",
                  content: [
                    {
                      type: "tool-result",
                      toolName: "comparison",
                      toolCallId: toolId,
                      result: data.object as TableProps,
                    },
                  ],
                },
              ],
            });
            return (
              <BotMessage>
                <DisplayTable {...data.object} />
              </BotMessage>
            );
          },
        },
        codeAnalyzer: {
          description:
            "Told to analyze or given codes.use this when the user give you codes ",
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
                      toolName: "codeAnalyzer",
                      args: { codes },
                      type: "tool-call",
                    },
                  ],
                },
                {
                  id: crypto.randomUUID(),
                  role: "tool",
                  content: [
                    {
                      type: "tool-result",
                      toolCallId: toolId,
                      toolName: "codeAnalyzer",
                      result: analyzed.object as CodeAnalyzerProps,
                    },
                  ],
                },
              ],
            });
            return (
              <BotMessage>
                {" "}
                <CodeSnippet {...analyzed.object} />
              </BotMessage>
            );
          },
        },
        setupGuide: {
          description:
            "steps to setup or how to install tools .use this when the user ask you to help them to install or setup something",
          parameters: z.object({
            tool: z.string().describe("the name of the tool to setup"),
          }),
          generate: async function* ({ tool }) {
            yield <SpinnerMessage />;
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
                  ],
                },
                {
                  id: crypto.randomUUID(),
                  role: "tool",
                  content: [
                    {
                      type: "tool-result",
                      toolCallId: toolId,
                      result: steps.object as SetupProps,
                      toolName: "setupGuide",
                    },
                  ],
                },
              ],
            });
            return (
              <BotMessage>
                <SetupGuide {...steps.object} />
              </BotMessage>
            );
          },
        },
        uuidGenerator: {
          description:
            "generate a uuid.use this when the user tell you to generate auuid",
          parameters: z.object({
            version: z.number().optional().describe("version of the uuid"),
          }),
          generate: async function* ({ version = 4 }) {
            yield <SpinnerMessage />;
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
                  ],
                },
                {
                  id: crypto.randomUUID(),
                  role: "tool",
                  content: [
                    {
                      type: "tool-result",
                      toolCallId: toolId,
                      toolName: "uuidGenerator",
                      result: response.object as UuidGenProps,
                    },
                  ],
                },
              ],
            });
            return (
              <BotMessage>
                <UuidGenerator {...response.object} />
              </BotMessage>
            );
          },
        },
        debugger: {
          description:
            "Debug codes.use this when the user give you codes that contain bugs",
          parameters: z.object({
            codes: z.string().describe("the codes to debug"),
          }),
          generate: async function* ({ codes }) {
            yield <SpinnerMessage />;
            const correctCode = await generateObject({
              model: google("models/gemini-1.5-flash-latest"),
              schema: debuggerSchema,
              prompt: `Debug this codes ${codes}`,
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
                      toolName: "debugger",
                      args: { codes },
                      type: "tool-call",
                    },
                  ],
                },
                {
                  id: crypto.randomUUID(),
                  role: "tool",
                  content: [
                    {
                      toolCallId: toolId,
                      toolName: "debugger",
                      type: "tool-result",
                      result: correctCode.object as DebuggerProps,
                    },
                  ],
                },
              ],
            });
            return (
              <BotMessage>
                <Debugger {...correctCode.object} />
              </BotMessage>
            );
          },
        },
        generateExample: {
          description: "give Example.use this to give an example to the user",
          parameters: z.object({
            technology: z
              .string()
              .describe("The programming language, framework, or library."),
            about: z
              .string()
              .optional()
              .describe("what concept of the technolgy  the example is about"),
          }),

          generate: async function* ({ technology, about }) {
            yield <SpinnerMessage />;
            const exampleCode = await generateObject({
              model: google("models/gemini-1.5-flash-latest"),
              schema: codeExampleSchema,
              prompt: `Give a simple example of ${technology} ${
                about && `about this ${about}.focus mainly on this`
              } . Focus on ${technology} .`,
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
                      toolName: "generateExample",
                      args: { technology, about },
                      toolCallId: toolId,
                    },
                  ],
                },
                {
                  id: crypto.randomUUID(),
                  role: "tool",
                  content: [
                    {
                      type: "tool-result",
                      toolName: "generateExample",
                      toolCallId: toolId,
                      result: exampleCode.object as CodeExampleProps,
                    },
                  ],
                },
              ],
            });
            return (
              <BotMessage>
                <CodeExample {...exampleCode.object} />
              </BotMessage>
            );
          },
        },
        explainTopic: {
          description:
            "explain something.use this to explain in details something ",
          parameters: z.object({
            topicName: z.string().describe("the topic to explain about"),
          }),
          generate: async function* ({ topicName }) {
            yield <SpinnerMessage />;
            const text = await generateObject({
              model: google("models/gemini-1.5-flash-latest"),
              schema: topicSchema,
              prompt: `Explain this ${topicName} briefly and explain key concepts in it and provide an example if necessary`,
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
                      args: { topicName },
                      type: "tool-call",
                      toolName: "explainTopic",
                    },
                  ],
                },
                {
                  id: crypto.randomUUID(),
                  role: "tool",
                  content: [
                    {
                      type: "tool-result",
                      result: text.object as TopicPros,
                      toolName: "explainTopic",
                      toolCallId: toolId,
                    },
                  ],
                },
              ],
            });
            return (
              <BotMessage>
                <ExplainTopic {...text.object} />
              </BotMessage>
            );
          },
        },
        define: {
          description:
            "Define something.use this to define something to the user",
          parameters: z.object({
            term: z.string().describe("The term to explain"),
          }),
          generate: async function* ({ term }) {
            yield <SpinnerMessage />;
            const definition = await generateObject({
              model: google("models/gemini-1.5-flash-latest"),
              schema: defineSchema,
              prompt: `Define this  ${term} and ask the user if he needs to know more`,
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
                      toolName: "define",
                      toolCallId: toolId,
                      args: { term },
                    },
                  ],
                },
                {
                  id: crypto.randomUUID(),
                  role: "tool",
                  content: [
                    {
                      toolName: "define",
                      toolCallId: toolId,
                      result: definition.object as DefineProps,
                      type: "tool-result",
                    },
                  ],
                },
              ],
            });
            return (
              <BotMessage>
                <Define {...definition.object} />
              </BotMessage>
            );
          },
        },
      },
    });
    await sleep(1000);
    return {
      id: crypto.randomUUID(),
      role: "assistant",
      display: result.value,
    };
  } catch (e) {
    return {
      id: crypto.randomUUID(),
      role: "assistant",
      display: (
        <BotMessage>
          <ErrorMessage />
        </BotMessage>
      ),
    };
  }
}
