import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const POINTS = [
  "Cargá un vehículo en minutos con un formulario guiado",
  "Subí fotos desde tu celular — se redimensionan automáticamente",
  "Publicá al instante con una página pública y captura de contactos",
];

export function DealerHighlightSection() {
  return (
    <section className="border-b border-border/60 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Para concesionarios
          </p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Gestioná tu lote desde un solo panel
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Publicá un vehículo, subí sus fotos y definí el precio — Dealio se
            encarga de la publicación pública, la galería y el formulario de
            contacto para que vos te enfoques en vender.
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
            Ir al panel
          </Button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop"
            alt="Un auto en venta, fotografiado para una publicación"
            className="aspect-4/3 w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
