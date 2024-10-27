"use client";

import { memo } from "react";
import ReactMarkdown from "react-markdown";
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

const components = {
  table: ({ node, ...props }: any) => (
    <Table className="w-full border border-border  rounded-md " {...props} />
  ),
  thead: ({ node, ...props }: any) => (
    <TableHeader className="bg-muted" {...props} />
  ),
  th: ({ node, ...props }: any) => (
    <TableHead
      className="px-4 py-2 font-semibold   border bg-muted  text-inherit"
      {...props}
    />
  ),
  tr: ({ node, ...props }: any) => (
    <TableRow className="px-4 py-2 text-inherit border " {...props} />
  ),
  td: ({ node, ...props }: any) => (
    <TableCell className="px-4 py-2 text-inherit border" {...props} />
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-decimal list-outside ml-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-outside ml-4" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="ml-4" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold" {...props}>
      {children}
    </strong>
  ),
  a: ({ node, children, ...props }: any) => {
    return (
      <Link
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </Link>
    );
  },
  code: ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <pre {...props} className={`${className}`}>
        <Code language={match[1]} codes={String(children).trim()} />
      </pre>
    ) : (
      <code
        className={`${className} text-sm bg-zinc-100 dark:bg-zinc-800 py-0.5 px-1 rounded-md`}
        {...props}
      >
        {children}
      </code>
    );
  },
};

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={components}
      className="prose dark:prose-invert max-w-none"
    >
      {children}
    </ReactMarkdown>
  );
}

export default memo(Markdown, (prev, next) => prev.children === next.children);
