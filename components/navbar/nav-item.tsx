"use client";
import { GitBranch, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArchiveAction,
  DeleteDialog,
  OpenNewTab,
  PinAction,
  ShareDialog,
} from "~/components/dialogs";
import { Button } from "~/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { Chat } from "~/lib/ai/types";
import { useAnimatedText, useLocalStorage } from "~/lib/hooks";

import ChatOptionsMenu from "../chat-options";

interface NavItemProps {
  chat: Chat;
}

export default function NavItem({ chat }: NavItemProps) {
  const pathname = usePathname();
  const path = `/chat/${chat.id}`;
  const isActive = pathname === path;
  const [newChat, setNewChat] = useLocalStorage<string | null>("chatId", null);
  const animate = chat.id === newChat;

  const [text] = useAnimatedText(chat?.title || "New chat", {
    shouldAnimate: animate,
    duration: 1,
    onComplete() {
      setNewChat(null);
    },
  });
  return (
    <SidebarMenuItem>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <SidebarMenuButton asChild isActive={isActive} className="group/chat-item">
            <Link href={path}>
              {chat.parentChatId && chat.parentChatTitle && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 shrink-0 p-0" asChild>
                      <Link
                        href={`/chat/${chat.parentChatId}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <GitBranch className="h-3 w-3" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Branched from: {chat.parentChatTitle || "Untitled chat"}
                  </TooltipContent>
                </Tooltip>
              )}
              <span className="truncate">{text}</span>
              {chat?.isPending && <Loader2 className="ml-auto h-4 w-4 animate-spin" />}
            </Link>
          </SidebarMenuButton>
        </ContextMenuTrigger>
        <ContextMenuContent className="mx-3 w-45">
          <ContextMenuItem asChild>
            <PinAction chat={chat} />
          </ContextMenuItem>
          <ContextMenuItem asChild>
            <OpenNewTab chat={chat} />
          </ContextMenuItem>
          <ContextMenuItem asChild>
            <ArchiveAction chat={chat} />
          </ContextMenuItem>
          <ContextMenuItem asChild>
            <ShareDialog chat={chat} />
          </ContextMenuItem>
          <ContextMenuItem asChild>
            <DeleteDialog chat={chat} />
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <ChatOptionsMenu chat={chat} />
    </SidebarMenuItem>
  );
}
