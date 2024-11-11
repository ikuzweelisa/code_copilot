import { AudioLines, Copy, Repeat, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

export default function ButtonRow() {
  const buttons = [
    { icon: AudioLines, tooltip: "read", onClick: like },
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
    <div className="flex gap-1">
      {buttons.map((button, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => button.onClick()}
            >
              <button.icon className="h-4 w-4" />
              <span className="sr-only">{button.tooltip}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{button.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
