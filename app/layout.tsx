import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "New-Chat-Dev-ChatBot",
  description: "A Programming AI Powered Assistant",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://devchat-bot.vercel.app/"),
  keywords: [
    "Programming assistant",
    "Code analysis",
    "AI-powered coding",
    "Code debugging",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable
        )}
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
