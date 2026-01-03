"use client";

import { User, CreditCard, Shield } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import Personalization from "./user";
import Subscription from "./subscription";
import AccountSecurity from "./account";

export function Settings() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 h-full">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Tabs defaultValue="personalization" className="w-full">
        <TabsList>
          <TabsTrigger value="personalization" className="space-x-2">
            <User className="w-4 h-4" />
            <span>Personalization</span>
          </TabsTrigger>
          <TabsTrigger value="subscription" className="space-x-2">
            <CreditCard className="w-4 h-4" />
            <span>Subscription</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="space-x-2">
            <Shield className="w-4 h-4" />
            <span>Account and Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personalization" className="space-y-12">
          <Personalization />
        </TabsContent>

        <TabsContent value="subscription" className="space-y-12">
          <Subscription />
        </TabsContent>
        <TabsContent value="security" className="space-y-12">
          <AccountSecurity />
        </TabsContent>
      </Tabs>
    </div>
  );
}
