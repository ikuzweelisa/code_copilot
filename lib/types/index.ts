import { z } from "zod";
import React from "react";
import { CoreMessage } from "ai";
export type Message = CoreMessage & {
  id: string;
};
type Role = "user" | "assistant";
export type ClientMessage = {
  id: string;
  role: Role;
  display: React.ReactNode;
};

export type ServerMessage = {
  role: Role;
  content: string;
};
const codeAnalyzerSchema = z.object({
  language: z
    .string()
    .describe("the programing language the code is written in"),
  keyConcepts: z
    .array(
      z.object({
        name: z.string().describe("key concept name"),
        description: z.string().describe("A small description of key concept"),
      }),
    )
    .describe("Key concepts in the given code snippet"),
  improvedCodeSnippet: z
    .string()
    .optional()
    .describe("Improved code Snippet with some comments optionally"),
  improvedKeyConcepts: z
    .array(
      z.object({
        name: z.string().describe("key concept name"),
        description: z.string().describe("A small description of key concept"),
      }),
    )
    .describe("Key concepts in the improved code snippet"),
});
const tableSchema = z.object({
  message: z
    .string()
    .describe("A message to tell the user you are going to do it "),
  title: z.string().describe("A  title for the items to compare or contrast"),
  itemNames: z
    .array(z.string().describe("The names of the items being analyzed"))
    .describe("An array listing the items to compare"),

  comparison: z
    .array(
      z.object({
        feature: z
          .string()
          .describe(
            "A distinguishing feature or characteristic for comparison",
          ),

        items: z
          .array(
            z
              .string()
              .describe(
                "The behavior, property, or value of each item regarding this feature",
              ),
          )
          .describe(
            "An array representing how each item exhibits the specified feature",
          ),
      }),
    )
    .describe(
      "A detailed comparison of the items based on their distinguishing features",
    ),
  overview: z.string().describe("A small overview summary"),
});
export type CodeAnalyzerProps = z.infer<typeof codeAnalyzerSchema>;
export type TableProps = z.infer<typeof tableSchema>;

export { tableSchema, codeAnalyzerSchema };
