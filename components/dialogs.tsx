import React from "react";
import { useActionState } from "react";
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
import { Chat } from "~/lib/drizzle";

interface Props {
  chat: Chat;
}

export function DeleteDialog({ chat }: Props) {
  const [state, action, isPending] = useActionState(deleteChat, undefined);

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
        <form action={action}>
          <input type="hidden" name="chatId" value={chat.id} />
          {state && <AlertMessage {...state} />}
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" variant="destructive" disabled={isPending}>
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
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function RenameDialog({ chat }: Props) {
  const [state, action, isPending] = useActionState(editChat, undefined);

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
        <form action={action} className="space-y-4">
          <Input
            type="text"
            defaultValue={chat.title}
            name="title"
            placeholder="New chat name"
          />
          <input
            type="hidden"
            name="chatId"
            value={chat.id}
            className="hidden"
          />
          {state && <AlertMessage {...state} />}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isPending}>
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
        </form>
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
