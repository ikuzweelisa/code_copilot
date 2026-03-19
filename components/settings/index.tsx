"use client";

import { User,  Shield } from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";

import { ScrollArea } from "../ui/scroll-area";

import AccountSecurity from "./account";
import Personalization from "./user";

export function Settings() {
  return (
    <div className=" mx-auto h-full max-w-5xl space-y-8 p-2">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="personalization" className="w-full">
        <TabsList>
          <TabsTrigger value="personalization" className="space-x-2">
            <User className="h-4 w-4" />
            <span>Personalization</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="space-x-2">
            <Shield className="h-4 w-4" />
            <span>Account and Security</span>
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="h-[calc(100vh-220px)] w-full pr-4">
          <TabsContent value="personalization" className="space-y-12">
            <Personalization />
          </TabsContent>
          <TabsContent value="security" className="space-y-12">
            <AccountSecurity />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
