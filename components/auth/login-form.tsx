"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Providers from "@/components/auth/providers";
import { IconOpenAI, LogoIcon } from "@/components/ui/icons";

export function LoginForm() {
  return (
    <Card className=" w-full max-w-lg mx-auto mt-8  rounded-md  border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl flex justify-center">
          <IconOpenAI size={38} />
        </CardTitle>
      </CardHeader>
      <CardDescription className="text-2xl text-center p-2">
        Welcome back,
      </CardDescription>
      <CardContent>
        <div className="grid gap-4">
          <Providers />
        </div>
      </CardContent>
    </Card>
  );
}
