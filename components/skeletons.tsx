"use client";
import { Fragment } from "react";

import { Card, CardContent, CardFooter, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";

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
function ChatItemSkeleton() {
  return (
    <Card className="w-full rounded-md">
      <CardTitle className="px-2 py-1.5 text-base">
        <Skeleton className="h-6 w-3/4" />
      </CardTitle>
      <CardContent className="p-2">
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
      <Separator />
      <CardFooter className="mx-0 flex items-start justify-between px-2 pt-2 pb-0">
        <div className="flex items-center gap-1 text-sm">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </CardFooter>
    </Card>
  );
}

export function ChatHistorySkeleton() {
  return (
    <div className="flex h-full w-full flex-col  gap-3 overflow-auto p-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <ChatItemSkeleton key={index} />
      ))}
    </div>
  );
}

export default function UserSkelton() {
  return (
    <div className="flex w-full gap-2">
      <Skeleton className={"h-10 w-10 rounded-full"} />
      <div className="flex flex-col items-start justify-center  gap-1">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-3 w-10" />
      </div>
    </div>
  );
}

export function ModelSelectorSkelton() {
  return <Skeleton className="h-10 w-35" />;
}

export function ImageSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-70 w-70" />
    </div>
  );
}

export function SessionSkeleton() {
  return (
    <div className="mt-4 rounded-lg border border-border/50 bg-card/50 p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
}

export function SessionsSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <SessionSkeleton key={i} />
      ))}
    </div>
  );
}
