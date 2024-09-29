"use client"
import { UuidGenProps } from "@/lib/types";
import Code from "@/components/ai/code";
import ButtonRow from "@/components/ai/button-row";
import React from "react";

export default function UuidGenerator({ uuid, message }: UuidGenProps) {
  return (
    <div className={"flex flex-col gap-3"}>
      <span className="mb-2">{message}</span>
      <Code language="shell" codes={uuid} />
      <ButtonRow />
    </div>
  );
}