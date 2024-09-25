import Chat from "@/components/chat";
import AIProvider from "@/components/providers/ai-provider";
import { getChat } from "@/lib/server";
import { type Chat as TChat } from "@/lib/types";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const chat = (await getChat(id)) as unknown as TChat;
  return (
    <AIProvider initialAIState={{ chatId: id, messages: chat.messages }}>
      <div className="w-full ">
        <Chat chatId={id} initialMessages={chat.messages} />
      </div>
    </AIProvider>
  );
}