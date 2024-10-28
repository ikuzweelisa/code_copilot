"use client";
import Link from "next/link";
import { User, Settings, LogOut, SquareChevronUp } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
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

export default function UserButton() {
  const session = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-1 cursor-pointer">
          <Button variant="ghost" size="icon" className="relative ">
            <Avatar>
              <AvatarImage src={session?.data?.user?.image ?? ""} />
              <AvatarFallback>
                {session?.data?.user?.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>

          <div className="flex items-center gap-1">
            {session?.data?.user?.email}
            <SquareChevronUp className="h-4 w-4" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 space-y-2 ">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.data?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.data?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/admin/profile" className="flex w-full items-center">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
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
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <Button variant={"ghost"} size={"sm"} onClick={() => signOut()}>
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
