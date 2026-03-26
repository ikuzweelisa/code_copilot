"use client";
import { UIMessage } from "~/lib/ai/types";
import { RegenerateFunc } from "~/lib/types";

import { AssistantMessage } from "../ai/assistant-message";
import ButtonRow from "../ai/button-row";
import { SpinnerMessage } from "../ai/spinner-message";

import Message from "./message";

interface MessageProps {
  messages: UIMessage[];
  error: Error | undefined;
  isLoading: boolean;
  regenerate: RegenerateFunc;
  ref: React.Ref<HTMLDivElement>;
}

export default function Messages({
  messages,
  error,
  isLoading,
  regenerate,
  ref,
}: MessageProps) {
  return (
    <div ref={ref} className={"flex w-full max-w-full flex-col gap-4 p-1 sm:p-5 md:p-4 lg:p-1"}>
      {messages.map((message) => (
        <div key={message.id} className={"flex w-full flex-col"}>
          {error && messages[messages.length - 1]?.id === message.id ? (
            <div className="flex w-full flex-col">
              <AssistantMessage
                isLoading={isLoading}
                className="text-red-500"
                regenerate={regenerate}
              >
                Unable to generate response. Please try again
              </AssistantMessage>

              {!isLoading ? <ButtonRow message={message} reload={regenerate} content={""} /> : null}
            </div>
          ) : (
            <Message loading={isLoading} message={message} regenerate={regenerate} />
          )}
        </div>
      ))}
      {isLoading && messages[messages.length - 1].role === "user" && (
        <div className="flex w-full flex-col">
          <SpinnerMessage />
        </div>
      )}
    </div>
  );
}
