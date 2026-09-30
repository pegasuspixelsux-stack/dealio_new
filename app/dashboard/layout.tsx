import type { ReactNode } from "react";
import Link from "next/link";

import { requireSession } from "@/lib/auth/session";
import { Logo } from "@/components/logo";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { DashboardMobileNav } from "@/components/dashboard/dashboard-mobile-nav";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await requireSession();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-white dark:bg-black">
      {/* Glassmorphic Header */}
      <header className="sticky top-0 z-40 border-b border-black/[0.06] dark:border-white/[0.08] bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:gap-12 lg:px-8 lg:py-12">
        <aside className="hidden lg:block lg:w-56 lg:shrink-0">
          <div className="sticky top-20">
            <DashboardNav />
          </div>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
