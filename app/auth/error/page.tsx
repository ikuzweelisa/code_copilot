import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconOpenAI, LogoIcon } from "@/components/ui/icons";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "ChatBot-Error",
  description: "error page",
};
export default async function Page(
  props: {
    searchParams: Promise<{ error: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const { error } = searchParams;
  return (
    <Card className="mx-auto w-[45vw]  mt-24">
      <CardHeader>
        <CardTitle className="text-2xl flex justify-center">
          <IconOpenAI />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Alert variant={"destructive"}>
                <AlertTitle className={"rounded-md flex justify-center"}>
                  <ShieldAlert size={60} />
                </AlertTitle>
                <AlertDescription className={"mt-3 flex justify-center"}>
                  <span className={"text-md"}>
                    {error || "something went wrong"}
                  </span>
                </AlertDescription>
              </Alert>
              <Button asChild variant={"outline"}>
                <Link href="/auth/login">Login Again</Link>
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
