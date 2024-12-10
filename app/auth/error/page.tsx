import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconOpenAI, LogoIcon } from "@/components/ui/icons";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "ChatBot-Error",
  description: "error page",
};
export default async function Page(props: {
  searchParams: Promise<{ error: string }>;
}) {
  const searchParams = await props.searchParams;
  const { error } = searchParams;
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="mx-auto w-full max-w-xl rounded-md">
        <CardHeader>
          <CardTitle className="text-2xl flex justify-center">
            <div className="text-primary-foreground bg-primary rounded-md">
              <IconOpenAI size={50} />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Alert variant={"destructive"}>
                  <AlertTitle className={"rounded-md flex justify-center"}>
                    <TriangleAlert size={60} />
                  </AlertTitle>
                  <AlertDescription className={"mt-3 flex justify-center"}>
                    <span className={"text-md"}>
                      {error || "something went wrong"} Error
                    </span>
                  </AlertDescription>
                </Alert>
                <div className="w-full flex justify-center">
                <Button asChild variant={"outline"} className="w-full max-w-sm">
                  <Link href="/auth/login">Login Again</Link>
                </Button>
                </div>
              
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
