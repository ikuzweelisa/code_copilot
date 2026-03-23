"use client";

import { ChevronLeft, ShieldCheck, Box, Brain } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { getLastUsedLoginMethod } from "~/lib/auth/auth-client";

import { AssitantIcon } from "../ui/icons";

import Provider from "./provider";

export function LoginCard({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const lastMethod = getLastUsedLoginMethod();
  return (
    // <Card className="w-full max-w-4xl overflow-hidden border-none">
    <div className="flex min-h-145 flex-col p-0 md:flex-row">
      <div className="relative flex flex-1 flex-col p-8">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-6 left-6 rounded-full bg-muted/50 hover:bg-muted"
          onClick={() => setIsOpen(false)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="mx-auto mt-12 flex w-full max-w-sm flex-col items-center space-y-6 text-center">
          <div className="mb-2 flex items-center gap-2">
            <AssitantIcon />
            <span className="text-2xl font-bold tracking-tight">Chat</span>
          </div>

          <p className="text-sm text-muted-foreground">Sign in or create your Chat account</p>
          <Provider name="google" lastUsed={lastMethod === "google"} />

          <div className="flex w-full items-center gap-4 py-2">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground uppercase">Or</span>
            <Separator className="flex-1" />
          </div>

          <div className="w-full space-y-4">
            <Provider name="github" lastUsed={lastMethod === "github"} />
          </div>

          <p className="text-[11px] leading-relaxed text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline underline-offset-2 hover:text-foreground">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-2 hover:text-foreground">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      {/* Right Pane */}
      <div className="flex flex-1 flex-col justify-between bg-secondary/30 p-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl leading-tight font-bold">AI Chat App</h2>
            <p className="leading-relaxed text-muted-foreground">
              Chat with all your favorite AI models in one app.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-lg bg-background p-2 shadow-xs">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Access All models</h3>
                <p className="text-sm text-muted-foreground">access to all models</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-lg bg-background p-2 shadow-xs">
                <Box className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">20+ open-source models</h3>
                <p className="text-sm text-muted-foreground">
                  Access the latest and greatest open source models
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-lg bg-background p-2 shadow-xs">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Never used for training</h3>
                <p className="text-sm text-muted-foreground">Your chats stay private</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-8">
          <p className="text-center text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Access Models from
          </p>
          <div className="grid grid-cols-3 gap-6 opacity-60">
            <div className="flex items-center justify-center grayscale transition-all hover:grayscale-0">
              <span className="text-[10px] font-bold">DEEPSEEK</span>
            </div>
            <div className="flex items-center justify-center grayscale transition-all hover:grayscale-0">
              <span className="text-[10px] font-bold">LLAMA</span>
            </div>
            <div className="flex items-center justify-center grayscale transition-all hover:grayscale-0">
              <span className="text-[10px] font-bold">QWEN</span>
            </div>
            <div className="flex items-center justify-center grayscale transition-all hover:grayscale-0">
              <span className="text-[10px] font-bold">GLM</span>
            </div>
            <div className="flex items-center justify-center grayscale transition-all hover:grayscale-0">
              <span className="text-[10px] font-bold">MISTRAL</span>
            </div>
            <div className="flex items-center justify-center grayscale transition-all hover:grayscale-0">
              <span className="text-[10px] font-bold">KIMI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
