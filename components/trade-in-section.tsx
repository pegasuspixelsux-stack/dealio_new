import { RefreshCw } from "lucide-react";

import { TradeInForm } from "@/components/trade-in-form";

const POINTS = [
  "Get a real estimate in one business day",
  "No obligation to sell — estimates are free",
  "Apply your trade-in value toward your next vehicle",
];

export function TradeInSection() {
  return (
    <section id="trade-in" className="border-b border-border/60 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
            <RefreshCw className="size-4" />
            Trade-in
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Have a vehicle to trade in?
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Tell us about your current vehicle and we&apos;ll get back to you
            with an estimated trade-in value — no showroom visit required to
            get started.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <TradeInForm />
      </div>
    </section>
  );
}
