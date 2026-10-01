import Link from "next/link";
import { Car } from "lucide-react";

import type { Vehicle } from "@/types/vehicle";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

const currency = new Intl.NumberFormat("es-UY", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function VehicleCard({
  vehicle,
  layout = "vertical",
}: {
  vehicle: Vehicle;
  layout?: "vertical" | "horizontal";
}) {
  const horizontal = layout === "horizontal";

  const placeholders = [
    "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1605559424843-9e4c3ca3806d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552519507-da3effbb7cb6?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1570355394211-b71861f2e7b5?w=800&h=600&fit=crop",
  ];

  const photoUrl = vehicle.photos?.[0]?.url || placeholders[Math.floor(Math.random() * placeholders.length)];

  return (
    <Link href={`/vehicles/${vehicle.id}`} className="group block">
      <Card
        className={cn(
          "gap-0 overflow-hidden py-0 ring-border/60 transition-shadow group-hover:shadow-md",
          horizontal && "flex-row"
        )}
      >
        <div
          className={cn(
            "shrink-0 overflow-hidden bg-muted relative",
            horizontal ? "aspect-square w-2/5" : "aspect-4/3 w-full"
          )}
        >
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoUrl}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted-foreground">
              <Car className="size-8" />
            </div>
          )}
        </div>
        <CardContent
          className={cn(
            "flex min-w-0 flex-1 flex-col gap-1 p-4",
            horizontal && "justify-center"
          )}
        >
          <h3 className="truncate font-medium text-foreground">
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
  );
}
