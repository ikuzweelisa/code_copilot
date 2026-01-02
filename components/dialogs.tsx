import { useActionState, useEffect, useState } from "react";
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
import { deleteChat, editChat } from "~/lib/server/actions";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useClipBoard } from "~/lib/hooks";
import {
  AlertCircle,
  Check,
  Copy,
  Edit3,
  Link,
  Loader2,
  Save,
  Share2,
  Trash2,
} from "lucide-react";
import AlertMessage from "~/components/auth/alert";
import type { Chat } from "~/lib/drizzle";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  chat: Chat;
  onSuccess?: () => void;
}

export function DeleteDialog({ chat, onSuccess }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/chats/${chat.id}`, { method: "DELETE" });
      return res.json();
    },
    onSuccess: () => {
      if (pathname.includes(chat.id)) {
        router.replace("/");
      }
      onSuccess?.();
    },
    onError: () => {
      toast.error("Failed to delete chat");
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this chat? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={() => mutate()}
            variant="destructive"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
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
  const [title, setTitle] = useState(chat.title);
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/chats/${chat.id}`, {
        method: "PATCH",
        body: JSON.stringify({ title }),
      });
      return res.json();
    },
    onSuccess: () => {
      onSuccess?.();
    },
    onError: () => {
      toast.error("Failed to rename chat");
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <Edit3 className="w-4 h-4 mr-2" />
          Rename
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="w-5 h-5" />
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
            onClick={() => mutate()}
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
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
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link className="w-5 h-5" />
            Share Chat
          </DialogTitle>
          <DialogDescription>
            Copy the link below to share this chat with others.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input value={link} readOnly className="flex-1" />
          <Button onClick={() => copyText(link)} className="shrink-0">
            {isCopied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
