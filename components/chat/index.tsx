"use client";
import React, { useRef, useEffect, useState, FormEvent } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import InputField from "@/components/chat/input-field";
import Messages from "@/components/chat/messages";
import { useActions, useAIState, useUIState } from "ai/rsc";
import AIProvider from "@/components/providers/ai-provider";
import { usePathname, useRouter } from "next/navigation";

interface ChatProps {
  initialMessages?: [];
  chatId: string;
}

export default function Chat({ chatId }: ChatProps) {
  const path = usePathname();
  const router = useRouter();
  const state = useAIState<typeof AIProvider>();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useUIState<typeof AIProvider>();
  const { submitMessage } = useActions();
  const [input, setInput] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setInput("");
    setMessages((currentMessage) => [
      ...currentMessage,
      {
        id: crypto.randomUUID(),
        role: "user",
        display: input,
      },
    ]);
    const response = await submitMessage(input);
    setMessages((prevMessages) => [...prevMessages, response]);
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (formRef === null) return;
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      if (formRef) {
        formRef.current.requestSubmit();
      }

      e.preventDefault();
    }
  }

  useEffect(() => {
    if (!path.includes("chat") && messages.length === 1) {
      window.history.replaceState({}, "", `/chat/${chatId}`);
    }
  }, [chatId, messages, path]);
  useEffect(() => {
    const messagesLength = state.messages.length;
    if (messagesLength === 2) {
      router.refresh();
    }
  }, [state.messages, router]);
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
      <ScrollArea className="flex-grow" ref={scrollAreaRef}>
        <div className="min-h-full w-full flex flex-col gap-3 max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
          <Messages messages={messages} />
        </div>
      </ScrollArea>
      <div className="flex-shrink-0 bg-gradient-to-b from-background/10 to-background/80 pt-6">
        <div className="mx-auto sm:max-w-2xl px-4">
          <div className="rounded-t-xl mb-3">
            <InputField
              input={input}
              handleSubmit={handleSubmit}
              handleChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              formRef={formRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
