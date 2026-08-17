import type { ReactNode } from "react";
import Link from "next/link";

import { requireSession } from "@/lib/auth/session";
import { Logo } from "@/components/logo";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await requireSession();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-muted/20">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/dashboard">
            <Logo />
          </Link>
          <span className="text-sm text-muted-foreground">{session.email}</span>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:gap-8 lg:px-8 lg:py-10">
        <aside className="lg:w-56 lg:shrink-0">
          <DashboardNav />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
