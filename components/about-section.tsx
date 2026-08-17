const STATS = [
  { value: "500+", label: "Dealers" },
  { value: "50k+", label: "Vehicles listed" },
  { value: "24/7", label: "Support" },
];

export function AboutSection() {
  return (
    <section id="about" className="border-b border-border/60 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200&auto=format&fit=crop"
              alt="A car dealership showroom"
              className="aspect-4/3 w-full object-cover"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            About us
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built for dealers, by people who get it
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Dealio started with a simple frustration: listing a vehicle
            shouldn&apos;t take longer than selling it. We built a platform
            that gets your inventory online in minutes — photos, pricing, and
            a lead form included — so you can spend less time on paperwork
            and more time with buyers.
          </p>

          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-border/60 pt-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-foreground">
                  {stat.value}
                </dd>
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
