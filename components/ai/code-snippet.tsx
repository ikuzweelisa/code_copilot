"use client";
import { CodeAnalyzerProps } from "@/lib/types";
import Code from "@/components/ai/code";
import ExplainConcepts from "@/components/ai/explain-concepts";
import ButtonRow from "@/components/ai/button-row";
import React from "react";

export default function CodeSnippet({
  improvedCode,
  improvedKeyConcepts,
  keyConcepts,
  language,
  message,
}: CodeAnalyzerProps) {
  return (
    <div className="space-y-6 font-sans ">
      <section>
        <h3 className=" font-bold mb-2">Analysis</h3>
        <p className="text-base">{message}</p>
      </section>

      <section>
        <h4 className=" font-semibold mb-2">Key Concepts</h4>
        <ul className="space-y-2 list-disc pl-5">
          {keyConcepts.map((concept, index) => (
            <li key={index}>
              <span className="font-medium">{concept.name}: </span>
              <span>{concept.description}</span>
            </li>
          ))}
        </ul>
      </section>
      {improvedCode && improvedCode.code && (
        <section>
          <h3 className=" font-semibold mb-2">Improved Code</h3>
          <p className="text-base mb-4">{improvedCode.message}</p>

          <Code language={language} codes={improvedCode.code} />
        </section>
      )}

      {improvedKeyConcepts && improvedKeyConcepts.concepts.length > 0 && (
        <section>
          <h3 className=" font-semibold mb-2">Improved Key Concepts</h3>
          <ExplainConcepts Concepts={improvedKeyConcepts.concepts} />
          <p className="mt-4 text-base">{improvedKeyConcepts.message}</p>
        </section>
      )}
      <ButtonRow />
    </div>
  );
}