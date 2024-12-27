"use client";
import React, { Suspense } from "react";
import { AssitantIcon } from "../ui/icons";
import { ScrollArea } from "../ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "../ui/sidebar";
import UserButton from "./user";
import Link from "next/link";
import NavLinks from "./nav-links";
import { Session } from "next-auth";
import NavItems from "./nav-items";

interface Props {
  sessionPromise: Promise<Session | null>;
}

export default function NavContent({ sessionPromise }: Props) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  return (
    <Sidebar
      data-collapsed={collapsed}
      variant="sidebar"
      collapsible={"icon"}
      className="group px-0 "
    >
      <SidebarHeader className="p-2 space-y-2 border-b">
        <Link href={"/"} className="flex items-center gap-1">
          <div className="text-primary-foreground bg-primary rounded-md size p-0.5">
            <AssitantIcon size={28} />
          </div>

          <span className="font-semibold text-center text-xl group-data-[collapsible=icon]:hidden">
            Code Copilot
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="mt-2">
        <ScrollArea className="flex-grow">
          <NavLinks />
        <NavItems/>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <Suspense fallback={null}>
          <UserButton sessionPromise={sessionPromise} />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}
