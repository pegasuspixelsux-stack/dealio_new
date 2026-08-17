import { Landmark } from "lucide-react";

import { FinancingCalculator } from "@/components/financing-calculator";

const POINTS = [
  "Flexible terms from 36 to 84 months",
  "No impact to your credit score for an estimate",
  "Apply for real financing once you find your vehicle",
];

export function FinancingSection() {
  return (
    <section id="financing" className="border-b border-border/60 bg-muted/20 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
            <Landmark className="size-4" />
            Financing
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            See what it could cost you
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Get a quick monthly payment estimate before you even step onto the
            lot. Adjust the price, down payment, rate, and term to find what
            fits your budget.
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

        <FinancingCalculator />
      </div>
    </section>
  );
}
