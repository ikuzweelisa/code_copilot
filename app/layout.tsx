import "./globals.css";
import ThemeProvider from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Geist } from "next/font/google";
import React from "react";
export const metadata = {
  title: "Code Copilot",
  description: "A Programming AI Powered Assistant",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://code-copilot.vercel.app"),
  keywords: [
    "Programming assistant",
    "Code analysis",
    "AI-powered coding",
    "Code debugging",
  ],
};

const geist = Geist({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("font-sans antialiased", geist.className)}
        suppressContentEditableWarning
      >
        <SessionProvider>
          <TooltipProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}

              <Toaster />
            </ThemeProvider>
          </TooltipProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
