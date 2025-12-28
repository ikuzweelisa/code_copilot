"use client";
import React, { Suspense } from "react";
import { AssitantIcon } from "../ui/icons";
import { ScrollArea } from "../ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import UserButton from "./user";
import Link from "next/link";
import NavLinks from "./nav-links";
import NavItems from "./nav-items";
import { Button } from "../ui/button";
import { LoginForm } from "../auth/login-form";
import { useSession } from "~/lib/auth/auth-client";

export default function NavContent() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const session = useSession();

  const isLoggedIn = !!session?.data;
  return (
    <Sidebar
      data-collapsed={collapsed}
      variant="sidebar"
      collapsible={"icon"}
      className="group px-0"
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
      {isLoggedIn ? (
        <>
          <SidebarContent className="mt-2">
            <ScrollArea className="flex-grow">
              <NavLinks />
              <NavItems />
            </ScrollArea>
          </SidebarContent>
          <SidebarFooter className="border-t">
            <Suspense fallback={null}>
              <UserButton session={session?.data} />
            </Suspense>
          </SidebarFooter>
        </>
      ) : (
        <>
          <SidebarContent className="group-data-[collapsible=icon]:hidden">
            <SidebarMenu>
              <SidebarMenuItem className="text-center mt-5">
                Login to save chats
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="group-data-[collapsible=icon]:hidden  gap-2">
            <div className="w-full flex gap-2">
              <LoginForm>
                <Button className="w-full max-w-xs" variant={"outline"}>
                  Login
                </Button>
              </LoginForm>
              <LoginForm>
                <Button className="w-full max-w-xs">Register</Button>
              </LoginForm>
            </div>
          </SidebarFooter>
        </>
      )}
    </Sidebar>
  );
}
