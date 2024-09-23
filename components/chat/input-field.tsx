import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Textarea from "react-textarea-autosize";
import { Paperclip, Send } from "lucide-react";
import { ChangeEvent, FormEvent, RefObject, useRef } from "react";
interface InputFieldProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  input: string;
  formRef: RefObject<HTMLFormElement>;
}
export default function InputField({
  handleChange,
  handleSubmit,
  input,
  formRef,
  onKeyDown,
}: InputFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  function handleClick() {
    inputRef.current?.click();
  }
  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden  dark:bg-zinc-950 px-8 sm:rounded-xl sm:border sm:px-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              type={"button"}
              className="absolute left-0 top-[14px] size-8  bg-background p-0 sm:left-4"
              onClick={handleClick}
            >
              <Paperclip size={20} />
              <span className="sr-only">Attachment</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Attachment</TooltipContent>
        </Tooltip>
        <input
          ref={inputRef}
          type={"file"}
          name={"file"}
          style={{ display: "none" }}
        />
        <Textarea
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          onChange={handleChange}
          value={input}
        />
        <div className="absolute right-0 top-[13px] sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled={input.trim() === ""} type="submit" size="icon">
                <Send size={20} />
                <span className="sr-only">Send</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  );
}
