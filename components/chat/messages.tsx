"use client";
import { forwardRef } from "react";
import { UIMessage } from "ai";
import { BotMessage } from "~/components/ai/bot-message";
import { RegenerateFunc } from "~/lib/types";
import Message from "./message";
interface MessageProps {
  messages: UIMessage[];
  error: Error | undefined;
  isLoading: boolean;
  regenerate: RegenerateFunc;
}

const Messages = forwardRef<HTMLDivElement, MessageProps>(function Messages(
  { messages, error, isLoading, regenerate }: MessageProps,
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
          <Message
            message={message}
            regenerate={regenerate}
            loading={isLoading}
          />
        </div>
      ))}
      {error && (
        <div className="flex flex-col w-full">
          <BotMessage
            isLoading={isLoading}
            className="text-red-500"
            reload={regenerate}
          >
            Unable to generate response. Please try again
          </BotMessage>
        </div>
      )}
    </div>
  );
});
Messages.displayName = "Messages";

export default Messages;
