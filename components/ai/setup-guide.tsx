"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { SetupProps } from "@/lib/types";
import useClipBoard from "@/lib/hooks/use-clipboard";

export default function SetupGuide({
  steps,
  overview,
  intro,
  title,
}: SetupProps) {
  const [isCoped, copyText] = useClipBoard();
  return (
    <div className="space-y-6 font-sans">
      <section className="text-base">
        <h3 className="text-xl font-bold mb-2">Introduction</h3>
        <p>{intro}</p>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <ol className="space-y-6 list-decimal pl-5">
          {steps.map(({ step }, index) => (
            <li key={index}>
              <h3 className=" font-semibold mb-2">{step.name}</h3>
              <p className="text-base mb-4">{step.description}</p>
              {step.example && (
                <div className="relative w-full font-sans codeblock bg-zinc-950">
                  <div className="flex items-center justify-between w-full px-6 py-1 pr-4 bg-zinc-800 text-zinc-100">
                    <span className="text-xs lowercase">
                      {step.example.language}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-xs hover:bg-zinc-800 focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
                        onClick={() => copyText(step.example?.codes)}
                      >

                        {isCoped ? (
                          <CheckIcon size={15} />
                        ) : (
                          <CopyIcon size={15} />
                        )}
                        <span className="sr-only">Copy code</span>
                      </Button>
                    </div>
                  </div>
                  <SyntaxHighlighter
                    language={step.example.language}
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
                    {step.example.codes}
                  </SyntaxHighlighter>
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="text-base">
        <p>{overview}</p>
      </section>
    </div>
  );
}
