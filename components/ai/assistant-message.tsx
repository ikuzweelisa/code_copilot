import { Fragment } from "react";

import ButtonRow from "~/components/ai/button-row";
import { AssitantIcon } from "~/components/ui/icons";
import { Reasoning, ReasoningContent, ReasoningTrigger } from "~/components/ui/reasoning";
import { UIMessage } from "~/lib/ai/types";
import { RegenerateFunc } from "~/lib/types";
import { cn } from "~/lib/utils";

import DocumentGenerationView from "../chat/document-gen-view";
import ImageGenerationView from "../chat/image-gen-view";
import SourcesView from "../chat/source-view";

import Markdown from "./markdown";

export function AssistantMessage({
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
    <div className="group relative flex flex-wrap items-start md:-ml-12">
      <div
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-md bg-primary  text-primary-foreground select-none",
          className,
        )}
      >
        <AssitantIcon size={18} />
      </div>
      <div className={cn("ml-1 flex-1 flex-col text-sm md:text-sm lg:text-base ", className)}>
        {message
          ? message.parts.map((msg, index) => {
              switch (msg.type) {
                case "reasoning":
                  return (
                    <Fragment key={index}>
                      <Reasoning isStreaming={isLoading && index === message.parts.length - 1}>
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
                        <ButtonRow message={message} reload={regenerate} content={msg.type} />
                      ) : null}
                    </Fragment>
                  );
                case "file":
                  return (
                    <div key={index}>
                      {msg.filename}
                      {msg.url}
                      {msg.mediaType}
                    </div>
                  );
                case "tool-web_search":
                  if (msg.state !== "output-available") return null;
                  return (
                    <SourcesView
                      key={index}
                      sources={msg.output.results.map((result) => ({
                        id: result.url,
                        title: result.title,
                      }))}
                    />
                  );

                case "tool-generate_image":
                  return <ImageGenerationView key={index} invocation={msg} />;
                case "tool-generate_document":
                  return (
                    <DocumentGenerationView
                      key={index}
                      invocation={msg}
                    />
                  );
              }
            })
          : children}
      </div>
    </div>
  );
}
