import Navbar from "~/components/navbar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import React from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-0">
      <SidebarProvider>
        <Navbar />
        <main className=" w-full h-screen overflow-hidden bg-muted/50">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
