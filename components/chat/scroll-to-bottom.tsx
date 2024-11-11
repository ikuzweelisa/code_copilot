import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

import { ArrowDown } from "lucide-react";

interface Props {
  isAtBottom: boolean;
  scrollToBottom: () => void;
}
export function ScrollAnchor({ isAtBottom, scrollToBottom }: Props) {
  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className={cn(
        "z-10 bg-background transition-opacity duration-300 sm:right-8 md:top-2 rounded-full ",
        isAtBottom ? "opacity-0" : "opacity-100"
      )}
      onClick={scrollToBottom}
    >
      <ArrowDown className="h-3.5 w-3.5" />
      <span className="sr-only">Bottom</span>
    </Button>
  );
}
