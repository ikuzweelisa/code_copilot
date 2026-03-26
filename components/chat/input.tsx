import { SquareIcon } from "@radix-ui/react-icons";
import type { FileUIPart } from "ai";
import { Globe, GlobeLockIcon, Paperclip, Send, TriangleAlert } from "lucide-react";
import React, { ChangeEvent, ClipboardEventHandler, useEffect, useRef, useTransition } from "react";
import Textarea from "react-textarea-autosize";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { deleteAttachment } from "~/lib/server/actions";
import { useUploadThing } from "~/lib/uploadthing";
import { sleep } from "~/lib/utils";

import { AttachmentPreview, Loading } from "./attachment-preview";
import { ModelSelector } from "./model-select";

interface InputFieldProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  input: string;
  isLoading: boolean;
  stop: () => void;
  setAttachments: React.Dispatch<React.SetStateAction<FileUIPart[]>>;
  setOPtimisticAttachments: React.Dispatch<React.SetStateAction<FileUIPart[]>>;
  optimisticAttachments: Array<FileUIPart & { isUploading?: boolean }>;
  search: boolean;
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
}
function InputField({
  handleChange,
  handleSubmit,
  input,
  isLoading,
  stop,
  setAttachments,
  setOPtimisticAttachments,
  optimisticAttachments,
  search,
  setSearch,
}: InputFieldProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const attachementRef = useRef<HTMLInputElement | null>(null);
  const [_isPending, startTransition] = useTransition();

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.currentTarget.form?.requestSubmit();
      e.preventDefault();
    }
  }
  // auto focus
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const { startUpload } = useUploadThing("imageUploader", {
    onUploadError: (_error) => {
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
            url: file.ufsUrl,
            contentType: file.type,
            filename: file.name,
            type: "file",
            mediaType: file.type,
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
      return current.filter((a) => a.filename !== key);
    });
  }
  function handleOnClick() {
    if (!attachementRef.current) return;
    attachementRef.current?.click();
  }
  const handlePaste: ClipboardEventHandler<HTMLTextAreaElement> = (event) => {
    const items = event.clipboardData?.items;

    if (!items) {
      return;
    }

    const files: File[] = [];

    for (const item of items) {
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (file) {
          files.push(file);
        }
      }
    }
    if (files.length > 0) {
      event.preventDefault();
      startTransition(async () => {
        files.forEach((file) => {
          setOPtimisticAttachments((prev) => [
            ...prev,
            {
              filename: file.name,
              contentType: file.type,
              url: URL.createObjectURL(file),
              isUploading: true,
              key: file.name,
              type: "file",
              mediaType: file.type,
            },
          ]);
        });
        await sleep(2000);
        await startUpload(files);
      });
    }
  };
  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files) return;
    startTransition(async () => {
      files.forEach((file) => {
        setOPtimisticAttachments((prev) => [
          ...prev,
          {
            filename: file.name,
            contentType: file.type,
            url: URL.createObjectURL(file),
            isUploading: true,
            key: file.name,
            type: "file",
            mediaType: file.type,
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
      onSubmit={handleSubmit}
      className="relative flex w-full flex-col gap-2 rounded-3xl border border-input bg-card px-3 py-3 shadow-sm transition-all focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20"
    >
      {optimisticAttachments.length > 0 && (
        <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto px-2 pb-2">
          {optimisticAttachments.map((a, index) => (
            <div key={index} className="shrink-0">
              {a.isUploading ? (
                <Loading key={index} file={a} />
              ) : (
                <AttachmentPreview file={a} key={index} handleRemove={removeAttachement} />
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Textarea
          onPaste={handlePaste}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message..."
          className="max-h-50 min-h-11 w-full resize-none bg-transparent px-2 py-2 text-base outline-none placeholder:text-muted-foreground focus-within:outline-hidden"
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

        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div>
              <input
                ref={attachementRef}
                type={"file"}
                name={"file"}
                accept="text/*,image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleOnClick}
                className="size-8 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                title="Attach file"
              >
                <Paperclip size={18} />
                <span className="sr-only">Attachment</span>
              </Button>
            </div>

            <Button
              variant={search ? "secondary" : "ghost"}
              size="icon"
              type="button"
              onClick={() => setSearch(!search)}
              className={
                search
                  ? "size-8 rounded-full bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 dark:text-blue-400"
                  : "size-8 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              }
              title="Toggle search"
            >
              {search ? <Globe size={18} /> : <GlobeLockIcon size={18} />}
              <span className="sr-only">Search</span>
            </Button>

            <div className="mx-1 h-5 w-px bg-border/50" />

            <ModelSelector />
          </div>

          <div className="flex items-center">
            {isLoading ? (
              <Button size={"icon"} variant={"destructive"} onClick={stop}>
                <SquareIcon className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="default"
                disabled={input.trim() === ""}
                type="submit"
                size="icon"
                className="size-8 rounded-full shadow-sm transition-all"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default InputField;
