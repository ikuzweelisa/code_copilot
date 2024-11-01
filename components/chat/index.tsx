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

interface ChatProps {
  initialMessages?: Message[];
  chatId: string;
}

export default function Chat({ chatId }: ChatProps) {
  const path = usePathname();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, _] = useAIState<typeof AIProvider>();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

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

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden ">
      {messages && messages.length > 0 ? (
        <ScrollArea className="flex-grow" ref={scrollAreaRef}>
          <div className="min-h-full w-full flex flex-col gap-3 max-w-2xl mx-auto sm:mx-0 md:mx-0 lg:mx-auto p-2">
            <Messages messages={messages} />
          </div>
        </ScrollArea>
      ) : (
        <div className="w-full flex flex-col justify-center items-center gap-3 max-w-2xl mx-auto h-full p-2">
          <Messages messages={messages} />
        </div>
      )}

      <div className="sticky bottom-0 left-0 w-full px-3 mb-2">
        <div className="mx-auto sm:mx-0 md:mx-0 lg:mx-auto  sm:max-w-2xl px-4">
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
