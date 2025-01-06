import { Attachment } from "ai";
import { FileIcon } from "lucide-react";
import Image from "next/image";

export default function ViewAttachment({
  attachment,
}: {
  attachment: Attachment;
}) {
  return (
    <div className="relative p-0 flex items-center gap-1  w-full max-md rounded-md">
      {attachment.contentType?.startsWith("image/") ? (
        <Image
          src={attachment.url}
          fill
          alt={attachment.name || "file"}
          className="object-contain"
        />
      ) : (
        <div className="flex items-center gap-1">
          <FileIcon className="h-9 w-9  text-blue-500" /> {attachment.name}
        </div>
      )}
    </div>
  );
}
