import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialDark,
  materialLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import useClipBoard from "@/lib/hooks/use-clipboard";
import { useTheme } from "next-themes";

interface CodeProps {
  language: string;
  codes: string;
}

export default function Code({ codes, language }: CodeProps) {
  const [isCopied, copyText] = useClipBoard();
  const { theme } = useTheme();

  return (
    <div className="relative w-full font-sans codeblock bg-zinc-950  dark:bg-zinc-950 rounded-md overflow-hidden">
      <div className="flex items-center justify-between w-full px-6 py-2 pr-4 bg-muted  dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-700">
        <span className="text-xs lowercase font-medium">{language}</span>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-xs hover:bg-zinc-200 dark:hover:bg-zinc-700 focus-visible:ring-1 focus-visible:ring-zinc-300 dark:focus-visible:ring-zinc-600 focus-visible:ring-offset-0"
            onClick={() => {
              copyText(codes);
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
        language={language.toLowerCase()}
        style={theme === "dark" ? materialDark : materialLight}
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
          color: theme === "dark" ? "#4B5563" : "#9CA3AF",
        }}
        codeTagProps={{
          style: {
            fontSize: "0.9rem",
            fontFamily: "var(--font-mono)",
          },
        }}
      >
        {codes}
      </SyntaxHighlighter>
    </div>
  );
}
