"use client";
import Link from "next/link";
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
import { useAnimatedText, useLocalStorage } from "~/lib/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DeleteDialog, RenameDialog, ShareDialog } from "../dialogs";
import { useQueryClient } from "@tanstack/react-query";
import { Chat } from "~/lib/ai/types";
import { Loader2, MoreHorizontal } from "lucide-react";

interface NavItemProps {
  chat: Chat;
}

export default function NavItem({ chat }: NavItemProps) {
  const pathname = usePathname();
  const path = `/chat/${chat.id}`;
  const isActive = pathname === path;
  const [newChat, setNewChat] = useLocalStorage<string | null>("chatId", null);
  const animate = chat.id === newChat;
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["chats"] });
  };
  const [text] = useAnimatedText(chat?.title || "New chat", {
    shouldAnimate: animate,
    duration: 1,
    onComplete() {
      setNewChat(null);
    },
  });
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className="group/chat-item"
      >
        <Link href={path}>
          <span className="truncate">{text}</span>
          {chat?.isPending && (
            <Loader2 className="w-4 h-4 animate-spin ml-auto" />
          )}
        </Link>
      </SidebarMenuButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover>
            <MoreHorizontal />
            <span className="sr-only">More</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32" align="end">
          <DropdownMenuItem asChild>
            <ShareDialog chat={chat} />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <RenameDialog chat={chat} onSuccess={onSuccess} />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <DeleteDialog chat={chat} onSuccess={onSuccess} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
