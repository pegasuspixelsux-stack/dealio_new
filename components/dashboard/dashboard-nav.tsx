"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Car, Inbox, LayoutDashboard, Settings, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { SignOutButton } from "@/components/dashboard/sign-out-button";

const NAV_LINK_CLASS =
  "flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors";
const NAV_LINK_ACTIVE = "bg-primary/10 text-primary";
const NAV_LINK_INACTIVE = "text-muted-foreground hover:bg-muted hover:text-foreground";

const MAIN_NAV_ITEMS = [
  {
    label: "Inicio",
    href: "/dashboard",
    icon: LayoutDashboard,
    match: (path: string) => path === "/dashboard",
  },
  {
    label: "Vehículos",
    href: "/dashboard/vehicles",
    icon: Car,
    match: (path: string) => path.startsWith("/dashboard/vehicles"),
  },
  {
    label: "Leads",
    href: "/dashboard/leads",
    icon: Inbox,
    match: (path: string) => path.startsWith("/dashboard/leads"),
  },
  {
    label: "Usuarios",
    href: "/dashboard/users",
    icon: Users,
    match: (path: string) => path.startsWith("/dashboard/users"),
  },
];

export function DashboardNav() {
  const pathname = usePathname();
  const settingsActive = pathname.startsWith("/dashboard/settings");

  return (
    <nav className="flex flex-col gap-4 lg:h-full">
      <div className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {MAIN_NAV_ITEMS.map((item) => {
          const active = item.match(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(NAV_LINK_CLASS, active ? NAV_LINK_ACTIVE : NAV_LINK_INACTIVE)}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="flex gap-1 overflow-x-auto border-border pt-2 lg:mt-auto lg:flex-col lg:overflow-visible lg:border-t lg:pt-4">
        <Link
          href="/dashboard/settings"
          className={cn(NAV_LINK_CLASS, settingsActive ? NAV_LINK_ACTIVE : NAV_LINK_INACTIVE)}
        >
          <Settings className="size-4" />
          Configuración
        </Link>
        <Link href="/" className={cn(NAV_LINK_CLASS, NAV_LINK_INACTIVE)}>
          <ArrowLeft className="size-4" />
          Volver al sitio
        </Link>
        <SignOutButton className={cn(NAV_LINK_CLASS, NAV_LINK_INACTIVE, "w-full")} />
      </div>
    </nav>
  );
}
