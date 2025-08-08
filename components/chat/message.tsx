import { UserMessage } from "~/components/ai/user-message";
import ViewAttachment from "~/components/chat/view-attachement";
import { UIMessage } from "ai";
import { BotMessage } from "~/components/ai/bot-message";
import { useMemo } from "react";
import { RegenerateFunc } from "~/lib/types";

interface MessageProps {
  message: UIMessage;
  loading: boolean;
  regenerate: RegenerateFunc;
}
export default function Message({
  message,
  loading,
  regenerate,
}: MessageProps) {
  const { text, files, reasoning, isReasoning } = useMemo(() => {
    const parts = message?.parts || [];
    const text = parts.find((part) => part?.type === "text")?.text ?? "";
    const files = parts.filter((part) => part?.type === "file");
    const reasoning = parts.find((part) => part.type === "reasoning")?.text;
    const isReasoning =
      parts.find((part) => part.type === "reasoning")?.state === "streaming" ||
      false;
    return { text, files, reasoning, isReasoning };
  }, [message]);

  if (!message) {
    return null;
  }

  return (
    <div key={message.id} className={"flex flex-col w-full"}>
      {message.role === "user" ? (
        <UserMessage>
          <div className="ml-1 mt-4 flex-1 flex-col gap-2 w-full">
            {files.map((part, index) => (
              <ViewAttachment key={index} attachment={part} />
            ))}
            {text}
          </div>
        </UserMessage>
      ) : (
        <BotMessage
          isLoading={loading}
          reload={regenerate}
          reasoning={reasoning}
          isReasoning={isReasoning}
        >
          {text}
        </BotMessage>
      )}
    </div>
  );
}
