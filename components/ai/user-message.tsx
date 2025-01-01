"use client";
import { IconUser } from "~/components/ui/icons";

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex items-center justify-center md:-ml-12">
      <div className="flex  shrink-0 select-none items-center justify-center  ">
        <IconUser />
      </div>
      <div className="ml-2 flex-1 flex-col text-sm md:text-sm lg:text-base">
        {children}
      </div>
    </div>
  );
}
