"use client";
import { SetupProps } from "@/lib/types";
import Code from "@/components/ai/code";
import ButtonRow from "@/components/ai/button-row";
import React from "react";

export default function SetupGuide({
  steps,
  overview,
  intro,
  title,
}: SetupProps) {
  return (
    <div className="space-y-6 font-sans">
      <section className="text-base">
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
                <Code
                  language={step.example.language}
                  codes={step.example.codes}
                />
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="text-base">
        <p>{overview}</p>
      </section>
      <ButtonRow />
    </div>
  );
}