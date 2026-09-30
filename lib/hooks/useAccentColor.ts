"use client";

import { useState, useEffect } from "react";
import { AccentColor, DEFAULT_ACCENT, ACCENT_COLORS } from "@/lib/config/theme";

export function useAccentColor() {
  const [accentColor, setAccentColor] = useState<AccentColor>(DEFAULT_ACCENT);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedAccent = localStorage.getItem("dealio-accent") as AccentColor | null;
    if (savedAccent) {
      setAccentColor(savedAccent);
    }
  }, []);

  const accentConfig = ACCENT_COLORS[accentColor];

  return {
    accentColor,
    accentConfig,
    mounted,
  };
}
