import { google } from "@ai-sdk/google";
import { generateText, UIToolInvocation, tool } from "ai";
import { z } from "zod";

import { uploadImage } from "~/lib/server/helpers";

export const generateImageTool = tool({
  description: "Generate an image",
  inputSchema: z.object({
    prompt: z.string().min(1),
    maxImagesPerCall: z.number().default(1),
  }),
  async execute({ prompt, maxImagesPerCall }) {
    console.log("started generating image", prompt, maxImagesPerCall);
    const result = await generateText({
      model: google("gemini-2.5-flash-image"),
      prompt,
    });
    console.log("getting here", result);
    const files = result.files;
    const res = await uploadImage(files);
    console.log("res", res);
    return res;
  },
  toModelOutput: ({ output }) => ({
    type: "content",
    value: output
      .filter((f) => f !== null)
      .map((f) => ({
        type: "image-data",
        data: f.url,
        mediaType: f.mediaType ?? "",
      })),
  }),
});

export type GenerateImageUIToolInvocation = UIToolInvocation<typeof generateImageTool>;
