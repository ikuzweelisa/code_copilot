"use server";
import { BotMessage } from "@/components/ai/bot-message";
import CodeExample from "@/components/ai/code-example";
import CodeSnippet from "@/components/ai/code-snippet";
import Debugger from "@/components/ai/debugger";
import Define from "@/components/ai/define";
import ErrorMessage from "@/components/ai/error-message";
import ExplainTopic from "@/components/ai/explain-topic";
import SetupGuide from "@/components/ai/setup-guide";
import { SpinnerMessage } from "@/components/ai/spinner-message";
import DisplayTable from "@/components/ai/table";
import UuidGenerator from "@/components/ai/uuid-generator";
import AIProvider from "@/components/providers/ai-provider";
import { getSystemMessage } from "@/lib/actions/server/message";
import { Attachment, ClientMessage } from "@/lib/types";
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
import { sleep } from "@/lib/utils";
import { google } from "@ai-sdk/google";
import { CoreMessage } from "ai";
import { getMutableAIState, streamUI } from "ai/rsc";
import fs from "fs";

export async function submitMessage(
  userMessage: string,
  attachment: Attachment | undefined
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
                  name: attachment.name,
                  path: attachment.path,
                  type: "file",
                  data: fs.readFileSync(attachment.path),
                  mimeType: attachment.type,
                },
                {
                  type: "text",
                  text: userMessage,
                },
              ]
            : userMessage,
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
          parameters: tableSchema,
          generate: async function* ({
            comparison,
            itemNames,
            message,
            overview,
            title,
          }) {
            yield <SpinnerMessage />;
            await sleep(1000);
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
                      args: { comparison, itemNames, message, overview, title },
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
                      result: {
                        comparison,
                        itemNames,
                        message,
                        overview,
                        title,
                      },
                    },
                  ],
                },
              ],
            });
            return (
              <BotMessage>
                <DisplayTable
                  comparison={comparison}
                  itemNames={itemNames}
                  message={message}
                  title={title}
                  overview={overview}
                />
              </BotMessage>
            );
          },
        },
        codeAnalyzer: {
          description:
            "Told to analyze or given codes.use this when the user give you codes ",
          parameters: codeAnalyzerSchema,
          generate: async function* ({
            improvedCode,
            keyConcepts,
            language,
            message,
            improvedKeyConcepts,
          }) {
            yield <SpinnerMessage />;
            await sleep(1000);
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
                      args: {
                        improvedCode,
                        keyConcepts,
                        language,
                        message,
                        improvedKeyConcepts,
                      },
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
                      result: {
                        improvedCode,
                        keyConcepts,
                        language,
                        message,
                        improvedKeyConcepts,
                      },
                    },
                  ],
                },
              ],
            });
            return (
              <BotMessage>
                <CodeSnippet
                  improvedCode={improvedCode}
                  keyConcepts={keyConcepts}
                  language={language}
                  message={message}
                  improvedKeyConcepts={improvedKeyConcepts}
                />
              </BotMessage>
            );
          },
        },
        setupGuide: {
          description:
            "steps to setup or how to install tools .use this when the user ask you to help them to install or setup something",
          parameters: setupGuideSchema,
          generate: async function* ({ intro, steps, title, overview }) {
            yield <SpinnerMessage />;
            await sleep(1000);
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
                      args: { intro, steps, title, overview },
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
                      result: { intro, steps, title, overview },
                      toolName: "setupGuide",
                    },
                  ],
                },
              ],
            });
            return (
              <BotMessage>
                <SetupGuide
                  intro={intro}
                  steps={steps}
                  title={title}
                  overview={overview}
                />
              </BotMessage>
            );
          },
        },
        uuidGenerator: {
          description:
            "generate a uuid.use this when the user tell you to generate auuid",
          parameters: uuidGenSchema,
          generate: async function* ({ message, uuid }) {
            yield <SpinnerMessage />;
            await sleep(1000);
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
                      args: { message, uuid },
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
                      result: { message, uuid },
                    },
                  ],
                },
              ],
            });
            return (
              <BotMessage>
                <UuidGenerator message={message} uuid={uuid} />
              </BotMessage>
            );
          },
        },
        debugger: {
          description:
            "Debug codes.use this when the user give you codes that contain bugs",
          parameters: debuggerSchema,
          generate: async function* ({ correctCode, error, updated }) {
            yield <SpinnerMessage />;
            await sleep(1000);
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
                      args: { correctCode, error, updated },
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
                      result: { correctCode, error, updated },
                    },
                  ],
                },
              ],
            });
            return (
              <BotMessage>
                <Debugger
                  correctCode={correctCode}
                  error={error}
                  updated={updated}
                />
              </BotMessage>
            );
          },
        },
        generateExample: {
          description: "give Example.use this to give an example to the user",
          parameters: codeExampleSchema,
          generate: async function* ({ concepts, example, message }) {
            yield <SpinnerMessage />;
            await sleep(1000);
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
                      args: { concepts, example, message },
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
                      result: { concepts, example, message },
                    },
                  ],
                },
              ],
            });
            return (
              <BotMessage>
                <CodeExample
                  example={example}
                  concepts={concepts}
                  message={message}
                />
              </BotMessage>
            );
          },
        },
        explainTopic: {
          description:
            "explain something.use this to explain in details something ",
          parameters: topicSchema,
          generate: async function* ({
            example,
            introduction,
            keyConcepts,
            overview,
          }) {
            yield <SpinnerMessage />;
            await sleep(1000);
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
                      args: { example, introduction, keyConcepts, overview },
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
                      result: { example, introduction, keyConcepts, overview },
                      toolName: "explainTopic",
                      toolCallId: toolId,
                    },
                  ],
                },
              ],
            });
            return (
              <BotMessage>
                <ExplainTopic
                  example={example}
                  introduction={introduction}
                  keyConcepts={keyConcepts}
                  overview={overview}
                />
              </BotMessage>
            );
          },
        },
        define: {
          description:
            "Define something.use this to define something to the user",
          parameters: defineSchema,
          generate: async function* ({ explanation, message }) {
            yield <SpinnerMessage />;

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
                      args: { explanation, message },
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
                      result: { explanation, message },
                      type: "tool-result",
                    },
                  ],
                },
              ],
            });
            return (
              <BotMessage>
                <Define explanation={explanation} message={message} />
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
