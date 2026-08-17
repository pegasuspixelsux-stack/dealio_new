import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const POINTS = [
  "Add a vehicle in minutes with a guided intake form",
  "Upload photos from your phone — resized automatically",
  "Publish instantly to a public page with built-in lead capture",
];

export function DealerHighlightSection() {
  return (
    <section className="border-b border-border/60 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            For dealers
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Run your lot from one dashboard
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            List a vehicle, upload its photos, and set your pricing — Dealio
            handles the public listing, gallery, and lead form so you can
            focus on the sale.
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-sm text-foreground">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>
          <Button className="mt-8" nativeButton={false} render={<Link href="/login" />}>
            Go to dashboard
          </Button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop"
            alt="A car for sale, photographed for a dealership listing"
            className="aspect-4/3 w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
