import type { LucideIcon } from "lucide-react";
import { Sparkles, ShieldCheck, LineChart } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    title: "AI-generated briefs",
    description:
      "Turn rough notes into structured, ready-to-send deal briefs in seconds — no more blank-page starts.",
  },
  {
    icon: LineChart,
    title: "Real-time pipeline insights",
    description:
      "See exactly where every deal stands with live dashboards that update as your team works.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-grade security",
    description:
      "SOC 2-ready infrastructure, role-based access, and full audit trails keep your data protected.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="border-b border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Everything your team needs to move faster
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Built for modern sales and deal teams who want less busywork and
            more time closing.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="ring-border/60">
              <CardHeader>
                <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="size-5" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[0.925rem] leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
