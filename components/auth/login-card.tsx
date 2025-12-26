"use client";

import { ChevronLeft, ShieldCheck, Box, Brain } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Card, CardContent } from "~/components/ui/card";
import Provider from "./providers/provider";
import { AssitantIcon } from "../ui/icons";

export function LoginCard() {
  return (
    <Card className="overflow-hidden border-none max-w-4xl w-full bg-card shadow-2xl">
      <CardContent className="p-0 flex flex-col md:flex-row min-h-[580px]">
        <div className="flex-1 p-8 flex flex-col relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-6 top-6 rounded-full bg-muted/50 hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="mt-12 flex flex-col items-center text-center space-y-6 max-w-sm mx-auto w-full">
            <div className="flex items-center gap-2 mb-2">
              <AssitantIcon />
              <span className="text-2xl font-bold tracking-tight">Chat</span>
            </div>

            <p className="text-muted-foreground text-sm">
              Sign in or create your Chat account
            </p>
            <Provider name="google" />

            <div className="w-full flex items-center gap-4 py-2">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground uppercase">
                Or
              </span>
              <Separator className="flex-1" />
            </div>

            <div className="w-full space-y-4">
              <Provider name="github" />
            </div>

            <p className="text-[11px] text-muted-foreground leading-relaxed">
              By clicking continue, you agree to our{" "}
              <a
                href="#"
                className="underline hover:text-foreground underline-offset-2"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="underline hover:text-foreground underline-offset-2"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* Right Pane */}
        <div className="flex-1 bg-secondary/30 p-12 flex flex-col justify-between">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold leading-tight">AI Chat App</h2>
              <p className="text-muted-foreground leading-relaxed">
                Chat with all your favorite AI models in one app.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-lg bg-background shadow-sm">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Access All models</h3>
                  <p className="text-sm text-muted-foreground">
                    access to all models
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-lg bg-background shadow-sm">
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
                <div className="mt-1 p-2 rounded-lg bg-background shadow-sm">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Never used for training</h3>
                  <p className="text-sm text-muted-foreground">
                    Your chats stay private
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-6">
            <p className="text-xs text-center text-muted-foreground font-medium uppercase tracking-wider">
              Access Models from
            </p>
            <div className="grid grid-cols-3 gap-6 opacity-60">
              <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <span className="text-[10px] font-bold">DEEPSEEK</span>
              </div>
              <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <span className="text-[10px] font-bold">LLAMA</span>
              </div>
              <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <span className="text-[10px] font-bold">QWEN</span>
              </div>
              <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <span className="text-[10px] font-bold">GLM</span>
              </div>
              <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <span className="text-[10px] font-bold">MISTRAL</span>
              </div>
              <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                <span className="text-[10px] font-bold">KIMI</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
