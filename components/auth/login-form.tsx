"use client";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { LoginCard } from "./login-card";

export function LoginForm({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl">
        <LoginCard />
      </DialogContent>
    </Dialog>
  );
}
