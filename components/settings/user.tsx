import Link from "next/link";

import { customer, useSession } from "~/lib/auth/auth-client";

import UserSkelton from "../skeletons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import Customization from "./customization";

export default function Personalization() {
  const { data, isPending } = useSession();
  if (isPending) return <UserSkelton />;
  const plan = data?.session?.plan ?? "FREE";

  return (
    <div className="mx-10 mb-4 h-full">
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Profile</h2>
        <div className="flex items-center space-y-2 space-x-4">
          <div className="relative">
            <Avatar className="h-16 w-16 border-2 border-border">
              <AvatarImage src={data?.user?.image ?? ""} alt="user" />
              <AvatarFallback className="bg-muted text-xl font-bold">
                {data?.user?.name.split(" ")[0][0] || "U"}
              </AvatarFallback>
            </Avatar>
            <Badge
              variant="secondary"
              className="absolute -right-1 -bottom-1 h-5 px-2 text-[10px] uppercase shadow-sm"
            >
              {plan === "PRO_PLUS" ? "pro +" : plan.toLowerCase()}
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="font-medium">{data?.user?.name}</p>
            <p className="text-sm text-muted-foreground">{data?.user?.email}</p>
            {plan !== "PRO_PLUS" && (
              <Button size={"sm"} asChild>
                <Link href={"/pricing/upgrade"}>Upgrade</Link>
              </Button>
            )}
          </div>
          <div>
            <Button variant="outline" onClick={() => customer.portal()}>
              Manage Billing & Invoices
            </Button>
          </div>
        </div>
      </section>

      <Separator className="my-4" />

      <Customization />
    </div>
  );
}
