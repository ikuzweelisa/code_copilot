import {
  Check,
  Copy,
  CpuIcon,
  LucideIcon,
  Repeat,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { toast } from "sonner";
import { useClipBoard } from "~/lib/hooks";
import { RegenerateFunc } from "~/lib/types";
import { UIMessage } from "~/lib/ai/types";
import { formatNumber } from "~/lib/utils";

interface Props {
  content: string;
  reload: RegenerateFunc;
  message: UIMessage;
}
export default function ButtonRow({ content, reload, message }: Props) {
  const [isCopied, copyText] = useClipBoard();
  const buttons: Array<{
    icon: LucideIcon;
    tooltip: string;
    label?: string;
    onClick: () => void;
  }> = [
    {
      icon: isCopied ? Check : Copy,
      tooltip: isCopied ? "Copied!" : "Copy",
      onClick: copy,
      label: isCopied ? "Copied!" : "Copy",
    },
    {
      icon: Repeat,
      tooltip: "Regenerate",
      onClick: async () => {
        await reload({
          messageId: message.id,
        });
      },
    },
    { icon: ThumbsUp, tooltip: "Like", onClick: like },
    { icon: ThumbsDown, tooltip: "Dislike", onClick: dislike },
  ];

  function like() {
    toast("Thanks for your feedback!", {
      position: "top-center",
    });
  }
  function dislike() {
    toast("Thanks for your feedback! We will try to improve", {
      position: "top-center",
    });
  }
  function copy() {
    copyText(content);
  }

  return (
    <div className="flex gap-2 mt-2 justify-end">
      <div className="flex justify-center items-center gap-2 italic">
        {message?.metadata?.model && <span className="text-sm">{message.metadata.model}</span>}
        {message?.metadata?.totalTokens && (
          <span className="text-sm">{`${formatNumber(message.metadata.totalTokens)} Tokens`}</span>
        )}
      </div>
      {buttons.map(({ icon: Icon, onClick, tooltip, label }, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Button
              className="w-fit h-fit  flex px-3 py-2 bg-card rounded-xl gap-1"
              variant="ghost"
              size="icon"
              onClick={() => onClick()}
            >
              <Icon className="h-2 w-2" />
              {label && <span className="text-xs">{label}</span>}

              <span className="sr-only">{tooltip}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
