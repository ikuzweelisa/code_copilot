"use client";
import { AssitantIcon } from "@/components/ui/icons";
import ButtonRow from "@/components/ai/button-row";
import { cn } from "@/lib/utils";
import { Markdown } from "./markdown";
import { ChatRequestOptions } from "ai";
import { useAnimatedText } from "@/lib/hooks";

export function BotMessage({
  children,
  className,
  reload,
}: {
  children: string;
  className?: string;
  reload: (
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
}) {
  const [text] = useAnimatedText(children, {
    duration: 4,
  });
  return (
    <div className="group relative flex items-start  md:-ml-12">
      <div
        className={cn(
          "flex size-[24px] shrink-0 select-none items-center justify-center rounded-md  bg-primary text-primary-foreground",
          className
        )}
      >
        <AssitantIcon size={18} />
      </div>
      <div
        className={cn(
          "ml-1 flex-1 flex-col text-sm md:text-sm lg:text-base ",
          className
        )}
      >
        <Markdown>{text}</Markdown>
        <ButtonRow reload={reload} content={text} />
      </div>
    </div>
  );
}
