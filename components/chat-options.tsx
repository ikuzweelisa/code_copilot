"use client";
import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DeleteDialog, RenameDialog, ShareDialog } from "./dialogs";
import type { Chat } from "~/lib/ai/types";
import { useQueryClient } from "@tanstack/react-query";

export default function ChatOptionsMenu({ chat }: { chat: Chat }) {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["chats"] });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-lg w-32 mx-3 ">
        <DropdownMenuItem asChild>
          <ShareDialog chat={chat} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <RenameDialog chat={chat} onSuccess={onSuccess} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteDialog chat={chat} onSuccess={onSuccess} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
