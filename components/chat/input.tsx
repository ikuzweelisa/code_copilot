import { Button } from "~/components/ui/button";
import Textarea from "react-textarea-autosize";
import {
  CloudUpload,
  MoveUp,
  Paperclip,
  TriangleAlert,
  Send,
} from "lucide-react";
import React, { ChangeEvent, useRef, useTransition, useState } from "react";
import { cn, sleep } from "~/lib/utils";
import { LoadingButton } from "~/components/ai/spinner-message";
import AttachmentPreview, {
  Loading,
} from "~/components/chat/attachment-preview";
import { Attachment, ChatRequestOptions } from "ai";
import { useUploadThing } from "~/lib/uploadthing";
import { toast } from "sonner";
import { deleteAttachment } from "~/lib/server/actions";
import { Separator } from "../ui/separator";
import { ModelSelector } from "./model-select";
import { Model } from "~/lib/ai/models";

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
  selectedModel: Model;
  setSelectedModel: React.Dispatch<React.SetStateAction<Model>>;
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
  selectedModel,
  setSelectedModel,
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
      await sleep(2000);
      await startUpload(files);
    });
    setAttachments([]);
  }
  return (
    <form
      onSubmit={(e) => {
        setAttachments([]);
        handleSubmit(e, {
          experimental_attachments: attachements,
        });
      }}
      className="flex flex-col bg-card border focus-within:ring-2 focus-within:ring-primary w-full rounded-lg gap-0"
    >
      {optimisticAttachments.length > 0 && (
        <>
          <div className="p-2 ">
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
          <Separator />
        </>
      )}

      <div className="flex items-center p-3 relative">
        <div className="flex-grow">
          <Textarea
            tabIndex={0}
            onKeyDown={onKeyDown}
            placeholder="Send a message..."
            className="min-h-10 max-h-32 w-full resize-none bg-transparent px-3 py-2 focus-within:outline-none text-base"
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
        </div>

        <div className="flex items-center gap-2 px-2">
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
              className="size-8 p-0"
            >
              <Paperclip size={20} />
              <span className="sr-only">Attachment</span>
            </Button>
          </div>

          <div className="flex items-center">
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
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center border-t border-border px-3 py-1.5">
        <ModelSelector
          selectedModel={selectedModel}
          onModelSelect={setSelectedModel}
        />
      </div>
    </form>
  );
}

export default InputField;
