"use client";
import { Loader2, MoveRight, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import ChatItem from "~/components/chat-item";
import { ChatHistorySkeleton } from "~/components/skeletons";
import { trpc } from "~/lib/backend/trpc/client";

import SearchInput from "./search";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

export default function ChatHistory() {
  const [search, setSearch] = useState("");
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    trpc.chat.getUserChats.useInfiniteQuery(
      {
        limit: 25,
        search,
      },
      { getNextPageParam: (lastPage) => lastPage.nextCursor, initialCursor: 0 },
    );
  const chats = data?.pages.flatMap((page) => page.chats);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.target as HTMLDivElement;
    const offset = 50;
    const isAtBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - offset;

    if (isAtBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  return (
    <div className="flex h-full flex-col">
      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-sm">
          <SearchInput
            searchTerm={search}
            setSearchTerm={setSearch}
            placeholder="Search Chat..."
            searchParams="chat"
            className="w-full"
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-100px)]" onScrollCapture={handleScroll}>
        {isLoading ? (
          <ChatHistorySkeleton />
        ) : (
          <div className="flex w-full  flex-col gap-3 p-4">
            {chats && chats.length > 0 ? (
              chats.map((chat) => <ChatItem chat={chat} key={chat.id} />)
            ) : (
              <div className="flex h-full max-h-50 w-full flex-col items-center justify-center">
                <Search className="h-12 w-12" />
                <span className="mt-2 text-lg font-semibold">No Recent Chats Found </span>
                <Button variant={"default"} className="mt-2" asChild>
                  <Link href={"/"} className="flex items-center gap-1">
                    Start New Chat <MoveRight />
                  </Link>
                </Button>
              </div>
            )}
            {isFetchingNextPage && (
              <div className="flex justify-center p-2">
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
