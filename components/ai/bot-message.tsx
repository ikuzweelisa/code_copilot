"use client";
import { IconOpenAI } from "@/components/ui/icons";

import { cn } from "@/lib/utils";

export function BotMessage({
  children,
  showAvatar = true,
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
}) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          "flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm",
          !showAvatar && "invisible",
        )}
      >
        <IconOpenAI />
      </div>
      <div className="ml-4 flex-1 flex-col pl-2">{children}</div>
    </div>
  );
}