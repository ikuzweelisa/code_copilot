"use client";
import { DebuggerProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import useClipBoard from "@/lib/hooks/use-clipboard";

export default function Debugger({
  updated,
  error,
  correctCode,
}: DebuggerProps) {
  const { language, title, concepts } = updated;
  const [isCopied, copyText] = useClipBoard();
  return (
    <div className="space-y-6 font-sans">
      <section>
        <p>{error}</p>
      </section>
      <section>
        <p className="text-base mb-4">{title}</p>

        <div className="relative w-full font-sans codeblock bg-zinc-950">
          <div className="flex items-center justify-between w-full px-6 py-1 pr-4 bg-zinc-800 text-zinc-100">
            <span className="text-xs lowercase">{language}</span>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-xs hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
                onClick={() => {
                  copyText(language);
                }}
              >
                {isCopied ? (
                  <span>
                    <CheckIcon size={15} />
                    <span className="sr-only">Copied!</span>
                  </span>
                ) : (
                  <span>
                    <CopyIcon size={15} />
                    <span className="sr-only">Copy code</span>
                  </span>
                )}
              </Button>
            </div>
          </div>

          <SyntaxHighlighter
            language={language}
            style={materialDark}
            PreTag="div"
            wrapLines={true}
            showLineNumbers
            customStyle={{
              margin: 0,
              width: "100%",
              background: "transparent",
              padding: "1.5rem 1rem",
            }}
            lineNumberStyle={{
              userSelect: "none",
            }}
            codeTagProps={{
              style: {
                fontSize: "0.9rem",
                fontFamily: "var(--font-mono)",
              },
            }}
          >
            {correctCode || ""}
          </SyntaxHighlighter>
        </div>
      </section>
      <section>
        <ul className="space-y-2 list-disc pl-5">
          {concepts.map((concept, index) => (
            <li key={index}>
              <span className="font-medium">{concept.name}: </span>
              <span>{concept.description}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-base">{updated.message}</p>
      </section>
    </div>
  );
}