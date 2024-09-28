import Link from "next/link";
import { MessageSquarePlus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import NavItems from "@/components/navbar/nav-items";
import User from "@/components/navbar/user";
import Spinner from "@/components/ai/spinner";
import { LogoIcon } from "@/components/ui/icons";

export default function Navbar() {
  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 w-80 flex flex-col dark:bg-zinc-950 text-white">
        <div className="flex items-center mb-6 gap-2 p-4 border-b border-zinc-700">
          <LogoIcon className="size-7" />
          <span className="font-semibold text-lg">Dev chatbot</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full ">
            <nav className="p-4 flex flex-col gap-3 ">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start mb-2"
                  >
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-white"
                    >
                      <MessageSquarePlus className="h-5 w-5" />
                      New Chat
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <span>Start a new chat</span>
                </TooltipContent>
              </Tooltip>
              <h2 className="text-sm font-semibold text-zinc-400 mb-2">
                Chat History
              </h2>
              <Suspense fallback={<Spinner />}>
                <NavItems />
              </Suspense>
            </nav>
          </ScrollArea>
        </div>
        <div className="p-2 border-t border-zinc-700">
          <User />
        </div>
      </aside>
    </TooltipProvider>
  );
}
