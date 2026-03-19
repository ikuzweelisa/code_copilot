"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

import {
  THEME_PRESET_STORAGE_KEY,
  applyThemePresetToDocument,
  resolveTheme,
} from "~/lib/theme-presets";

export default function Providers({
  children,
  themePreset,
}: {
  children: React.ReactNode;
  themePreset?: string | null;
}) {
  const client = new QueryClient();
  useEffect(() => {
    const fallback = resolveTheme(themePreset);
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_PRESET_STORAGE_KEY);
    } catch {
      stored = null;
    }
    const presetId = resolveTheme(stored ?? fallback);
    applyThemePresetToDocument(presetId);
  }, [themePreset]);
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
