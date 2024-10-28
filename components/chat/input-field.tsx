import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Textarea from "react-textarea-autosize";
import { Send } from "lucide-react";
import React, { ChangeEvent, FormEvent, RefObject, useRef } from "react";
import { saveFile } from "@/lib/actions/server";

interface InputFieldProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  input: string;
  formRef: RefObject<HTMLFormElement>;
  children: React.ReactNode;
}
export default function InputField({
  handleChange,
  handleSubmit,
  input,
  formRef,
  onKeyDown,
  children,
}: InputFieldProps) {
  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="relative flex max-h-60  grow flex-col overflow-hidden   dark:bg-zinc-950 rounded-xl border px-8 ">
          <div >{children}</div>

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
          <div className="absolute right-0 top-[13px] sm:right-4 px-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={input.trim() === ""}
                  type="submit"
                  size="icon"
                >
                  <Send size={20} />
                  <span className="sr-only">Send</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </form>
    </>
  );
}
