"use client";
import ChatItem from "@/components/chat-item";
import SearchInput from "./search";
import { Chat } from "@/lib/types";
import useSearch from "@/lib/hooks/use-search";
import { MoveRight, Search } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { User } from "@prisma/client";
import { use } from "react";
interface Props {
  chatsPromise: Promise<Array<Chat & { user: User }>>;
}
export default function ChatHistory({ chatsPromise }: Props) {
  const initialChats = use(chatsPromise);

  const [searchText, setSearchText, chats] = useSearch(initialChats, {
    predicate: (item, query) => {
      return item.title.toLocaleLowerCase().startsWith(query);
    },
    debounce: 400,
    searchParams: "chat",
  });

  return (
    <div className="w-full flex flex-col gap-3  p-4 h-full overflow-auto">
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-sm">
          <SearchInput
            searchTerm={searchText}
            setSearchTerm={setSearchText}
            placeholder="Search Chat..."
            searchParams="chat"
            className="w-full"
          />
        </div>
      </div>
      {chats && chats.length > 0 ? (
        chats.map((chat) => <ChatItem chat={chat} key={chat.id} />)
      ) : (
        <div className="w-full h-full max-h-50 flex flex-col justify-center items-center">
          <Search className="h-12 w-12" />
          <span className="text-lg font-semibold mt-2">
            No Recent Chats Found{" "}
          </span>
          <Button variant={"default"} className="mt-2" asChild>
            <Link href={"/"} className="flex gap-1 items-center">
              Start New Chat <MoveRight />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
