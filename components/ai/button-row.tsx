import {
  Check,
  Copy,
  LucideIcon,
  Repeat,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { useClipBoard } from "@/lib/hooks";

interface Props {
  content: string;
}
export default function ButtonRow({ content }: Props) {
  const [isCopied, copyText] = useClipBoard();
  const buttons: Array<{
    icon: LucideIcon;
    tooltip: string;
    label?:string
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
      onClick: () => {
        return;
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
    <div className="flex gap-2 mt-2">
      {buttons.map(({ icon: Icon, onClick, tooltip ,label}, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Button
              className="w-fit h-fit  flex px-3 py-2 bg-muted rounded-xl gap-1"
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
