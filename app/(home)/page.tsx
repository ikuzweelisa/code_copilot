import Chat from "@/components/chat";
import AIProvider from "@/components/providers/ai-provider";
import { generateId } from "ai";
import { connection } from "next/server";

export default async function Home() {
  await connection()
  const chatId = generateId(12);
  return (
    <AIProvider initialAIState={{ chatId: chatId, messages: [] }}>
      <div className={"flex justify-center h-full w-full "}>
        <Chat chatId={chatId} />
      </div>
    </AIProvider>
  );
}
