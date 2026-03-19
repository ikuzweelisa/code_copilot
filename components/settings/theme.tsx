"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { trpc } from "~/lib/backend/trpc/client";
import {
  THEME_PRESETS,
  THEME_PRESETS_OPTIONS,
  type ThemePresetId,
  resolveTheme,
  setThemePreset,
} from "~/lib/theme-presets";
import { cn } from "~/lib/utils";

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function ThemeSettings() {
  const { data } = trpc.user.getUserPreferences.useQuery();
  const mutation = trpc.user.saveUserPreferences.useMutation();
  const basePreset = resolveTheme(data?.themePreset);
  const [selected, setSelected] = useState<ThemePresetId>(basePreset);

  useEffect(() => {
    setSelected(basePreset);
  }, [basePreset]);

  useEffect(() => {
    if (mutation.isError) {
      setSelected(basePreset);
      setThemePreset(basePreset);
      toast.error("Could not save", {
        description: "Please try again",
      });
    }
  }, [basePreset, mutation.isError, mutation.isSuccess]);

  const options = useMemo(() => THEME_PRESETS_OPTIONS, []);
  const fallbackColor = THEME_PRESETS.default.light.primary;
  const isDisabled = mutation.isPending ;

  const handleSelect = (presetId: ThemePresetId) => {
    if (isDisabled) return;
    const next = resolveTheme(presetId);
    setSelected(next);
    setThemePreset(next);
    mutation.mutate({
      name: data?.nickName ?? "",
      occupation: data?.occupation ?? "",
      bio: data?.bio ?? "",
      customInstructions: data?.customInstructions ?? "",
      themePreset: next,
    });
  };

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Theme</h2>
        <p className="text-sm text-muted-foreground">
          Choose a theme that feels right for you.
        </p>
      </div>

      <Card className="border-none">
      
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {options.map((option) => {
              const color = THEME_PRESETS[option.id]?.light.primary ?? fallbackColor;
              const isActive = selected === option.id;
              return (
                <Button
                  key={option.id}
                  type="button"
                  variant="outline"
                  className={cn(
                    "relative h-auto w-full items-center justify-start gap-3 rounded-lg border border-border/60 px-4 py-3 text-left",
                    isActive && "border-primary ring-1 ring-primary/30",
                  )}
                  onClick={() => handleSelect(option.id)}
                  disabled={isDisabled || isActive}
                >
                  <div
                    className="h-10 w-10 rounded-full border border-border"
                    style={{
                      backgroundColor: color,
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{option.label}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
