import Link from "next/link";
import { Car } from "lucide-react";

import { listPublishedVehicles } from "@/lib/data/vehicles";
import { Card, CardContent } from "@/components/ui/card";

const currency = new Intl.NumberFormat("es-UY", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export async function FeaturedVehiclesSection() {
  let vehicles: Awaited<ReturnType<typeof listPublishedVehicles>> = [];
  try {
    vehicles = await listPublishedVehicles(4);
  } catch {
    // Keep the marketing page usable even if Firestore is unreachable.
    return null;
  }

  if (vehicles.length === 0) return null;

  return (
    <section id="inventory" className="border-b border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Seleccionados ahora
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Un vistazo a lo que tenemos en stock, actualizado a medida que
            entran vehículos.
          </p>
        </div>

        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto -mx-4 px-4 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {vehicles.map((vehicle) => (
            <Link
              key={vehicle.id}
              href={`/vehicles/${vehicle.id}`}
              className="group w-3/4 shrink-0 snap-start sm:w-auto"
            >
              <Card className="gap-0 overflow-hidden py-0 ring-border/60 transition-shadow group-hover:shadow-md">
                <div className="aspect-4/3 w-full overflow-hidden bg-muted">
                  {vehicle.photos[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={vehicle.photos[0].url}
                      alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-muted-foreground">
                      <Car className="size-8" />
                    </div>
                  )}
                </div>
                <CardContent className="flex flex-col gap-1 p-4">
                  <h3 className="font-medium text-foreground">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {vehicle.specs.mileage != null
                      ? `${vehicle.specs.mileage.toLocaleString("es-UY")} km`
                      : "Kilometraje a consultar"}
                  </p>
                  <p className="mt-1 font-semibold text-foreground">
                    {vehicle.priceDisplay != null
                      ? currency.format(vehicle.priceDisplay)
                      : "Precio a consultar"}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
