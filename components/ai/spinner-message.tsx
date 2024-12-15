import { IconOpenAI } from "@/components/ui/icons";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="animate-fade-in  opacity-100 transition-opacity duration-1000 delay-500">
        <div className="flex gap-2 px-3 w-full ml-auto max-w-2xl py-2 rounded-xl">
          <div className="flex h-6 w-6 shrink-0 select-none items-center justify-center rounded-md bg-primary text-primary-foreground animate-pulse">
            <IconOpenAI size={16} />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-4 text-muted-foreground">
              Copilot is Thinking...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingButton() {
  return (
    <Button
      variant={"default"}
      className="flex cursor-pointer h-9  w-9 items-center justify-center shadow-none  rounded-lg"
    >
      <Loader2 className="h-4 w-4 animate-spin" />
    </Button>
  );
}
