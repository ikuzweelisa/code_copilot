"use client";
import { DebuggerProps } from "@/lib/types";
import ExplainConcepts from "@/components/ai/explain-concepts";
import Code from "@/components/ai/code";
import ButtonRow from "@/components/ai/button-row";
import React from "react";

export default function Debugger({
  updated,
  error,
  correctCode,
}: DebuggerProps) {
  const { language, title, concepts } = updated;
  return (
    <div className="space-y-6 font-sans">
      <section>
        <p>{error}</p>
      </section>
      <section>
        <p className="text-base mb-4">{title}</p>
        <Code language={language} codes={correctCode} />
      </section>
      <ExplainConcepts Concepts={concepts} />
      <ButtonRow />
    </div>
  );
}