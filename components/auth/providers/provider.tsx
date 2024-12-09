"use client";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import signInWithProvider from "@/lib/actions/server/actions";
import { GitHubLogoIcon, ReloadIcon } from "@radix-ui/react-icons";
import AlertMessage from "@/components/auth/alert";
import Image from "next/image";
import { BuiltInProviderType } from "@auth/core/providers";
import { Card } from "@/components/ui/card";

type ProviderProps = {
  name: BuiltInProviderType;
};
export default function Provider({ name }: ProviderProps) {
  const [status, dispatch, isPending] = useActionState(
    signInWithProvider,
    undefined
  );
  return (
    <Card className="flex  gap-2 w-full  rounded-md shadow-none">
      <form action={dispatch} className="w-full">
        <input type={"hidden"} name={"provider"} value={name} />
        <Button
          disabled={isPending}
          variant={name === "google" ? "default" : "outline"}
          size={"lg"}
          className={"w-full flex gap-2  p-3 rounded-md"}
          type={"submit"}
        >
          {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {name === "google" ? (
            <Image src={"/Google.png"} width={35} alt={"google"} height={35} />
          ) : (
            <GitHubLogoIcon className="h-14 w-14" />
          )}
          Continue with {name}
        </Button>
      </form>
      {status?.status && <AlertMessage {...status} />}
    </Card>
  );
}
