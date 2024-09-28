"use client";
import { UserMessage } from "@/components/ai/user-message";
import { ClientMessage } from "@/lib/types";

interface MessageProps {
  messages: ClientMessage[];
}
export default function Messages({ messages }: MessageProps) {
  return (
    <div className={"flex flex-col gap-7"}>
      {messages.map((message) => (
        <div key={message.id} className={"flex flex-col "}>
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
