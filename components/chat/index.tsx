"use client";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, FileUIPart } from "ai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useOptimistic, useState, useEffect } from "react";

import EmptyScreen from "~/components/chat/empty-messages";
import InputField from "~/components/chat/input";
import Messages from "~/components/chat/messages";
import ScrollAnchor from "~/components/chat/scroll-anchor";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { UIMessage } from "~/lib/ai/types";
import { generateMessageId } from "~/lib/ai/utils";
import { useSession } from "~/lib/auth/auth-client";
import { useTRPC } from "~/lib/backend/trpc/client";
import { useLocalStorage, useScroll } from "~/lib/hooks";
import { useIsMobile } from "~/lib/hooks/use-mobile";
import { cn } from "~/lib/utils";

import { LoginForm } from "../auth/login-form";

import { AutoScroller } from "./auto-scoller";

interface ChatProps {
  initialMessages: UIMessage[];
  chatId: string;
  chatTitle?: string;
  className?: string;
  initialInput?: string;
}
export default function Chat({
  chatId,
  initialMessages,
  chatTitle,
  className,
  initialInput,
}: ChatProps) {
  const trpc = useTRPC();
  const [_new, setChatId] = useLocalStorage<string | null>("chatId", null);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (initialInput) {
      setInput(initialInput);
    }
  }, [initialInput]);
  const { data, isPending } = useSession();
  const [search, setSearch] = useState(false);
  const isLoggedIn = isPending ? false : !!data?.user;
  const path = usePathname();
  const [attachments, setAttachments] = useState<Array<FileUIPart>>([]);
  const [optimisticAttachments, setOptimisticAttachments] = useOptimistic<
    Array<FileUIPart & { isUploading?: boolean }>
  >(attachments);

  const { messages, status, error, sendMessage, regenerate, stop } = useChat<UIMessage>({
    messages: initialMessages,
    id: chatId,
    transport: new DefaultChatTransport({
      prepareSendMessagesRequest: ({ id, messages, trigger, messageId }) => {
        switch (trigger) {
          case "regenerate-message":
            return {
              body: {
                trigger,
                id,
                messageId,
                search,
              },
            };
          case "submit-message":
            return {
              body: {
                trigger: trigger,
                id,
                message: messages[messages.length - 1],
                messageId,
                search,
              },
            };
        }
      },
    }),
    resume: isLoggedIn,
    generateId: generateMessageId,
    onFinish: (_data) => {
      setChatId(chatId);
      trpc.chat.getUserChats.invalidate();
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input) return;
    sendMessage({ text: input, files: attachments });
    const isNew = !path.includes(chatId);
    setInput("");
    setAttachments([]);
    if (isNew) {
      trpc.chat.getUserChats.setData(undefined, (prevChats) => {
        return [
          ...(prevChats ?? []),
          {
            id: chatId,
            title: "New Chat",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userId: data?.user?.id ?? "",
            isPending: true,
            status: "active",
            parentChatId: null,
            parentChatTitle: null,
          },
        ];
      });
      history.pushState(null, "", `/chat/${chatId}`);
    }
  }
  const loading = ["streaming", "submitted"].includes(status);
  const isEmpty = messages.length === 0;
  const { isAtBottom, scrollToBottom, messagesRef, visibilityRef, handleScroll } =
    useScroll<HTMLDivElement>();
  const isMobile = useIsMobile();
  return (
    <div className={cn("flex h-full w-full flex-col overflow-hidden", className)}>
      {!isLoggedIn ? (
        <div className="absolute top-1 right-1 z-10 mx-3 mt-3 mb-3 flex h-10 w-fit justify-end gap-2 pl-0">
          <LoginForm>
            <Button variant="outline">Login</Button>
          </LoginForm>
          <LoginForm>
            <Button>Register</Button>
          </LoginForm>
        </div>
      ) : (
        isMobile &&
        !isEmpty &&
        !path.includes(chatId) && (
          <div className="absolute top-1 right-1 z-10 mx-0 mb-3 flex h-10 w-fit justify-start gap-10 pl-0">
            <span className="text-sm">
              {chatTitle
                ? chatTitle?.length > 35
                  ? `${chatTitle?.slice(0, 35)}...`
                  : chatTitle
                : "Untitled Chat"}
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
          <ScrollArea onScrollCapture={handleScroll} className="mt-3 w-full grow overflow-y-auto">
            <AutoScroller
              ref={visibilityRef}
              className="mx-auto flex min-h-full max-w-5xl flex-col px-40"
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
          <div className="z-10 mx-auto flex items-center justify-center pt-0 pb-2">
            <ScrollAnchor isAtBottom={isAtBottom} scrollToBottom={scrollToBottom} />
          </div>
        </>
      )}
      <div className={cn("z-10 w-full", isEmpty ? "" : "mb-14")}>
        <div className={cn("mx-auto max-w-2xl p-2")}>
          <div className="w-full">
            <InputField
              isLoading={loading}
              input={input}
              handleSubmit={handleSubmit}
              optimisticAttachments={optimisticAttachments}
              setAttachments={setAttachments}
              setOPtimisticAttachments={setOptimisticAttachments}
              stop={stop}
              handleChange={(e) => setInput(e.target.value)}
              search={search}
              setSearch={setSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
