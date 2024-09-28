import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth, signOut } from "@/app/auth";
import ToggleMode from "./toggle-mode";

export default async function User() {
  const session = await auth();
  return (
    <div className={"flex gap-2 items-center "}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full flex  justify-between"
          >
            <Image
              src={session?.user?.image ?? "https://i.pravatar.cc"}
              width={36}
              height={36}
              alt="Avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align={"end"}>
          <DropdownMenuItem>
            <Link href={"/dashboard/profile"}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem>
            <ToggleMode />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button size={"sm"} type={"submit"} variant={"ghost"}>
                Logout
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span>{session?.user?.email}</span>
    </div>
  );
}
