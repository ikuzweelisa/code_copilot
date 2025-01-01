import Chat from "~/components/chat";
import { generateId } from "ai";


export default function Home() {
  const chatId = generateId(12);
  return (
    <div className={"flex justify-center h-full w-full "}>
      <Chat chatId={chatId} initialMessages={[]} />
    </div>
  );
}
