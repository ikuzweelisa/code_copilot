import Chat from "@/components/chat";
import AIProvider from "@/components/providers/ai-provider";
import { getChat } from "@/lib/server";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const chat = await getChat(id);
  if (!chat) return notFound();
  return (
    <AIProvider initialAIState={{ chatId: id, messages: chat.messages }}>
      <div className="w-full ">
        <Chat chatId={id} initialMessages={chat.messages} />
      </div>
    </AIProvider>
  );
}
