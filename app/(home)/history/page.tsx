import ChatHistory from "@/components/chat-history";
import { ChatHistorySkeleton } from "@/components/skeletons";
import { getUserChats } from "@/lib/actions";
import { Chat } from "@/lib/types";
import { User } from "@prisma/client";
import { Suspense } from "react";

export const metadata = {
  title: "Chats History",
  description: "Recent chats",
};

export default function Page() {
  const chats = getUserChats() as Promise<Array<Chat & { user: User }>>;

  return (
    <Suspense fallback={<ChatHistorySkeleton />}>
      <ChatHistory chatsPromise={chats} />
    </Suspense>
  );
}
