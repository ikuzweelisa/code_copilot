import { AssitantIcon } from "~/components/ui/icons";
import ButtonRow from "~/components/ai/button-row";
import { cn } from "~/lib/utils";
import Markdown from "./markdown";
import { RegenerateFunc } from "~/lib/types";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "~/components/ui/reasoning";
import { Fragment } from "react";
import { UIMessage } from "~/lib/ai/types";

export function BotMessage({
  className,
  regenerate,
  isLoading,
  message,
  children = null,
}: {
  className?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
  regenerate: RegenerateFunc;
  message?: UIMessage;
}) {
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
        {message
          ? message.parts.map((msg, index) => {
              switch (msg.type) {
                case "reasoning":
                  return (
                    <Fragment key={index}>
                      <Reasoning
                        isStreaming={
                          isLoading && index === message.parts.length - 1
                        }
                      >
                        <ReasoningTrigger />
                        <ReasoningContent>{msg.text}</ReasoningContent>
                      </Reasoning>
                    </Fragment>
                  );
                case "text":
                  return (
                    <Fragment key={index}>
                      <Markdown isAnimating={isLoading}>{msg.text}</Markdown>
                      {!isLoading ? (
                        <ButtonRow
                          message={message}
                          reload={regenerate}
                          content={msg.type}
                        />
                      ) : null}
                    </Fragment>
                  );
              }
            })
          : children}
      </div>
    </div>
  );
}
