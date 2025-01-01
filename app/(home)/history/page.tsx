import ChatHistory from "~/components/chat-history";
import { ChatHistorySkeleton } from "~/components/skeletons";
import { getUserChats } from "~/lib/actions";
import { Suspense } from "react";

export const metadata = {
  title: "Chats History",
  description: "Recent chats",
};

export default function Page() {
  const chats = getUserChats();

  return (
    <Suspense fallback={<ChatHistorySkeleton />}>
      <ChatHistory chatsPromise={chats} />
    </Suspense>
  );
}
