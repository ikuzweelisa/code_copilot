import Chat from "~/components/chat";
import { getChatById } from "../../../lib/server";
import { converToUIMessage } from "~/lib/server/helpers";
import { capitalize } from "~/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageParams {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { id } = await params;

  const chat = await getChatById(id);
  if (!chat) notFound();
  return {
    title: capitalize(chat?.title || "Untitled"),
    description: chat?.title,
  };
}
export default async function Page({ params }: PageParams) {
  const { id } = await params;
  const chat = await getChatById(id);
  if (!chat) notFound();

  const messages = converToUIMessage(chat.messages);
  return <Chat chatId={id} initialMessages={messages} chatTitle={chat.title} />;
}
