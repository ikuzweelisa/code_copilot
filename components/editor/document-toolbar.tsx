"use client";

import { Bold, Code, Italic, Strikethrough, Underline } from "lucide-react";

import { MarkToolbarButton } from "~/components/ui/mark-toolbar-button";
import { Toolbar, ToolbarSeparator } from "~/components/ui/toolbar";

export default function DocumentToolbar() {
  return (
    <Toolbar className="mb-2 flex w-full flex-wrap gap-1 rounded-md border bg-background p-1">
      <MarkToolbarButton nodeType="bold" aria-label="Bold">
        <Bold />
      </MarkToolbarButton>
      <MarkToolbarButton nodeType="italic" aria-label="Italic">
        <Italic />
      </MarkToolbarButton>
      <MarkToolbarButton nodeType="underline" aria-label="Underline">
        <Underline />
      </MarkToolbarButton>
      <ToolbarSeparator />
      <MarkToolbarButton nodeType="strikethrough" aria-label="Strikethrough">
        <Strikethrough />
      </MarkToolbarButton>
      <MarkToolbarButton nodeType="code" aria-label="Code">
        <Code />
      </MarkToolbarButton>
    </Toolbar>
  );
}
