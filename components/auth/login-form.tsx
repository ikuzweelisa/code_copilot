"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Providers from "@/components/auth/providers";
import { LogoIcon } from "@/components/ui/icons";
import { authenticate } from "@/lib/actions/server";

export function LoginForm() {
  return (
    <Card className="mx-auto w-96">
      <CardHeader>
        <CardTitle className="text-2xl flex justify-center">
          <LogoIcon className="size-20" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form className={"flex flex-col gap-4"} action={authenticate}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                name={"email"}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" name={"password"} required />
            </div>
            <SubmitButton />
          </form>
          <Providers />
        </div>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function SubmitButton() {
  return (
    <Button type="submit" disabled className="w-full disabled:cursor-not-allowed">
      Login
    </Button>
  );
}
