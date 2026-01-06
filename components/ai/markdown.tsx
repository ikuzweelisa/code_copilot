"use client";

import remarkGfm from "remark-gfm";
import { Streamdown } from "streamdown";
interface Props {
  isAnimating?: boolean;
  children: string;
}
export default function Markdown({ children, isAnimating }: Props) {
  return (
    <div className="prose dark:prose-invert sm:prose sm:dark:prose-invert md:prose-lg md:dark:prose-lg">
      <Streamdown
        controls={{
          mermaid: {
            download: false,
          },
        }}
        isAnimating={isAnimating}
        remarkPlugins={[remarkGfm]}
        className="max-w-none space-y-2"
      >
        {children}
      </Streamdown>
    </div>
  );
}
