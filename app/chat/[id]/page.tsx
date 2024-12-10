import Chat from "@/components/chat";
import AIProvider from "@/components/providers/ai-provider";
import { getChat } from "@/lib/actions/server";
import { capitalize } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chat = await getChat(id);
  if (!chat) notFound();
  return (
    <AIProvider initialAIState={{ chatId: id, messages: chat.messages }}>
      <Chat chatId={id} initialMessages={chat.messages} />
    </AIProvider>
  );
}
