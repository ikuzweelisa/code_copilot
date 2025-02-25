"use client";
import React, { useOptimistic, useState } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Message, useChat } from "ai/react";
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
import { Attachment } from "ai";
import { AutoScroller } from "./auto-scoller";

interface ChatProps {
  initialMessages: Message[];
  chatId: string;
  chatTitle?: string;
}
export default function Chat({
  chatId,
  initialMessages,
  chatTitle,
}: ChatProps) {
  const [_new, setChatId] = useLocalStorage<string | null>("chatId", null);
  const session = useSession();
  const isLoggedIn = session.status === "loading" ? true : !!session.data?.user;
  const { mutate } = useSWRConfig();
  const path = usePathname();

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const [optimisticAttachments, setOptimisticAttachments] =
    useOptimistic<Array<Attachment & { isUploading?: boolean }>>(attachments);

  const {
    handleSubmit,
    handleInputChange,
    input,
    append,
    stop,
    error,
    isLoading,
    reload,
    messages,
  } = useChat({
    initialMessages: initialMessages,
    id: chatId,
    body: {
      id: chatId,
    },
    onFinish: () => {
      const isNew = !path.includes(chatId);
      if (isNew && isLoggedIn) {
        history.pushState({}, "", `/chat/${chatId}`);
        setChatId(chatId);
        mutate("/api/chats");
      }
    },
  });
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
        <EmptyScreen append={append} />
      ) : (
        <>
          <ScrollArea
            onScrollCapture={handleScroll}
            className="flex-grow w-full overflow-y-auto mt-3"
          >
            <AutoScroller
              ref={visibilityRef}
              className="min-h-full w-full flex flex-col  lg:max-w-2xl mx-auto p-1  "
            >
              <Messages
                error={error}
                loading={isLoading}
                ref={messagesRef}
                messages={messages}
                reload={reload}
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
        <div className={cn("mx-auto p-2", isEmpty ? "max-w-2xl" : "max-w-xl")}>
          <div className="w-full">
            <InputField
              stop={stop}
              isLoading={isLoading}
              input={input}
              handleSubmit={handleSubmit}
              handleChange={handleInputChange}
              attachements={attachments}
              optimisticAttachments={optimisticAttachments}
              setAttachments={setAttachments}
              setOPtimisticAttachments={setOptimisticAttachments}
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
