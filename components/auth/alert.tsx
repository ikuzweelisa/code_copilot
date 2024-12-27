import { AuthStatus } from "@/lib/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCheck, ShieldAlert, TriangleAlert } from "lucide-react";

export default function AlertMessage(status: AuthStatus) {
  return (
    <Alert
      variant={status.status === "success" ? "default" : "destructive"}
      className="mt-3"
    >
      <AlertDescription className={" flex justify-center"}>
        <span className={"text-md flex gap-2"}>
          {status.status === "success" ? (
            <CheckCheck size={15} />
          ) : (
            <TriangleAlert size={15} />
          )}
          {status.message}
        </span>
      </AlertDescription>
    </Alert>
  );
}
