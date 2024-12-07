import { Button } from "@/components/ui/button";
import Textarea from "react-textarea-autosize";
import { MoveUp, Send } from "lucide-react";
import React, { ChangeEvent, FormEvent, forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { LoadingButton } from "../ai/spinner-message";

interface InputFieldProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  input: string;
  children: React.ReactNode;
  isNew: boolean;
  isLoading: boolean;
}

const InputField = forwardRef<HTMLFormElement, InputFieldProps>(
  function InputField ({ handleChange, handleSubmit, input, isNew, children, isLoading }, ref) {
    const inputRef = useRef<HTMLTextAreaElement | null>(null);

    function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
      if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
        e.currentTarget.form?.requestSubmit();
        e.preventDefault();
      }
    }
    return (
      <form onSubmit={handleSubmit} ref={ref}>
        <div
          className={cn(
            "relative flex items-center bg-card  rounded-2xl border  p-0",
            isNew ? "h-24" : "h-16"
          )}
        >
          {children}
          <Textarea
            tabIndex={0}
            onKeyDown={onKeyDown}
            placeholder="Enter a message."
            className="h-full w-full resize-none bg-transparent px-12  focus-within:outline-none text-base"
            autoFocus
            spellCheck={false}
            ref={inputRef}
            autoComplete="off"
            autoCorrect="off"
            name="message"
            rows={1}
            onChange={handleChange}
            value={input}
          />
          <div className="absolute right-0 top-[13px] sm:right-4 px-1">
            {isLoading ? (
              <LoadingButton />
            ) : (
              <Button
                variant={"default"}
                disabled={input.trim() === ""}
                type="submit"
                size="icon"
              >
                <MoveUp className="h-3 w-4"/>
                <span className="sr-only">Send</span>
              </Button>
            )}
          </div>
        </div>
      </form>
    );
  }
);

export default InputField;
