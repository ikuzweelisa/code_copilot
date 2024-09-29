"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
export default function ToggleMode() {
  const { setTheme, theme } = useTheme();
  function ChangeTHeme() {
    if (theme === "light") {
      setTheme("dark");
      return;
    }
    setTheme("light");
    return;
  }
  return (
    <Button variant="ghost" size="icon" onClick={ChangeTHeme}>
      <MoonIcon className=" rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <SunIcon className=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    </Button>
  );
}
