"use client";
import Link from "next/link";
import { Settings, LogOut, SquareChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import ModeToggle from "~/components/navbar/toggle-mode";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Session, signOut } from "~/lib/auth/auth-client";
import { useRouter } from "next/navigation";

interface Props {
  session: Session | null;
}

export default function UserButton({ session }: Props) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="p-0">
        <div className="flex gap-2 cursor-pointer">
          <Button variant="ghost" size="icon" className="relative ">
            <Avatar className="rounded-full h-10 w-10">
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
              <span className="font-medium text-base">
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
      <DropdownMenuContent
        align="center"
        className="w-60 space-y-1 mb-2  pb-2 px-2 pt-0 mx-2 rounded-md bg-muted/50"
      >
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
          <Link href="#" className="flex cursor-pointer w-full items-center">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Preferences</DropdownMenuLabel>
        <DropdownMenuItem className="flex cursor-pointer justify-between">
          Toggle theme
          <ModeToggle />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            variant={"default"}
            size={"sm"}
            className="flex items-center w-full justify-start cursor-pointer gap-1"
            onClick={async () => {
              const { data } = await signOut();
              if (data?.success) {
                router.replace("/");
              }
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
