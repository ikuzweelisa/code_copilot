"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

import { applyThemePresetToDocument, resolveTheme } from "~/lib/theme-presets";

export default function Providers({
  children,
  themePreset,
}: {
  children: React.ReactNode;
  themePreset?: string | null;
}) {
  const client = new QueryClient();
  useEffect(() => {
    const presetId = resolveTheme(themePreset);
    applyThemePresetToDocument(presetId);
  }, [themePreset]);
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
