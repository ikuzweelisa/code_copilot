import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getSession } from "~/lib/auth";
import { ratelimit } from "~/lib/server/helpers";
const f = createUploadthing({
  errorFormatter: (error) => {
    throw new UploadThingError(error.message);
  },
});
const auth = async (req: Request) => {
  const session = await getSession();
  return session;
};

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 3,
    },
    text: {
      maxFileSize: "2MB",
      maxFileCount: 3,
    },
  })
    .middleware(async ({ req }) => {
      const session = await auth(req);
      const userId = session?.user?.id;
      if (!userId)
        throw new UploadThingError("Please login to upload attachments.");
      const { success } = await ratelimit.limit(userId);
      if (!success) {
        throw new UploadThingError("rate limited");
      }
      return { userId: userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
