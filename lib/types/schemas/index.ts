import { z } from "zod";

const setupGuideSchema = z.object({
  intro: z.string().describe("small description"),
  title: z.string().describe("A small title for the steps"),
  steps: z
    .array(
      z.object({
        step: z.object({
          name: z.string().describe("steps name"),
          description: z.string().describe("small description on the step"),
          example: z
            .object({
              language: z
                .string()
                .describe("language the example code is written in"),
              codes: z.string().describe("code example for the step"),
            })
            .optional()
            .describe("Example code"),
        }),
      }),
    )
    .describe("All steps involved"),
  overview: z.string().optional().describe("overview summary"),
});
const codeAnalyzerSchema = z.object({
  message: z.string().describe("A small message about the codes"),
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
    .describe("Key concepts in the given codes"),
  improvedCode: z.object({
    message: z
      .string()
      .describe(
        "small message like saying this is improved version of your codes",
      ),
    code: z.string().optional().describe("Improved codes"),
  }),
  improvedKeyConcepts: z.object({
    concepts: z
      .array(
        z.object({
          name: z.string().describe("key concept name"),
          description: z
            .string()
            .describe("A small description of key concept"),
        }),
      )
      .describe("Key concepts in the improved codes"),
    message: z.string().describe("A small Explanation  of improvements made"),
  }),
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

const uuidGenSchema = z.object({
  message: z
    .string()
    .describe("a message to tell the user"),
  uuid: z.string().describe("the generated uuid"),
});
export { tableSchema, codeAnalyzerSchema, setupGuideSchema, uuidGenSchema };
