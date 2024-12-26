"use client"
import { Fragment } from "react";
import { SidebarMenuSkeleton } from "./ui/sidebar";

export function ChatsSkeleton() {
  return (
    <Fragment>
      {Array.from({ length: 5 }).map((_, index) => (
        <SidebarMenuSkeleton key={index} />
      ))}
    </Fragment>
  );
}
