import Link from "next/link";
import { MessageSquarePlus,History } from "lucide-react";
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
      <aside className="fixed inset-y-0 left-0 w-80 flex flex-col bg-background border-r">
        <div className="flex items-center mb-6 gap-2 p-4 border-b">
          <LogoIcon className="size-7" />
          <span className="font-semibold text-lg">Dev chatbot</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full">
            <nav className="p-1 flex flex-col gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full justify-start mb-2"
                  >
                    <Link href="/" className="flex items-center  text-zinc-400  gap-2">
                      <MessageSquarePlus />
                      New Chat 
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <span>New chat</span>
                </TooltipContent>
              </Tooltip>
              <h2 className="text-sm font-semibold text-muted-foreground mb-2 flex  justify-center gap-1"><History size={20} /> Recent Chats</h2>
              <Suspense fallback={<div className=" mt-7 flex justify-center"><Spinner /></div> }>
                <NavItems />
              </Suspense>
            </nav>
          </ScrollArea>
        </div>
        <div className="p-2 border-t">
          <User />
       
        </div>
       
      </aside>
    </TooltipProvider>
  );
}