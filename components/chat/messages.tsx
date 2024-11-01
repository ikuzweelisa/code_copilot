"use client";
import { UserMessage } from "@/components/ai/user-message";
import { ClientMessage } from "@/lib/types";
import { exampleMessages } from "@/lib/data";
interface MessageProps {
  messages: ClientMessage[];
}

export default function Messages({ messages }: MessageProps) {
  return (
    <div
      className={
        "w-full max-w-full flex flex-col gap-4 p-1 sm:p-5 md:p-4 lg:p-1"
      }
    >
      {messages.length === 0 ? (
        <div className="mt-auto w-full max-w-xl  mb-4 grid gap-2 sm:grid-cols-1 lg:grid-cols-2 px-5 ">
          {exampleMessages.map((example, index) => (
            <div
              key={example.heading}
              className={`cursor-pointer rounded-md border bg-white p-3 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                index > 1 && "hidden md:block"
              }`}
            >
              <div className="text-sm font-semibold">{example.heading}</div>
              <div className="text-sm text-zinc-600">{example.subheading}</div>
            </div>
          ))}
        </div>
      ) : (
        messages.map((message) => (
          <div key={message.id} className={"flex flex-col w-full"}>
            {message.role === "user" ? (
              <UserMessage>{message.display}</UserMessage>
            ) : (
              message.display
            )}
          </div>
        ))
      )}
    </div>
  );
}
