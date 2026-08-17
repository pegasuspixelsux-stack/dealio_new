import type { LucideIcon } from "lucide-react";
import { BadgeCheck, HandCoins, Wrench } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    icon: BadgeCheck,
    title: "Every vehicle inspected",
    description:
      "Each car on our lot passes a multi-point inspection before it's listed, so what you see is what you get.",
  },
  {
    icon: HandCoins,
    title: "Upfront, honest pricing",
    description:
      "No hidden fees or last-minute surprises — the price you see is the price you pay, plus flexible financing.",
  },
  {
    icon: Wrench,
    title: "Support after the sale",
    description:
      "From paperwork to trade-ins, our team sticks around to help long after you've driven off the lot.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="border-b border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Why buy from us
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Straightforward pricing, inspected vehicles, and a team that
            treats every sale like it matters.
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
