import { UserMessage } from "~/components/ai/user-message";
import ViewAttachment from "~/components/chat/view-attachement";
import { UIMessage } from "ai";
import { BotMessage } from "~/components/ai/bot-message";
import { useMemo } from "react";
import { RegenerateFunc } from "~/lib/types";
import { SpinnerMessage } from "../ai/spinner-message";

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
    let text = parts.find((part) => part?.type === "text")?.text ?? "";
    const files = parts.filter((part) => part?.type === "file");
    let reasoningText: string | undefined;
    let isReasoning = false;
    const reasoningPart = parts.find((part) => part.type === "reasoning");
    if (reasoningPart && "text" in reasoningPart) {
      reasoningText = reasoningPart.text;
      isReasoning = reasoningPart.state === "streaming";
    } else {
      const thinkTagRegex = /<think>(.*?)<\/think>/s;
      const match = text.match(thinkTagRegex);
      if (match) {
        reasoningText = match[1].trim();
        text = text.replace(thinkTagRegex, "").trim();
      }
    }

    return {
      text,
      files,
      reasoning: reasoningText,
      isReasoning,
    };
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
        <>
          {loading ? (
            <>
              <SpinnerMessage />
            </>
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
        </>
      )}
    </div>
  );
}
