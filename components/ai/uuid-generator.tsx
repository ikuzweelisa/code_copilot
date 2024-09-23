import { UuidGenProps } from "@/lib/types";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";

export default function UuidGenerator({ uuid, message }: UuidGenProps) {
  return (
    <div className={"flex flex-col gap-3"}>
      <span className="mb-2">{message}</span>
      <div className="relative w-full font-sans rounded-lg bg-zinc-950 ">
        <div className="flex items-center justify-between w-full px-6 py-1 pr-4 bg-zinc-800 text-zinc-100">
          <span className="text-xs lowercase">{"shell"}</span>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-xs hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
            >
              <CopyIcon size={15} />
              <span className="sr-only">Copy code</span>
            </Button>
          </div>
        </div>
        <SyntaxHighlighter
          language={"shell"}
          style={oneDark}
          PreTag="div"
          wrapLongLines={true}
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
          wrapLines={true}
          codeTagProps={{
            style: {
              fontSize: "0.9rem",
              fontFamily: "var(--font-mono)",
            },
          }}
        >
          {uuid}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
