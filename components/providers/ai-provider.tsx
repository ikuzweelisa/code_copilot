import { createAI, getAIState } from "ai/rsc";
import { submitMessage } from "@/lib/actions/chat/actions";
import { Chat, ClientMessage, Message } from "@/lib/types";
import { saveChatData } from "@/lib/actions/server";
import { UserMessage } from "@/components/ai/user-message";
import { BotMessage } from "@/components/ai/bot-message";
import { auth } from "@/app/auth";
import { getChatTitle } from "@/lib/actions/chat/helpers";
import { generateId } from "ai";
import { revalidateChats } from "@/lib/actions/server/actions";

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
    chatId: generateId(12),
    messages: [],
  },
  initialUIState: [],
  onSetAIState: async ({ state, done }) => {
      "use server"
    if (done) {
      const first = state.messages.length === 2;
      const session = auth();
      const userId = first ? (await session)?.user?.id : undefined;
      const title = first
        ? await getChatTitle(state.messages)
        : "Untitled chat";

      const path = `/chat/${state.chatId}`;
      const chat: Partial<Chat> = {
        id: state.chatId,
        messages: state.messages,
        title: title,
        path: path,
        userId: userId,
      };
      await saveChatData(chat);
      if (first) {
        await revalidateChats();
      }
    }
  },
  onGetUIState: async (): Promise<ClientMessage[]> => {
    "use server"
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
          <BotMessage>{msg.content}</BotMessage>
        ) : null,
    })) as ClientMessage[];
}
