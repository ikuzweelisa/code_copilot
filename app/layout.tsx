import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Dev Bot",
  description: "An AI Powered ChatBot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans antialiased`}>
        <SessionProvider>
          <TooltipProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
              {children}
            </ThemeProvider>
          </TooltipProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
