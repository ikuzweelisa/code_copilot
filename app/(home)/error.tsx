"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={"flex justify-center mt-20"}>
      <div className="flex flex-col w-[42vw] gap-4">
        <div className="flex flex-col gap-2">
          <Alert variant={"destructive"}>
            <AlertTitle className={"rounded-md flex justify-center"}>
              <AlertTriangle size={60} />
            </AlertTitle>
            <AlertDescription className={"mt-3 flex justify-center"}>
              <span className={"text-md"}>
              {"something went wrong our team is already notified"}
              </span>
            </AlertDescription>
          </Alert>
          <Button onClick={() => reset()} variant={"outline"}>
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
}