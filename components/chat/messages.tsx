"use client";
import { UserMessage } from "@/components/ai/user-message";
import { ClientMessage } from "@/lib/types";
import React from "react";
interface MessageProps {
  messages: ClientMessage[];
  messageRef: React.RefObject<HTMLDivElement | null>;
}

export default function Messages({ messages, messageRef }: MessageProps) {
  return (
    <div
      ref={messageRef}
      className={
        "w-full max-w-full flex flex-col gap-4 p-1 sm:p-5 md:p-4 lg:p-1"
      }
    >
      {messages.map((message) => (
        <div key={message.id} className={"flex flex-col w-full"}>
          {message.role === "user" ? (
            <UserMessage>{message.display}</UserMessage>
          ) : (
            message.display
          )}
        </div>
      ))}
    </div>
  );
}
