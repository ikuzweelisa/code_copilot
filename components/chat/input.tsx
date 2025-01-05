import { Button } from "~/components/ui/button";
import Textarea from "react-textarea-autosize";
import { MoveUp, Paperclip, TriangleAlert } from "lucide-react";
import React, { ChangeEvent, useRef } from "react";
import { cn } from "~/lib/utils";
import { LoadingButton } from "~/components/ai/spinner-message";
import AttachmentPreview from "~/components/chat/attachment-preview";
import { Attachment, ChatRequestOptions } from "ai";
import { useUploadThing } from "~/lib/uploadthing";
import { toast } from "sonner";
import { deleteAttachment } from "~/lib/actions/actions";

interface InputFieldProps {
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  input: string;
  isLoading: boolean;
  stop: () => void;
  attachements: Attachment[];
  setAttachments: React.Dispatch<React.SetStateAction<Attachment[]>>;
}
function InputField({
  handleChange,
  handleSubmit,
  input,
  isLoading,
  stop,
  attachements,
  setAttachments,
}: InputFieldProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const attachementRef = useRef<HTMLInputElement | null>(null);
  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.currentTarget.form?.requestSubmit();
      e.preventDefault();
    }
  }

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadError: (error) => {
      toast("Error", {
        description: error.message,
        icon: <TriangleAlert />,
        position: "top-center",
        action: {
          label: "Retry",
          onClick: () => handleOnClick(),
        },
      });
    },
    onClientUploadComplete: (files) => {
      files.forEach((file) => {
        setAttachments((prev) => [
          ...prev,
          {
            url: file.url,
            contentType: file.type,
            name: file.name,
          },
        ]);
      });
    },
  });
  function removeAttachement(name: string | undefined) {
    if (!name) return;
    setAttachments((current) => {
      const filtered = current.filter((a) => a.name !== name);
      return filtered;
    });
    deleteAttachment(name);
  }
  function handleOnClick() {
    if (!attachementRef.current) return;
    attachementRef.current?.click();
  }
  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files) return;

    await startUpload(files);
  }
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e, {
          experimental_attachments: attachements,
        });
      }}
      className="flex flex-col w-full rounded-lg gap-0"
    >
      {/* {attachements.length > 0 && ( */}
      <div className="p-3 bg-black/90 ">
        <div className="flex items-center gap-2">
          {attachements.map((a) => (
            <AttachmentPreview
              handleRemove={removeAttachement}
              attachment={a}
              isUploading={isUploading}
            />
          ))}
        </div>
      </div>
      {/* )} */}
      <div
        className={cn(
          "relative flex items-center bg-card   border dark:border-0 p-0"
        )}
      >
        <div>
          <input
            ref={attachementRef}
            type={"file"}
            name={"file"}
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={handleOnClick}
            className="absolute left-0 top-3 size-8  p-0 sm:left-4"
          >
            <Paperclip size={20} />
            {attachements.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {1}
              </div>
            )}
            <span className="sr-only">Attachment</span>
          </Button>
        </div>
        <Textarea
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Enter a message."
          className="min-h-10 max-h-28 sm:min-h-12 md:min-h-16 lg:min-h-20  w-full resize-none bg-transparent px-12 py-4  focus-within:outline-none text-base"
          autoFocus
          spellCheck={false}
          ref={inputRef}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={1}
          onChange={handleChange}
          value={input}
        />
        <div className="absolute right-0 top-[13px] sm:right-4 px-2">
          {isLoading ? (
            <LoadingButton stop={stop} />
          ) : (
            <Button
              variant={"default"}
              disabled={input.trim() === ""}
              type="submit"
              size="icon"
              className="rounded-full"
            >
              <MoveUp className="h-3 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}

export default InputField;
