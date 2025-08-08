import { AssitantIcon } from "~/components/ui/icons";
import ButtonRow from "~/components/ai/button-row";
import { cn } from "~/lib/utils";
import { Markdown } from "./markdown";
import { useAnimatedText } from "~/lib/hooks";
import { RegenerateFunc } from "~/lib/types";
import {ReasoningMessage} from "~/components/chat/reasoning";

export function BotMessage({
  children,
  className,
  reload,
  isLoading,
  reasoning,
  isReasoning=false,
}: {
  children: string;
  className?: string;
  isLoading?: boolean;
  reload: RegenerateFunc
  reasoning?:string
  isReasoning?:boolean
}) {
  const [text, isAnimating] = useAnimatedText(children, {
    duration: 3,
    shouldAnimate: isLoading,
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
        {reasoning && (
          <ReasoningMessage isLoading={isReasoning} message={reasoning} />
        )}  
          <Markdown>{text}</Markdown>
      
        {!isAnimating ? <ButtonRow reload={reload} content={text} /> : null}
      </div>
    </div>
  );
}
