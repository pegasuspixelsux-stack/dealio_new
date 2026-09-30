"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Palette } from "lucide-react";
import {
  THEME_CONFIG,
  ACCENT_COLORS,
  ThemeMode,
  AccentColor,
  DEFAULT_THEME,
  DEFAULT_ACCENT,
} from "@/lib/config/theme";
import { Button } from "@/components/ui/button";

interface DashboardConfigProps {
  onThemeChange?: (theme: ThemeMode) => void;
  onAccentChange?: (accent: AccentColor) => void;
}

export function DashboardConfig({ onThemeChange, onAccentChange }: DashboardConfigProps) {
  const [theme, setTheme] = useState<ThemeMode>(DEFAULT_THEME);
  const [accent, setAccent] = useState<AccentColor>(DEFAULT_ACCENT);
  const [mounted, setMounted] = useState(false);

  // Load saved preferences from localStorage
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("dealio-theme") as ThemeMode | null;
    const savedAccent = localStorage.getItem("dealio-accent") as AccentColor | null;

    if (savedTheme) setTheme(savedTheme);
    if (savedAccent) setAccent(savedAccent);
  }, []);

  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    localStorage.setItem("dealio-theme", newTheme);
    onThemeChange?.(newTheme);

    // Apply theme to document
    if (newTheme === ThemeMode.DARK) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleAccentChange = (newAccent: AccentColor) => {
    setAccent(newAccent);
    localStorage.setItem("dealio-accent", newAccent);
    onAccentChange?.(newAccent);
  };

  if (!mounted) return null;

  const themeConfig = THEME_CONFIG[theme];
  const accentConfig = ACCENT_COLORS[accent];

  return (
    <div className="space-y-8">
      {/* Theme Selection */}
      <section className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-light tracking-tight text-foreground flex items-center gap-2">
            <Sun className="size-5" />
            Tema
          </h3>
          <p className="text-sm font-light text-zinc-600 dark:text-zinc-400">
            Elige entre modo claro u oscuro
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {Object.entries(THEME_CONFIG).map(([, config]) => {
            const isActive = theme === config.value;
            return (
              <button
                key={config.value}
                onClick={() => handleThemeChange(config.value as ThemeMode)}
                className={`group relative overflow-hidden rounded-2xl border-2 p-4 transition-all duration-200 ${
                  isActive
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-black/[0.06] dark:border-white/[0.08] hover:border-black/[0.12] dark:hover:border-white/[0.12]"
                }`}
              >
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-2">
                    {config.value === ThemeMode.LIGHT ? (
                      <Sun className="size-4" />
                    ) : (
                      <Moon className="size-4" />
                    )}
                    <span className="font-medium text-sm">{config.name}</span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    {config.description}
                  </p>
                </div>
                {isActive && (
                  <div className="absolute top-2 right-2 size-2 rounded-full bg-blue-500" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Accent Color Selection */}
      <section className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-light tracking-tight text-foreground flex items-center gap-2">
            <Palette className="size-5" />
            Color de Acento
          </h3>
          <p className="text-sm font-light text-zinc-600 dark:text-zinc-400">
            Personaliza el color de acento de la interfaz
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(ACCENT_COLORS).map(([, config]) => {
            const isActive = accent === config.value;
            return (
              <button
                key={config.value}
                onClick={() => handleAccentChange(config.value as AccentColor)}
                className={`group relative overflow-hidden rounded-2xl border-2 p-4 transition-all duration-200 flex flex-col items-center gap-3 ${
                  isActive
                    ? "border-current"
                    : "border-black/[0.06] dark:border-white/[0.08] hover:border-black/[0.12] dark:hover:border-white/[0.12]"
                }`}
                style={isActive ? { borderColor: config.hex } : {}}
              >
                <div
                  className="size-10 rounded-lg shadow-md transition-transform group-hover:scale-110"
                  style={{ backgroundColor: config.hex }}
                />
                <div className="text-center">
                  <p className="font-medium text-sm">{config.name}</p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    {config.hex}
                  </p>
                </div>
                {isActive && (
                  <div className="absolute top-2 right-2 size-2 rounded-full bg-current" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Reset Button */}
      <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
        <Button
          variant="outline"
          onClick={() => {
            handleThemeChange(DEFAULT_THEME);
            handleAccentChange(DEFAULT_ACCENT);
          }}
          className="w-full"
        >
          Restaurar configuración predeterminada
        </Button>
      </div>
    </div>
  );
}
