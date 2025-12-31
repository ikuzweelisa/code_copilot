import "./globals.css";
import ThemeProvider from "~/components/providers/theme-provider";
import { TooltipProvider } from "~/components/ui/tooltip";
import { Toaster } from "~/components/ui/sonner";
import { cn } from "~/lib/utils";
import { Geist } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: " Chat",
    template: "%s |  Chat",
  },
  description: "A Programming AI Assistant",
  
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://-Chat.vercel.app"),
  keywords: [
    "Programming assistant",
    " analysis",
    "AI-powered coding",
    " debugging",
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
      </body>
    </html>
  );
}
