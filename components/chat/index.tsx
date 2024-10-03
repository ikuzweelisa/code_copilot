"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import InputField from "@/components/chat/input-field";
import Messages from "@/components/chat/messages";
import { useActions, useAIState, useUIState } from "ai/rsc";
import AIProvider from "@/components/providers/ai-provider";
import { usePathname, useRouter } from "next/navigation";
import { Message, Attachment } from "@/lib/types";
import UploadDialog from "./upload-dialog";
import MessageText from "../ai/message";

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
  }, []);

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (!formRef.current) return;
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      formRef.current.requestSubmit();
      e.preventDefault();
    }
  }

  useEffect(() => {
    if (!path.includes("chat") && messages.length === 1) {
      window.history.replaceState({}, "", `/chat/${state.chatId}`);
    }
  }, [chatId, messages, path]);
  useEffect(() => {
    const messagesLength = state?.messages?.length ?? 0;
    if (messagesLength === 2) {
      router.refresh();
    }
  }, [state?.messages, router]);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
      <ScrollArea className="flex-grow" ref={scrollAreaRef}>
        <div className="min-h-full w-full flex flex-col gap-3 max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
          <Messages messages={messages} />
        </div>
      </ScrollArea>
      <div className="flex-shrink-0  pt-6">
        <div className="mx-auto sm:max-w-2xl px-4">
          <div className="rounded-t-xl mb-3">
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
