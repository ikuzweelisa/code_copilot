"use client";
import Link from "next/link";
import { Settings, LogOut, SquareChevronUp } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/navbar/toggle-mode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { use } from "react";

interface Props {
  sessionPromise: Promise<Session | null>;
}

export default function UserButton({ sessionPromise }: Props) {
  const session = use(sessionPromise);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="p-0">
        <div className="flex gap-1 cursor-pointer">
          <Button variant="ghost" size="icon" className="relative ">
            <Avatar className="rounded-md h-10 w-10">
              <AvatarImage src={session?.user?.image ?? ""} />
              <AvatarFallback>
                {session?.user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>

          <div className="flex items-center gap-0 w-full  ">
            <div className="w-full flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="font-semibold text-base">
                {session?.user?.name}
              </span>
              <span className="text-sm text-muted-foreground">
                {session?.user?.email}
              </span>
            </div>

            <SquareChevronUp className="h-4 w-4" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-60 space-y-1 ">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/admin/profile" className="flex w-full items-center">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Preferences</DropdownMenuLabel>
        <DropdownMenuItem className="flex justify-between">
          Toggle theme
          <ModeToggle />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="flex items-center cursor-pointer gap-1 w-full justify-center"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
