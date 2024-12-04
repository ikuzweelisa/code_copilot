import { IconOpenAI } from "@/components/ui/icons";
import { spinner } from "@/components/ai/spinner";
import { Loader2 } from "lucide-react";

export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        <IconOpenAI />
      </div>
      <div className="ml-4 h-[24px] flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">
        {spinner}
      </div>
    </div>
  );
}

export function LoadingButton() {
  return (
    <div className="flex cursor-pointer h-9 border w-9 items-center justify-center rounded-lg  bg-secondary">
      <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
    </div>
  );
}
