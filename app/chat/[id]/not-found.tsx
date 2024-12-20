import { Metadata } from "next";
import Link from "next/link";
import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen  p-4 ">
      <Card className="w-full max-w-lg  mx-auto rounded-md bg-transparent shadow-none border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-primary mb-2">
            404
          </CardTitle>
          <CardDescription className="text-2xl font-semibold">
            Not Found
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <p className="text-center text-muted-foreground">
            Oops! The chat you&apos;re looking for doesn&apos;t exist or has
            been moved.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Button asChild>
            <Link href="/">
              <MessageSquarePlus className="mr-2 h-4 w-4" />
              Start New Chat
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
