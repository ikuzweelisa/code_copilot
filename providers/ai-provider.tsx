import { createAI } from "ai/rsc";
import { submitMessage } from "@/lib/actions/chat/actions";
import { Chat, ClientMessage, Message } from "@/lib/types";
import  saveChatData  from "@/lib/server";
import {redirect} from "next/navigation";
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
  onSetAIState: async ({ state }) => {
    "use server";
    const firstMessage = state.messages[0].content as string;
    const title = firstMessage.substring(0, 100);
    const path = `/chat/${state.chatId}`;
    const chat: Chat = {
      id: state.chatId,
      messages: state.messages,
      title: title,
      path: path,
    };
     await saveChatData(chat);
     redirect(path)
  },
});

export default AIProvider;
