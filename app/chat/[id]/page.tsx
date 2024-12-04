import Chat from "@/components/chat";
import AIProvider from "@/components/providers/ai-provider";
import { getChat } from "@/lib/actions/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { capitalize } from "@/lib/utils";
export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { id } = params;
  const chat = await getChat(id);
  if (!chat) notFound();
  return {
    title: capitalize(chat?.title || "Untitled"),
    description: chat?.title,
  };
}
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const chat = await getChat(id);
  if (!chat) notFound();
  return (
    <AIProvider initialAIState={{ chatId: chat.id, messages: chat.messages }}>
      <div className="w-full ">
        <Chat chatId={chat.id} initialMessages={chat.messages} />
      </div>
    </AIProvider>
  );
}
