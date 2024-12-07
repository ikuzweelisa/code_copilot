"use client";
import { MessageSquareText } from "lucide-react";
import Link from "next/link";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Chat } from "@/lib/types";
import { motion } from "motion/react";
import {UseLocalStorage} from "@/lib/hooks";

interface NavItemProps {
  chat: Chat;
}

export default function NavItem({ chat }: NavItemProps) {
  const pathname = usePathname();

  const path = `${chat.path}`;
  const isActive = pathname === path;
  const [newChat, setNewChat] = UseLocalStorage(null, {
    key: "chatId",
  });
  const animate = isActive && newChat === chat.id;
  const typingDuration = 3;
  const characterDelay = typingDuration / (chat.title.length || 1);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(
          "w-full justify-start px-2 py-1.5 text-sm transition-colors hover:bg-muted ",
          isActive && "bg-muted"
        )}
      >
        <motion.div
          variants={{
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
          }}
          initial={animate ? "initial" : undefined}
          animate={animate ? "animate" : undefined}
          transition={{ duration: 1, ease: "easeIn" }}
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
            <span className="flex-1 truncate">
              {animate
                ? chat.title.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        initial: { opacity: 0, x: -10 },
                        animate: { opacity: 1, x: 0 },
                      }}
                      initial="initial"
                      animate="animate"
                      transition={{
                        duration: 0.5,
                        delay: index * characterDelay,
                      }}
                      onAnimationComplete={() => {
                        if (index === chat.title.length - 1) {
                          setNewChat(null);
                        }
                      }}
                    >
                      {char}
                    </motion.span>
                  ))
                : chat?.title}
            </span>
          </Link>
        </motion.div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
