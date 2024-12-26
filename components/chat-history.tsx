"use client";
import ChatItem from "@/components/chat-item";
import { useState } from "react";
import SearchInput from "./search";

export default function ChatHistory() {
  const [searchText, setSearchText] = useState("");

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
      {Array.from({ length: 6 }).map((_, index) => (
        <ChatItem key={index} />
      ))}
    </div>
  );
}
