"use client";
import { memo, useMemo } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Code from "./code";
import { cn } from "~/lib/utils";
import { marked } from "marked";

function parseMarkdown(markdown: string): string[] {
  const content = marked.lexer(markdown);
  return content.map((c) => c.raw);
}
function MarkdownComponent({ children }: { children: string }) {
  const components = useMemo(
    () =>
      ({
        table: ({ node, className, ...props }) => (
          <div className="my-6">
            <Table
              className={cn(
                "w-full border border-border rounded-md",
                className,
              )}
              {...props}
            />
          </div>
        ),
        thead: ({ node, className, ...props }) => (
          <TableHeader className={cn("bg-muted", className)} {...props} />
        ),
        th: ({ node, ...props }: any) => (
          <TableHead
            className="px-3 py-1 font-semibold border bg-muted text-inherit"
            {...props}
          />
        ),
        tr: ({ node, ...props }: any) => (
          <TableRow className="px-4 py-2 text-inherit border" {...props} />
        ),
        td: ({ node, ...props }: any) => (
          <TableCell className="px-4 py-2 text-inherit border" {...props} />
        ),
        ul: ({ children, className, ...props }) => (
          <ul className={cn(className)} {...props}>
            {children}
          </ul>
        ),
        ol: ({ children, className, ...props }) => (
          <ol className={cn(className)} {...props}>
            {children}
          </ol>
        ),
        li: ({ children, className, ...props }) => (
          <li className={cn("ml-4 mb-1", className)} {...props}>
            {children}
          </li>
        ),
        strong: ({ children, className, ...props }) => (
          <strong className={cn("font-bold", className)} {...props}>
            {children}
          </strong>
        ),
        a: ({ node, children, className, ...props }) => {
          return (
            <Link
              className={cn("text-blue-500 hover:underline", className)}
              target="_blank"
              rel="noreferrer"
              {...props}
            >
              {children}
            </Link>
          );
        },
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <div className="my-6">
              <pre {...props} className={`${className}`}>
                <Code language={match[1]} codes={String(children).trim()} />
              </pre>
            </div>
          ) : (
            <code
              className={cn(
                "text-sm bg-zinc-100 dark:bg-zinc-800 py-0.5 px-1 rounded-md",
                className,
              )}
              {...props}
            >
              {children}
            </code>
          );
        },
        p: ({ children, className, ...props }) => (
          <p className={cn(className)} {...props}>
            {children}
          </p>
        ),
        h1: ({ children, className, ...props }) => (
          <h1 className={cn(className)} {...props}>
            {children}
          </h1>
        ),
        h2: ({ children, className, ...props }) => (
          <h2 className={cn(className)} {...props}>
            {children}
          </h2>
        ),
        h3: ({ children, className, ...props }) => (
          <h3 className={cn(className)} {...props}>
            {children}
          </h3>
        ),
      }) satisfies Components,
    [],
  );

  return (
    <div className="prose dark:prose-invert sm:prose sm:dark:prose-invert md:prose-lg md:dark:prose-lg">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
        className="max-w-none space-y-2"
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

const MarkdownBlock = memo(
  MarkdownComponent,
  (prev, next) => prev.children === next.children,
);

export const Markdown = memo(({ children }: { children: string }) => {
  const blocks = useMemo(() => parseMarkdown(children), [children]);
  return blocks.map((block, index) => (
    <MarkdownBlock key={`block-${index}`}>{block}</MarkdownBlock>
  ));
});

Markdown.displayName = "Markdown";
