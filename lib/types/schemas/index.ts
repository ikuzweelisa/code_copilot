import { z } from "zod";

const setupGuideSchema = z.object({
  intro: z.string().describe("A brief introduction or summary of the guide"),
  title: z.string().describe("The title summarizing the setup steps"),
  steps: z
    .array(
      z.object({
        step: z.object({
          name: z.string().describe("The name of the step"),
          description: z.string().describe("A brief explanation of the step"),
          example: z
            .object({
              language: z
                .string()
                .describe("The programming language used in the code example"),
              codes: z.string().describe("Code snippet for the step"),
            })
            .optional()
            .describe("An optional example code for the step"),
        }),
      })
    )
    .describe("An array detailing the steps involved in the setup"),
  overview: z
    .string()
    .optional()
    .describe("An optional overall summary of the guide"),
});
const codeAnalyzerSchema = z.object({
  message: z.string().describe("A message explaining the code analysis"),
  language: z
    .string()
    .describe("The programming language the code is written in"),
  keyConcepts: z
    .array(
      z.object({
        name: z.string().describe("Name of the key concept"),
        description: z
          .string()
          .describe("A brief description of the key concept"),
      })
    )
    .describe("Important concepts present in the code"),
  improvedCode: z.object({
    message: z.string().describe("A message about the improved code"),
    code: z.string().optional().describe("The improved version of the code"),
  }),
  improvedKeyConcepts: z.object({
    concepts: z
      .array(
        z.object({
          name: z.string().describe("Name of the improved concept"),
          description: z
            .string()
            .describe("Explanation of the improved concept"),
        })
      )
      .describe("Important concepts in the improved code"),
    message: z
      .string()
      .describe("Explanation of the changes made to improve the code"),
  }).optional().describe("explanation of improved code"),
});
const tableSchema = z.object({
  message: z
    .string()
    .describe("A message to inform the user about the comparison"),
  title: z.string().describe("The title summarizing the items being compared"),
  itemNames: z
    .array(z.string().describe("Names of the items being compared"))
    .describe("An array containing the names of items to compare"),
  comparison: z
    .array(
      z.object({
        feature: z
          .string()
          .describe("A specific feature to compare across items"),
        items: z
          .array(z.string().describe("How each item relates to the feature"))
          .describe(
            "Values or properties of each item with respect to the feature"
          ),
      })
    )
    .describe("A comparison of the items based on their features"),
  overview: z.string().describe("A brief overview of the comparison"),
});
const uuidGenSchema = z.object({
  message: z.string().describe("A message accompanying the generated UUID"),
  uuid: z.string().describe("The generated UUID"),
});

const debuggerSchema = z.object({
  error: z.string().describe("The error encountered in the given code"),
  correctCode: z.string().describe("The correct version of the code"),
  updated: z.object({
    language: z
      .string()
      .describe("The programming language of the corrected code"),
    title: z.string().describe("The title for the corrected code version"),
    concepts: z
      .array(
        z.object({
          name: z
            .string()
            .describe("Name of the key concept in the updated code"),
          description: z.string().describe("Description of the key concept"),
        })
      )
      .describe("Key concepts in the corrected code"),
    message: z.string().describe("Explanation of the improvements made"),
  }),
});
const codeExampleSchema = z.object({
  message: z
    .string()
    .describe("A message providing context about the code example"),
  example: z
    .object({
      language: z
        .string()
        .describe("The programming language used in the code example"),
      codes: z.string().describe("The actual code example"),
      title: z.string().describe("A title summarizing the code example"),
    })
    .describe("Details of the code example"),
  concepts: z
    .array(
      z.object({
        name: z
          .string()
          .describe("Name of the key concept demonstrated in the example"),
        description: z
          .string()
          .describe("Explanation of the key concept in the example"),
      })
    )
    .describe("Key concepts illustrated by the example code"),
});
const topicSchema = z.object({
  introduction: z.string().describe("A detailed introduction to the topic"),
  keyConcepts: z
    .array(
      z.object({
        name: z.string().describe("Name of the key concept within the topic"),
        description: z.string().describe("Description of the key concept"),
      })
    )
    .describe("Key concepts involved in the topic"),
  example: z.object({
    language: z
      .string()
      .optional()
      .describe("The programming language used in the example"),
    codes: z.string().describe("The example code for the topic"),
    title: z.string().describe("A title summarizing the code example"),
  }),
  overview: z.string().describe("A summary or conclusion about the topic"),
});
const defineSchema = z.object({
  explanation: z.string().describe("A detailed explanation of the concept"),
  message: z
    .string()
    .describe("A follow-up message asking if the user wants more information"),
});

const conceptsSchema = z
  .object({
    name: z.string().describe("The name of the key concept"),
    description: z.string().describe("A brief description of the key concept"),
  })
  .describe("Schema defining key concepts for a topic");

export {
  tableSchema,
  codeAnalyzerSchema,
  setupGuideSchema,
  uuidGenSchema,
  debuggerSchema,
  codeExampleSchema,
  topicSchema,
  defineSchema,
  conceptsSchema,
};
