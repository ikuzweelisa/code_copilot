"use client";
import { UserMessage } from "@/components/ai/user-message";
import { ClientMessage } from "@/lib/types";

interface MessageProps {
  messages: ClientMessage[];
}
export default function Messages({ messages }: MessageProps) {
  return (
    <div className={"w-full max-w-full flex flex-col gap-4 p-1 sm:p-5 md:p-4 lg:p-1"}>
      {messages.map((message) => (
        <div key={message.id} className={"flex flex-col w-full"}>
          {message.role === "user" ? (
            <UserMessage >{message.display}</UserMessage>
          ) : (
            message.display
          )}
        </div>
      ))}
    </div>
  );
}
