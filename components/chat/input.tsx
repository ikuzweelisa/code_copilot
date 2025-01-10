import { Button } from "~/components/ui/button";
import Textarea from "react-textarea-autosize";
import { MoveUp, Paperclip, TriangleAlert } from "lucide-react";
import React, { ChangeEvent, useRef, useTransition } from "react";
import { cn } from "~/lib/utils";
import { LoadingButton } from "~/components/ai/spinner-message";
import AttachmentPreview, {
  Loading,
} from "~/components/chat/attachment-preview";
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
  setOPtimisticAttachments: React.Dispatch<React.SetStateAction<Attachment[]>>;
  optimisticAttachments: Array<Attachment & { isUploading?: boolean }>;
}
function InputField({
  handleChange,
  handleSubmit,
  input,
  isLoading,
  stop,
  attachements,
  setAttachments,
  setOPtimisticAttachments,
  optimisticAttachments,
}: InputFieldProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const attachementRef = useRef<HTMLInputElement | null>(null);
  const [isPending, startTransition] = useTransition();
  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.currentTarget.form?.requestSubmit();
      e.preventDefault();
    }
  }

  const { startUpload } = useUploadThing("imageUploader", {
    onUploadError: (error) => {
      toast.error("Error", {
        description: "Attachment upload failed",
        icon: <TriangleAlert />,
        position: "top-center",
        action: {
          label: "Retry",
          onClick: () => handleOnClick(),
        },
      });
      console.log(error);
    },
    onClientUploadComplete: (files) => {
      files.forEach((file) => {
        setAttachments((prev) => [
          ...prev,
          {
            url: file.url,
            contentType: file.type,
            name: file.name,
            key: file.name,
          },
        ]);
      });
    },
  });
  async function removeAttachement(key: string | undefined) {
    if (!key) return;
    const deleted = await deleteAttachment(key);
    if (!deleted) return;
    setAttachments((current) => {
      return current.filter((a) => a.key !== key);
    });
  }
  function handleOnClick() {
    if (!attachementRef.current) return;
    attachementRef.current?.click();
  }
  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files) return;
    startTransition(async () => {
      files.forEach((file) => {
        setOPtimisticAttachments((prev) => [
          ...prev,
          {
            name: file.name,
            contentType: file.type,
            url: URL.createObjectURL(file),
            isUploading: true,
            key: file.name,
          },
        ]);
      });
      await startUpload(files);
    });
  }
  return (
    <form
      onSubmit={(e) => {
        setAttachments([]);
        handleSubmit(e, {
          experimental_attachments: attachements,
        });
      }}
      className="flex flex-col w-full rounded-lg gap-0"
    >
      {optimisticAttachments.length > 0 && (
        <div className="p-2 bg-black/90 ">
          <div className="flex items-center gap-2">
            {optimisticAttachments.map((a, index) => (
              <div key={index}>
                {a.isUploading ? (
                  <Loading key={index} attachment={a} />
                ) : (
                  <AttachmentPreview
                    attachment={a}
                    key={index}
                    handleRemove={removeAttachement}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
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
            accept="text/*"
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
            <span className="sr-only">Attachment</span>
          </Button>
        </div>
        <Textarea
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Enter a message..."
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
