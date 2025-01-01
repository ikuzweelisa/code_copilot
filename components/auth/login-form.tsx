"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Providers from "~/components/auth/providers";
import { AssitantIcon } from "~/components/ui/icons";

export function LoginForm() {
  return (
    <div className="w-full h-screen flex  justify-center items-center">
      <Card className="flex flex-col w-full max-w-xl rounded-md border-2  shadow-none p-4">
        <CardHeader className="mb-4">
          <CardTitle className="text-2xl flex justify-center gap-4 items-center">
            <div className=" rounded-md  size-50 " >
            <AssitantIcon size={60} className="text-primary"/>
            </div>    
            Welcome back,
          </CardTitle>
        </CardHeader> 
        <CardContent className="w-full max-w-xl p-5 rounded-sm">
          <div className="grid gap-4">
            <Providers />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
