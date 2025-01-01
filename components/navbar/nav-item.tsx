"use client";
import { MessageSquareText } from "lucide-react";
import Link from "next/link";
import { SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
import { Chat } from "~/lib/drizzle";
import { useAnimatedText, useLocalStorage } from "~/lib/hooks";

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
    duration: 2,
    onComplete() {
      setNewChat(null);
    },
  });
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(
          "w-full justify-start px-2 py-1.5 text-sm transition-colors hover:bg-muted ",
          isActive && "bg-muted"
        )}
      >
        <Link href={path} className="flex items-center space-x-2 w-full">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-md",
              isActive && "text-primary-foreground bg-primary"
            )}
          >
            <MessageSquareText className="h-4 w-4" />
          </div>
          <span className="flex-1 truncate">{text}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
