import { Attachment } from "@/lib/drizzle";
import { FileText } from "lucide-react";

interface MessageProps {
  text: string | undefined;
  attachment?: Attachment | undefined;
}
export default function MessageText({ attachment, text }: MessageProps) {
  return (
    <div className=" flex flex-col gap-2">
      {attachment && (
        <div className="flex gap-2 items-center">
          <FileText className="h-5 w-5 text-blue-500" />
          <div>{attachment.name}</div>
        </div>
      )}
      <div className="ml-4 flex-1 flex-col text-xs md:text-sm lg:text-base">
        {text}
      </div>
    </div>
  );
}
