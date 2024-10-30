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
import { ScrollToBottom } from "./scroll-to-bottom";

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
    if (!path.includes("chat") && state.messages.length === 1) {
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
    isVisible,
    scrollToBottom,
    messagesRef,
    scrollRef,
    visibilityRef,
  } = useScroll();
  return (
    <div ref={visibilityRef} className="flex flex-col h-screen w-full overflow-hidden pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
      <ScrollArea className="flex-grow" ref={scrollRef}>
        <div
          ref={messagesRef}
          className="min-h-full w-full flex flex-col gap-3 max-w-2xl mx-auto sm:mx-0 md:mx-0 lg:mx-auto p-2"
        >
          <Messages messages={messages} />
        </div>
      </ScrollArea>
      <div  className="mx-auto flex justify-center items-center p-4">
        <ScrollToBottom
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
        />
      </div>
      <div className="sticky bottom-0 left-0 w-full px-3 mb-2">
        <div className=" mx-auto sm:mx-0 md:mx-0 lg:mx-auto  sm:max-w-2xl px-4">
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
    </div>
  );
}
