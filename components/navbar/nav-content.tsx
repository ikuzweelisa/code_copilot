import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import {  MessageSquarePlus } from "lucide-react";
import { Suspense } from "react";
import Spinner from "../ai/spinner";
import { Button } from "../ui/button";
import { LogoIcon } from "../ui/icons";
import NavItems from "./nav-items";
import { History } from "lucide-react";
import UserButton from "./user";
import Link from "next/link"

export default function NavContent({children}:{children:React.ReactNode}) {
    
    return (<>
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
                  <Link
                    href="/"
                    className="flex items-center text-zinc-400 gap-2"
                  >
                    <MessageSquarePlus />
                    New Chat
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <span>New chat</span>
              </TooltipContent>
            </Tooltip>
            <h2 className="text-sm font-semibold text-muted-foreground mb-2 flex justify-center gap-1">
              <History /> Recent Chats
            </h2>
           {children}
          </nav>
        </ScrollArea>
      </div>
      <div className="p-2 border-t mt-auto">
        <UserButton />
      </div>
    </>)
}