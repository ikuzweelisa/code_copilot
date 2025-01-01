import { Button } from "~/components/ui/button";
import Textarea from "react-textarea-autosize";
import { MoveUp } from "lucide-react";
import React, { ChangeEvent, FormEvent, useRef } from "react";
import { cn } from "~/lib/utils";
import { LoadingButton } from "../ai/spinner-message";

interface InputFieldProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  input: string;
  children: React.ReactNode;
  isLoading: boolean;
  stop: () => void;
}

function InputField({
  handleChange,
  handleSubmit,
  input,
  children,
  isLoading,
  stop,
}: InputFieldProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.currentTarget.form?.requestSubmit();
      e.preventDefault();
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div
        className={cn(
          "relative flex items-center bg-card rounded-lg  border dark:border-0 p-0"
        )}
      >
        {children}
        <Textarea
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Enter a message."
          className="min-h-10 max-h-28 sm:min-h-12 md:min-h-16 lg:min-h-20  w-full resize-none bg-transparent px-12 py-4  focus-within:outline-none text-base"
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
        <div className="absolute right-0 top-[13px] sm:right-4 px-2">
          {isLoading ? (
            <LoadingButton stop={stop} />
          ) : (
            <Button
              variant={"default"}
              disabled={input.trim() === ""}
              type="submit"
              size="icon"
              className="rounded-full"
            >
              <MoveUp className="h-3 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}

export default InputField;
