import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/providers/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import AIProvider from "@/providers/ai-provider";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ChatBot",
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
        <AIProvider>
          <TooltipProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex flex-col min-h-screen">
                <main className="flex flex-col flex-1 bg-muted/50">
                  <div className={"flex  justify-between gap-10"}>
                    <div className={"w-72"}>
                      <Navbar />
                    </div>
                    <div className={"flex flex-col flex-grow "}>
                      {children}{" "}
                    </div>
                  </div>
                </main>
              </div>
            </ThemeProvider>
          </TooltipProvider>
        </AIProvider>
      </body>
    </html>
  );
}
