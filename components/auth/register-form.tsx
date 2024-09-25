"use client";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

import { ReloadIcon } from "@radix-ui/react-icons";
import Providers from "@/components/auth/providers";

export function RegisterForm() {
  return (
    <Card className="mx-auto w-96">
      <CardHeader>
        <CardTitle className="text-2xl flex justify-center">
          <Image src={"/logo.png"} height={125} width={125} alt="logo" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form className={"flex flex-col gap-4"}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                name={"email"}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Name:</Label>
              <Input
                id="username"
                type="text"
                name={"name"}
                placeholder="m@example.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" name={"password"} required />
            </div>

            <SubmitButton />
          </form>
          <Providers />
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full disabled:cursor-not-allowed"
    >
      {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}{" "}
      {pending ? "Registering..." : "Register"}
    </Button>
  );
}