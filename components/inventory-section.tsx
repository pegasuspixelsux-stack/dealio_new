"use client";

import { useEffect, useState } from "react";
import { VehicleCard } from "@/components/vehicle-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Clock, Grid2x2, Rows3, LayoutGrid } from "lucide-react";

const SHORTCUTS = [
  { label: "SUV", value: "suv" },
  { label: "Sedán", value: "sedan" },
  { label: "Pickup", value: "pickup" },
  { label: "Económicos", value: "economicos" },
];

type MobileViewMode = "vertical-1" | "horizontal-1" | "vertical-2";

export function InventorySection() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVehicles, setFilteredVehicles] = useState<any[]>([]);
  const [mobileViewMode, setMobileViewMode] = useState<MobileViewMode>("vertical-1");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/vehicles?limit=100");
        const data = await response.json();
        if (response.ok) {
          setVehicles(data);
          setFilteredVehicles(data);
        } else {
          console.error("API error:", data);
        }
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredVehicles(vehicles);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = vehicles.filter((vehicle) =>
        `${vehicle.year} ${vehicle.make} ${vehicle.model}`
          .toLowerCase()
          .includes(query)
      );
      setFilteredVehicles(filtered);
    }
  }, [searchQuery, vehicles]);

  const getGridClasses = () => {
    if (typeof window === "undefined") return "";
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      return "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";
    }

    switch (mobileViewMode) {
      case "vertical-1":
        return "grid gap-6 grid-cols-1";
      case "horizontal-1":
        return "grid gap-6 grid-cols-1";
      case "vertical-2":
        return "grid gap-6 grid-cols-2";
      default:
        return "grid gap-6 grid-cols-1";
    }
  };

  return (
    <section className="border-b border-border/60 bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Mobile Search Box */}
        <div className="mb-6 md:hidden">
          <Input
            placeholder="Buscar vehículos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Mobile Grid Selector */}
        <div className="mb-6 flex items-center justify-between md:hidden">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={mobileViewMode === "vertical-1" ? "default" : "outline"}
              onClick={() => setMobileViewMode("vertical-1")}
              title="1 columna vertical"
              className="h-10 w-10 p-0"
            >
              <Rows3 className="size-4" />
            </Button>
            <Button
              size="sm"
              variant={mobileViewMode === "horizontal-1" ? "default" : "outline"}
              onClick={() => setMobileViewMode("horizontal-1")}
              title="1 columna horizontal"
              className="h-10 w-10 p-0"
            >
              <LayoutGrid className="size-4" />
            </Button>
            <Button
              size="sm"
              variant={mobileViewMode === "vertical-2" ? "default" : "outline"}
              onClick={() => setMobileViewMode("vertical-2")}
              title="2 columnas"
              className="h-10 w-10 p-0"
            >
              <Grid2x2 className="size-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="size-4" />
            Filtros
          </Button>
        </div>

        {/* Grid */}
        {filteredVehicles.length > 0 ? (
          <div className={getGridClasses()}>
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                layout={mobileViewMode === "horizontal-1" ? "horizontal" : "vertical"}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No se encontraron vehículos que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
