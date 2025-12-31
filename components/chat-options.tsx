import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DeleteDialog, RenameDialog, ShareDialog } from "./dialogs";
import type { Chat } from "~/lib/drizzle";

export default function ChatOptionsMenu({ chat }: { chat: Chat }) {
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
          <RenameDialog chat={chat} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteDialog chat={chat} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
