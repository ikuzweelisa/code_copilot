"use client";

import { AudioLines, Copy, Repeat, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const buttons = [
  { icon: AudioLines, tooltip: "read" },
  { icon: Copy, tooltip: "Copy to clipboard" },
  { icon: Repeat, tooltip: "Repeat action" },
  { icon: ThumbsUp, tooltip: "Like" },
  { icon: ThumbsDown, tooltip: "Dislike" },
];

export default function ButtonRow() {
  return (
    <div className="flex gap-1">
      {buttons.map((button, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
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