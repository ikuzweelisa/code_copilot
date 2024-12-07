import { Copy, LucideIcon, Repeat, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

export default function ButtonRow() {
  const buttons: Array<{
    icon: LucideIcon;
    tooltip: string;
    onClick: () => void;
  }> = [
    {
      icon: Copy,
      tooltip: "Copy",
      onClick: copy,
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
    toast("Text copied to clipboard!", {
      position: "top-center",
    });
  }
  return (
    <div className="flex gap-0 mt-2">
      {buttons.map(({ icon: Icon, onClick, tooltip }, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => onClick()}>
              <Icon className="h-3 w-3" />
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
