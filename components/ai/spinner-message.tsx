import { AssitantIcon } from "~/components/ui/icons";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="w-full  flex flex-row items-center space-x-2 animate-fade-in  opacity-100 transition-opacity duration-1000 delay-500">
        <div className="flex size-[24px] animate-pulse shrink-0 select-none items-center justify-center rounded-md  bg-primary text-primary-foreground shadow-sm">
          <AssitantIcon />
        </div>
        <div className="ml-2 h-[24px] animate-pulse flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">
          Chat is thinking...
        </div>
      </div>
    </div>
  );
}

interface LoadingButtonProps {
  stop: () => void;
}

export function LoadingButton({ stop }: LoadingButtonProps) {
  return (
    <Button
      variant={"default"}
      onClick={stop}
      className="flex cursor-pointer h-9  w-9 items-center justify-center shadow-none  rounded-lg"
    >
      <Loader2 className="h-4 w-4 animate-spin" />
    </Button>
  );
}
