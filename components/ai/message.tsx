import { Attachment } from "@/lib/types";
import { FileText } from "lucide-react";

interface MessageProps {
  text: string;
  attachment?: Attachment | undefined;
}
export default function MessageText({ attachment, text }: MessageProps) {
  return (
    <span className=" flex flex-col gap-2">
      {attachment && (
        <span className="flex gap-2 items-center">
          <FileText className="h-5 w-5 text-blue-500" />
          <span>{attachment.name}</span>
        </span>
      )}
      <div className="flex-1 flex-col">{text}</div>
    </span>
  );
}
