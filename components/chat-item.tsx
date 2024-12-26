"use client";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { IconUser } from "./ui/icons";
import { Separator } from "./ui/separator";
import { formatTime } from "@/lib/utils";
import { subDays } from "date-fns";
import { Button } from "./ui/button";
import { Ellipsis, PenLine, Share } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Trash2 } from "lucide-react";

export default function ChatItem() {
  const formatedDate = formatTime(
    new Date(subDays(new Date(Date.now()).getDate(), 5))
  );
  return (
    <Card className="rounded-md w-full cursor-pointer">
      <CardTitle className="text-base py-1.5 px-2">
        Documentation Stater
      </CardTitle>
      <CardContent className="p-2">
        <span className="text-muted-foreground text-sm">
          Documentation Starter Project in Next Js App Router Documentation
          Starter Project in Next Js App Router Documentation Starter Project in
          Next Js App Router Documentation Starter Project in Next Js App Router
        </span>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between items-start mx-0 pb-0 px-2 pt-2">
        <div className="flex gap-1 text-sm items-center">
          <IconUser className="w-6 h-6" /> Ikuzwe shema
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
            <DropdownMenuContent className="rounded-lg w-56 mx-3 ">
              <DropdownMenuItem className="flex cursor-pointer items-center gap-1">
                <Share className="w-4 h-4" /> Share
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center cursor-pointer gap-1">
                <PenLine className="w-4 h-4 cursor-pointer" /> Rename
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500 flex items-center cursor-pointer gap-1">
                <Trash2 className="w-4 h-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}
