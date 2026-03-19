export const DEFAULT_THEME_PRESET = "default" as const;
export const THEME_STYLE_ELEMENT_ID = "app-theme-preset";

export type ThemePresetConfig = {
  light: Record<string, string>;
  dark: Record<string, string>;
};

export const THEME_PRESETS_OPTIONS = [
  { id: "default", label: "Default" },
  { id: "green", label: "Green" },
  { id: "blue", label: "Blue" },
  { id: "black", label: "Black" },
] as const;

export type ThemePresetId = (typeof THEME_PRESETS_OPTIONS)[number]["id"];
export const THEME_PRESET_IDS = THEME_PRESETS_OPTIONS.map((preset) => preset.id)

const BASE_LIGHT: Record<string, string> = {
  background: "oklch(1 0 0)",
  foreground: "oklch(0.13 0.028 261.692)",
  card: "oklch(1 0 0)",
  "card-foreground": "oklch(0.13 0.028 261.692)",
  popover: "oklch(1 0 0)",
  "popover-foreground": "oklch(0.13 0.028 261.692)",
  primary: "oklch(0.488 0.243 264.376)",
  "primary-foreground": "oklch(0.97 0.014 254.604)",
  secondary: "oklch(0.967 0.001 286.375)",
  "secondary-foreground": "oklch(0.21 0.006 285.885)",
  muted: "oklch(0.967 0.003 264.542)",
  "muted-foreground": "oklch(0.551 0.027 264.364)",
  accent: "oklch(0.967 0.003 264.542)",
  "accent-foreground": "oklch(0.21 0.034 264.665)",
  destructive: "oklch(0.577 0.245 27.325)",
  border: "oklch(0.928 0.006 264.531)",
  input: "oklch(0.928 0.006 264.531)",
  ring: "oklch(0.707 0.022 261.325)",
  "chart-1": "oklch(0.809 0.105 251.813)",
  "chart-2": "oklch(0.623 0.214 259.815)",
  "chart-3": "oklch(0.546 0.245 262.881)",
  "chart-4": "oklch(0.488 0.243 264.376)",
  "chart-5": "oklch(0.424 0.199 265.638)",
  radius: "0.625rem",
  sidebar: "oklch(0.985 0.002 247.839)",
  "sidebar-foreground": "oklch(0.13 0.028 261.692)",
  "sidebar-primary": "oklch(0.546 0.245 262.881)",
  "sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
  "sidebar-accent": "oklch(0.967 0.003 264.542)",
  "sidebar-accent-foreground": "oklch(0.21 0.034 264.665)",
  "sidebar-border": "oklch(0.928 0.006 264.531)",
  "sidebar-ring": "oklch(0.707 0.022 261.325)",
};

const BASE_DARK: Record<string, string> = {
  background: "oklch(0.13 0.028 261.692)",
  foreground: "oklch(0.985 0.002 247.839)",
  card: "oklch(0.21 0.034 264.665)",
  "card-foreground": "oklch(0.985 0.002 247.839)",
  popover: "oklch(0.21 0.034 264.665)",
  "popover-foreground": "oklch(0.985 0.002 247.839)",
  primary: "oklch(0.42 0.18 266)",
  "primary-foreground": "oklch(0.97 0.014 254.604)",
  secondary: "oklch(0.274 0.006 286.033)",
  "secondary-foreground": "oklch(0.985 0 0)",
  muted: "oklch(0.278 0.033 256.848)",
  "muted-foreground": "oklch(0.707 0.022 261.325)",
  accent: "oklch(0.278 0.033 256.848)",
  "accent-foreground": "oklch(0.985 0.002 247.839)",
  destructive: "oklch(0.704 0.191 22.216)",
  border: "oklch(1 0 0 / 10%)",
  input: "oklch(1 0 0 / 15%)",
  ring: "oklch(0.551 0.027 264.364)",
  "chart-1": "oklch(0.809 0.105 251.813)",
  "chart-2": "oklch(0.623 0.214 259.815)",
  "chart-3": "oklch(0.546 0.245 262.881)",
  "chart-4": "oklch(0.488 0.243 264.376)",
  "chart-5": "oklch(0.424 0.199 265.638)",
  radius: "0.625rem",
  sidebar: "oklch(0.21 0.034 264.665)",
  "sidebar-foreground": "oklch(0.985 0.002 247.839)",
  "sidebar-primary": "oklch(0.623 0.214 259.815)",
  "sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
  "sidebar-accent": "oklch(0.278 0.033 256.848)",
  "sidebar-accent-foreground": "oklch(0.985 0.002 247.839)",
  "sidebar-border": "oklch(1 0 0 / 10%)",
  "sidebar-ring": "oklch(0.551 0.027 264.364)",
};

const withPrimary = (
  base: Record<string, string>,
  primary: string,
  primaryForeground: string,
  ring: string,
) => ({
  ...base,
  primary,
  "primary-foreground": primaryForeground,
  ring,
  "sidebar-primary": primary,
  "sidebar-primary-foreground": primaryForeground,
});

export const THEME_PRESETS: Record<ThemePresetId, ThemePresetConfig> = {
  default: {
    light: BASE_LIGHT,
    dark: BASE_DARK,
  },
  green: {
    light: withPrimary(
      BASE_LIGHT,
      "oklch(0.49 0.19 150)",
      "oklch(0.98 0.01 150)",
      "oklch(0.49 0.19 150)",
    ),
    dark: withPrimary(
      BASE_DARK,
      "oklch(0.56 0.18 150)",
      "oklch(0.98 0.01 150)",
      "oklch(0.56 0.18 150)",
    ),
  },
  blue: {
    light: withPrimary(
      BASE_LIGHT,
      "oklch(0.56 0.22 255)",
      "oklch(0.98 0.01 255)",
      "oklch(0.56 0.22 255)",
    ),
    dark: withPrimary(
      BASE_DARK,
      "oklch(0.63 0.2 255)",
      "oklch(0.98 0.01 255)",
      "oklch(0.63 0.2 255)",
    ),
  },
  black: {
    light: withPrimary(
      BASE_LIGHT,
      "oklch(0.2 0 0)",
      "oklch(0.98 0 0)",
      "oklch(0.2 0 0)",
    ),
    dark: withPrimary(
      BASE_DARK,
      "oklch(0.98 0 0)",
      "oklch(0.2 0 0)",
      "oklch(0.98 0 0)",
    ),
  },
};

export function resolveTheme(value?: string | null): ThemePresetId {
  if (!value) return DEFAULT_THEME_PRESET;
  return value in THEME_PRESETS ? (value as ThemePresetId) : DEFAULT_THEME_PRESET;
}

export function buildThemeCssText(presetId: string): string {
  const resolved = resolveTheme(presetId);
  const preset = THEME_PRESETS[resolved] ?? THEME_PRESETS[DEFAULT_THEME_PRESET];
  const light = Object.entries(preset.light)
    .map(([key, val]) => `--${key}: ${val};`)
    .join("");
  const dark = Object.entries(preset.dark)
    .map(([key, val]) => `--${key}: ${val};`)
    .join("");
  return `:root{${light}}:root.dark{${dark}}`;
}

export function applyThemePresetToDocument(presetId: string) {
  if (typeof document === "undefined") return;
  const cssText = buildThemeCssText(presetId);
  let styleEl = document.getElementById(THEME_STYLE_ELEMENT_ID) as
    | HTMLStyleElement
    | null;
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = THEME_STYLE_ELEMENT_ID;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = cssText;
  document.documentElement.dataset.themePreset = resolveTheme(presetId);
}

export function getThemeInitScript(defaultPresetId?: string | null) {
  const safeDefault = resolveTheme(defaultPresetId);
  const lines = [
    "(function () {",
    `  const styleId = ${JSON.stringify(THEME_STYLE_ELEMENT_ID)};`,
    `  const presets = ${JSON.stringify(THEME_PRESETS)};`,
    `  const defaultPreset = ${JSON.stringify(safeDefault)};`,
    "  function resolve(id){ return id && presets[id] ? id : defaultPreset; }",
    "  const presetId = resolve(defaultPreset);",
    "  const preset = presets[presetId] || presets[defaultPreset];",
    "  const light = Object.entries(preset.light).map(function(entry){ return '--' + entry[0] + ': ' + entry[1] + ';'; }).join('');",
    "  const dark = Object.entries(preset.dark).map(function(entry){ return '--' + entry[0] + ': ' + entry[1] + ';'; }).join('');",
    "  const cssText = ':root{' + light + '}:root.dark{' + dark + '}';",
    "  let styleEl = document.getElementById(styleId);",
    "  if (!styleEl) {",
    "    styleEl = document.createElement('style');",
    "    styleEl.id = styleId;",
    "    document.head.appendChild(styleEl);",
    "  }",
    "  styleEl.textContent = cssText;",
    "  document.documentElement.dataset.themePreset = presetId;",
    "})();",
  ];
  return lines.join("\n");
}

export function setThemePreset(presetId: string) {
  const resolved = resolveTheme(presetId);
  applyThemePresetToDocument(resolved);
}
