import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

import {
  listSessions,
  revokeOtherSessions,
  revokeSession,
  TSession,
  useSession,
} from "~/lib/auth/auth-client";

import { SessionsSkeleton } from "../skeletons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
export default function AccountSecurity() {
  const {
    data: sessions,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sessions"],
    queryFn: () => listSessions(),
  });
  const { data } = useSession();
  const handleRemoveOtherSessions = () => {
    revokeOtherSessions();
    refetch();
  };
  return (
    <div className="space-y-4">
      <h2 className="text-lg">Account and Security</h2>
      <p className="text-sm text-muted-foreground">Manage your account security settings</p>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Manage devices that have access to your account. Remove any devices you don't recognize.
        </p>
        {sessions?.data && sessions?.data?.length > 1 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Remove Other Sessions</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will log out all other devices currently signed into your account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleRemoveOtherSessions}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Remove Sessions
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {isLoading ? (
        <SessionsSkeleton />
      ) : (
        sessions?.data &&
        sessions?.data?.length > 0 &&
        sessions?.data.map((session) => (
          <Session
            key={session.id}
            session={session}
            isCurrent={data?.session.id === session.id}
            refetch={refetch}
          />
        ))
      )}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-xl text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="w-full space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Delete Account</h3>
            <p className="text-sm text-muted-foreground">
              Once you delete your account, there is no going back. Please be certain.
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full sm:w-auto">
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove
                  your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}

function Session({
  session,
  isCurrent,
  refetch,
}: {
  session: TSession;
  isCurrent: boolean;
  refetch: () => void;
}) {
  const handleDeleteSession = () => {
    revokeSession({ token: session.token });
    refetch();
  };
  return (
    <div className="mt-4 rounded-lg border border-border/50 bg-card/50 p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">{session.userAgent}</h3>
            {isCurrent && (
              <Badge
                variant="outline"
                className="border-emerald-500/50 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-500"
              >
                Current
              </Badge>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            Expires: {new Date(session.expiresAt).toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">IP: {session.ipAddress}</p>
        </div>
        <div className="flex items-center gap-1">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will revoke this session and log out the device.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteSession}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Remove Session
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
