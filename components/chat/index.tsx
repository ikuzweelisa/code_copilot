"use client";
import React, { FormEvent, Suspense, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import InputField from "@/components/chat/input-field";
import Messages from "@/components/chat/messages";
import { useActions, useAIState, useUIState } from "ai/rsc";
import AIProvider from "@/components/providers/ai-provider";
import { usePathname} from "next/navigation";
import { Message } from "@/lib/types";
import { Attachment } from "@prisma/client";
import UploadDialog from "@/components/chat/upload-dialog";
import MessageText from "@/components/ai/message";
import { useScroll } from "@/lib/hooks";
import ScrollAnchor from "./scroll-to-bottom";
import EmptyScreen from "./empty-messages";
import { generateId } from "ai";
import { useLocalStorage } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useSWRConfig } from "swr";
interface ChatProps {
  initialMessages?: Message[];
  chatId: string;
}
export default function Chat({ chatId }: ChatProps) {
  const path = usePathname();
  const [state, _] = useAIState<typeof AIProvider>();
  const [messages, setMessages] = useUIState<typeof AIProvider>();
  const [_new, setChatId] = useLocalStorage<string | null>("chatId", null);
  const { submitMessage } = useActions();
  const { mutate } = useSWRConfig();
  const [input, setInput] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [attachment, setAttachment] = useState<Attachment | undefined>(
    undefined
  );
  const [error, setError] = useState<string | undefined>(undefined);
  const isNew = !path.includes("chat");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      setInput("");
      setAttachment(undefined);
      setMessages((currentMessage) => [
        ...currentMessage,
        {
          id: generateId(20),
          role: "user",
          display: <MessageText text={input} attachment={attachment} />,
        },
      ]);
      setIsLoading(true);
      const response = await submitMessage(input, attachment);
      setMessages((prevMessages) => [...prevMessages, response]);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
      if (isNew) {
        history.pushState({}, "", `/chat/${state.chatId}`);
        mutate("/api/chat");
        setChatId(state.chatId);
      }
    }
  }
  const {
    isAtBottom,
    scrollToBottom,
    messagesRef,
    visibilityRef,
    handleScroll,
  } = useScroll();

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {isNew ? (
        <EmptyScreen input={input} setInput={setInput} />
      ) : (
        <>
          <ScrollArea
            onScrollCapture={handleScroll}
            className="flex-grow w-full overflow-y-auto"
          >
            <div
              ref={visibilityRef}
              className="min-h-full w-full flex flex-col  lg:max-w-2xl mx-auto p-1  "
            >
              <Messages
                error={error}
                loading={isLoading}
                ref={messagesRef}
                messages={messages}
              />
            </div>
          </ScrollArea>
          <div className="mx-auto flex justify-center items-center pb-2 pt-0 z-10">
            <ScrollAnchor
              isAtBottom={isAtBottom}
              scrollToBottom={scrollToBottom}
            />
          </div>
        </>
      )}
      <div className={cn("w-full", isNew ? "" : "mb-8")}>
        <div className={cn("mx-auto p-2", isNew ? "max-w-2xl" : "max-w-xl")}>
          <div className="w-full">
            <InputField
              isLoading={isLoading}
              input={input}
              handleSubmit={handleSubmit}
              handleChange={(e) => setInput(e.target.value)}
              ref={formRef}
              isNew={isNew}
            >
              <Suspense fallback={null}>
                <UploadDialog
                  attachment={attachment}
                  chatId={state.chatId}
                  setAttachment={setAttachment}
                />
              </Suspense>
            </InputField>
          </div>
        </div>
      </div>
    </div>
  );
}
