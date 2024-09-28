import React from "react";
import Navbar from "@/components/navbar";
import {Metadata} from "next";

export const metadata:Metadata={
    title:{
      template:"%s-ChatBot",
      default:"new"
    }
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col flex-1 bg-muted/50">
        <div className={"flex  justify-between gap-10"}>
          <div className={"w-72"}>
            <Navbar />
          </div>
          <div className={"flex flex-col flex-grow "}>{children} </div>
        </div>
      </main>
    </div>
  );
}