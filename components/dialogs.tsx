import {
  AlertCircle,
  Archive,
  ArchiveRestore,
  Check,
  Copy,
  Edit3,
  ExternalLink,
  LinkIcon,
  Loader2,
  Pin,
  PinOff,
  Save,
  Share2,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Chat } from "~/lib/ai/types";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { trpc, useTRPC } from "~/lib/backend/trpc/client";
import { useClipBoard } from "~/lib/hooks";
interface Props {
  chat: Chat;
  onSuccess?: () => void;
}

export function PinAction({ chat, onSuccess }: Props) {
  const utils = useTRPC();
  const { mutate, isPending } = trpc.chat.updateStatus.useMutation({
    onSuccess: () => {
      utils.chat.getUserChats.invalidate();
      onSuccess?.();
    },
  });

  return (
    <Button
      variant="ghost"
      className="w-full justify-start"
      disabled={isPending}
      onClick={() =>
        mutate({
          id: chat.id,
          status: chat.status === "PINNED" ? "DEFAULT" : "PINNED",
        })
      }
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : chat.status === "PINNED" ? (
        <PinOff className="h-4 w-4" />
      ) : (
        <Pin className="h-4 w-4" />
      )}
      {chat.status === "PINNED" ? "Unpin" : "Pin"}
    </Button>
  );
}
export function OpenNewTab({ chat }: Props) {
  return (
    <Button variant="ghost" asChild>
      <Link href={`/chat/${chat.id}`} target="_blank">
        <ExternalLink className="h-4 w-4" />
        Open in New Tab
      </Link>
    </Button>
  );
}

export function ArchiveAction({ chat, onSuccess }: Props) {
  const utils = useTRPC();
  const { mutate, isPending } = trpc.chat.updateStatus.useMutation({
    onSuccess: () => {
      utils.chat.getUserChats.invalidate();
      onSuccess?.();
    },
  });

  return (
    <Button
      variant="ghost"
      className="w-full justify-start"
      disabled={isPending}
      onClick={() =>
        mutate({
          id: chat.id,
          status: chat.status === "ARCHIVED" ? "DEFAULT" : "ARCHIVED",
        })
      }
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : chat.status === "ARCHIVED" ? (
        <ArchiveRestore className="h-4 w-4" />
      ) : (
        <Archive className="h-4 w-4" />
      )}
      {chat.status === "ARCHIVED" ? "Unarchive" : "Archive"}
    </Button>
  );
}

export function DeleteDialog({ chat, onSuccess }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { mutate, isPending, isSuccess, isError } = trpc.chat.deleteChat.useMutation();

  useEffect(() => {
    if (isSuccess) {
      if (pathname.includes(chat.id)) {
        router.push("/");
      }
      onSuccess?.();
    }
  }, [isSuccess, pathname, chat.id, router, onSuccess]);
  useEffect(() => {
    if (isError) {
      toast.error("Failed to delete chat");
    }
  }, [isError]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:bg-red-100 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this chat? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={() => mutate({ id: chat.id })}
            variant="destructive"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function RenameDialog({ chat, onSuccess }: Props) {
  const [title, setTitle] = useState(chat.title ?? "");
  const { mutate, isPending, isSuccess } = trpc.chat.updateTitle.useMutation();
  useEffect(() => {
    if (isSuccess) {
      onSuccess?.();
    }
  }, [isSuccess, onSuccess]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <Edit3 className="h-4 w-4" />
          Rename
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Rename Chat
          </DialogTitle>
          <DialogDescription>Enter a new name for your chat.</DialogDescription>
        </DialogHeader>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          placeholder="New chat name"
        />
        <input type="hidden" name="chatId" value={chat.id} className="hidden" />

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button
            disabled={isPending || title === chat.title || !title.trim()}
            onClick={() => mutate({ id: chat.id, title: title })}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ShareDialog({ chat }: Props) {
  const [isCopied, copyText] = useClipBoard();
  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/chat/${chat.id}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <Share2 className="h-4 w-4 " />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            Share Chat
          </DialogTitle>
          <DialogDescription>Copy the link below to share this chat with others.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input value={link} readOnly className="flex-1" />
          <Button onClick={() => copyText(link)} className="shrink-0">
            {isCopied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
