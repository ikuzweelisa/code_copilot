"use client";
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
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

function ChatItemSkeleton() {
  return (
    <Card className="rounded-md w-full">
      <CardTitle className="text-base py-1.5 px-2">
        <Skeleton className="h-6 w-3/4" />
      </CardTitle>
      <CardContent className="p-2">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between items-start mx-0 pb-0 px-2 pt-2">
        <div className="flex gap-1 text-sm items-center">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex gap-1 items-center">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </CardFooter>
    </Card>
  );
}

export function ChatHistorySkeleton() {
  return (
    <Fragment>
      {Array.from({ length: 6 }).map((_, index) => (
        <ChatItemSkeleton key={index} />
      ))}
    </Fragment>
  );
}
