"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { SignOutButton } from "@/components/dashboard/sign-out-button";
import { MAIN_NAV_ITEMS } from "@/components/dashboard/dashboard-nav-items";

export const NAV_LINK_CLASS =
  "flex items-center gap-2.5 rounded-2xl px-3 py-2 text-sm font-medium transition-all duration-200 relative";
export const NAV_LINK_ACTIVE = "bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-6 before:bg-blue-500 before:rounded-r-full";
export const NAV_LINK_INACTIVE = "text-zinc-600 dark:text-zinc-400 hover:text-foreground hover:bg-black/[0.03] dark:hover:bg-white/[0.05]";

export function DashboardNav() {
  const pathname = usePathname();
  const settingsActive = pathname.startsWith("/dashboard/settings");

  return (
    <nav className="hidden lg:flex lg:h-full lg:flex-col lg:gap-2">
      <div className="flex flex-col gap-0.5">
        {MAIN_NAV_ITEMS.map((item) => {
          const active = item.match(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(NAV_LINK_CLASS, active ? NAV_LINK_ACTIVE : NAV_LINK_INACTIVE)}
            >
              <item.icon className="size-4 flex-shrink-0" />
              <span className="font-light">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto flex flex-col gap-0.5 border-t border-black/[0.06] dark:border-white/[0.08] pt-3">
        <Link
          href="/dashboard/settings"
          className={cn(NAV_LINK_CLASS, settingsActive ? NAV_LINK_ACTIVE : NAV_LINK_INACTIVE)}
        >
          <Settings className="size-4 flex-shrink-0" />
          <span className="font-light">Configuración</span>
        </Link>
        <Link href="/" className={cn(NAV_LINK_CLASS, NAV_LINK_INACTIVE)}>
          <ArrowLeft className="size-4 flex-shrink-0" />
          <span className="font-light">Volver al sitio</span>
        </Link>
        <SignOutButton className={cn(NAV_LINK_CLASS, NAV_LINK_INACTIVE, "w-full justify-start")} />
      </div>
    </nav>
  );
}
