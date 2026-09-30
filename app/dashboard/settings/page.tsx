import type { Metadata } from "next";

import { getDealerSettings } from "@/lib/data/settings";
import { SettingsForm } from "@/components/dashboard/settings-form";
import { DashboardConfig } from "@/components/dashboard/dashboard-config";

export const metadata: Metadata = { title: "Configuración — Dealio" };
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getDealerSettings();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-light tracking-tight text-foreground">Configuración</h1>
        <p className="text-sm font-light text-zinc-500 dark:text-zinc-400">
          Personaliza tu experiencia en el panel de control.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Dealer Settings */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-light tracking-tight text-foreground">
              Datos del Concesionario
            </h2>
            <p className="text-sm font-light text-zinc-500 dark:text-zinc-400">
              Información de referencia para el panel interno.
            </p>
          </div>
          <SettingsForm initialSettings={settings} />
        </div>

        {/* Theme & Appearance Settings */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-light tracking-tight text-foreground">
              Apariencia
            </h2>
            <p className="text-sm font-light text-zinc-500 dark:text-zinc-400">
              Personaliza el tema y los colores de la interfaz.
            </p>
          </div>
          <div className="rounded-3xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-zinc-900/50 backdrop-blur-sm p-6">
            <DashboardConfig />
          </div>
        </div>
      </div>
    </div>
  );
}
