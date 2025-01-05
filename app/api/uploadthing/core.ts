import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth as authUser } from "~/app/auth";
const f = createUploadthing();
const auth = (req: Request) => {
  const user = authUser();
  return user;
};

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 3,
    },
    text: {
      maxFileSize: "1MB",
      maxFileCount: 3,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user)
        throw new UploadThingError("Please log in to upload attachments.");
      return { userId: user.user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
