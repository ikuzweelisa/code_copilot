"use client";
import { GitBranch } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardFooter, CardTitle } from "~/components/ui/card";
import { IconUser } from "~/components/ui/icons";
import { Separator } from "~/components/ui/separator";
import { Chat } from "~/lib/ai/types";
import { formatTime } from "~/lib/utils";

import ChatOptions from "./chat-options";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface Props {
  chat: Chat & { user: { name: string; email: string; image: string | null } };
}
export default function ChatItem({ chat }: Props) {
  const formatedDate = formatTime(new Date(chat.updatedAt));

  const content = chat.title;
  const router = useRouter();
  return (
    <Card className="w-full rounded-md">
      <CardTitle className="flex items-center gap-2 px-2 py-1.5 text-base">
        {chat.parentChatId && chat.parentChatTitle && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-5 w-5 shrink-0 p-0" asChild>
                <Link href={`/chat/${chat.parentChatId}`} onClick={(e) => e.stopPropagation()}>
                  <GitBranch className="h-3 w-3" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Branched from: {chat.parentChatTitle || "Untitled chat"}
            </TooltipContent>
          </Tooltip>
        )}
        {chat.title}
      </CardTitle>
      <CardContent className="cursor-pointer p-2 " onClick={() => router.push(`chat/${chat.id}`)}>
        <span className="text-sm text-muted-foreground">{content}</span>
      </CardContent>
      <Separator />
      <CardFooter className="mx-0 flex items-start justify-between px-2 pt-2 pb-0">
        <div className="flex items-center gap-1 text-sm">
          <IconUser className="h-6 w-6" /> {chat.user.name}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">Last Updated {formatedDate}</span>
          <ChatOptions chat={chat} />
        </div>
      </CardFooter>
    </Card>
  );
}
