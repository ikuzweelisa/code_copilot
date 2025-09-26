import { AssitantIcon } from "~/components/ui/icons";
import ButtonRow from "~/components/ai/button-row";
import { cn } from "~/lib/utils";
import { Markdown } from "./markdown";
import { RegenerateFunc } from "~/lib/types";
import { ReasoningMessage } from "~/components/chat/reasoning";
import { UIMessage } from "ai";
import { Fragment } from "react";

export function BotMessage({
  className,
  reload,
  isLoading,
  message,
  children = null,
}: {
  className?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
  reload: RegenerateFunc;
  message?: UIMessage;
}) {
  return (
    <div className="group relative flex items-start  md:-ml-12">
      <div
        className={cn(
          "flex size-[24px] shrink-0 select-none items-center justify-center rounded-md  bg-primary text-primary-foreground",
          className,
        )}
      >
        <AssitantIcon size={18} />
      </div>
      <div
        className={cn(
          "ml-1 flex-1 flex-col text-sm md:text-sm lg:text-base ",
          className,
        )}
      >
        {message
          ? message.parts.map((msg, index) => {
              switch (msg.type) {
                case "reasoning":
                  return (
                    <Fragment key={index}>
                      <ReasoningMessage isLoading={msg.state === "streaming"}>
                        {msg.text}
                      </ReasoningMessage>
                    </Fragment>
                  );
                case "text":
                  return (
                    <Fragment key={index}>
                      <Markdown>{msg.text}</Markdown>
                      {!isLoading ? (
                        <ButtonRow reload={reload} content={msg.type} />
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
