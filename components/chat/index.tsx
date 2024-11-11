"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import InputField from "@/components/chat/input-field";
import Messages from "@/components/chat/messages";
import { useActions, useAIState, useUIState } from "ai/rsc";
import AIProvider from "@/components/providers/ai-provider";
import { usePathname, useRouter } from "next/navigation";
import { Message } from "@/lib/types";
import { Attachment } from "@prisma/client";
import UploadDialog from "@/components/chat/upload-dialog";
import MessageText from "@/components/ai/message";
import useScroll from "@/lib/hooks/use-scroll";
import { ScrollAnchor } from "./scroll-to-bottom";
import EmptyScreen from "./empty-messages";

interface ChatProps {
  initialMessages?: Message[];
  chatId: string;
}

export default function Chat({ chatId }: ChatProps) {
  const path = usePathname();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, _] = useAIState<typeof AIProvider>();
  const [messages, setMessages] = useUIState<typeof AIProvider>();

  const { submitMessage } = useActions();
  const [input, setInput] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const [attachment, setAttachment] = useState<Attachment | undefined>(
    undefined
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setInput("");
    setAttachment(undefined);
    setMessages((currentMessage) => [
      ...currentMessage,
      {
        id: crypto.randomUUID(),
        role: "user",
        display: <MessageText text={input} attachment={attachment} />,
      },
    ]);
    const response = await submitMessage(input, attachment);
    setMessages((prevMessages) => [...prevMessages, response]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!formRef.current) return;
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      formRef.current.requestSubmit();
      e.preventDefault();
    }
  }

  useEffect(() => {
    if (!path.includes("chat") && state.messages.length === 2) {
      window.history.replaceState({}, "", `/chat/${state.chatId}`);
    }
  }, [state.chatId, state.messages, path]);
  useEffect(() => {
    const messagesLength = state?.messages?.length ?? 0;
    if (messagesLength === 2) {
      router.refresh();
    }
  }, [state?.messages, router]);
  const {
    isAtBottom,
    scrollToBottom,
    messagesRef,
    visibilityRef,
    handleScroll,
  } = useScroll();
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {messages.length === 0 ? (
        <EmptyScreen
          formRef={formRef}
          handleSubmit={handleSubmit}
          input={input}
          onKeyDown={onKeyDown}
          setInput={setInput}
        >
          <UploadDialog
            attachment={attachment}
            chatId={state.chatId}
            setAttachment={setAttachment}
          />
        </EmptyScreen>
      ) : (
        <>
          <ScrollArea
            onScrollCapture={handleScroll}
            className="flex-grow w-full overflow-y-auto"
          >
            <div
              ref={visibilityRef}
              className="min-h-full w-full flex flex-col gap-3 sm:max-w-full lg:max-w-2xl mx-auto p-2"
            >
              <Messages messageRef={messagesRef} messages={messages} />
            </div>
          </ScrollArea>
          <div className="mx-auto flex justify-center items-center p-4">
            <ScrollAnchor
              isAtBottom={isAtBottom}
              scrollToBottom={scrollToBottom}
            />
          </div>

          <div className="sticky bottom-0 left-0 w-full shadow-sm mb-10">
            <div className="mx-auto sm:mx-0 md:mx-0 lg:mx-auto sm:max-w-xl p-2">
              <div className="rounded-t-xl">
                <InputField
                  input={input}
                  handleSubmit={handleSubmit}
                  handleChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  formRef={formRef}
                >
                  <UploadDialog
                    attachment={attachment}
                    chatId={state.chatId}
                    setAttachment={setAttachment}
                  />
                </InputField>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
