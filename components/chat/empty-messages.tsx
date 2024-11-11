import { exampleMessages } from "@/lib/data";
import InputField from "./input-field";
import { FormEvent, RefObject } from "react";
import { greet } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { IconOpenAI } from "../ui/icons";

interface Props {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  input: string;
  formRef: RefObject<HTMLFormElement | null>;
  children: React.ReactNode;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}
export default function EmptyScreen({
  children,
  formRef,
  handleSubmit,
  setInput,
  input,
  onKeyDown,
}: Props) {
  const session = useSession();
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 w-full">
      <div className="flex flex-col items-center justify-center w-full max-w-xl">
        <span className="text-xl sm:text-xl md:text-2xl lg:text-3xl flex items-center justify-center gap-2 font-semibold text-center p-5"><IconOpenAI size={37}/> {`${greet()} ,${
          session?.data?.user?.name
        }!`}</span>
        <div className="w-full grid gap-2 sm:grid-cols-1 lg:grid-cols-2">
          {exampleMessages.map((example, index) => (
            <div
              key={example.heading}
              onClick={() => {
                setInput((currentInput) => example.message);
                if (input) {
                  formRef.current?.requestSubmit();
                }
                return;
              }}
              className={`cursor-pointer rounded-md border bg-white p-2 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                index > 1 && "hidden md:block"
              }`}
            >
              <div className="text-sm font-semibold">{example.heading}</div>
              <div className="text-sm text-zinc-600">{example.subheading}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-2xl px-4 mt-5">
        <div>
          <InputField
            input={input}
            handleSubmit={handleSubmit}
            handleChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            formRef={formRef}
          >
            {children}
          </InputField>
        </div>
      </div>
    </div>
  );
}
