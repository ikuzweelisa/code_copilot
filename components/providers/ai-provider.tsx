import { createAI, getAIState } from "ai/rsc";
import { submitMessage } from "@/lib/actions/chat/actions";
import { Chat, ClientMessage, Message } from "@/lib/types";
import { saveChatData } from "../../lib/actions/server";
import { UserMessage } from "@/components/ai/user-message";
import { BotMessage } from "@/components/ai/bot-message";
import { auth } from "@/app/auth";
import { Markdown } from "../ai/markdown";

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
    if (done) {
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
    }
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
      display:
        msg.role === "user" ? (
          <UserMessage>{msg.content as string}</UserMessage>
        ) : msg.role === "assistant" && typeof msg.content === "string" ? (
          <BotMessage>
            {" "}
            <Markdown>{msg.content}</Markdown>
          </BotMessage>
        ) : null,
    })) as ClientMessage[];
}