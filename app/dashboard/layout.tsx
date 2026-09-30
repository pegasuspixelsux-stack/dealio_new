import type { ReactNode } from "react";
import Link from "next/link";

import { requireSession } from "@/lib/auth/session";
import { Logo } from "@/components/logo";
import { DashboardMobileNav } from "@/components/dashboard/dashboard-mobile-nav";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await requireSession();

  return (
    <div className="flex min-h-screen flex-1 bg-white dark:bg-black">
      {/* Left Sidebar - Full Height Navigation with Accent Color */}
      <DashboardSidebar userEmail={session.email!} />

      {/* Right Content Area */}
      <div className="flex flex-1 flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 border-b border-black/[0.06] dark:border-white/[0.08] bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <DashboardMobileNav />
              <Link href="/dashboard" className="transition-opacity hover:opacity-80">
                <Logo />
              </Link>
            </div>
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{session.email}</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-12 max-w-7xl w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
