"use client";

import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialDark,
  materialLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import useClipBoard from "@/lib/hooks/use-clipboard";
import { useTheme } from "next-themes";
import { Card } from "../ui/card";

interface CodeProps {
  language: string;
  codes: string;
}

export default function Code({ codes, language }: CodeProps) {
  const [isCopied, copyText] = useClipBoard();
  const { theme } = useTheme();

  return (
    <Card className="relative w-full font-sans bg-zinc-950 dark:bg-zinc-950 rounded-sm overflow-hidden border">
      <div className="flex items-center justify-between w-full px-1 bg-muted text-zinc-800 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-700">
        <span className="text-xs lowercase">{language}</span>
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
                <CheckIcon size={12} />
                <span className="sr-only">Copied!</span>
              </span>
            ) : (
              <span>
                <CopyIcon size={12} />
                <span className="sr-only">Copy code</span>
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="relative w-full max-w-full overflow-x-auto">
        <SyntaxHighlighter
          language={language.toLowerCase()}
          style={theme === "dark" ? materialDark : materialLight}
          PreTag="div"
          customStyle={{
            margin: 0,
            width: "100%",
            background: "transparent",
            padding: "1.5rem 1rem",
            overflow: "auto",
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
            maxWidth: "100%",
          }}
          lineNumberStyle={{
            userSelect: "none",
            color: theme === "dark" ? "#4B5563" : "#9CA3AF",
          }}
          wrapLines={true}
          wrapLongLines={true}
          codeTagProps={{
            style: {
              fontSize: "0.9rem",
              fontFamily: "var(--font-mono)",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
            },
          }}
          className="max-w-full"
        >
          {codes}
        </SyntaxHighlighter>
      </div>
    </Card>
  );
}
