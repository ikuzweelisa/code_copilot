import "./globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import Providers from "~/components/providers";
import ThemeProvider from "~/components/providers/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import { TRPCProvider } from "~/lib/backend/trpc/client";
import { cn } from "~/lib/utils";

export const metadata: Metadata = {
  title: {
    default: " Chat",
    template: "%s |  Chat",
  },
  description: "A Programming AI Assistant",

  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://chat.vercel.app"),
  keywords: ["Programming assistant", " analysis", "AI-powered coding", " debugging"],
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
      <body className={cn("font-sans antialiased", geist.className)} suppressContentEditableWarning>
        <TRPCProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              <Toaster />
              <TooltipProvider>{children}</TooltipProvider>
            </Providers>
          </ThemeProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
