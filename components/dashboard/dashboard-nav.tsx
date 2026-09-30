"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { SignOutButton } from "@/components/dashboard/sign-out-button";
import { MAIN_NAV_ITEMS } from "@/components/dashboard/dashboard-nav-items";
import { useAccentColor } from "@/lib/hooks/useAccentColor";

export const NAV_LINK_CLASS =
  "flex items-center gap-2.5 rounded-2xl px-3 py-2 text-sm font-medium transition-all duration-200 relative";
export const NAV_LINK_INACTIVE = "text-zinc-600 dark:text-zinc-400 hover:text-foreground hover:bg-black/[0.03] dark:hover:bg-white/[0.05]";

export function DashboardNav() {
  const pathname = usePathname();
  const settingsActive = pathname.startsWith("/dashboard/settings");
  const { accentConfig, mounted } = useAccentColor();

  if (!mounted) return null;

  // Generate active state classes based on accent color
  const getActiveClass = () => {
    const hex = accentConfig.hex;
    return `bg-[${hex}]/10 dark:bg-[${hex}]/20 text-[${hex}] dark:text-[${hex}] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-6 before:rounded-r-full`;
  };

  // Use inline style for dynamic accent color
  const getActiveStyle = () => ({
    backgroundColor: `${accentConfig.hex}15`,
    color: accentConfig.hex,
  });

  return (
    <nav
      className="hidden lg:flex lg:h-full lg:flex-col lg:gap-2 rounded-3xl p-3 transition-colors duration-200"
      style={{
        backgroundColor: accentConfig.hex,
      }}
    >
      <div className="flex flex-col gap-0.5 flex-1 overflow-y-auto">
        {MAIN_NAV_ITEMS.map((item) => {
          const active = item.match(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-2xl px-3 py-2 text-sm font-medium transition-all duration-200 relative",
                active
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              <item.icon className="size-4 flex-shrink-0" />
              <span className="font-light">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col gap-0.5 border-t border-white/20 pt-3 pb-2 mt-auto">
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-2.5 rounded-2xl px-3 py-2 text-sm font-medium transition-all duration-200 relative",
            settingsActive
              ? "bg-white/20 text-white"
              : "text-white/70 hover:text-white hover:bg-white/10"
          )}
        >
          <Settings className="size-4 flex-shrink-0" />
          <span className="font-light">Configuración</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-2xl px-3 py-2 text-sm font-medium transition-all duration-200 text-white/70 hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="size-4 flex-shrink-0" />
          <span className="font-light">Volver al sitio</span>
        </Link>
        <SignOutButton className="flex items-center gap-2.5 rounded-2xl px-3 py-2 text-sm font-medium transition-all duration-200 text-white/70 hover:text-white hover:bg-white/10 w-full justify-start" />
      </div>
    </nav>
  );
}
