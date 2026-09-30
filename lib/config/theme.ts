/**
 * Theme and Accent Color Configuration for Dealio
 * Centralized configuration for theme modes and solid accent colors
 */

/**
 * Theme modes supported by Dealio
 */
export enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

/**
 * Theme configuration
 * Maps theme modes to their corresponding styles and settings
 */
export const THEME_CONFIG = {
  [ThemeMode.LIGHT]: {
    name: "Modo Claro",
    value: "light",
    background: "#FFFFFF",
    foreground: "#000000",
    description: "Tema claro con fondo blanco",
  },
  [ThemeMode.DARK]: {
    name: "Modo Oscuro",
    value: "dark",
    background: "#000000",
    foreground: "#FFFFFF",
    description: "Tema oscuro con fondo negro puro",
  },
} as const;

/**
 * Accent color types
 */
export enum AccentColor {
  BLUE = "blue",
  RED = "red",
  GREEN = "green",
  YELLOW = "yellow",
}

/**
 * Solid accent colors configuration
 * Contains solid color values (no gradients or intermediate opacities)
 */
export const ACCENT_COLORS = {
  [AccentColor.BLUE]: {
    name: "Azul",
    value: "blue",
    hex: "#3B82F6",
    rgb: "59, 130, 246",
    tailwind: "blue-500",
    description: "Azul sólido para acciones primarias",
  },
  [AccentColor.RED]: {
    name: "Rojo",
    value: "red",
    hex: "#EF4444",
    rgb: "239, 68, 68",
    tailwind: "red-500",
    description: "Rojo sólido para acciones destructivas",
  },
  [AccentColor.GREEN]: {
    name: "Verde",
    value: "green",
    hex: "#10B981",
    rgb: "16, 185, 129",
    tailwind: "green-500",
    description: "Verde sólido para confirmación y éxito",
  },
  [AccentColor.YELLOW]: {
    name: "Amarillo",
    value: "yellow",
    hex: "#F59E0B",
    rgb: "245, 158, 11",
    tailwind: "yellow-500",
    description: "Amarillo sólido para advertencias",
  },
} as const;

/**
 * Default configuration
 */
export const DEFAULT_THEME = ThemeMode.LIGHT;
export const DEFAULT_ACCENT = AccentColor.BLUE;

/**
 * Export all theme modes and accent colors as arrays for iteration
 */
export const THEME_MODES = Object.values(ThemeMode);
export const ACCENT_COLOR_OPTIONS = Object.values(AccentColor);

/**
 * Helper function to get theme configuration
 */
export function getThemeConfig(theme: ThemeMode) {
  return THEME_CONFIG[theme];
}

/**
 * Helper function to get accent color configuration
 */
export function getAccentColorConfig(accent: AccentColor) {
  return ACCENT_COLORS[accent];
}

/**
 * Helper function to get CSS variable name for accent color
 */
export function getAccentCSSVariable(accent: AccentColor): string {
  return `--color-accent-${accent}`;
}

/**
 * Generate CSS variables string for all accent colors
 * Useful for injecting into the root CSS or theme provider
 */
export function generateAccentCSSVariables(): Record<string, string> {
  const variables: Record<string, string> = {};

  Object.entries(ACCENT_COLORS).forEach(([, config]) => {
    variables[getAccentCSSVariable(config.value as AccentColor)] = config.hex;
  });

  return variables;
}

/**
 * Type exports for use in other parts of the application
 */
export type ThemeModeType = typeof ThemeMode[keyof typeof ThemeMode];
export type AccentColorType = typeof AccentColor[keyof typeof AccentColor];
