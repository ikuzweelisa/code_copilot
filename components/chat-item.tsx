"use client";
import { Card, CardContent, CardFooter, CardTitle } from "~/components/ui/card";
import { IconUser } from "~/components/ui/icons";
import { Separator } from "~/components/ui/separator";
import { formatTime } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DeleteDialog, RenameDialog, ShareDialog } from "./dialogs";
import { useRouter } from "next/navigation";
import {Chat,User} from "~/lib/drizzle"

interface Props {
  chat: Chat & { user: User };
}
export default function ChatItem({ chat }: Props) {
  const formatedDate = formatTime(new Date(chat.updatedAt));
  const firstMessage = chat.messages[0].parts.map((part) => part.type === "text" && part.text).join("").slice(0, 200);
  const content = typeof firstMessage === "string" ? firstMessage : chat.title;
  const router = useRouter();
  return (
    <Card className="rounded-md w-full">
      <CardTitle className="text-base py-1.5 px-2">{chat.title}</CardTitle>
      <CardContent
        className="p-2 cursor-pointer "
        onClick={() => router.push(`chat/${chat.id}`)}
      >
        <span className="text-muted-foreground text-sm">{content}</span>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between items-start mx-0 pb-0 px-2 pt-2">
        <div className="flex gap-1 text-sm items-center">
          <IconUser className="w-6 h-6" /> {chat.user.name}
        </div>
        <div className="flex gap-1 items-center">
          <span className="text-muted-foreground text-sm">
            Last Updated {formatedDate}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-lg w-60 mx-3 ">
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
        </div>
      </CardFooter>
    </Card>
  );
}
