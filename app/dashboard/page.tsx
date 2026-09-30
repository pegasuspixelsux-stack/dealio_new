import Link from "next/link";
import type { Metadata } from "next";
import { Car, CheckCircle2, Inbox, Users, ArrowRight } from "lucide-react";

import { listVehicles } from "@/lib/data/vehicles";
import { listAppUsers } from "@/lib/data/users";
import { listLeads, type Lead } from "@/lib/data/leads";
import { listTradeInLeads, type TradeInLead } from "@/lib/data/trade-ins";
import { listContactMessages, type ContactMessage } from "@/lib/data/contact";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardAnimations } from "@/components/dashboard/dashboard-animations";

export const metadata: Metadata = { title: "Panel — Dealio" };
export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("es-UY", { dateStyle: "medium" });

function settled<T>(result: PromiseSettledResult<T[]>): T[] {
  return result.status === "fulfilled" ? result.value : [];
}

type LeadKind = "vehicle" | "trade-in" | "contact";

interface UnifiedLead {
  id: string;
  kind: LeadKind;
  title: string;
  name: string;
  createdAt: string;
}

const KIND_LABELS: Record<LeadKind, string> = {
  vehicle: "Vehículo",
  "trade-in": "Permuta",
  contact: "Contacto",
};

function toUnifiedLeads(
  leads: Lead[],
  tradeInLeads: TradeInLead[],
  contactMessages: ContactMessage[]
): UnifiedLead[] {
  const unified: UnifiedLead[] = [
    ...leads.map((lead) => ({
      id: lead.id,
      kind: "vehicle" as const,
      title: lead.vehicleTitle,
      name: lead.name,
      createdAt: lead.createdAt,
    })),
    ...tradeInLeads.map((lead) => ({
      id: lead.id,
      kind: "trade-in" as const,
      title: `${lead.year} ${lead.make} ${lead.model}`,
      name: lead.name,
      createdAt: lead.createdAt,
    })),
    ...contactMessages.map((message) => ({
      id: message.id,
      kind: "contact" as const,
      title: "Mensaje de contacto",
      name: message.name,
      createdAt: message.createdAt,
    })),
  ];
  return unified.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export default async function DashboardHomePage() {
  const [vehiclesResult, usersResult, leadsResult, tradeInsResult, contactResult] =
    await Promise.allSettled([
      listVehicles(),
      listAppUsers(),
      listLeads(),
      listTradeInLeads(),
      listContactMessages(),
    ]);

  const vehicles = settled(vehiclesResult);
  const users = settled(usersResult);
  const leads = settled(leadsResult);
  const tradeInLeads = settled(tradeInsResult);
  const contactMessages = settled(contactResult);

  const publishedCount = vehicles.filter((v) => v.status === "published").length;
  const activeUsersCount = users.filter((u) => !u.disabled).length;
  const totalLeadsCount = leads.length + tradeInLeads.length + contactMessages.length;

  const kpis = [
    { label: "Vehículos en stock", value: vehicles.length, icon: Car },
    { label: "Publicados", value: publishedCount, icon: CheckCircle2 },
    { label: "Leads totales", value: totalLeadsCount, icon: Inbox },
    { label: "Usuarios activos", value: activeUsersCount, icon: Users },
  ];

  const recentVehicles = vehicles.slice(0, 5);
  const recentLeads = toUnifiedLeads(leads, tradeInLeads, contactMessages).slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-light tracking-tight text-foreground">Resumen</h1>
        <p className="text-sm font-light text-zinc-500 dark:text-zinc-400">
          Un vistazo general a tu stock y tus leads.
        </p>
      </div>

      {/* Bento Grid KPIs */}
      <DashboardAnimations>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, idx) => (
            <div
              key={kpi.label}
              className="group relative overflow-hidden rounded-3xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-zinc-900/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-black/[0.12] dark:hover:border-white/[0.12] hover:bg-white/95 dark:hover:bg-zinc-900/80 hover:shadow-lg"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 tracking-wide uppercase">
                    {kpi.label}
                  </p>
                  <p className="text-4xl font-light tracking-tight text-foreground">
                    {kpi.value}
                  </p>
                </div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-black/5 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                  <kpi.icon className="size-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </DashboardAnimations>

      {/* Content Grid */}
      {/* Recent Vehicles & Leads */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Vehicles */}
        <div className="overflow-hidden rounded-3xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-zinc-900/50 backdrop-blur-sm">
          <div className="border-b border-black/[0.06] dark:border-white/[0.08] px-6 py-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-light tracking-tight text-foreground">Últimos vehículos</h2>
              <Link href="/dashboard/vehicles" className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                Ver todos
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
          <div className="divide-y divide-black/[0.06] dark:divide-white/[0.08]">
            {recentVehicles.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm font-light text-zinc-500 dark:text-zinc-400">Todavía no hay vehículos</p>
              </div>
            ) : (
              recentVehicles.map((vehicle, idx) => (
                <Link
                  key={vehicle.id}
                  href={`/dashboard/vehicles/${vehicle.id}/edit`}
                  className="group flex items-center justify-between gap-4 px-6 py-4 transition-all hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                      {vehicle.photos[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={vehicle.photos[0].url}
                          alt=""
                          className="size-full object-cover"
                        />
                      ) : (
                        <Car className="size-5 text-zinc-400 dark:text-zinc-600" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </p>
                      <p className="text-xs font-light text-zinc-500 dark:text-zinc-400">
                        {dateFormatter.format(new Date(vehicle.updatedAt))}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={vehicle.status} />
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="overflow-hidden rounded-3xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-zinc-900/50 backdrop-blur-sm">
          <div className="border-b border-black/[0.06] dark:border-white/[0.08] px-6 py-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-light tracking-tight text-foreground">Últimos leads</h2>
              <Link href="/dashboard/leads" className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                Ver todos
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
          <div className="divide-y divide-black/[0.06] dark:divide-white/[0.08]">
            {recentLeads.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm font-light text-zinc-500 dark:text-zinc-400">Todavía no hay leads</p>
              </div>
            ) : (
              recentLeads.map((lead) => (
                <div key={`${lead.kind}-${lead.id}`} className="group flex items-center justify-between gap-4 px-6 py-4 transition-all hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{lead.name}</p>
                    <p className="truncate text-xs font-light text-zinc-500 dark:text-zinc-400">{lead.title}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-xs font-light text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                      {dateFormatter.format(new Date(lead.createdAt))}
                    </span>
                    <Badge variant="secondary" className="rounded-full bg-black/5 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border-0">
                      {KIND_LABELS[lead.kind]}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
