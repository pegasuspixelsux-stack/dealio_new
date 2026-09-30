"use client";

import Link from "next/link";
import { useAccentColor } from "@/lib/hooks/useAccentColor";
import { Logo } from "@/components/logo";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";

interface DashboardSidebarProps {
  userEmail: string;
}

export function DashboardSidebar({ userEmail }: DashboardSidebarProps) {
  const { accentConfig, mounted } = useAccentColor();

  if (!mounted) return null;

  return (
    <aside
      className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 border-r border-white/20 transition-colors duration-200"
      style={{
        backgroundColor: accentConfig.hex,
      }}
    >
      {/* Logo Area */}
      <div className="flex items-center gap-3 border-b border-white/20 px-6 py-6">
        <Link href="/dashboard" className="transition-opacity hover:opacity-80 flex-1">
          <div className="[&_svg]:!text-white [&_*]:!text-white">
            <Logo />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <div className="p-3">
          <DashboardNav />
        </div>
      </nav>

      {/* User Info */}
      <div className="border-t border-white/20 px-6 py-4">
        <p className="text-xs font-medium text-white/70 truncate">
          {userEmail}
        </p>
      </div>
    </aside>
  );
}
