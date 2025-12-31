"use client";

import { useTransition } from "react";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { Card } from "~/components/ui/card";
import { Github, Loader2 } from "lucide-react";
import type { SocialProvider } from "better-auth";
import { signIn } from "~/lib/auth/auth-client";

type Props = {
  name: SocialProvider;
};
export default function Provider({ name }: Props) {
  const [isPending, startTransition] = useTransition();
  const login = () => {
    startTransition(async () => {
      await signIn.social({ provider: name });
    });
  };
  return (
    <Card className="flex  gap-2 w-full  rounded-md shadow-none">
      <input type={"hidden"} name={"provider"} value={name} />
      <Button
        onClick={login}
        disabled={isPending}
        variant={name === "google" ? "default" : "outline"}
        size={"lg"}
        className={"w-full flex gap-2  p-3 rounded-md"}
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {name === "google" ? (
          <Image src={"/Google.png"} width={35} alt={"google"} height={35} />
        ) : (
          <Github className="size-14" />
        )}
        Continue with {name}
      </Button>
    </Card>
  );
}
