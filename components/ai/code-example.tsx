"use client";
import { CodeExampleProps } from "@/lib/types";
import Code from "@/components/ai/code";
import ExplainConcepts from "@/components/ai/explain-concepts";
import ButtonRow from "@/components/ai/button-row";
import React from "react";

export default function CodeExample({
  example,
  message,
  concepts,
}: CodeExampleProps) {
  return (
    <div className="space-y-6 font-sans">
      <section>
        <p>{message}</p>
      </section>
      <section>
        <p className="text-base mb-4">{example.title}</p>

        <Code language={example.language} codes={example.codes} />
      </section>
      <ExplainConcepts Concepts={concepts} />
      <ButtonRow />
    </div>
  );
}