"use client";
import { TopicPros } from "@/lib/types";
import Code from "@/components/ai/code";
import ExplainConcepts from "@/components/ai/explain-concepts";
import ButtonRow from "@/components/ai/button-row";
import React from "react";

export default function ExplainTopic({
  introduction,
  keyConcepts,
  example,
  overview,
}: TopicPros) {
  return (
    <div className="space-y-6 font-sans">
      <section>
        <p>{introduction}</p>
      </section>
      <ExplainConcepts Concepts={keyConcepts} />
      {example && (
        <section>
          <p className="text-base mb-4">{example.title}</p>

          <Code codes={example.codes} language={example.language || ""} />
        </section>
      )}
      <section>{overview}</section>
      <ButtonRow />
    </div>
  );
}