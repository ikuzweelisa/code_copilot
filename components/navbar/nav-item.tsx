"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageCircleCode, Trash2 } from "lucide-react";
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

interface NavItemProps {
  chat: Chat;
}

export default function NavItem({ chat }: NavItemProps) {
  const [ishovered, setIshovered] = useState<boolean>(false);
  return (
    <div
      className="w-full flex justify-start mb-2"
      onMouseEnter={() => setIshovered(true)}
      onMouseLeave={() => setIshovered(false)}
    >
      <Button asChild variant="ghost" className={"w-full flex-grow"}>
        <Link
          href={chat.path}
          className="flex items-center justify-between  gap-2 text-zinc-400 hover:text-white"
        >
          <span className={"flex items-center gap-2"}>
            <MessageCircleCode className="h-5 w-5" />
            {chat.title}
          </span>
        </Link>
      </Button>
      {ishovered ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"sm"} variant={"destructive"}>
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
              </div>
            </div>
            <DialogFooter>
              <div className={"flex gap-2 justify-center"}>
                <DialogClose asChild>
                  <Button variant={"default"}>No</Button>
                </DialogClose>

                <Button variant={"destructive"}>Yes</Button>
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