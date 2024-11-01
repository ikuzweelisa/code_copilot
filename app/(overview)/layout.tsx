import React from "react";
import Navbar from "@/components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col flex-1 bg-muted/50">
      <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-10">
      <div className="w-full lg:w-72">
            <Navbar />
          </div>

          <div className="flex-grow min-h-screen flex flex-col">{children}</div>
        </div>
      </main>
    </div>
  );
}
