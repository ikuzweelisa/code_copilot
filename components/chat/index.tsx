"use client";
import React, { useOptimistic, useState } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { UIMessage, useChat } from "@ai-sdk/react";
import InputField from "~/components/chat/input";
import Messages from "~/components/chat/messages";
import ScrollAnchor from "~/components/chat/scroll-anchor";
import EmptyScreen from "~/components/chat/empty-messages";
import { useLocalStorage, useScroll } from "~/lib/hooks";
import { cn } from "~/lib/utils";
import { useSWRConfig } from "swr";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { useIsMobile } from "~/lib/hooks/use-mobile";
import { useSession } from "next-auth/react";
import { Github } from "lucide-react";
import { AutoScroller } from "./auto-scoller";
import { Model, models } from "~/lib/ai/models";
import { DefaultChatTransport, FileUIPart } from "ai";
import { generateMessageId } from "~/lib/ai/utis";

interface ChatProps {
  initialMessages: UIMessage[];
  chatId: string;
  chatTitle?: string;
}
export default function Chat({
  chatId,
  initialMessages,
  chatTitle,
}: ChatProps) {
  const [_new, setChatId] = useLocalStorage<string | null>("chatId", null);
  const [input, setInput] = useState("");
  const session = useSession();
  const isLoggedIn = session.status === "loading" ? true : !!session.data?.user;
  const { mutate } = useSWRConfig();
  const path = usePathname();
  const [selectedModel, setSelectedModel] = useState<Model>(
    models.find((model) => model.isDefault) || models[0]
  );

  const [attachments, setAttachments] = useState<Array<FileUIPart>>([]);
  const [optimisticAttachments, setOptimisticAttachments] =
    useOptimistic<Array<FileUIPart & { isUploading?: boolean }>>(attachments);

  const { messages, status, error, sendMessage, regenerate, stop } = useChat({
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        id: chatId,
        model: selectedModel.name,
      },
    }),
    generateId: generateMessageId,
    onFinish: () => {
      setChatId(chatId);
      mutate("/api/chats");
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input) return;
    sendMessage({ text: input });
    setInput("");
  }
  const loading = status === "submitted" || status === "streaming";
  const isEmpty = messages.length === 0;
  const {
    isAtBottom,
    scrollToBottom,
    messagesRef,
    visibilityRef,
    handleScroll,
  } = useScroll<HTMLDivElement>();
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {!isLoggedIn ? (
        <div className="w-fit h-10 flex justify-end mb-3 mt-3 mx-3 gap-2 pl-0 absolute top-1 right-1 z-10">
          <Button variant="outline" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/login">Register</Link>
          </Button>
        </div>
      ) : (
        isMobile &&
        !isEmpty &&
        !path.includes(chatId) && (
          <div className="w-fit h-10 flex gap-10 justify-start mb-3 mx-0 pl-0 absolute top-1 right-1 z-10">
            <span className="text-sm">
              {chatTitle
                ? chatTitle?.length > 35
                  ? chatTitle?.slice(0, 30) + "..."
                  : chatTitle
                : "Unititled Chat"}
            </span>
            <Button asChild size="sm">
              <Link href="/">New Chat</Link>
            </Button>
          </div>
        )
      )}
      {isEmpty ? (
        <EmptyScreen onSubmit={(msg) => sendMessage({ text: msg })} />
      ) : (
        <>
          <ScrollArea
            onScrollCapture={handleScroll}
            className="flex-grow w-full overflow-y-auto mt-3"
          >
            <AutoScroller
              ref={visibilityRef}
              className="min-h-full w-full flex flex-col lg:max-w-2xl mx-auto p-1"
            >
              <Messages
                isLoading={loading}
                ref={messagesRef}
                messages={messages}
                error={error}
                regenerate={regenerate}
              />
            </AutoScroller>
          </ScrollArea>
          <div className="mx-auto flex justify-center items-center pb-2 pt-0 z-10">
            <ScrollAnchor
              isAtBottom={isAtBottom}
              scrollToBottom={scrollToBottom}
            />
          </div>
        </>
      )}
      <div className={cn("w-full z-10", isEmpty ? "" : "mb-14")}>
        <div className={cn("mx-auto p-2 max-w-2xl")}>
          <div className="w-full">
            <InputField
              isLoading={loading}
              input={input}
              handleSubmit={handleSubmit}
              optimisticAttachments={optimisticAttachments}
              setAttachments={setAttachments}
              setOPtimisticAttachments={setOptimisticAttachments}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              stop={stop}
              handleChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
        <div className="flex container justify-center items-center  bottom-1 w-fit">
          <div className=" flex justify-center absolute bottom-1  right-1/3">
            <Link
              href={"https://github.com/Ikuzweshema/code_copilot"}
              target="_blank"
              className="text-sm flex gap-1 items-center text-muted-foreground"
            >
              <Github className="h-4 w-4" /> view Project On Github
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
