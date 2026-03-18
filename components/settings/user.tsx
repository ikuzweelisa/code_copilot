import Link from "next/link";

import { useSession } from "~/lib/auth/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import Customization from "./customization";

export default function Personalization() {
  const { data } = useSession();

  return (
    <div className="mx-10 mb-4 h-full">
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Profile</h2>
        <div className="flex items-center space-y-2 space-x-4">
          <Avatar className="h-16 w-16 border-2 border-border">
            <AvatarImage src={data?.user?.image ?? ""} alt="user" />
            <AvatarFallback className="bg-muted text-xl font-bold">
              {data?.user?.name.split(" ")[0][0] || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="font-medium">{data?.user?.name}</p>
            <p className="text-sm text-muted-foreground">{data?.user?.email}</p>
            <Button size={"sm"} asChild>
              <Link href={"/pricing/upgrade"}>Upgrade</Link>
            </Button>
          </div>
        </div>
      </section>

      <Separator className="my-4" />

      <Customization />
    </div>
  );
}
