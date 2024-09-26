import { createAI, getAIState } from "ai/rsc";
import { submitMessage } from "@/lib/actions/chat/actions";
import {
  Chat,
  ClientMessage,
  CodeAnalyzerProps,
  CodeExampleProps,
  DebuggerProps,
  DefineProps,
  Message,
  SetupProps,
  TableProps,
  TopicPros,
  UuidGenProps,
} from "@/lib/types";
import { saveChatData } from "../../lib/actions/server";
import DisplayTable from "@/components/ai/table";
import CodeSnippet from "@/components/ai/code-snippet";
import SetupGuide from "@/components/ai/setup-guide";
import UuidGenerator from "@/components/ai/uuid-generator";
import { UserMessage } from "@/components/ai/user-message";
import { BotMessage } from "@/components/ai/bot-message";
import { auth } from "@/app/auth";
import Debugger from "@/components/ai/debugger";
import CodeExample from "@/components/ai/code-example";
import Define from "@/components/ai/define";
import ExplainTopic from "@/components/ai/explain-topic";

export type AIState = {
  chatId: string;
  messages: Message[];
};

export type UIState = ClientMessage[];

const AIProvider = createAI<AIState, UIState>({
  actions: {
    submitMessage,
  },
  initialAIState: {
    chatId: crypto.randomUUID(),
    messages: [],
  },
  initialUIState: [],
  onSetAIState: async ({ state, done }) => {
    "use server";
    const session = await auth();
    if (!done) return;
    const firstMessage = state.messages[0]?.content as string;
    const title = firstMessage?.substring(0, 100) || "New Chat";
    const path = `/chat/${state.chatId}`;
    const chat: Chat = {
      id: state.chatId,
      messages: state.messages,
      title: title,
      path: path,
      userId: session?.user?.id as string,
    };
    await saveChatData(chat);
  },
  onGetUIState: async (): Promise<ClientMessage[]> => {
    "use server";
    const state = getAIState() as Chat;
    if (!state) return [];
    const uiState = (await getUiState(state)) as ClientMessage[];
    if (!uiState) return [];
    return uiState;
  },
});

export default AIProvider;

export async function getUiState(state: Chat): Promise<ClientMessage[]> {
  return state.messages
    .filter((message) => message.role !== "system")
    .map((msg, index) => ({
      id: `${msg.id}-${index}`,
      role: msg.role,
      display:
        msg.role === "tool" ? (
          msg.content.map((tool) => {
            return tool.toolName === "comparison" ? (
              <BotMessage>
                <DisplayTable {...(tool.result as TableProps)} />
              </BotMessage>
            ) : tool.toolName === "codeAnalyzer" ? (
              <BotMessage>
                <CodeSnippet {...(tool.result as CodeAnalyzerProps)} />
              </BotMessage>
            ) : tool.toolName === "setupGuide" ? (
              <BotMessage>
                <SetupGuide {...(tool.result as SetupProps)} />
              </BotMessage>
            ) : tool.toolName === "uuidGenerator" ? (
              <BotMessage>
                <UuidGenerator {...(tool.result as UuidGenProps)} />
              </BotMessage>
            ) : tool.toolName === "debugCode" ? (
              <BotMessage>
                <Debugger {...(tool.result as DebuggerProps)} />
              </BotMessage>
            ) : tool.toolName === "generateExample" ? (
              <BotMessage>
                <CodeExample {...(tool.result as CodeExampleProps)} />
              </BotMessage>
            ) : tool.toolName === "define" ? (
              <BotMessage>
                <Define {...(tool.result as DefineProps)} />
              </BotMessage>
            ) : tool.toolName === "explainTopic" ? (
              <BotMessage>
                <ExplainTopic {...(tool.result as TopicPros)} />
              </BotMessage>
            ) : null;
          })
        ) : msg.role === "user" ? (
          <UserMessage>{msg.content as string}</UserMessage>
        ) : msg.role === "assistant" && typeof msg.content === "string" ? (
          <BotMessage>{msg.content}</BotMessage>
        ) : null,
    })) as ClientMessage[];
}