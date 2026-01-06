import { UserMessage } from "~/components/ai/user-message";
import ViewAttachment from "~/components/chat/view-attachment";
import { BotMessage } from "~/components/ai/bot-message";
import { useMemo } from "react";
import { RegenerateFunc } from "~/lib/types";
import { UIMessage } from "~/lib/ai/types";

interface MessageProps {
  message: UIMessage;
  regenerate: RegenerateFunc;
  loading: boolean;
}
export default function Message({
  message,
  regenerate,
  loading,
}: MessageProps) {
  const { text, files } = useMemo(() => {
    const parts = message?.parts || [];
    let text = parts.find((part) => part?.type === "text")?.text ?? "";
    const files = parts.filter((part) => part?.type === "file");
    return {
      files,
      text,
    };
  }, [message]);

  return (
    <div key={message.id} className={"flex flex-col w-full"}>
      {message.role === "user" ? (
        <UserMessage>
          <div className="ml-1 flex flex-col items-start gap-2 w-full">
            {files.map((part, index) => (
              <ViewAttachment key={index} attachment={part} />
            ))}
            {text}
          </div>
        </UserMessage>
      ) : (
        <>
          <BotMessage
            isLoading={loading}
            regenerate={regenerate}
            message={message}
          />
        </>
      )}
    </div>
  );
}
