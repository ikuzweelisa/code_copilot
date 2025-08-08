import Chat from "~/components/chat";
import { generateChatId } from "~/lib/ai/utis";

export default function Home() {
  const chatId = generateChatId();
  return (
    <div className={"flex justify-center h-full w-full "}>
      <Chat chatId={chatId} initialMessages={[]} />
    </div>
  );
}
