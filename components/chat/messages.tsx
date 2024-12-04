"use client";
import { UserMessage } from "@/components/ai/user-message";
import { ClientMessage } from "@/lib/types";
import React, { forwardRef } from "react";
import { SpinnerMessage } from "../ai/spinner-message";
interface MessageProps {
  messages: ClientMessage[];
  error: string | undefined;
  loading: boolean;
}

const Messages = forwardRef<HTMLDivElement, MessageProps>(function Messages(
  { messages, error, loading }: MessageProps,
  ref
) {
  return (
    <div
      ref={ref}
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
      {loading && (
        <div className="flex flex-col w-full">
          <SpinnerMessage />
        </div>
      )}
      {error && <div className="flex flex-col w-full"></div>}
    </div>
  );
});

export default Messages;
