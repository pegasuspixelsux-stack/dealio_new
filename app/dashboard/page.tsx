import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Plus, TriangleAlert } from "lucide-react";

import { listVehicles } from "@/lib/data/vehicles";
import { VehicleTable } from "@/components/dashboard/vehicle-table";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const metadata: Metadata = { title: "Dashboard — Dealio" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let vehicles: Awaited<ReturnType<typeof listVehicles>> = [];
  let loadError: string | null = null;

  try {
    vehicles = await listVehicles();
  } catch {
    loadError = "Could not load your vehicle inventory. Please refresh the page.";
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Volver al sitio
      </Link>

      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Vehicle inventory
          </h1>
          <p className="text-sm text-muted-foreground">
            {vehicles.length} vehicle{vehicles.length === 1 ? "" : "s"} in your
            inventory
          </p>
        </div>
        <Button nativeButton={false} render={<Link href="/dashboard/vehicles/new" />}>
          <Plus />
          Add vehicle
        </Button>
      </div>

      {loadError ? (
        <Alert variant="destructive">
          <TriangleAlert />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{loadError}</AlertDescription>
        </Alert>
      ) : (
        <VehicleTable vehicles={vehicles} />
      )}
    </div>
  );
}
