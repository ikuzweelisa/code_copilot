import Chat from "@/components/chat";
import AIProvider from "@/components/providers/ai-provider";

export default function Home() {
  const chatId = crypto.randomUUID();
  return (
    <AIProvider initialAIState={{ chatId: crypto.randomUUID(), messages: [] }}>
      <div className={"flex justify-center "}>
        <Chat chatId={chatId} />
      </div>
    </AIProvider>
  );
}