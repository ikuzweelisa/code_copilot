import { Attachment } from "ai";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import Spinner from "~/components/ai/spinner";
import { Button } from "~/components/ui/button";
export default function AttachmentPreview({
  attachment,
  isUploading,
  handleRemove,
}: {
  attachment: Attachment;
  isUploading: boolean;
  handleRemove: (name: string | undefined) => void;
}) {
  return (
    <div className="relative p-1 w-full max-w-[10rem] flex gap-0.5 bg-muted/50 rounded-lg">
      {isUploading ? (
        <Loading />
      ) : attachment.contentType?.startsWith("image/") ? (
        <Image
          src={attachment.url}
          width={40}
          height={4}
          alt={attachment.name ?? "attachment"}
        />
      ) : (
        <FileIcon className="h-8 w-6 text-muted-foreground" />
      )}

      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-muted-foreground">
          {attachment.name?.length || 0 > 20
            ? attachment.name?.slice(0, 20) + "..."
            : attachment.name}
        </span>
        <span className="text-xs text-muted-foreground">
          {attachment.contentType}
        </span>
      </div>
      <div className="flex absolute top-0 right-0">
        <Button
          onClick={() => handleRemove(attachment.name)}
          variant={"ghost"}
          size={"icon"}
          className="p-0  outline-none "
        >
          <X className="h-0.5 w-0.5 bg-primary rounded-full  text-primary-foreground" />
        </Button>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="w-12 h-3 pt-0.5 px-0 mx-0 border rounded-lg">
      <Spinner />
    </div>
  );
}
