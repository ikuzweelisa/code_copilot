import { AnimatePresence, motion } from "motion/react";
import { cn } from "~/lib/utils";
import { Markdown } from "~/components/ai/markdown";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { ChevronDown } from "lucide-react";

interface ReasoningProps {
  isLoading: boolean;
  message: string;
}

const variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  expanded: {
    height: "auto",
    opacity: 1,
    marginTop: "1rem",
    marginBottom: "0.5rem",
  },
};

export function ReasoningMessage({ isLoading, message }: ReasoningProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    if (isLoading) {
      setIsExpanded(true);
    }
  }, [isLoading]);

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="flex flex-row items-center gap-2">
          <div className="font-medium">Reasoning</div>
          <div className="animate-spin">
            <Loader2 className="size-4" />
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-2">
          <div className="font-medium">Reasoned for a few seconds</div>
          <button
            data-testid="message-reasoning-toggle"
            type="button"
            className="cursor-pointer"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-200",
                isExpanded ? "rotate-180" : ""
              )}
            />
          </button>
        </div>
      )}

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            data-testid="message-reasoning"
            key="content"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={variants}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
            className="flex flex-col gap-4 border-l pl-4 text-zinc-600 dark:text-zinc-400"
          >
            <Markdown>{message}</Markdown>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
