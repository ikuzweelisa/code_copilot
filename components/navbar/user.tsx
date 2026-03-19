"use client";
import { Settings, LogOut, SquareChevronUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ModeToggle from "~/components/navbar/toggle-mode";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Session, signOut } from "~/lib/auth/auth-client";

interface Props {
  session: Session | null;
}

export default function UserButton({ session }: Props) {
  const router = useRouter();
  const plan = session?.session?.plan ?? "FREE";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="p-0">
        <div className="flex cursor-pointer gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <div className="relative">
              <Avatar className="h-10 w-10 rounded-full">
                <AvatarImage src={session?.user?.image ?? ""} />
                <AvatarFallback>
                  {session?.user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Badge
                variant="secondary"
                className="absolute -bottom-1 -right-1 h-4 px-1.5 text-[9px] uppercase shadow-sm"
              >
                {plan === "PRO_PLUS" ? "pro +" : plan.toLowerCase()}
              </Badge>
            </div>
          </Button>

          <div className="flex w-full items-center gap-0">
            <div className="flex w-full flex-col gap-0.5 group-data-[collapsible=icon]:hidden">
              <div className="flex items-center gap-2">
                <span className="text-base font-medium">{session?.user?.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{session?.user?.email}</span>
            </div>

            <SquareChevronUp className="h-4 w-4" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="mx-2 mb-2 w-60  space-y-1 rounded-md px-2 pt-0 pb-2"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{session?.user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{session?.user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex w-full cursor-pointer items-center">
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
            className="flex w-full cursor-pointer items-center justify-start gap-1"
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
