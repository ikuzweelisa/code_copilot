import Chat from "@/components/chat";
import { getChat } from "@/lib/actions";
import { converToUIMessage } from "@/lib/actions/helpers";
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

  const messages = converToUIMessage(chat.messages);
  return <Chat chatId={id} initialMessages={messages} />;
}
