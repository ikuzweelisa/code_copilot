"use client";
import { MessageSquareText } from "lucide-react";
import Link from "next/link";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Chat } from "@/lib/types";

interface NavItemProps {
  chat: Chat;
}

export default function NavItem({ chat }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === chat.path;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(
          "w-full justify-start px-2 py-1.5 text-sm font-medium transition-colors hover:bg-muted",
          isActive && "bg-muted"
        )}
      >
        <Link href={chat.path} className="flex truncate items-center space-x-1">
          <div
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-md border",
              isActive ? "bg-primary text-primary-foreground" : "bg-background"
            )}
          >
            <MessageSquareText className="h-4 w-4" />
          </div>

          <span className="flex-1 truncate text-sm">
            {chat.title && chat?.title?.length >= 32
              ? chat.title?.slice(0, 32) + ".."
              : chat.title}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
