"use client";
import { useActionState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import signInWithProvider from "~/lib/server/actions";
import AlertMessage from "~/components/auth/alert";
import Image from "next/image";
import { BuiltInProviderType } from "@auth/core/providers";
import { Card } from "~/components/ui/card";
import { Github, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type ProviderProps = {
  name: BuiltInProviderType;
};
export default function Provider({ name }: ProviderProps) {
  const [status, dispatch, isPending] = useActionState(
    signInWithProvider,
    undefined,
  );
  const router = useRouter();
  useEffect(() => {
    if (status?.status === "success") {
      router.refresh();
    }
  }, [status, router]);
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
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {name === "google" ? (
            <Image src={"/Google.png"} width={35} alt={"google"} height={35} />
          ) : (
            <Github className="size-14" />
          )}
          Continue with {name}
        </Button>
      </form>
      {status?.status && <AlertMessage {...status} />}
    </Card>
  );
}
