import { z } from 'zod/v3';
const fileSchema = z
  .instanceof(File, { message: "File is Required" })
  .refine((file) => file.type.startsWith("application/pdf"), {
    message: "Only PDF files supported.",
  });

const editChatSchema = z.object({
  chatId: z.string().min(10, {
    message: "Chat does not exist",
  }),
  title: z
    .string()
    .min(3, {
      message: "Chat title too small",
    })
    .max(40, {
      message: "Please use ashort title",
    }),
});

export { fileSchema, editChatSchema };
