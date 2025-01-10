import { Attachment } from "ai";
import { FileIcon, X, Loader2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export default function AttachmentPreview({
  attachment,
  handleRemove,
}: {
  attachment: Attachment & { isUploading?: boolean };

  handleRemove: (key: string | undefined) => Promise<void>;
}) {
  const isImage = attachment.contentType?.startsWith("image/");

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="group rounded-md relative w-full max-w-[12rem] transition-all duration-300 ease-in-out hover:shadow-md">
            <CardContent className="p-1 flex items-center gap-2">
              {isImage ? (
                <div className="relative w-12 h-12 rounded-sm overflow-hidden">
                  <img
                    src={attachment.url}
                    alt={attachment.name ?? "attachment"}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-12 h-12 bg-muted rounded-md">
                  <FileIcon className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {attachment.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {isImage ? "Image" : attachment.contentType}
                </p>
              </div>
              <Button
                onClick={async () => await handleRemove(attachment.key)}
                variant="ghost"
                size="icon"
                className={`absolute top-1 right-1 h-6 w-6 p-0 transition-opacity duration-300 group-hover:opacity-100  opacity-0`}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>{attachment.name}</p>
          <p>{attachment.contentType}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function Loading({ attachment }: { attachment: Attachment }) {
  return (
    <Card className="group rounded-md relative w-full max-w-[12rem] transition-all duration-300 ease-in-out hover:shadow-md">
      <CardContent className="p-1 flex items-center gap-2">
        <div className="flex items-center justify-center w-full h-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{attachment.name}</p>
          <p className="text-xs text-muted-foreground truncate">
            {attachment.contentType}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
