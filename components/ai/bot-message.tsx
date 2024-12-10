"use client";
import { IconOpenAI } from "@/components/ui/icons";
import ButtonRow from "@/components/ai/button-row";
import { cn } from "@/lib/utils";
import { StreamableValue } from "ai/rsc";
import {useStreamableText} from "@/lib/hooks";
import { Markdown } from "./markdown";

export function BotMessage({
  children,
  className
}: {
  children: string | StreamableValue<string>;
  className?: string;
}) {
  const stream = useStreamableText(children);
  return (
    <div className="group relative flex items-start  md:-ml-12">
      <div
        className={cn(
          "flex size-[24px] shrink-0 select-none items-center justify-center rounded-md  bg-primary text-primary-foreground",
          className
        )}
      >
        <IconOpenAI size={18} />
      </div>
      <div className="ml-1 flex-1 flex-col text-sm md:text-sm lg:text-base">
        <Markdown>{stream}</Markdown>
        <ButtonRow />
      </div>
    </div>
  );
}
