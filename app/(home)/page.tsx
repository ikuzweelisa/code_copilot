import Chat from "@/components/chat";

import { generateId } from "ai";
import { connection } from "next/server";

export default async function Home() {
  await connection();
  const chatId = generateId(12);
  return (
    <div className={"flex justify-center h-full w-full "}>
      <Chat chatId={chatId} initialMessages={[]} />
    </div>
  );
}
