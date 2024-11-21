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
    <Card className="w-full h-screen flex flex-col justify-center items-center border-0 rounded-none">
      <CardHeader className="mb-4">
        <CardTitle className="text-2xl flex justify-center gap-4 items-center">
          <IconOpenAI size={50} />
          Welcome back,
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full max-w-xl p-5 rounded-sm">
        <div className="grid gap-4">
          <Providers />
        </div>
      </CardContent>
    </Card>
  );
}
