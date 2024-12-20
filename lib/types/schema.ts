import { z } from "zod";
const fileSchema = z
  .instanceof(File, { message: "File is Required" })
  .refine((file) => file.type.startsWith("application/pdf"), {
    message: "Only PDF files supported.",
  });

export { fileSchema };
