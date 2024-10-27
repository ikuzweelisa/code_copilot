"use client";
import { Markdown } from "@/components/ai/markdown";
import ToggleMode from "@/components/navbar/toggle-mode";
import { useState } from "react";

export default function Page() {
  const [markdown, setMarkdown] = useState("");
  return (
    <div className="h-screen w-full p-3">
      <h2>Markdown Render</h2>
      <div className="flex w-full gap-3">
        <textarea
          className="w-full max-w-2xl"
          onChange={(e) => setMarkdown(e.target.value)}
        ></textarea>
        <div className=" flex-grow">
          <Markdown>{markdown}</Markdown>
        </div>
      </div>
      <ToggleMode/>
    </div>
  );
}
