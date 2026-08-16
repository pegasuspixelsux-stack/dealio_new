import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/session";
import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/logo";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Sign in — Dealio",
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-muted/30 px-4 py-16">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <Logo />
          <p className="text-sm text-muted-foreground">
            Sign in to manage your vehicle inventory.
          </p>
        </div>
        <Suspense fallback={<Skeleton className="h-48 w-full" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
