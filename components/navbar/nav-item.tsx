"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageSquareText, Trash2 } from "lucide-react";
import AlertMessage from "@/components/auth/alert";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Chat } from "@/lib/types";
import { useFormState, useFormStatus } from "react-dom";
import { deleteChat } from "@/lib/actions/server";
import { ReloadIcon } from "@radix-ui/react-icons";
import { redirect, usePathname } from "next/navigation";
interface NavItemProps {
  chat: Chat;
}

export default function NavItem({ chat }: NavItemProps) {
  const [ishovered, setIshovered] = useState<boolean>(false);
  const [state, dispatch] = useFormState(deleteChat, undefined);
  const pathName = usePathname();
  if (state?.status === "success") {
    if (pathName.endsWith(chat.path)) {
      redirect("/");
    }
  }
  return (
    <div
      className="w-full flex gap-2 justify-start mb-2"
      onMouseEnter={() => setIshovered(true)}
      onMouseLeave={() => setIshovered(false)}
    >
      <Button asChild variant="ghost" className={"w-full flex-grow"}>
        <Link
          href={chat.path}
          className={`flex items-center justify-between  gap-2 ${
            pathName === chat.path ? "text-inherit" : " text-zinc-400 "
          } hover:text-inherit`}
        >
          <span className={"capitalize flex items-center gap-4"}>
          <MessageSquareText />
            {chat.title}
          </span>
        </Link>
      </Button>
      {ishovered ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"sm"} variant={"default"}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="flex flex-col justify-between">
              <DialogTitle>Confirmation</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                Are you you want to Delete Chat
                {state?.status && (
                  <AlertMessage message={state.message} status={state.status} />
                )}
              </div>
            </div>
            <DialogFooter>
              <div className={"flex gap-2 justify-center"}>
                <DialogClose asChild>
                  <Button variant={"default"}>No</Button>
                </DialogClose>
                <form action={dispatch}>
                  <input type={"hidden"} name={"id"} value={chat.id} />
                  <Submit />
                </form>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        ""
      )}
    </div>
  );
}
function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type={"submit"} variant={"destructive"}>
      {pending && <ReloadIcon />}
      {pending ? "deleting.." : "remove"}{" "}
    </Button>
  );
}
