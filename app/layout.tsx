import "./globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import Providers from "~/components/providers";
import ThemeProvider from "~/components/providers/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import { TooltipProvider } from "~/components/ui/tooltip";
import { getSession } from "~/lib/auth";
import { TRPCProvider } from "~/lib/backend/trpc/client";
import { getUserPreferences } from "~/lib/server";
import { getThemeInitScript } from "~/lib/theme-presets";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const preferences = await getUserPreferences(session?.user?.id);
  const themeScript = getThemeInitScript(preferences?.themePreset);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} suppressHydrationWarning />
      </head>
      <body className={cn("font-sans antialiased", geist.className)} suppressContentEditableWarning>
        <TRPCProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers themePreset={preferences?.themePreset}>
              <Toaster />
              <TooltipProvider>{children}</TooltipProvider>
            </Providers>
          </ThemeProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
