"use client";

import React, {
  useRef,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import InputField from "@/components/chat/input-field";
import Messages from "@/components/chat/messages";
import { useActions, useUIState } from "ai/rsc";
import AIProvider from "@/providers/ai-provider";

export default function Chat() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [message, setMessages] = useUIState<typeof AIProvider>();
  const { submitMessage } = useActions();
  const [input, setInput] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
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
  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
  }
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);
  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      formRef.current.requestSubmit();
      e.preventDefault();
    }
  }
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
      <ScrollArea className="flex-grow" ref={scrollAreaRef}>
        <div className="min-h-full w-full flex flex-col gap-3 max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
          <Messages messages={message} />
        </div>
      </ScrollArea>
      <div className="flex-shrink-0 bg-gradient-to-b from-background/10 to-background/80 pt-6">
        <div className="mx-auto sm:max-w-2xl px-4">
          <div className="rounded-t-xl mb-3">
            <InputField
              input={input}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              onKeyDown={onKeyDown}
              formRef={formRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
