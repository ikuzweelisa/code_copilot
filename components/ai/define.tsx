"use client";
import { DefineProps } from "@/lib/types";
import ButtonRow from "@/components/ai/button-row";
import React from "react";

export default function Define({ message, explanation }: DefineProps) {
  return (
    <div className="space-y-6 flex flex-col gap-4 font-sans">
      <section>
        <p>{explanation}</p>
      </section>
      <section>{message}</section>
      <ButtonRow />
    </div>
  );
}