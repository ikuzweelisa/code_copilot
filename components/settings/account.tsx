import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function AccountSecurity() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg">Account and Security</h2>
      <p className="text-sm text-muted-foreground">
        Manage your account security settings
      </p>
      <p className="text-sm text-muted-foreground">
        Manage devices that have access to your account. Remove any devices you
        don't recognize.
      </p>
      <div className="mt-4 rounded-lg border border-border/50 bg-card/50 p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium">Firefox 146 on Linux</h3>
              <Badge
                variant="outline"
                className="border-emerald-500/50 bg-emerald-500/10 text-emerald-500 text-xs px-2 py-0.5"
              >
                Current
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Last used: 48 minutes ago
            </p>
            <p className="text-xs text-muted-foreground">IP: 105.178.104.252</p>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-xl text-destructive">
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 w-full">
          <div className="space-y-2">
            <h3 className="font-medium">Delete Account</h3>
            <p className="text-sm text-muted-foreground">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
          </div>
          <Button variant="destructive" className="w-full sm:w-auto">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
