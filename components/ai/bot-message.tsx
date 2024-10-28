"use client";
import { IconOpenAI } from "@/components/ui/icons";
import ButtonRow from "@/components/ai/button-row";
import { cn } from "@/lib/utils";

export function BotMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          "flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm"
        )}
      >
        <IconOpenAI />
      </div>
      <div className="ml-4 flex-1 flex-col text-xs md:text-sm lg:text-base">
        {children}
        <ButtonRow />
      </div>
    </div>
  );
}
