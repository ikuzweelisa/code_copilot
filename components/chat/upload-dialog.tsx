import {
    PopoverTrigger,
    Popover,
    PopoverContent,
  } from "@/components/ui/popover";
  import { AlertCircle, FileText, Paperclip, Plus, X } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Attachment } from "@prisma/client";
  import { ChangeEvent, useRef } from "react";
  import { toast } from "sonner";
  import { saveFile } from "@/lib/actions/server";
  
  interface UploadDialogProps {
    attachment: Attachment | undefined;
    setAttachment: React.Dispatch<React.SetStateAction<Attachment | undefined>>;
    chatId: string;
  }
  export default function UploadDialog({
    attachment,
    setAttachment,
    chatId,
  }: UploadDialogProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
  
    function handleOnClick() {
      if (!inputRef.current) return;
      inputRef.current?.click();
    }
    async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
      if (!e.target.files) return;
      const file = e.target.files?.[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("chatId", chatId);
      const status = await saveFile(formData);
      if (status.error) {
        toast("Error", {
          description: status.error,
          duration: 4000,
          icon: <AlertCircle />,
          action: {
            label: "Retry",
            onClick: () => handleOnClick(),
          },
        });
        e.target.value = "";
        return;
      }
      if (!status.attachment) return;
  
      const { name, path, type ,id} = status.attachment;
      setAttachment({
        id,
        name,
        path,
        type,
        chatId:chatId,
        createdAt: new Date()
      });
      e.target.value = "";
    }
    return (
      <div>
        <input
          ref={inputRef}
          type={"file"}
          name={"file"}
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
  
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              className="absolute left-0 top-[14px] size-8 bg-background p-0 sm:left-4"
            >
              <Paperclip size={17} />
              {attachment && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {1}
                </div>
              )}
              <span className="sr-only">Attachment</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 rounded-md">
            <div className="space-y-1">
              {attachment ? (
                <div className="flex items-center justify-between rounded-md border p-2">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">{attachment.name}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : null}
  
              <Button
                onClick={handleOnClick}
                variant="outline"
                className="w-full mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Attachment
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }