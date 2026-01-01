"use client";
import Link from "next/link";
import { SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
import type { Chat } from "~/lib/drizzle";
import { useAnimatedText, useLocalStorage } from "~/lib/hooks";
import ChatOptionsMenu from "../chat-options";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { DeleteDialog, RenameDialog, ShareDialog } from "../dialogs";

interface NavItemProps {
  chat: Chat;
}

export default function NavItem({ chat }: NavItemProps) {
  const pathname = usePathname();
  const path = `/chat/${chat.id}`;
  const isActive = pathname === path;
  const [newChat, setNewChat] = useLocalStorage<string | null>("chatId", null);
  const animate = chat.id === newChat;

  const [text] = useAnimatedText(chat.title, {
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
          <SidebarMenuButton
            asChild
            className={cn(
              "w-full justify-start px-2 py-1.5 text-sm transition-colors hover:bg-muted group/chat-item",
              isActive && "bg-muted",
            )}
          >
            <Link href={path} className="flex items-center space-x-2 w-full">
              <span className="flex-1 truncate">{text}</span>
              <div className="opacity-0 group-hover/chat-item:opacity-100 focus-within:opacity-100 transition-opacity">
                <ChatOptionsMenu chat={chat} />
              </div>
            </Link>
          </SidebarMenuButton>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-32">
          <ContextMenuItem asChild>
            <ShareDialog chat={chat} />
          </ContextMenuItem>
          <ContextMenuItem asChild>
            <RenameDialog chat={chat} />
          </ContextMenuItem>
          <ContextMenuItem asChild>
            <DeleteDialog chat={chat} />
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </SidebarMenuItem>
  );
}
